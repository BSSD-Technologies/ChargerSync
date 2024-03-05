from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
import DataGenerator
import Algorithm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():
    db.drop_all()
    db.create_all()

    DataGenerator.loadData()
    instructors = Algorithm.getIntructorsWithSectionCount()

    classrooms = Algorithm.getClassroomsAndAvailability(Algorithm.getNumOfPeriods())
    print(instructors)
    print(classrooms)

    print(Course.query.all())
    print(Instructor.query.all())


