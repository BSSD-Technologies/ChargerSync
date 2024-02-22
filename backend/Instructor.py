from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db

class Instructor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=True, nullable=False)

    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    course = db.relationship('Course',backref=db.backref('instructors', lazy=True))

    def __repr__(self):
        return '<Instructor %r>' % self.name