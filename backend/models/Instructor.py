from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db
from models.Preferences import CoursePreference, PeriodPreference
from models.Course import Course, Section
from models.Period import Period

class Instructor(db.Model):
    __tablename__ = 'instructor'

    id = db.Column(db.Integer, primary_key=True) # To be converted to UUID once api is complete
    fname = db.Column(db.String(256), nullable=False)
    lname = db.Column(db.String(256), nullable=False)
    priority = db.Column(db.Integer, default='None')
    
    # one to many relationship with sections
    sections = db.relationship('Section', backref='instructor', lazy=True)

    # one to many relationship with course preferences
    course_preferences = db.relationship('CoursePreference', backref='instructor', lazy=True)

    # one to many relationship with time preferences
    period_preferences = db.relationship('PeriodPreference', backref='instructor', lazy=True)

    def __repr__(self):
        return '<Instructor %r %r >' % (self.fname, self.lname)
    
    def countAssignedSections(self):
        return Section.query.filter_by(instructor_id=self.id).count() 
    
    def printPreferences(self):
        print(f"Professor {self.fname} {self.lname} Preferences:")
        print("Course Preferences:")
        for preference in self.course_preferences:
            course = Course.query.get(preference.course_id)
            print(f"- Course ID: {course.name}")
        print("Period Preferences:")
        for preference in self.period_preferences:
            period = Period.query.get(preference.course_id)
            print(f"ID: {period.id}, Day: {period.day}, Start Time: {period.start_time.strftime('%I:%M %p')}, End Time: {period.end_time.strftime('%I:%M %p')}")
    
    def addCoursePreference(self, course_id):
        new_preference = CoursePreference(instructor_id=self.id, course_id=course_id)
        db.session.add(new_preference)
        db.session.commit()

    def addPeriodPreference(self, period_id):
        new_preference = PeriodPreference(instructor_id=self.id, period_id=period_id)
        db.session.add(new_preference)
        db.session.commit()

    def getCoursePreferences(self):
        return CoursePreference.query.filter_by(instructor_id=self.id).all()
    
    def getPeriodPreferences(self):
        return PeriodPreference.query.filter_by(instructor_id=self.id).all()

    