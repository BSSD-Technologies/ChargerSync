from models.Course import Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference

class Scheduler:
    # ----- Tuple Arrays ------

    # Courses, Enrollment, Fulfillment
    courses_and_enrollment = []

    # Period ID, [Room IDs]
    room_availability = []

    # Room ID, Max Occupancy
    room_occupancy = []

    # Instructor ID, [Period IDs]
    instructor_availability = []
    
    # Course ID, [Instructor IDs]
    course_preferences = []

    # ----- Arrays ------
    instructors_with_no_preferences = []
    
    sections = []
    
    # ----- Other Attributes ------
    section_counter = 0
    instructors_with_no_preferences_pos = 0

    def __init__(self):
        # Setting up attributes
        self.getCoursesAndEnrollment()
        self.getRoomsAndAvailability()
        self.getRoomsAndOccupancy()
        self.getInstructorAvailability()
        self.getCoursePreferences()


    # Constructor Functions ------
        
    def getCoursesAndEnrollment(self):
        # Creating a tuple to represent course, max enrollment, and fulfilled/not fulfilled
        courses = Course.query.all()
        for course in courses:
            pull_course = course.id
            tuple_item = (pull_course, course.max_enrollment, 0)
            self.courses_and_enrollment.append(tuple_item)
    
    def getRoomsAndAvailability(self):
        # Creating a tuple to represent room and availabily
        periods = Period.query.all()
        rooms = Room.query.all()
        for period in periods:
            pull_period = period.id
            room_ids = [room.id for room in rooms]
            tuple_item = (pull_period, room_ids)
            self.room_availability.append(tuple_item)
    
    def getRoomsAndOccupancy(self):
        # Creating a tuple of all the rooms and occupancy
        rooms = Room.query.all()
        for room in rooms:
            pull_room = room.id
            pull_room_occupancy = room.max_occupancy
            tuple_item = (pull_room, pull_room_occupancy)
            self.room_occupancy.append(tuple_item)
    
    def getInstructorAvailability(self):
        # Creating a Tuple with instructor id and period ids
        instructors = Instructor.query.all()
        periods = Period.query.all()
        for instructor in instructors:
            pull_insturctor = instructor.id
            period_ids = [period.id for period in periods]
            tuple_item = (pull_insturctor, period_ids)
            self.instructor_availability.append(tuple_item)

    def getInstructorsWithNoPref(self, course_id):
        # Just an array of instructors with no preferences - sorted by priority
        instructors = Instructor.query.order_by(Instructor.priority).all()
        for instructor in instructors:
            if self.hasCoursePreferences(instructor.id, course_id) == False:
                self.instructors_with_no_preferences.append(instructor.id)

    def getCoursePreferences(self):
        # Creates a tuple of course preferences for each course
        courses = Course.query.all()
        for course in courses:
            course_id = course.id
            course_preferences = course.preferences
            sorted_array = []
            for course_pref in course_preferences:
                instructor = course_pref.instructor_id
                priority = course_pref.instructor.priority
                self.sortedInsert(sorted_array, instructor, priority)
            tuple_item = (course_id, sorted_array)
            self.course_preferences.append(tuple_item)
        

    # Update Functions -----

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
                if course[1] <= 0:
                    course
                return 

    def updateInstructorAvailability(self, period_id, instructor_id):
        for instructor in self.instructor_availability:
            if instructor[0] == instructor_id:
                availability_array = instructor[1]
                if period_id in availability_array:
                    instructor_index = availability_array.index(period_id)
                    del availability_array[instructor_index]
                return  # No need to continue after updating
        # Period ID not found, or room_id not found in the availability array
        print("Period ID or Instructor ID not found.")    
        
    def updateRoomAvailability(self, period_id, room_id):
        for room in self.room_availability:
            if room[0] == period_id:
                availability_array = room[1]
                if room_id in availability_array:
                    room_index = availability_array.index(room_id)
                    del availability_array[room_index]
                return  # No need to continue after updating
        # Period ID not found, or room_id not found in the availability array
        print("Period ID or Room ID not found.")

    def updateCoursePreferences(self, course_id, instructor_id):
        for course in self.course_preferences:
            if course[0] == course_id:
                instructor_ids = course[1]
                if instructor_id in instructor_ids:
                    instructor_index = instructor_ids.index(instructor_id)
                    del instructor_ids[instructor_index]
                return
        

    # Find Functions ----

    def findRoomAvailability(self, period_id):
        for room in self.room_availability:
            if room[0] == period_id:
                return room[1]  # Return array of rooms available during period
        return None

    def findInstructorAvailability(self, instructor_id):
        for instructor in self.instructor_availability:
            if instructor[0] == instructor_id:
                return instructor[1]    # return array of periods instructor is available
        return None
        
    # OTHER
        
    def prepareForMoreSections(self):
        self.sections = []
        self.section_counter += 1
        self.instructors_with_no_preferences_pos = 0
        return
        
    def checkCoursesFulfillment(self):
        for course in self.courses_and_enrollment:
            fulfilled = course[2]
            if fulfilled == 0:
                return None
        return True

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
    
    def createNewSections(self):
        # Creates section list of sections to be assigned
        for course in self.courses_and_enrollment:
            # if course enrollement is unfulfilled, add section to list of sections to be assigned
            if course[2] == 0:
                new_section = Course.newSectionFromId(course[0])
                self.sections.append(new_section)
        

    def getIntructorsWithSectionCount():
        # Creating a tuple to represent instructors and section count, this is sorted by priority - NOT CURRENTLY BEING USED
        instructors_list = []
        instructors = instructor.getIntructorsByPriority()
        for instructor in instructors:
            pull_instructor = instructor.id
            tuple_item = (pull_instructor, instructor.countAssignedSections())
            instructors_list.append(tuple_item)
        return instructors_list

    def getTimes():
        # Creating a tuple of all times and the number of classes at that time
        periods_list = []
        periods = Period.query.all()
        for period in periods:
            pull_period = period.id
            tuple_item = (pull_period, 0)
            periods_list.append(tuple_item)
        return periods_list   
    
    def getUnfulfilledPreferences(list_of_preferences):
        unfulfilled_preferences = []
        for pref in list_of_preferences:
            if pref.fulfilled == 0:
                unfulfilled_preferences.append(pref)
        return unfulfilled_preferences
    
    def getNextAvailableInstructor(self):
        available_instructor = self.instructors_with_no_preferences[self.instructors_with_no_preferences_pos]
        self.instructors_with_no_preferences_pos = (self.instructors_with_no_preferences_pos + 1) % len(self.instructors_with_no_preferences)
        return available_instructor
    
    def getNextSelectedInstructor(self, instructors_list):
        for instructor in instructors_list:
            if instructor != None:
                return instructor
        return None
    
    def createOrderPeriods(self, period_preferences, instructor_id):
    # order check_periods_room based on whether instructor has preference or not
        order_periods = []
        instructor_availablity = self.findInstructorAvailability(instructor_id)
        if period_preferences:
            for period_pref in period_preferences:
                if period_pref in instructor_availablity:
                    order_periods.append(period_pref.period_id)
            for period in self.room_availability:
                if ((period[0] not in order_periods) and (period[0] in instructor_availablity)):
                    order_periods.append(period[0])
        else:
            # Instructor has no preference - this could be used to change the order of which periods are checked first/last
            for period in self.room_availability:
                if ((period[0] not in order_periods) and (period[0] in instructor_availablity)):
                    order_periods.append(period[0])
        return order_periods
    
    def getInstructorsWithCoursePref(self, course_id):
        for course in self.course_preferences:
            if course[0] == course_id:
                return course[1]
        return None

    def sortedInsert(self, lst, id, priority):
        index = 0
        while index < len(lst) and lst[index] < priority:
            index += 1
        lst.insert(index, id)

    def hasCoursePreferences(self, instructor_id, course_id):
        for course in self.course_preferences:
            if course[0] == course_id:
                instructor_ids = course[1]
                if instructor_id in instructor_ids:
                    return True
                else:
                    return False
           


    
     



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