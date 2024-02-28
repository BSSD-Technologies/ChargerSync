#! /usr/bin/env python3
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


class Instructor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=True, nullable=False)

    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    course = db.relationship('Course',backref=db.backref('instructors', lazy=True))

    def __repr__(self):
        return '<Instructor %r>' % self.name

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)

    def __repr__(self):
        return '<Course %r>' % self.name
    
    
with app.app_context():
    # Now you can perform database operations
    db.create_all()

    existing_course_names = {course.name for course in Course.query.all()} # This prevents Integrity Errors!
    existing_instructor_names = {Instructor.name for instructor in Instructor.query.all()} # This prevents Integrity Errors!

    courses_to_add = [
        Course(name='CS121'),
        Course(name='CS453')
    ]
    
    for course in courses_to_add:
        if course.name not in existing_course_names:
            db.session.add(course)
            
    db.session.commit()

    courseToAssign = Course.query.filter_by(name='CS121').first()

    instructor_name = 'Susan'
    existing_instructor = Instructor.query.filter_by(name=instructor_name).first()
    if not existing_instructor:
        instructor = Instructor(name=instructor_name, course=courseToAssign)
        db.session.add(instructor)
        db.session.commit()
    
    
    print(Course.query.all())
    print(Instructor.query.all())

    existing_instructor_assigned_course = existing_instructor.course if existing_instructor else None
    print("Susan's Assigned Course:", existing_instructor_assigned_course)



