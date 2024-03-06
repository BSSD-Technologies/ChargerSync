from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference
import DataGenerator
import Algorithm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():

    # Prepping the database
    db.drop_all()
    db.create_all()
    DataGenerator.loadData()

    # Instructors
    instructors_with_no_preferences = Algorithm.getInstructorsWithNoPref()
    instructors_with_no_preferences_pos = 0

    # Courses
    courses_and_enrollment = Algorithm.getCoursesAndEnrollment()

    # Classrooms and Times
    classroom_availability = Algorithm.getClassroomsAndAvailability()
    current_section_no = 1
    sections = []

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
            
            # Change to assigned_professor for the time assignment
            assigned_instructor = available_instructor
        else:
            # Assign professor from professors who do have preference for the specific course - based on priority
            course_for_section = Course.query.filter_by(id=course_for_section).first()
            selected_instructor = course_for_section.getInstructorWithPriority()
            section.setInstructor(selected_instructor)

            # Update instructor preferences
            pref = selected_instructor.findCoursePreference(course_for_section.id)
            pref.prefFulfilled()

            # Change to assigned_professor for the time assignment
            assigned_instructor = selected_instructor


        print(assigned_instructor)
        print(section)

        # Check if professor has any time preferences
        assigned_instructor_id = assigned_instructor.id
        period_preferences = assigned_instructor.getPeriodPreferences()

        order_periods = []

        # order check_periods_room based on whether instructor has preference or not
        if period_preferences:
            for period_pref in period_preferences:
                order_periods.append(period_pref.period_id)   
            for period in classroom_availability:
                if period[0] not in order_periods:
                    order_periods.append(period_pref.period_id)
        else:
            # Professor has no preference - this could be used to change the order of which periods are checked first/last
            for period in classroom_availability:
                if period[0] not in order_periods:
                    order_periods.append(period_pref.period_id)
        
        for period in order_periods:
            period_room_availabilty = Algorithm.findClassroomAvailability(classroom_availability, period)
            for room in period_room_availabilty:
                    if room != None:
                        print("instructor will be assigned room", room, " during ", period) # all room one because nothing is implemented
                        # ROOM IS AVAILABLE
                        section.setRoomByID(room)
                        Algorithm.updateRoomAvailability(classroom_availability, period, room)
                        break
            section.setPeriodByID(period)
            break


            
                 
        print("\n")

    sections = Section.query.all()
    #print(sections)

    #print(Course.query.all())
    #print(Instructor.query.all())


'''
    for period in classroom_availability:
                if period[0] not in check_periods_rooms:
                    check_periods_rooms.append(period_pref.period_id)
                for room in rooms_at_period:
                    if room != None:
                        print("instructor will be assigned any room, room:" + str(room)) # all room one because nothing is implemented
                        # ROOM IS AVAILABLE
                        # assign section to room
                        # adjust courses_and_enrollment
                        # assign section to time
                        # make room unavailable (set to None)
                        # break
                        pass
                    break
                break
                '''


