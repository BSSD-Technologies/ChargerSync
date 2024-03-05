from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference
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

    current_section_no = 1
    sections = []

    for course in courses:
        if course[2] == 0:
            queried_course = Course.query.filter_by(id=course[0]).first()
            new_section = queried_course.newSection()
            db.session.add(new_section)
            sections.append(new_section)
    db.session.commit()

    for section in sections:
        course_for_section = section.course_id
        course_preferences = CoursePreference.query.filter((CoursePreference.course_id == course_for_section) and (CoursePreference.fulfilled == 0)).all()
        if not course_preferences:
            available_instructor = instructors_with_no_preferences[instructors_with_no_preferences_pos]
            section.setInstructor(available_instructor)
            print(available_instructor)
            print(section)
            instructors_with_no_preferences_pos = (instructors_with_no_preferences_pos + 1) % len(instructors_with_no_preferences)
        else:
            course_for_section = Course.query.filter_by(id=course_for_section).first()
            selected_instructor = course_for_section.getInstructorWithPriority()
            print(selected_instructor)
            print(section)
            section.setInstructor(selected_instructor[0])


            


    sections = Section.query.all()
    #print(sections)

    #print(Course.query.all())
    #print(Instructor.query.all())


