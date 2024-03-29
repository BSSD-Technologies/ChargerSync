from flask import Flask
from extensions import db
from unitTestFramework import buildDatabase
from Scheduler import Scheduler

'''
def test_modulenamehere_test2():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        test = Scheduler()
'''
            
def test_updateCourseEnrollment_fullfillment_occurs():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():

        buildDatabase(db)        
        test = Scheduler()
        test.updateCourseEnrollment(3)
        assert (test.courses_and_enrollment[2] == (3, -30, 1))

def test_updateCourseEnrollmentfulfillment_does_not_occur():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():
        buildDatabase(db) 
        test = Scheduler()
        test.updateCourseEnrollment(2)
        assert(test.courses_and_enrollment[1] == (2, 50, 0))


def test_updateCourseEnrollmentGivenRoom_fullfillment_occurs():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():

        buildDatabase(db)        
        test = Scheduler()

        class RoomTemp:
            max_occupancy = 150
        assignedRoom = RoomTemp()


        test.updateCourseEnrollmentGivenRoom(5,assignedRoom)
        assert (test.courses_and_enrollment[4] == (5, -60, 1))

def test_updateCourseEnrollmentGivenRoom_fulfillment_does_not_occur():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():
        buildDatabase(db) 

        test = Scheduler()

        class RoomTemp:
            max_occupancy = 10
        assignedRoom = RoomTemp()


        test.updateCourseEnrollmentGivenRoom(3,assignedRoom)
        assert(test.courses_and_enrollment[2] == (3, 10, 0))



def test_updateInstructorAvailability_updating_claimed_slot():
    #Initializing Database
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():

        buildDatabase(db)        
        test = Scheduler() 
        test.instructor_availability = [(1, 3, [1,2,3])]
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
        test.instructor_availability = [(1, 3, [1,2,3])]
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
        test.instructor_availability = [(1, 3, [1,2,3]),(2, 3, [1,2,3]),(3, 3, [1,2,3])]
        # Test when the instructor does not exist
        test.updateInstructorAvailability(4, 2)
        # Check if the instructor was not in the availability list to begin with
        assert (4, []) not in test.instructor_availability

def test_updateRoomAvailability_nominal_case():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        test = Scheduler()
        test.room_availability = [(1,[1,2,3]),(2,[2,3,4]),(3,[3,4,5])]
        test.updateRoomAvailability(1,1)
        assert(test.room_availability[0] == (1,[2,3]))

def test_updateRoomAvailability_off_nominal_case():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        test = Scheduler()
        test.room_availability = [(1,[1,2,3]),(2,[2,3,4]),(3,[3,4,5])]
        test.updateRoomAvailability(1,4)
        assert(test.room_availability[0] == (1,[1,2,3]))



'''
  # Input: self, course_id(int), instructor_id(int)
    # Output: n/a - updates values in self
    def updateCoursePreferences(self, course_id, instructor_id):
        for course in self.course_preferences:
            if course[0] == course_id:
                instructor_ids = course[1]
                if instructor_id in instructor_ids:
                    instructor_index = instructor_ids.index(instructor_id)
                    del instructor_ids[instructor_index]
                return

    # Course ID, [Instructor IDs]
    course_preferences = []
'''

def test_updateCoursePreferences_preference_unfulfilled():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)
        test = Scheduler()
        test.updateCoursePreferences(1,3)
        assert(test.course_preferences[0] == (1,[1]))

def test_updateCoursePreferences_preference_fulfilled():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)
        test = Scheduler()
        test.updateCoursePreferences(1,1)
        assert(test.course_preferences[0] == (1,[2]))

def test_findRoomAvailability_room_findable():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        test = Scheduler()
        assert(test.findRoomAvailability(1) == [1,2,3,4,5])

def test_findRoomAvailability_not_findable():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        test = Scheduler()
        assert(test.findRoomAvailability(999) == None)

def test_findInstructorAvailability_instructor_findable():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        test = Scheduler()
        assert(test.findInstructorAvailability(1) == [1,2,3,4,5,6,7,8,9,10])

def test_findInstructorAvailability_not_findable():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    db.init_app(app)
    with app.app_context():   
        buildDatabase(db)   
        test = Scheduler()
        assert(test.findInstructorAvailability(999) == None)


