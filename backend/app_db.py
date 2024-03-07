from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference
import DataGenerator
import Scheduler

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():

    # Prepping the database
    db.drop_all()
    db.create_all()
    DataGenerator.loadData()

    # Instructors w/ no preference
    instructors_with_no_preferences_pos = 0

    # Courses and enrollment numbers
    courses_and_enrollment = Scheduler.getCoursesAndEnrollment()

    # Rooms and Times
    room_availability = Scheduler.getRoomsAndAvailability()
    current_section_no = 0

    #Instructors
    Instructor_availability = Scheduler.getInstructorAvailability()

    # Rooms and Occupancy
    room_occupancy = Scheduler.getRoomsAndOccupancy

    for i in range(10):
        sections = []
        current_section_no += 1

        instructors_with_no_preferences = Scheduler.getInstructorsWithNoPref()

        # Creates section list of sections to be assigned
        for course in courses_and_enrollment:
            # if course enrollement is unfulfilled, add section to list of sections to be assigned
            if course[2] == 0:
                queried_course = Course.query.filter_by(id=course[0]).first()
                new_section = queried_course.newSection()
                db.session.add(new_section)
                sections.append(new_section)

        db.session.commit()

        for section in sections:
            course_for_section = section.course_id
            course_preferences = CoursePreference.getUnfulfilledPreferences(course_for_section)
            if not course_preferences:
                # Assign section to instructor from instructors who have no preferance or have already met their preference
                available_instructor = instructors_with_no_preferences[instructors_with_no_preferences_pos]
                section.setInstructor(available_instructor)

                instructors_with_no_preferences_pos = (instructors_with_no_preferences_pos + 1) % len(instructors_with_no_preferences)
                
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
                for period in room_availability:
                    if period[0] not in order_periods:
                        order_periods.append(period_pref.period_id)
            else:
                # Instructor has no preference - this could be used to change the order of which periods are checked first/last
                for period in room_availability:
                    if period[0] not in order_periods:
                        order_periods.append(period_pref.period_id)
            
            for period in order_periods:
                
                instructor_period_availabilty = Scheduler.findInstructorAvailability(Instructor_availability, period)
                period_room_availabilty = Scheduler.findRoomAvailability(room_availability, period)
                for room in period_room_availabilty:
                    i = 0
                    if room != None and (not instructor_period_availabilty or instructor_period_availabilty.count(period) != 0):
                        print("instructor will be assigned room", room, " during ", period) # all room one because nothing is implemented
                        # ROOM IS AVAILABLE
                        section.setRoomByID(room)
                        Scheduler.updateCourseEnrollment(courses_and_enrollment, section.course_id, room)
                        Scheduler.updateRoomAvailability(room_availability, period, room)
                        break
                Scheduler.updateInstructorAvailability(Instructor_availability, period, assigned_instructor_id)
                section.setPeriodByID(period)
                break
            print("\n")
            db.session.commit()
            if Scheduler.checkCoursesFulfillment(courses_and_enrollment) == True:
                break

             
    

    sections = Section.query.all()
    print(sections)

    #print(Course.query.all())
    #print(Instructor.query.all())



