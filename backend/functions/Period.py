from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from .extensions import db
import pandas as pd


class Period(db.Model):
    __tablename__ = 'period'

    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    day = db.Column(db.Enum('MW', 'TR'))

    def __repr__(self):
        return '<Time Period %r %r %r>' % (self.day, self.start_time, self.end_time)
    
def load_time_data(csv_file):
    """
    Load time block data from a CSV file.

    Args:
    - csv_file (str): Path to the CSV file containing course data.

    Returns:
    - Tuple: A tuple containing three lists: the start time, end time, and what day
    """
    timeList = pd.read_csv(csv_file, dtype={0: 'str', 1: 'str'})
    startTime = timeList['Start Time'].tolist()
    endTime = timeList['End Time'].tolist()

    return startTime, endTime