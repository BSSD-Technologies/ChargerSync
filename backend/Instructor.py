from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db

class Instructor(db.Model):
    __tablename__ = 'instructor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False, unique=True)
    max_enrollment = db.Column(db.Integer, nullable=False)
    preliminary_enrollment = db.Column(db.Integer, default=0)
    sections = db.relationship('Section', backref='instructor', lazy=True)

    def __repr__(self):
        return '<Instructor %r>' % self.name