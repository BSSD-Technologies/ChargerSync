from flask import Flask
from extensions import db
from models.Course import Course
import DataGenerator
from Scheduler import Scheduler
from output import formatForOutput

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():

    # Prepping the database
    db.drop_all()
    db.create_all()
    DataGenerator.loadData()

    
    schedule = Scheduler(Course.query.all())
    schedule.generateSchedule()

    #print("TEST OF JSON OUTPUT BELOW")

    #formatForOutput(scheduler)

    #print(Course.query.all())
    #print(Instructor.query.all())



