from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db
class Section(db.Model):
    
    __tablename__ = 'section'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('instructor.id'), nullable=False)

    def __repr__(self):
        return '<Course %r>' % self.name
    



