from flask import Flask
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from datetime import time
import uuid
from sqlalchemy import or_, and_

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
    ("t1m","8:00AM","9:00AM"),
    ("t2m","9:00AM","10:00AM"),
    ("t3m","10:00AM","11:00AM"),
    ("t4m","11:00AM","12:00PM"),
    ("t5m","1:00PM","2:00PM"),
]

tr_times = [
    # Start time, End time
    ("t1t","8:00AM","9:00AM"),
    ("t2t","9:00AM","10:00AM"),
    ("t3t","10:00AM","11:00AM"),
    ("t4t","11:00AM","12:00PM"),
    ("t5t","1:00PM","2:00PM"),
]

instructor_list = [
    # First name, Last name, priorty
    ('p1','Beth', 'Allen', 5),
    ('p2','Dan', 'Schrimpcher', 3),
    ('p3','Robert', 'Preston', 2),
    ('p4','Curt', 'Lawson', 1),
    ('p5', 'Danny','Hardin',6)
]

room_list = [
    # Name, Occupancy
    ('r1','OKT 200', 100),
    ('r2','OKT 307', 70),
    ('r3','OKT 155', 10),
    ('r4','OKT 157', 10),
    ('r5','LIB 201', 50),
]

course_list = [
    # Course name, max, preliminary
    ('c1','CS 101', 200, 100),
    ('c2','CS 221', 100, 0), 
    ('c3','CS 453', 20, 50),
    ('c4','CS 200', 90, 0),
    ('c5','CS 390', 90, 25),
]

course_preference_list = [
    # fname, lname, preference in array
    ('p1','Beth', 'Allen', ['CS 101', 'CS 221']),
    ('p2','Robert', 'Preston', ['CS 390']),
    ('p4','Curt', 'Lawson', ['CS 101']),
]

period_preference_list = [
    # fname, lname, preference in array
    ('p1','Beth', 'Allen', ['t1m', 't2t', 't3m']),
    ('p2','Robert', 'Preston', ['t4m', 't5m']),
]


def loadData():
    # Create Periods
    for id, start, end in mw_times:
        period = Period(id=id, start_time=start, end_time=end, day='MW')
        db.session.add(period)
    #db.session.commit()

    for id, start, end in tr_times:
        period = Period(id=id, start_time=start, end_time=end, day='TR')
        db.session.add(period)
    #db.session.commit()

    # Add Instructors
    for id, first_name, last_name, priority in instructor_list:
        new_instructor = Instructor(id=id, fname=first_name, lname=last_name, priority=priority)
        db.session.add(new_instructor)
    #db.session.commit()

    # Add Rooms
    for id, name, occupancy in room_list:
        new_room = Room(id=id, name=name, max_occupancy=occupancy)
        db.session.add(new_room)
    #db.session.commit()

    # Add Courses
    for id, course, max, pre in course_list:
        course_div = course.split()
        new_course = Course(id=id, name=course, department=course_div[0], num=course_div[1], max_enrollment=max, preliminary_enrollment=pre)
        db.session.add(new_course)
    #db.session.commit()

    # Add Preferences
    for id, fname, lname, preferences in course_preference_list:
        instructor = Instructor.query.filter_by(id=id, fname=fname, lname=lname).first()
        if instructor:
            for preference in preferences:
                course = Course.query.filter_by(name=preference).first()
                if course:
                    instructor.addCoursePreference(course.id)
                else:
                    print(f"Course {preference} does not exist.")
        else:
            print(f"Instructor {fname} {lname} not found.")


    for id, fname, lname, preferences in period_preference_list:
        instructor = Instructor.query.filter_by(id=id, fname=fname, lname=lname).first()
        if instructor:
            for preference in preferences:
                period = Period.query.get(preference)
                if period:
                    instructor.addPeriodPreference(period.id)
                else:
                    print(f"Period with ID {preference} does not exist.")
        else:
            print(f"Instructor {fname} {lname} not found.")

