from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db

class Instructor(db.Model):
    __tablename__ = 'instructor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    
    # one to many relationship with sections
    sections = db.relationship('Section', backref='instructor', lazy=True)

    # Preferences will go somewhere in here

    def __repr__(self):
        return '<Instructor %r>' % self.name