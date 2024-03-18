from flask import Flask
from extensions import db
from unitTestFramework import buildDatabase
from app_db import Scheduler

def test_update_instructor_availability_spot_exists():
    #Initializing Database
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():

        buildDatabase(db)        
        # Initialize your class here
        test = Scheduler() # The class that contains the method to be tested
        test.instructor_availability = [(1,[1,2,3]),(2,[1,2,3]),(3,[1,2,3])]
        # Test when the period exists for the instructor
        test.updateInstructorAvailability(1, 1)
        # Check if the period was removed from the availability array
        assert 1 not in test.instructor_availability[1][1]

def test_update_instructor_availability_spot_does_not_exist():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context(): 
        buildDatabase(db)     
        # Initialize your class here
        test = Scheduler() # The class that contains the method to be tested
        test.instructor_availability = [(1,[1,2,3]),(2,[1,2,3]),(3,[1,2,3])]
        # Test when the period does not exist for the instructor
        test.updateInstructorAvailability(2, 1)
        # Check if the period was not in the availability array to begin with
        assert 2 not in test.instructor_availability[1][1]

def test_update_instructor_availability_instructor_does_not_exist():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        # Initialize your class here
        test = Scheduler() # The class that contains the method to be tested
        test.instructor_availability = [(1,[1,2,3]),(2,[1,2,3]),(3,[1,2,3])]
        # Test when the instructor does not exist
        test.updateInstructorAvailability(1, 2)
        # Check if the instructor was not in the availability list to begin with
        assert (2, []) not in test.instructor_availability