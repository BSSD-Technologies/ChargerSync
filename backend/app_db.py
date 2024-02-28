from flask import Flask
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

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
    section_101 = Section(name='CS101-1', instructor_id=instructor1.id, course_id=course.id, room_id=room.id)
    section2_101 = Section(name='CS101-2', instructor_id=instructor1.id, course_id=course.id)
    section_488 = Section(name='CS488-1', course_id=course2.id, room_id=room2.id)
    section2_488 = Section(name='CS488-2', instructor_id=instructor2.id, course_id=course2.id)
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
