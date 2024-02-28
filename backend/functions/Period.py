from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db


class Period(db.Model):
    __tablename__ = 'period'

    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    day = db.Column(db.Enum('MW', 'TR'))

    def __repr__(self):
        return '<Time Period %r %r %r>' % (self.day, self.start_time, self.end_time)