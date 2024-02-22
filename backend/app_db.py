from flask import Flask
from extensions import db
from Course import Course
from Instructor import Instructor

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():
    db.create_all()

    # Maintains a list of course and instructor names to be checked
    existing_course_names = {course.name for course in Course.query.all()} # This prevents Integrity Errors!
    existing_instructor_names = {instructor.name for instructor in Instructor.query.all()} # This prevents Integrity Errors!

    # List of course objects to add to database
    courses_to_add = [
        Course(name='CS121'),
        Course(name='CS453')
    ]

    # For each course in courses to add, add course name if there is not already a course name
    # We need to do this only because I listed name as "unique"
    for course in courses_to_add:
        if course.name not in existing_course_names:
            db.session.add(course)
            
    db.session.commit()

    courseToAssign = Course.query.filter_by(name='CS121').first()

    # Another way to check for uniqueness
    existing_instructor = Instructor.query.filter_by(name='Susan').first()
    if not existing_instructor:
        # Creating a new instructor
        instructor = Instructor(name='Susan', course=courseToAssign)

        # adding to database
        db.session.add(instructor)
        db.session.commit()
    
    # Printing
    print(Course.query.all())
    print(Instructor.query.all())

    existing_instructor_assigned_course = existing_instructor.course if existing_instructor else None
    print("Susan's Assigned Course:", existing_instructor_assigned_course)