from flask import Flask
from extensions import db
from unitTestFramework import buildDatabase
from app_db import Scheduler


'''
   def updateCourseEnrollment(self, course_id, room_id):
        room = Room.query.filter_by(id=room_id).first()
        room_occupancy = room.max_occupancy
        for course in self.courses_and_enrollment:
            if course[0] == course_id:
                new_occupancy = course[1] - room_occupancy
                if new_occupancy <= 0:
                    fulfilled = 1
                else:
                    fulfilled = 0
                updated_course = (course[0], new_occupancy, fulfilled)
                index = self.courses_and_enrollment.index(course)
                self.courses_and_enrollment[index] = updated_course
                return
'''
            
def test_updateCourseEnrollment_fullfillment_occurs():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():

        buildDatabase(db)        
        test = Scheduler()
        test.updateCourseEnrollment(2,1)
        assert (test.courses_and_enrollment[2] == (2, 0, 1))

def test_updateCourseEnrollmentfulfillment_does_not_occur():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCourseEnrollment(4,5)
        assert(test.courses_and_enrollment[4] == (4, 80, 0))

def test_updateInstructorAvailability_updating_claimed_slot():
    #Initializing Database
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():

        buildDatabase(db)        
        test = Scheduler() 
        test.instructor_availability = [(1,[1,2,3])]
        test.updateInstructorAvailability(1, 1)
        assert (1,1) not in test.instructor_availability

def test_updateInstructorAvailability__updating_unclaimabile_slot():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context(): 
        buildDatabase(db)     
        # Initialize your class here
        test = Scheduler() # The class that contains the method to be tested
        test.instructor_availability = [(1,[1,2,3])]
        # Test when the period does not exist for the instructor
        test.updateInstructorAvailability(2, 4)
        # Check if the period was not in the availability array to begin with
        assert (2,4) not in test.instructor_availability

def test_updateInstructorAvailability_instructor_does_not_exist():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        # Initialize your class here
        test = Scheduler() # The class that contains the method to be tested
        test.instructor_availability = [(1,[1,2,3]),(2,[1,2,3]),(3,[1,2,3])]
        # Test when the instructor does not exist
        test.updateInstructorAvailability(4, 2)
        # Check if the instructor was not in the availability list to begin with
        assert (4, []) not in test.instructor_availability