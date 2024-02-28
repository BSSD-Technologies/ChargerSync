#! /usr/bin/env python3
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import sqlalchemy as magic
from datetime import time
import sys, os
sys.path.extend([f'{item[0]}' for item in os.walk(".") if os.path.isdir(item[0])])



from extensions import db
from Instructor import Instructor, load_prof_data
from Room import Room
from Course import Section, Course, load_course_data
from Period import Period

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)



course_CSV_File = "./dummyData/CourseListTemplate.csv"
course_ID, course_Max, course_Prelim = load_course_data(course_CSV_File)

professor_CSV_File = "./dummyData/InstructorListTemplate.csv"
prof_Fname, prof_Lname, prof_Prio = load_prof_data(professor_CSV_File)


room_CSV_File = "./dummyData/RoomListTemplate.csv"
time_CSV_File = "./dummyData/TimeBlockTemplate.csv"



# need to perform database operations within app_context
with app.app_context():
    db.drop_all()
    db.create_all()

    # Create instructors
    instructor1 = Instructor(name='John Doe')
    db.session.add(instructor1)
    db.session.commit()

    for i in range(len(prof_Fname)):
        professor = Instructor(prof_Fname = prof_Fname)



    # Demonstrating how to query instructors
    retrieved_instructor = Instructor.query.filter_by(name='John Doe').first()

    # Create Courses

    for i in range(len(course_ID)):
        course = Course(name=course_ID[i], max_enrollment=course_Max[i], preliminary_enrollment=course_Prelim[i])
        print(f"{course_ID[i]} \t {course_Max[i]} \t {course_Prelim[i]}")
        
        db.session.add(course)

    db.session.commit()

    # Create Rooms
    room = Room(name='OKT357')
    db.session.add(room)
    db.session.commit()

    room2 = Room(name='OKT155')
    db.session.add(room2)
    db.session.commit()

    # # Making sections
    # section_101 = Section(name='CS101-1', instructor_id=instructor1.id, course_id=course.id, room_id=room.id)
    # section2_101 = Section(name='CS101-2', instructor_id=instructor1.id, course_id=course.id)
    # section_488 = Section(name='CS488-1', course_id=course2.id, room_id=room2.id)
    # section2_488 = Section(name='CS488-2', instructor_id=instructor2.id, course_id=course2.id)
    # db.session.add(section_101)
    # db.session.add(section2_101)
    # db.session.add(section_488)
    # db.session.add(section2_488)
    # db.session.commit()

    # #A bunch of print statements for testing :)
    # print(Section.query.all())
    print(Course.query.all())
    print(Instructor.query.all())
    # print("Number of Sections for Course CS101:", course.sectionCount())
    # print("Number of Sections for Course CS488:", course2.sectionCount())
    # print("John's Assigned Sections:", retrieved_instructor.sections)
    # print("Jose's Assigned Sections:", instructor2.sections)
    # print("CS101-1 Classroom:", section_101.room)
    # print("CS101-2 Classroom:", section2_101.room)
    # print("CS488-1 Classroom:", section_488.room)
    # print("CS488-2 Classroom:", section2_488.room)