from extensions import db
from models.Course import Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period

class Scheduler:
    def __init__(self) -> None:
        # Tuples ------

        # Courses, Enrollment, Fulfillment
        courses_and_enrollment = getCoursesAndEnrollment()

        # Time, [Room IDs]
        room_availability = getRoomsAndAvailability()

        # Room
        room_occupancy = getRoomsAndOccupancy()



def getTimes():
    # Creating a tuple of all times and the number of classes at that time?
    periods_list = []
    periods = Period.query.all()
    for period in periods:
        pull_period = period.id
        tuple_item = (pull_period, 0)
        periods_list.append(tuple_item)
    return periods_list

def getRoomsAndOccupancy():
    # Creating a tuple of all the rooms and occupancy
    rooms_list = []
    rooms = Room.query.all()
    for room in rooms:
        pull_room = room.id
        pull_room_occupancy = room.max_occupancy
        tuple_item = (pull_room, pull_room_occupancy)
        rooms_list.append(tuple_item)
    return rooms_list

def getIntructorsWithSectionCount():
    # Creating a tuple to represent instructors and section count, this is sorted by priority - NOT CURRENTLY BEING USED
    instructors_list = []
    instructors = instructor.getIntructorsByPriority()
    for instructor in instructors:
        pull_instructor = instructor.id
        tuple_item = (pull_instructor, instructor.countAssignedSections())
        instructors_list.append(tuple_item)
    return instructors_list

def getCoursesAndEnrollment():
    # Creating a tuple to represent course, max enrollment, and fulfilled/not fulfilled
    courses_list = []
    courses = Course.query.all()
    for course in courses:
        pull_course = course.id
        tuple_item = (pull_course, course.max_enrollment, 0)
        courses_list.append(tuple_item)
    return courses_list

def checkCoursesFulfillment(courses_and_enrollment):
    for course in courses_and_enrollment:
        fulfilled = course[2]
        if fulfilled == 0:
            return None
    return True

def updateCourseEnrollment(course_enrollment_list, course_id, room_id):
    room = Room.query.filter_by(id=room_id).first()
    room_occupancy = room.max_occupancy
    for course in course_enrollment_list:
        if course[0] == course_id:
            new_occupancy = course[1] - room_occupancy
            if new_occupancy <= 0:
                fulfilled = 1
            else:
                fulfilled = 0
            updated_course = (course[0], new_occupancy, fulfilled)
            index = course_enrollment_list.index(course)
            course_enrollment_list[index] = updated_course
            if course[1] <= 0:
                course
            return 

def getRoomsAndAvailability():
    # Creating a tuple to represent room and availabily
    rooms_list = []
    periods = Period.query.all()
    rooms = Room.query.all()
    for period in periods:
        pull_period = period.id
        room_ids = [room.id for room in rooms]
        tuple_item = (pull_period, room_ids)
        rooms_list.append(tuple_item)
    return rooms_list

def getInstructorAvailability():
    instructor_list = []
    instructors = Instructor.query.all()
    periods = Period.query.all()
    for instructor in instructors:
        pull_insturctor = instructor.id
        period_ids = [period.id for period in periods]
        tuple_item = (pull_insturctor, period_ids)
        instructor_list.append(tuple_item)
    return instructor_list

def updateInstructorAvailability(instructor_list, period_id, instructor_id):
    for instructor in instructor_list:
        if instructor[0] == period_id:
            availability_array = instructor[1]
            if period_id in availability_array:
                instructor_index = availability_array.index(period_id)
                availability_array[instructor_index] = None
            return  # No need to continue after updating
    # Period ID not found, or room_id not found in the availability array
    print("Period ID or Instructor ID not found.")

def findRoomAvailability(rooms_list, period_id):
    for room in rooms_list:
        if room[0] == period_id:
            return room[1]  # Return the availability array if period_id matches
    return None  # Return None if period_id is not found

def findInstructorAvailability(profressor_list, period_id):
    for instructor in profressor_list:
        if instructor[0] == period_id:
            return instructor[1]
        return None

def updateRoomAvailability(rooms_list, period_id, room_id):
    for room in rooms_list:
        if room[0] == period_id:
            availability_array = room[1]
            if room_id in availability_array:
                room_index = availability_array.index(room_id)
                availability_array[room_index] = None
            return  # No need to continue after updating
    # Period ID not found, or room_id not found in the availability array
    print("Period ID or Room ID not found.")

def getInstructorsWithNoPref():
    instructors_list = []
    instructors = Instructor.query.order_by(Instructor.priority).all()
    for instructor in instructors:
        if instructor.checkPreferences() == False:
            instructors_list.append(instructor)
    return instructors_list

def getTimesAndRooms():
    times_rooms_list = []
    times = Period.query.all()
    room_count = Room.roomCount()
    for time in times:
        rooms = [0] * room_count
        period_id = time.id
        tuple_item = (period_id, rooms)
        times_rooms_list.append(tuple_item)
    return times_rooms_list



'''For each instructor by priority rank

    Creating lists for each course
        Get list of classes, store length in a variable.
        Create dictionary to store list of course names, read in from input.
        For each course
            Deques[coursenames[i]] = deque()
        Return deques

    Sorting instructors into Course Lists.
        For each instructor
            For each course preference
                Add instructor name into the respective course list.

Courses start with 1 section

For each course (sorted by current enrollment):

	Assign a section to a instructor at a time (check list of profs for each class first, then go to highest priority first at first available time)
	Assign a section to a classroom closest in size to Current enrollment if possible (only on first loop, add classrooms closest in size to first classroom assigned later)
	Subtract max occupancy of the classroom from Max Enrollment
	If Max Enrollment >0, add another section and repeat.

Rebalance Class sizes (TBD)
'''

'''
Section-instructor-Time Assignments
For each course
	Create an object and populate w/ course name + section number
	Details to be filled in here.

Section-Room Assignments


'''