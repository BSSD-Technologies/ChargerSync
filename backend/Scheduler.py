from models.Course import Course, Section
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period

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
    schedule = []
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
        
    # Input: self
    # Output: n/a - changes values in self
    def getCoursesAndEnrollment(self):
        # Creating a tuple to represent course, max enrollment, and fulfilled/not fulfilled
        courses = Course.query.all()
        for course in courses:
            pull_course = course.id
            tuple_item = (pull_course, course.max_enrollment, 0)
            self.courses_and_enrollment.append(tuple_item)
    
    # Input: self
    # Output: n/a - changes values in self
    def getRoomsAndAvailability(self):
        # Creating a tuple to represent room and availabily
        periods = Period.query.all()
        rooms = Room.query.all()
        for period in periods:
            pull_period = period.id
            room_ids = [room.id for room in rooms]
            tuple_item = (pull_period, room_ids)
            self.room_availability.append(tuple_item)
    
    # Input: self
    # Output: n/a - changes values in self
    def getRoomsAndOccupancy(self):
        # Creating a tuple of all the rooms and occupancy
        rooms = Room.query.all()
        for room in rooms:
            pull_room = room.id
            pull_room_occupancy = room.max_occupancy
            tuple_item = (pull_room, pull_room_occupancy)
            self.room_occupancy.append(tuple_item)
    
    # Input: self
    # Output: n/a - changes values in self
    def getInstructorAvailability(self):
        # Creating a Tuple with instructor id and period ids
        instructors = Instructor.query.all()
        periods = Period.query.all()
        for instructor in instructors:
            pull_insturctor = instructor.id
            period_ids = [period.id for period in periods]
            tuple_item = (pull_insturctor, period_ids)
            self.instructor_availability.append(tuple_item)

    # Input: self
    # Output: n/a - changes values in self
    def getInstructorsWithNoPref(self, course_id):
        # Just an array of instructors with no preferences - sorted by priority
        instructors = Instructor.query.order_by(Instructor.priority).all()
        for instructor in instructors:
            if self.hasCoursePreferences(instructor.id, course_id) == False:
                self.instructors_with_no_preferences.append(instructor.id)

    # Input: self
    # Output: n/a - changes values in self
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

    # Input: self, course_id(int), room_id(int)
    # Output: n/a - updates values in self
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
        
            
    # Input: self, period_id(int), instructor_id(int)
    # Output: n/a - updates values in self
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

    # Input: self, period_id(int), room_id(int)
    # Output: n/a - updates values in self        
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

        

    # Find Functions ----
            
    # Input: self, period_id(int)
    # Output: array or None
    def findRoomAvailability(self, room_id):
        for room in self.room_availability:
            if room[0] == room_id:
                return room[1]  # Return array of rooms available during period
        return None

    # Input: self, instructor_id(int)
    # Output: array or None
    def findInstructorAvailability(self, instructor_id):
        for instructor in self.instructor_availability:
            if instructor[0] == instructor_id:
                return instructor[1]    # return array of periods instructor is available
        return None
        
    # OTHER
        
    # Input: self
    # Output: n/a 
    def prepareForMoreSections(self):
        self.sections = []
        self.section_counter += 1
        self.instructors_with_no_preferences_pos = 0
        return
        
    # Input: self
    # Output: None or True
    def checkCoursesFulfillment(self):
        for course in self.courses_and_enrollment:
            fulfilled = course[2]
            if fulfilled == 0:
                return False
        return True
    
    # Input: self
    # Output: n/a 
    def createNewSections(self):
        # Creates section list of sections to be assigned
        for course in self.courses_and_enrollment:
            # if course enrollement is unfulfilled, add section to list of sections to be assigned
            if course[2] == 0:
                new_section = Course.newSectionFromId(course[0])
                self.sections.append(new_section)
    
    # Input: self
    # Output: instructor id (int)
    def getNextAvailableInstructor(self):
        available_instructor = self.instructors_with_no_preferences[self.instructors_with_no_preferences_pos]
        self.instructors_with_no_preferences_pos = (self.instructors_with_no_preferences_pos + 1) % len(self.instructors_with_no_preferences)
        return available_instructor
    
    # Input: self
    # Output: instructor id (int)
    def getNextSelectedInstructor(self, instructors_list):
        for instructor in instructors_list:
            if instructor != None:
                return instructor
        return None
    
    # Input: self, period_preferences (course preference ORM array), instructor_id (int)
    # Output: instructor's sorted availability - prefered times first (int array)
    def createSortedAvailability(self, period_preferences, instructor_id):
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
    
    # Input: self, period_preferences (course preference ORM array), instructor_id (int)
    # Output: order_period (int array)
    def getInstructorsWithCoursePref(self, course_id):
        for course in self.course_preferences:
            if course[0] == course_id:
                return course[1]
        return None

    # Input: self, lst (list), id (int), priority(int)
    # Output: n/a
    def sortedInsert(self, lst, id, priority):
        index = 0
        while index < len(lst) and lst[index] < priority:
            index += 1
        lst.insert(index, id)

    # Input: self, instructor_id(int), course_id(int)
    # Output: true or false
    def hasCoursePreferences(self, instructor_id, course_id):
        for course in self.course_preferences:
            if course[0] == course_id:
                instructor_ids = course[1]
                if instructor_id in instructor_ids:
                    return True
                else:
                    return False
                
    # ALGO
    

    # Input: self
    # Output: n/a - creates a schedule in the scheduler class
    def scheduleSections(self):
        for section in self.sections:
            # Gather course information
            self.getInstructorsWithNoPref(section.course_id)

            # Assign an Instructor to a section
            self.assignInstructor(section)

            # AT THIS POINT, THE SECTION HAS BEEN ASSIGNED AN INSTRUCTOR - get instructor by using back reference
            assigned_instructor = section.instructor_id

            # Check if Instructor has any time preferences - Create order periods array based on period preferences
            period_preferences = section.getPeriodPreferences()
            sorted_instructor_availability = self.createSortedAvailability(period_preferences, assigned_instructor)
            
            # Assigning section to period and section to a room
            if sorted_instructor_availability:
                # Instructor has free time - assign section to a period that is available to the instructor
                self.assignPeriod(section, sorted_instructor_availability[0])
    
                # Assigning room
                self.assignRoomDuringInstructorAvailability(section, sorted_instructor_availability)
                    
            # Some printing for testing
            section.printInfo()
            print("\n")

            # If all courses are fulfilled - end loop
            if self.checkCoursesFulfillment() == True:
                self.updateSchedule()
                break
        self.updateSchedule()

    # Input: self, section
    # Output: n/a - alters section's row in DB
    def assignInstructor(self, section):
        # a list of all preferences for the course
        instructors = self.getInstructorsWithCoursePref(section.course_id)
        if not instructors:
            # There are no professors with a preference for this course
            # Assign section to instructor from instructors who have no preferance or have already met their preference
            available_instructor = self.getNextAvailableInstructor()
            section.setInstructorByID(available_instructor)

        else:
            # There exists professor(s) with a preference for this course
            # Assign Instructor from Instructors who do have preference for the specific course - based on priority
            selected_instructor = self.getNextSelectedInstructor(instructors)
            section.setInstructorByID(selected_instructor)

            # Update preferences
            self.updateCoursePreferences(section.course_id, selected_instructor)

    # Input: self, section, period_id
    # Output: n/a - alters section's row in DB
    def assignPeriod(self, section, period_id):
        section.setPeriodByID(period_id)  
        self.updateInstructorAvailability(period_id, section.instructor_id)

    # Input: self, section, sorted instructor availability array
    # Output: n/a - alters section's row in DB
    def assignRoomDuringInstructorAvailability(self, section, sorted_instructor_availability):
        for period in sorted_instructor_availability:
            # get available rooms for period
            available_rooms = self.findRoomAvailability(period)
            if available_rooms:
                # set room to a room that is available during that period
                section.setRoomByID(available_rooms[0])

                # Update enrollment numbers
                self.updateCourseEnrollment(section.course_id, available_rooms[0])
                self.updateRoomAvailability(period, available_rooms[0])
                break

    # Input: self
    # Output: n/a - puts all sections in one array
    def updateSchedule(self):
        self.schedule = Section.query.all()
