from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from .extensions import db
import pandas as pd

class Room(db.Model):
    __tablename__ = 'room'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<Room %r>' % self.name
    

def room_CSV_to_List(csv_file):
    """
    Load room data from a CSV file.

    Args:
    - csv_file (str): Path to the CSV file containing course data.

    Returns:
    - Tuple: A tuple containing two lists: the room number & the max capacity
    """
    courseList = pd.read_csv(csv_file, dtype={0: 'str', 1: 'int'})
    ID = courseList['Room ID'].tolist()
    Max = courseList['Max Capacity'].tolist()

    return ID, Max