from Scheduler import Scheduler
from models.Course import Section, Course


class Schedule:
    # Courses used to generate schedule
    courses = []

    # ALL sections generated from scheduler
    sections = []

    # Only incompletes and none type sections
    schedule = []

    # All sections labeled as conflicts
    conflicts = []

    # All incompletes
    incompletes = []

    def __init__(self, input_courses=[]):
        # you can choose with courses are scheduled, or can do all in the database.
        if not input_courses:
            self.courses = Course.query.all()
        else:
            self.courses = input_courses
        self.scheduler = Scheduler(self.courses)

    def getSections(self):
        for course in self.courses:
            self.sections.append(Section.query.filter_by(course_id = course.id).all())
        return
    
    def generateSchedule(self):
        self.scheduler.generateSchedule()
        self.getSections()




