from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db
from models.Preferences import CoursePreference

class Course(db.Model):
    __tablename__ = 'course'

    id = db.Column(db.String(255), primary_key=True) # To be converted to UUID once api is complete
    name = db.Column(db.String(255)) # TODO Split to department and course number
    department = db.Column(db.String(255), nullable=False) 
    num = db.Column(db.String(255), nullable=False)
    max_enrollment = db.Column(db.Integer, nullable=False)
    preliminary_enrollment = db.Column(db.Integer, default=0)

    preferences = db.relationship('CoursePreference', backref='Instructor', lazy=True)

    def __repr__(self):
        return '<Course %r>' % self.name
    
    def sectionCount(self):
        return Section.query.filter_by(course_id=self.id).count()  

    def newSection(self):
        new_number = self.sectionCount() + 1
        new_name = self.department + self.num + "-" + str(new_number)
        new_section = Section(name=new_name, department=self.department, num=self.num, course_id=self.id, section_no=new_number)
        db.session.add(new_section)
        db.session.commit()
        return new_section
    
    def newSectionFromId(course_id):
        new_section = Course.query.filter_by(id=course_id).first()
        new_section = new_section.newSection()
        db.session.add(new_section)
        db.session.commit()
        return new_section


class Section(db.Model):
    __tablename__ = 'section'

    id = db.Column(db.Integer, primary_key=True) # To be converted to UUID once api is complete
    name = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(255), nullable=False) 
    num = db.Column(db.String(255), nullable=False)
    instructor_id = db.Column(db.String(255), db.ForeignKey('instructor.id'), default=None)
    course_id = db.Column(db.String(255), db.ForeignKey('course.id'), nullable=False)
    room_id = db.Column(db.String(255), db.ForeignKey('room.id'), default=None)
    period_id = db.Column(db.String(255), db.ForeignKey('period.id'), default=None)
    section_no = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum('Complete', 'Conflict', 'Incomplete'), default=None)

    # one to many relationship w/ Course
    course = db.relationship('Course', backref='sections', lazy=False)

    # one to one relationship w/ Room
    room = db.relationship('Room', uselist=False, backref='section', lazy=False)

    # one to one relationship w/ Period
    period = db.relationship('Period', uselist=False, backref='section', lazy=False)

    # one to one relationship w/ Intructor
    instructor = db.relationship('Instructor', uselist=False, backref='section', lazy=False)

    def __repr__(self):
        return '<Section %r >' % (self.name)
    
    def setInstructor(self, instructor):
        self.instructor_id = instructor.id

    def setRoom(self, room):
        self.room_id = room.id

    def setPeriod(self, period):
        self.period_id = period.id     

    def setRoomByID(self, room_id):
        self.room_id = room_id
        db.session.commit()

    def setPeriodByID(self, period_id):
        self.period_id = period_id  
        db.session.commit()

    def setInstructorByID(self, instructor_id):
        self.instructor_id = instructor_id
        db.session.commit()


    def printInfo(self):
        print("Section Information:")
        print(f"ID: {self.id}")
        print(f"Name: {self.name}")
        if self.instructor:
            print(f"Instructor: {self.instructor.fname} {self.instructor.lname}")
        else:
            print("Instructor: Not assigned")
        if self.course:
            print(f"Course: {self.course.name}")
        else:
            print("Course: Not assigned")
        if self.room:
            print(f"Room: {self.room.name}")
        else:
            print("Room: Not assigned")
        if self.period:
            print(f"Period: {self.period.start_time} Day: {self.period.day}")
        else:
            print("Period: Not assigned")
        if self.status:
            print((f"Status: {self.status}"))
        print(f"Section Number: {self.section_no}")
    


    
    



