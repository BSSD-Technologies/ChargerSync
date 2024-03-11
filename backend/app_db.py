from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
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

        scheduler.prepareForMoreSections()
        scheduler.createNewSections()

        for section in scheduler.sections:
            # Gather course information
            section_course_id = section.course_id
            section_course_preferences = section.course.preferences

            # a list of all preferences for the course
            course_preferences = Scheduler.getUnfulfilledPreferences(section_course_preferences)

            if not course_preferences:
                # There are no professors with a preference for this course
                # Assign section to instructor from instructors who have no preferance or have already met their preference
                available_instructor = scheduler.getNextAvailableInstructor()
                section.setInstructorByID(available_instructor)

                # Change to assigned_Instructor for the time assignment
                assigned_instructor = available_instructor
            else:
                # There exists professor(s) with a preference for this course
                # Assign Instructor from Instructors who do have preference for the specific course - based on priority
                selected_instructor = Scheduler.getInstructorWithPriority(section_course_id)
                section.setInstructorByID(selected_instructor)

                # Update preferences
                pref = section.findCoursePreference()
                pref.prefFulfilled()

                # Change to assigned_Instructor for the time assignment
                assigned_instructor = selected_instructor

            # Check if Instructor has any time preferences
            period_preferences = section.getPeriodPreferences()
            order_periods = scheduler.createOrderPeriods(period_preferences)
            
            for period in order_periods:
                instructor_period_availability = scheduler.findInstructorAvailability(period)
                period_room_availabilty = scheduler.findRoomAvailability(period)
                if instructor_period_availability and assigned_instructor in instructor_period_availability:
                    for room in period_room_availabilty:
                        if room is not None:
                            # room is available at period
                            i = 0
                            section.setRoomByID(room)
                            scheduler.updateCourseEnrollment(section.course_id, room)
                            scheduler.updateRoomAvailability(period, room)
                            break
                    scheduler.updateInstructorAvailability(period, assigned_instructor)
                    section.setPeriodByID(period)
                    break

            # Some printing for testing
            section.printInfo()

            print("\n")
            db.session.commit()
            if scheduler.checkCoursesFulfillment() == True:
                break

        scheduler.instructors_with_no_preferences = []

    

             
    

    scheduler.sections = Section.query.all()
    print(scheduler.sections)

    #print(Course.query.all())
    #print(Instructor.query.all())



