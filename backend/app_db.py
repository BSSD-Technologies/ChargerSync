from flask import Flask
from extensions import db
import DataGenerator
from Schedule import Schedule
from models.Course import Course, Section
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import PeriodPreference, CoursePreference
from output import formatForOutput
import csvOutput
import uuid
import json
import DatabaseManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/schedule.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():

    # Prepping the database
    db.drop_all()
    db.create_all()
    
    # Load data from JSON file
    def load_data_from_json(file_path):
        with open(file_path, 'r') as f:
            data = json.load(f)
        return data

    # Assuming your JSON file contains the scheduler data
    scheduler_data = load_data_from_json('backend/test.json')

    DatabaseManager.loadData(scheduler_data)
    db.session.commit()

    
    schedule = Schedule()

    schedule.generate()
    db.session.commit()

    print('\nALL SECTIONS\n')
    for section in schedule.sections:
        section.printInfo()
        print('\n')

    print('\nSCHEDULED\n')
    for section in schedule.schedule:
        section.printInfo()
        print('\n')

    print('\nCONFLICTS\n')
    for section in schedule.conflicts:
        section.printInfo()
        print('\n')
    

    print("TEST OF JSON OUTPUT BELOW")

    print(formatForOutput(schedule.schedule))





