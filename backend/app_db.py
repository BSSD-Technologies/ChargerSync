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
    schedule.generate()

    print('\nALL SECTIONS\n')
    for section in schedule.sections:
        section.printInfo()
        print("\n")

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
    
    
    courses = Course.query.all()
    sections = Section.query.all()
    instructors = Instructor.query.all()
    periods = Period.query.all()
    rooms = Room.query.all()
    period_prefs = PeriodPreference.query.all()
    course_prefs = CoursePreference.query.all()

    for course in courses:
        db.session.delete(course)

    for section in sections: 
        db.session.delete(section)

    for instructor in instructors:
        db.session.delete(instructor)
    
    for period in periods:
        db.session.delete(period)

    for room in rooms:
        db.session.delete(room)
    
    for period_pref in period_prefs:
        db.session.delete(period_pref)

    for course_pref in course_prefs:
        db.session.delete(course_pref)
    
    #db.session.commit()

    DataGenerator.loadData()
    db.session.commit()

    schedule = None

    schedule = Schedule()
    schedule.generate()
    

    print("TEST OF JSON OUTPUT BELOW")

    print(formatForOutput(schedule.schedule))


    #print(Course.query.all())
    #print(Instructor.query.all())



