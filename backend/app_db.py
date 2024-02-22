from flask import Flask
from extensions import db
from Course import Section, Course
from Instructor import Instructor

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():
    db.drop_all()
    db.create_all()

    instructor1 = Instructor(name='John Doe', max_enrollment=30, preliminary_enrollment=10)
    db.session.add(instructor1)
    db.session.commit()

    retrieved_instructor = Instructor.query.filter_by(name='John Doe').first()

    course = Course(name='CS101')
    db.session.add(course)
    db.session.commit()

    section = Section(name='CS101-1', instructor_id=instructor1.id, course_id=course.id)
    section2 = Section(name='CS101-2', instructor_id=instructor1.id, course_id=course.id)
    db.session.add(section)
    db.session.add(section2)
    db.session.commit()

    print(Section.query.all())
    print(Course.query.all())
    print(Instructor.query.all())
    print("John's Assigned Sections:", retrieved_instructor.sections)


"""
    # Maintains a list of course and instructor names to be checked
    existing_section_names = {section.name for section in Section.query.all()} # This prevents Integrity Errors!
    existing_instructor_names = {instructor.name for instructor in Instructor.query.all()} # This prevents Integrity Errors!

    # List of course objects to add to database
    sections_to_add = [
        Section(name='CS121'),
        Section(name='CS453')
    ]

    # For each course in courses to add, add course name if there is not already a course name
    # We need to do this only because I listed name as "unique"
    for section in sections_to_add:
        if section.name not in existing_section_names:
            db.session.add(section)
            
    db.session.commit()

    sectionToAssign = Section.query.filter_by(name='CS121').first()

    # Another way to check for uniqueness
    existing_instructor = Instructor.query.filter_by(name='Susan').first()
    if not existing_instructor:
        # Creating a new instructor
        instructor = Instructor(name='Susan', sections=sectionToAssign)

        # adding to database
        db.session.add(instructor)
        db.session.commit()
    
    # Printing
    print(Section.query.all())
    print(Instructor.query.all())

    existing_instructor_assigned_section = existing_instructor.sections if existing_instructor else None
    print("Susan's Assigned Course:", existing_instructor_assigned_section)
    """