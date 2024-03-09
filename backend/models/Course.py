from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db
from models.Preferences import CoursePreference

class Course(db.Model):
    __tablename__ = 'course'

    id = db.Column(db.Integer, primary_key=True) # To be converted to UUID once api is complete
    name = db.Column(db.String(255), nullable=False) # TODO Split to department and course number
    max_enrollment = db.Column(db.Integer, nullable=False)
    preliminary_enrollment = db.Column(db.Integer, default=0)


    def __repr__(self):
        return '<Course %r>' % self.name
    
    def sectionCount(self):
        return Section.query.filter_by(course_id=self.id).count()  

    def newSection(self):
        new_number = self.sectionCount() + 1
        new_name = self.name + "-" + str(new_number)
        new_section = Section(name=new_name, course_id=self.id, section_no=new_number)
        db.session.add(new_section)
        db.session.commit()
        return new_section
    
    def newSectionFromId(course_id):
        new_section = Course.query.filter_by(id=course_id).first()
        new_section = new_section.newSection()
        db.session.add(new_section)
        db.session.commit()
        return new_section
    

    def getInstructorWithPriority(self):
        course_preferences = CoursePreference.query.filter((CoursePreference.course_id == self.id),(CoursePreference.fulfilled == 0)).all()
        arr_instructors = []
        for pref in course_preferences:
            instructor = pref.instructor
            instructor_priority = instructor.priority
            tuple_item = (instructor, instructor_priority)
            arr_instructors.append(tuple_item)
        sorted_array = sorted(arr_instructors, key=lambda x: x[1])
        # Highest priority professor is returned
        return sorted_array[0][0]


class Section(db.Model):
    __tablename__ = 'section'

    id = db.Column(db.Integer, primary_key=True) # To be converted to UUID once api is complete
    name = db.Column(db.String(255), nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('instructor.id'), default=None)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), default=None)
    period_id = db.Column(db.Integer, db.ForeignKey('period.id'), default=None)
    section_no = db.Column(db.Integer, nullable=False)

    # one to many relationship w/ Course
    course = db.relationship('Course', backref='sections', lazy=True)

    # one to one relationship w/ Room
    room = db.relationship('Room', uselist=False, backref='section', lazy=True)

    # one to one relationship w/ Period
    period = db.relationship('Period', uselist=False, backref='section', lazy=True)

    def __repr__(self):
        return '<Section %r>' % self.name
    
    def setInstructor(self, instructor):
        self.instructor_id = instructor.id

    def setRoom(self, room):
        self.room_id = room.id

    def setPeriod(self, period):
        self.period_id = period.id     

    def setRoomByID(self, room_id):
        self.room_id = room_id

    def setPeriodByID(self, period_id):
        self.period_id = period_id  

    def setInstructorByID(self, instructor_id):
        self.instructor_id = instructor_id

    
    



