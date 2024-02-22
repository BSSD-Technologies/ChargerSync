from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from extensions import db
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return '<Course %r>' % self.name
    



