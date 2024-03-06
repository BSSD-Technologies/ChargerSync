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
    courses = Algorithm.getCoursesAndEnrollment()

    # Classrooms and Times
    classroom_availability = Algorithm.getClassroomsAndAvailability()
    current_section_no = 1
    sections = []

    # Creates section list of sections to be assigned
    for course in courses:
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
            # Assign professor from professors who have no preferance
            available_instructor = instructors_with_no_preferences[instructors_with_no_preferences_pos]
            section.setInstructor(available_instructor)

            instructors_with_no_preferences_pos = (instructors_with_no_preferences_pos + 1) % len(instructors_with_no_preferences)
            
            # Change to assigned_professor for the time assignment
            assigned_instructor = available_instructor
        else:
            # Assign professor from professors who do have preference for specific course based on priority
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

        # check each of instructor's time preference for open classrooms
        if period_preferences:
            for period_pref in period_preferences:
                period_id = period_pref.period_id
                rooms_at_period = Algorithm.findClassroomAvailability(classroom_availability, period_id)
                for room in rooms_at_period:
                    if room != None:
                        print("instructor is assigned a room based on preference, room:" + str(room))
                        # ROOM IS AVAILABLE
                        # assign section to room
                        # assign section to time
                        # make room unavailable (set to None)
                    break
                break
            # No room available - giving instructor time period with no room:
            pass
        else:
            # Professor has no preference
            for period in classroom_availability:
                period_id = classroom_availability[0]
                for room in rooms_at_period:
                    if room != None:
                        print("instructor is assigned any room, room:" + str(room))
                        # ROOM IS AVAILABLE
                        # assign section to room
                        # assign section to time
                        # make room unavailable (set to None)
                        # break
                        pass
                    break
                break
                



            


    sections = Section.query.all()
    #print(sections)

    #print(Course.query.all())
    #print(Instructor.query.all())


