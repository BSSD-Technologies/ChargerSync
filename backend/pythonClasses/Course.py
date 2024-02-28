from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db
import pandas as pd

class Course(db.Model):
    __tablename__ = 'course'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    max_enrollment = db.Column(db.Integer, nullable=False)
    preliminary_enrollment = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<Course %r>' % self.name
    
    def sectionCount(self):
        return Section.query.filter_by(course_id=self.id).count()

class Section(db.Model):
    __tablename__ = 'section'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('instructor.id'), default='None')
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), default='None')
    period_id = db.Column(db.Integer, db.ForeignKey('period.id'), default='None')

    # one to many relationship w/ Course
    course = db.relationship('Course', backref='sections', lazy=True)

    # one to one relationship w/ Room
    room = db.relationship('Room', uselist=False, backref='section', lazy=True)

    # one to one relationship w/ Period
    period = db.relationship('Period', uselist=False, backref='section', lazy=True)

    def __repr__(self):
        return '<Section %r>' % self.name
    


def load_course_data(csv_file):
    """
    Load course data from a CSV file.

    Args:
    - csv_file (str): Path to the CSV file containing course data.

    Returns:
    - Tuple: A tuple containing three lists: course IDs, max enrollments, preliminary enrollments.
    """
    courseList = pd.read_csv(csv_file, dtype={0: 'string', 1: 'int', 2: 'int'})
    ID = courseList['Course ID'].tolist()
    Max = courseList['Max Enrollment'].tolist()
    Prelim = courseList['Preliminary Enrollment'].tolist()

    return ID, Max, Prelim