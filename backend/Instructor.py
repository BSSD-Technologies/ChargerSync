from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db
from Preferences import CoursePreference, PeriodPreference

class Instructor(db.Model):
    __tablename__ = 'instructor'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(256), nullable=False)
    lname = db.Column(db.String(256), nullable=False)
    
    # one to many relationship with sections
    sections = db.relationship('Section', backref='instructor', lazy=True)

    # one to many relationship with course preferences
    course_preferences = db.relationship('CoursePreference', backref='instructor', lazy=True)

    # one to many relationship with time preferences
    period_preferences = db.relationship('PeriodPreference', backref='instructor', lazy=True)

    def __repr__(self):
        return '<Instructor %r %r >' % (self.fname, self.lname)
    
    def addCoursePreference(self, course_id):
        new_preference = CoursePreference(instructor_id=self.id, course_id=course_id)
        db.session.add(new_preference)
        db.session.commit()
    