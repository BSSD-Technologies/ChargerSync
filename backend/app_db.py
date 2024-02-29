from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# Define times for MW and TR
mw_times = [
    (time(hour=8), time(hour=9)),
    (time(hour=9), time(hour=10)),
    (time(hour=10), time(hour=11)),
    (time(hour=11), time(hour=12)),
    (time(hour=12), time(hour=13))
]

tr_times = [
    (time(hour=13), time(hour=14)),
    (time(hour=14), time(hour=15)),
    (time(hour=15), time(hour=16)),
    (time(hour=16), time(hour=17)),
    (time(hour=17), time(hour=18))
]

# need to perform database operations within app_context
with app.app_context():
    db.drop_all()
    db.create_all()

    # Create instructors
    instructor1 = Instructor(fname='John', lname = 'Doe')
    db.session.add(instructor1)
    db.session.commit()

    instructor2 = Instructor(fname='Jose', lname = 'Moe')
    db.session.add(instructor2)
    db.session.commit()

    # Demonstrating how to query instructors
    retrieved_instructor = Instructor.query.filter_by(fname='John').first()

    # Create Courses
    course = Course(name='CS101', max_enrollment=30, preliminary_enrollment=10)
    db.session.add(course)
    db.session.commit()

    course2 = Course(name='CS488', max_enrollment=50)
    db.session.add(course2)
    db.session.commit()

    course3 = Course(name='CS121', max_enrollment=10)
    db.session.add(course3)
    db.session.commit()

    # Demonstrating newSection function
    for i in range(5):
        new_section = course3.newSection()
        db.session.add(new_section)
    db.session.commit()

    # making some periods
    def create_periods(day, times):
        for start, end in times:
            period = Period(start_time=start, end_time=end, day=day)
            db.session.add(period)
        db.session.commit()

    # Create periods for MW and TR
    create_periods('MW', mw_times)
    create_periods('TR', tr_times)

    # Messing with Preferences
    instructor1.addCoursePreference(course.id)
    instructor2.addCoursePreference(course2.id)

    # Create Rooms
    room = Room(name='OKT357')
    db.session.add(room)
    db.session.commit()

    room2 = Room(name='OKT155')
    db.session.add(room2)
    db.session.commit()

    # Making sections
    section_101 = course.newSection()
    section_101.setInstructor(instructor1)

    section2_101 = course.newSection()
    section_488 = course2.newSection()
    section2_488 = course2.newSection()
    db.session.add(section_101)
    db.session.add(section2_101)
    db.session.add(section_488)
    db.session.add(section2_488)
    db.session.commit()

    # A bunch of print statements for testing :)
    print(Section.query.all())
    print(Course.query.all())
    print(Instructor.query.all())
    print("Number of Sections for Course CS101:", course.sectionCount())
    print("Number of Sections for Course CS488:", course2.sectionCount())
    print("John's Assigned Sections:", retrieved_instructor.sections)
    print("Jose's Assigned Sections:", instructor2.sections)
    print("CS101-1 Classroom:", section_101.room)
    print("CS101-2 Classroom:", section2_101.room)
    print("CS488-1 Classroom:", section_488.room)
    print("CS488-2 Classroom:", section2_488.room)
    instructor1.printPreferences()

    def print_all_periods():
        periods = Period.query.all()
        for period in periods:
            print(f"ID: {period.id}, Day: {period.day}, Start Time: {period.start_time.strftime('%I:%M %p')}, End Time: {period.end_time.strftime('%I:%M %p')}")
    
    print_all_periods()

