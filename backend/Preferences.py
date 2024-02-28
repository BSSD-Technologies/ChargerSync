from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db

class CoursePreference(db.Model):
    __tablename__ = 'course_preference'

    id = db.Column(db.Integer, primary_key=True)
    instructor_id = db.Column(db.Integer, db.ForeignKey('instructor.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    def __repr__(self):
        return '<Instructor %r, Course Preference %r >' % (self.instructor_id, self.course_id)
    
class PeriodPreference(db.Model):
    __tablename__ = 'time_preference'

    id = db.Column(db.Integer, primary_key=True)
    instructor_id = db.Column(db.Integer, db.ForeignKey('instructor.id'), nullable=False)
    period_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    def __repr__(self):
        return '<Instructor %r, Period Preference %r >' % (self.instructor_id, self.period_id)

    
    