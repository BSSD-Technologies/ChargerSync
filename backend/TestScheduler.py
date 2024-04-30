from flask import Flask
from extensions import db
from unitTestFramework import buildDatabase, buildApp
from Scheduler import Scheduler
from models.Course import Section
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
        test = Scheduler() 
        test.instructor_availability = [(1, 3, [1,2,3])]
        test.updateInstructorAvailability(2, 4)
        assert (2,4) not in test.instructor_availability

def test_updateInstructorAvailability_instructor_does_not_exist():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.instructor_availability = [(1, 3, [1,2,3]),(2, 3, [1,2,3]),(3, 3, [1,2,3])]
        test.updateInstructorAvailability(4, 2)
        assert (4, []) not in test.instructor_availability

def test_updateRoomAvailability_time_available():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateRoomAvailability('t1m','r1')
        assert(test.room_availability[0] == ('t1m',['r2','r3','r4','r5']))

def test_updateRoomAvailability_multiple_updates():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateRoomAvailability('t1m','r1')
        test.updateRoomAvailability('t2m','r1')
        assert(test.room_availability[0] == ('t1m',['r2','r3','r4','r5']))
        assert(test.room_availability[1] == ('t2m',['r2','r3','r4','r5']))

def test_updateCoursePreferences_preference_unfulfilled():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCoursePreferences('c1','p2')
        assert(test.course_preferences[0] == ('c1',['p4','p1']))

def test_updateCoursePreferences_preference_partially_fulfilled():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCoursePreferences('c1','p1')
        assert(test.course_preferences[0] == ('c1',['p4']))

def test_updateCoursePreferences_preference_fully_fulfilled():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.updateCoursePreferences('c1','p1')
        test.updateCoursePreferences('c1','p4')
        assert(test.course_preferences[0] == ('c1',[]))

def test_checkCoursesFulfillment_all_fulfilled():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        class RoomTemp:
            max_occupancy = 1000
        assignedRoom = RoomTemp()

        test.updateCourseEnrollmentGivenRoom('c1',assignedRoom)
        test.updateCourseEnrollmentGivenRoom('c2',assignedRoom)
        test.updateCourseEnrollmentGivenRoom('c3',assignedRoom)
        test.updateCourseEnrollmentGivenRoom('c4',assignedRoom)
        test.updateCourseEnrollmentGivenRoom('c5',assignedRoom)

        assert(test.checkCoursesFulfillment() == True)

def test_checkCoursesFulfillment_not_all_fulfilled():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        class RoomTemp:
            max_occupancy = 1000
        assignedRoom = RoomTemp()

        test.updateCourseEnrollmentGivenRoom('c1',assignedRoom)
        test.updateCourseEnrollmentGivenRoom('c2',assignedRoom)
        assert(test.checkCoursesFulfillment() == False)

def test_findRoomAvailability_room_findable():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        assert(test.findRoomAvailability('t3t') == ['r1', 'r2', 'r3', 'r4', 'r5'])

def test_findRoomAvailability_room_findable_post_update():
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
        assert(test.findInstructorAvailability('p1') == ["t1m","t2m","t3m","t4m","t5m","t1t","t2t","t3t","t4t","t5t"])


def test_findInstructorAvailability_instructor_not_findable():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        assert(test.findInstructorAvailability('p20') == [])

def test_getNextAvailableInstructor():
    app = buildApp()
    with app.app_context():
        buildDatabase(db)        
        test = Scheduler()
        test.getInstructorsWithNoPref('c4')
        assert(test.getNextAvailableInstructor() == 'p3')
