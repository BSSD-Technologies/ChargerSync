from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from .extensions import db
import pandas as pd

class Instructor(db.Model):
    __tablename__ = 'instructor'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(256), nullable=False)
    lname = db.Column(db.String(256), nullable=False)
    prio = db.Column(db.Integer, nullable = True)
    
    # one to many relationship with sections
    sections = db.relationship('Section', backref='instructor', lazy=True)

    # Preferences will go somewhere in here

    def __repr__(self):
        return '<Instructor %r>' % self.name
    
def load_prof_data(csv_file):
    """
    Load professor data from a CSV file.

    Args:
    - csv_file (str): Path to the CSV file containing professor data.

    Returns:
    - Tuple: A tuple containing three lists: Professor first name, last name, and their priority
    """
    profList = pd.read_csv(csv_file, dtype={0: 'string', 1: 'string', 2: 'int'})
    fname = profList['First Name'].tolist()
    lname = profList['Last Name'].tolist()
    prio = profList['Priority'].tolist()

    return fname, lname, prio