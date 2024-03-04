from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from .extensions import db
import pandas as pd

def load_course_data(csv_file):
    """
    Load course data from a CSV file.

    Args:
    - csv_file (str): Path to the CSV file containing course data.

    Returns:
    - Tuple: A tuple containing three lists: course IDs, max enrollments, preliminary enrollments.
    """
    courseList = pd.read_csv(csv_file, dtype={0: 'string', 1: 'int', 2: 'int'})
    ID = courseList['Course ID'].tolist()
    Max = courseList['Max Enrollment'].tolist()
    Prelim = courseList['Preliminary Enrollment'].tolist()

    return ID, Max, Prelim