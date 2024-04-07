from flask import Flask
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from datetime import time

def buildDatabase(db):
    db.drop_all()
    db.create_all()
    loadData()

def buildApp():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    db.init_app(app)
    return app


# Define times for MW and TR
mw_times = [
    # Start time, End time
    (time(hour=8), time(hour=9)),
    (time(hour=9), time(hour=10)),
    (time(hour=10), time(hour=11)),
    (time(hour=11), time(hour=12)),
    (time(hour=13), time(hour=14))
]

tr_times = [
    # Start time, End time
    (time(hour=8), time(hour=9)),
    (time(hour=9), time(hour=10)),
    (time(hour=10), time(hour=11)),
    (time(hour=11), time(hour=12)),
    (time(hour=13), time(hour=14))
]

instructor_list = [
    # First name, Last name, priorty
    ('Beth', 'Allen', 5),
    ('Dan', 'Schrimpcher', 3),
    ('Robert', 'Preston', 2),
]

room_list = [
    # Name, Occupancy
    ('OKT 200', 100),
    ('OKT 307', 70),
    ('OKT 155', 10),
    ('OKT 157', 10),
    ('LIB 201', 50),
]

course_list = [
    # Course name, max, preliminary
    ('CS 101', 200, 100),
    ('CS 221', 100, 0), 
    ('CS 453', 20, 50),
    ('CS 200', 90, 0),
    ('CS 390', 90, 25),
]

course_preference_list = [
    # fname, lname, preference in array
    ('Beth', 'Allen', ['CS 101', 'CS 221']),
    ('Robert', 'Preston', ['CS 390']),
]

period_preference_list = [
    # fname, lname, preference in array
    ('Beth', 'Allen', [1, 2, 3]),
    ('Robert', 'Preston', [4, 5]),
]

def loadData():
    # Create Periods
    for start, end in mw_times:
        period = Period(start_time=start, end_time=end, day='MW')
        db.session.add(period)
    #db.session.commit()

    for start, end in tr_times:
        period = Period(start_time=start, end_time=end, day='TR')
        db.session.add(period)
    #db.session.commit()

    # Add Instructors
    for first_name, last_name, priority in instructor_list:
        new_instructor = Instructor(fname=first_name, lname=last_name, priority=priority)
        db.session.add(new_instructor)
    #db.session.commit()

    # Add Rooms
    for name, occupancy in room_list:
        new_room = Room(name=name, max_occupancy=occupancy)
        db.session.add(new_room)
    #db.session.commit()

    # Add Courses
    for course, max, pre in course_list:
        course_div = course.split()
        new_course = Course(name=course, department=course_div[0], num=course_div[1], max_enrollment=max, preliminary_enrollment=pre)
        db.session.add(new_course)
    #db.session.commit()

    # Add Preferences
    for fname, lname, preferences in course_preference_list:
        instructor = Instructor.query.filter_by(fname=fname, lname=lname).first()
        if instructor:
            for preference in preferences:
                course = Course.query.filter_by(name=preference).first()
                if course:
                    instructor.addCoursePreference(course.id)
                else:
                    print(f"Course {preference} does not exist.")
        else:
            print(f"Instructor {fname} {lname} not found.")


    for fname, lname, preferences in period_preference_list:
        instructor = Instructor.query.filter_by(fname=fname, lname=lname).first()
        if instructor:
            for preference in preferences:
                period = Period.query.get(preference)
                if period:
                    instructor.addPeriodPreference(period.id)
                else:
                    print(f"Period with ID {preference} does not exist.")
        else:
            print(f"Instructor {fname} {lname} not found.")


