from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db

class Room(db.Model):
    __tablename__ = 'room'

    id = db.Column(db.Integer, primary_key=True) # To be converted to UUID once api is complete
    name = db.Column(db.String(255), nullable=False)
    max_occupancy = db.Column(db.Integer, default = 0)

    def __repr__(self):
        return '<Room %r>' % self.name
