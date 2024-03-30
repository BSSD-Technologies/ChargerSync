from flask import Flask
from extensions import db
import DataGenerator
from Schedule import Schedule
from output import formatForOutput

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/schedule.db'
db.init_app(app)

# need to perform database operations within app_context
with app.app_context():

    # Prepping the database
    db.drop_all()
    db.create_all()
    DataGenerator.loadData()

    
    schedule = Schedule()
    schedule.generateCompleteSchedule()

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

    #print("TEST OF JSON OUTPUT BELOW")

    #formatForOutput(scheduler)

    #print(Course.query.all())
    #print(Instructor.query.all())



