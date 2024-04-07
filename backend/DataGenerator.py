from extensions import db

from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from datetime import time

# Define times for MW and TR
mw_times = [
    # Start time, End time
    #(time(hour=8), time(hour=9)),
    #(time(hour=9), time(hour=10)),
    ("10:00PM","11:00PM"),
    ("11:00PM","12:00PM"),
    ("12:00PM","1:00PM")
]

tr_times = [
    # Start time, End time
    #(time(hour=8), time(hour=9)),
    #(time(hour=9), time(hour=10)),
    ("10:00PM","11:00PM"),
    ("11:00PM","12:00PM"),
    ("12:00PM","1:00PM")
]

instructor_list = [
    # First name, Last name, priorty
    ('Beth', 'Allen', 5),
    ('Dan', 'Schrimpcher', 3),
    ('Robert', 'Preston', 2),
    ('John', 'Doe', 1),
    #('Super', 'Man', 6),
    #('Danny', 'Hardin', 7),
    #('Jake', 'Doe', 8),
    #('Bat', 'Man', 9),
    #('Elizabeth', 'Hardin', 10),
]

room_list = [
    # Name, Occupancy
    ('OKT 200', 2),
    #('OKT 307', 50),
    #('OKT 155', 10),
    #('LIB 201', 20),
    #('OKT 105', 100),
    #('OKT 201', 120),
    #('OKT 308', 20),
    #('OKT 156', 20),
    #('OKT 158', 65),
    #('LIB 202', 60),
    #('OKT 106', 100),
    #('OKT 202', 10),
    #('OKT 309', 70),
    #('OKT 159', 121),
    #('LIB 204', 66),
    #('OKT 108', 100),
]

course_list = [
    # Course name, max, preliminary
    ('CS 101', 100, 100),
    ('CS 221', 100, 0),
    # ('CS 453', 200, 50),
    # ('CS 200', 200, 0),
    # ('CS 390', 150, 25),
    # ('CS 317', 150, 0),
    # ('CS 102', 200, 100),
    # ('CS 222', 100, 0),
    #('CS 454', 150, 50),
]

course_preference_list = [
    # fname, lname, preference in array
    ('Beth', 'Allen', ['CS 101', 'CS 221']),
    ('Robert', 'Preston', ['CS 390']),
    ('Super', 'Man', ['CS 200']),
    ('Danny', 'Hardin', ['CS 317', 'CS 101']),
]

period_preference_list = [
    # fname, lname, preference in array
    ('Beth', 'Allen', [1, 2, 3]),
    ('Robert', 'Preston', [4, 5]),
    ('Super', 'Man', [8, 9]),
    ('John', 'Doe', [6, 8]),
    ('Bat', 'Man', [4]),
]

def loadData():
    # Create Periods
    for start, end in mw_times:
        period = Period(start_time=start, end_time=end, day='MW')
        db.session.add(period)
    db.session.commit()

    for start, end in tr_times:
        period = Period(start_time=start, end_time=end, day='TR')
        db.session.add(period)
    db.session.commit()

    # Add Instructors
    for first_name, last_name, priority in instructor_list:
        new_instructor = Instructor(fname=first_name, lname=last_name, priority=priority)
        db.session.add(new_instructor)
    db.session.commit()

    # Add Rooms
    for name, occupancy in room_list:
        new_room = Room(name=name, max_occupancy=occupancy)
        db.session.add(new_room)
    db.session.commit()

    # Add Courses
    for course, max, pre in course_list:
        course_div = course.split()
        new_course = Course(name=course, department=course_div[0], num=course_div[1], max_enrollment=max, preliminary_enrollment=pre)
        db.session.add(new_course)
    db.session.commit()

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


