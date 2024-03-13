from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
import DataGenerator
from Scheduler import Scheduler
from output import formatForOutput

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
            scheduler.getInstructorsWithNoPref(section_course_id)

            # a list of all preferences for the course
            instructors = scheduler.getInstructorsWithCoursePref(section_course_id)

            if not instructors:
                # There are no professors with a preference for this course
                # Assign section to instructor from instructors who have no preferance or have already met their preference
                available_instructor = scheduler.getNextAvailableInstructor()
                section.setInstructorByID(available_instructor)

                # Change to assigned_Instructor for the time assignment
                assigned_instructor = available_instructor
            else:
                # There exists professor(s) with a preference for this course
                # Assign Instructor from Instructors who do have preference for the specific course - based on priority
                selected_instructor = scheduler.getNextSelectedInstructor(instructors)
                section.setInstructorByID(selected_instructor)

                # Update preferences
                scheduler.updateCoursePreferences(section_course_id, selected_instructor)

                # Change to assigned_Instructor for the time assignment
                assigned_instructor = selected_instructor

            # AT THIS POINT, THE SECTION HAS BEEN ASSIGNED AN INSTRUCTOR

            # Check if Instructor has any time preferences - Create order periods array based on period preferences
            period_preferences = section.getPeriodPreferences()
            order_periods = scheduler.createOrderPeriods(period_preferences, assigned_instructor)
            
            # Assigning section to period and section to a room
            if order_periods:
                # Instructor has free time - assign section to a period that is available to the instructor
                section.setPeriodByID(order_periods[0])  
                scheduler.updateInstructorAvailability(order_periods[0], assigned_instructor)
    
                for period in order_periods:
                    # get available rooms for period
                    available_rooms = scheduler.findRoomAvailability(period)
                    if available_rooms:
                        # set room to a room that is available during that period
                        section.setRoomByID(available_rooms[0])

                        # Update enrollment numbers
                        scheduler.updateCourseEnrollment(section_course_id, available_rooms[0])
                        scheduler.updateRoomAvailability(period, available_rooms[0])
                        break
                    
            # Some printing for testing
            section.printInfo()
            print("\n")

            # Commit changes to database
            db.session.commit()

            # If all courses are fulfilled - end loop
            if scheduler.checkCoursesFulfillment() == True:
                break

        scheduler.instructors_with_no_preferences = []


    scheduler.sections = Section.query.all()
    print(scheduler.sections)

    print("TEST OF JSON OUTPUT BELOW")

    formatForOutput(scheduler)

    #print(Course.query.all())
    #print(Instructor.query.all())



