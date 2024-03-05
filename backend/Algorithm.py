from extensions import db
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference


class Assignment():
    
    pass

def getIntructorsByPriority():
    return Instructor.query.order_by(Instructor.priority).all()

def getTimes():
    # Creating a tuple of all times and the number of classes at that time?
    periods_list = []
    periods = Period.query.all()
    for period in periods:
        pull_period = period.id
        tuple_item = (pull_period, 0)
        periods_list.append(tuple_item)
    return periods_list

def getNumOfPeriods():
    return Period.query.count()

def getIntructorsWithSectionCount():
    # Creating a tuple to represent instructors and section count, this is sorted by priority
    instructors_list = []
    instructors = getIntructorsByPriority()
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

def getClassroomsAndAvailability(numPeriods):
    # Creating a tuple to represent room, occupancy, and availabily
    classrooms_list = []
    classrooms = Room.query.all()
    for room in classrooms:
        pull_room = room.id
        array_of_zeros = [0] * numPeriods
        tuple_item = (pull_room, room.max_occupancy, array_of_zeros)
        classrooms_list.append(tuple_item)
    return classrooms_list

def getInstructorsWithNoPref():
    instructors_list = []
    instructors = Instructor.query.order_by(Instructor.priority).all()
    for instructor in instructors:
        if not instructor.getCoursePreferences() and not instructor.getPeriodPreferences():
            instructors_list.append(instructor)
    return instructors_list


'''For each professor by priority rank

    Creating lists for each course
        Get list of classes, store length in a variable.
        Create dictionary to store list of course names, read in from input.
        For each course
            Deques[coursenames[i]] = deque()
        Return deques

    Sorting Professors into Course Lists.
        For each professor
            For each course preference
                Add professor name into the respective course list.

Courses start with 1 section

For each course (sorted by current enrollment):

	Assign a section to a professor at a time (check list of profs for each class first, then go to highest priority first at first available time)
	Assign a section to a classroom closest in size to Current enrollment if possible (only on first loop, add classrooms closest in size to first classroom assigned later)
	Subtract max occupancy of the classroom from Max Enrollment
	If Max Enrollment >0, add another section and repeat.

Rebalance Class sizes (TBD)
'''

'''
Section-Professor-Time Assignments
For each course
	Create an object and populate w/ course name + section number
	Details to be filled in here.

Section-Room Assignments


'''