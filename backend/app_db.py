from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference
import DataGenerator
from Scheduler import Scheduler

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():

    # Prepping the database
    db.drop_all()
    db.create_all()
    DataGenerator.loadData()

    scheduler = Scheduler()

    for i in range(10):
        sections = []
        scheduler.section_counter += 1

        # Creates section list of sections to be assigned
        for course in scheduler.courses_and_enrollment:
            # if course enrollement is unfulfilled, add section to list of sections to be assigned
            if course[2] == 0:
                queried_course = Course.query.filter_by(id=course[0]).first()
                new_section = queried_course.newSection()
                db.session.add(new_section)
                sections.append(new_section)
        db.session.commit()

        scheduler.getInstructorsWithNoPref()

        for section in sections:
            # Gather course information
            course_for_section = section.course_id
            course_preferences = CoursePreference.getUnfulfilledPreferences(course_for_section)

            if not course_preferences:
                # There are no professors with a preference for this course
                # Assign section to instructor from instructors who have no preferance or have already met their preference
                available_instructor = scheduler.instructors_with_no_preferences[scheduler.instructors_with_no_preferences_pos]
                section.setInstructor(available_instructor)

                scheduler.instructors_with_no_preferences_pos = (scheduler.instructors_with_no_preferences_pos + 1) % len(scheduler.instructors_with_no_preferences)
                
                # Change to assigned_Instructor for the time assignment
                assigned_instructor = available_instructor
            else:
                # Assign Instructor from Instructors who do have preference for the specific course - based on priority
                course_for_section = Course.query.filter_by(id=course_for_section).first()
                selected_instructor = course_for_section.getInstructorWithPriority()
                section.setInstructor(selected_instructor)

                # Update instructor preferences
                pref = selected_instructor.findCoursePreference(course_for_section.id)
                pref.prefFulfilled()

                # Change to assigned_Instructor for the time assignment
                assigned_instructor = selected_instructor


            print(assigned_instructor)
            print(section)

            # Check if Instructor has any time preferences
            assigned_instructor_id = assigned_instructor.id
            period_preferences = assigned_instructor.getPeriodPreferences()

            order_periods = []

            # order check_periods_room based on whether instructor has preference or not
            if period_preferences:
                for period_pref in period_preferences:
                    order_periods.append(period_pref.period_id)   
                for period in scheduler.room_availability:
                    if period[0] not in order_periods:
                        order_periods.append(period_pref.period_id)
            else:
                # Instructor has no preference - this could be used to change the order of which periods are checked first/last
                for period in scheduler.room_availability:
                    if period[0] not in order_periods:
                        order_periods.append(period_pref.period_id)
            
            for period in order_periods:
                
                instructor_period_availabilty = scheduler.findInstructorAvailability(period)
                period_room_availabilty = scheduler.findRoomAvailability(period)
                for room in period_room_availabilty:
                    i = 0
                    if room != None and (not instructor_period_availabilty or instructor_period_availabilty.count(period) != 0):
                        print("instructor will be assigned room", room, " during ", period) # all room one because nothing is implemented
                        # ROOM IS AVAILABLE
                        section.setRoomByID(room)
                        scheduler.updateCourseEnrollment(section.course_id, room)
                        scheduler.updateRoomAvailability(period, room)
                        break
                scheduler.updateInstructorAvailability(period, assigned_instructor_id)
                section.setPeriodByID(period)
                break
            print("\n")
            db.session.commit()
            if scheduler.checkCoursesFulfillment() == True:
                break

        scheduler.instructors_with_no_preferences = []

    

             
    

    sections = Section.query.all()
    print(sections)

    #print(Course.query.all())
    #print(Instructor.query.all())



