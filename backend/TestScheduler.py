from flask import Flask
from extensions import db
from unitTestFramework import buildDatabase, buildApp
from Scheduler import Scheduler
from models.Course import Section, Course
from models.Instructor import Instructor
from sqlalchemy import or_, and_
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
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCourseEnrollment("c3")
        assert (test.courses_and_enrollment[2] == ("c3", -30, 1))

def test_updateCourseEnrollmentfulfillment_does_not_occur():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCourseEnrollment("c2")
        assert(test.courses_and_enrollment[1] == ("c2", 50, 0))


def test_updateCourseEnrollmentGivenRoom_fullfillment_occurs():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()

        class RoomTemp:
            max_occupancy = 100
        assignedRoom = RoomTemp()


        test.updateCourseEnrollmentGivenRoom('c5',assignedRoom)
        assert (test.courses_and_enrollment[4] == ('c5', -10, 1))

def test_updateCourseEnrollmentGivenRoom_fulfillment_does_not_occur():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()

        class RoomTemp:
            max_occupancy = 10
        assignedRoom = RoomTemp()


        test.updateCourseEnrollmentGivenRoom('c3',assignedRoom)
        assert(test.courses_and_enrollment[2] == ('c3', 10, 0))



def test_updateInstructorAvailability_updating_claimed_slot():
    #Initializing Database
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.instructor_availability = [(1, 3, [1,2,3])]
        test.updateInstructorAvailability(1, 1)
        assert (1,1) not in test.instructor_availability

def test_updateInstructorAvailability__updating_unclaimabile_slot():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler() # The class that contains the method to be tested
        test.instructor_availability = [(1, 3, [1,2,3])]
        # Test when the period does not exist for the instructor
        test.updateInstructorAvailability(2, 4)
        # Check if the period was not in the availability array to begin with
        assert (2,4) not in test.instructor_availability

def test_updateInstructorAvailability_instructor_does_not_exist():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler() # The class that contains the method to be tested
        test.instructor_availability = [(1, 3, [1,2,3]),(2, 3, [1,2,3]),(3, 3, [1,2,3])]
        # Test when the instructor does not exist
        test.updateInstructorAvailability(4, 2)
        # Check if the instructor was not in the availability list to begin with
        assert (4, []) not in test.instructor_availability

def test_updateRoomAvailability_nominal_case():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.room_availability = [(1,[1,2,3]),(2,[2,3,4]),(3,[3,4,5])]
        test.updateRoomAvailability(1,1)
        assert(test.room_availability[0] == (1,[2,3]))

def test_updateRoomAvailability_off_nominal_case():
    app = buildApp()
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
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCoursePreferences('c1','p2')
        assert(test.course_preferences[0] == ('c1',['p4','p1']))

def test_updateCoursePreferences_preference_fulfilled():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCoursePreferences('c1','p1')
        assert(test.course_preferences[0] == ('c1',['p4']))

def test_findRoomAvailability_room_findable():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        assert(test.findRoomAvailability('t3t') == ['r1', 'r2', 'r3', 'r4', 'r5'])

def test_findRoomAvailability_not_findable():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        assert(test.findRoomAvailability('r225') == None)

def test_findInstructorAvailability_instructor_findable():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        temp = Instructor.query.filter_by(fname = "Beth").first().id
        print(temp)
        assert(test.findInstructorAvailability(temp) == ["t1m","t2m","t3m","t4m","t5m","t1t","t2t","t3t","t4t","t5t"])


