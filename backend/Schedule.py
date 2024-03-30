from Scheduler import Scheduler
from models.Course import Section, Course


class Schedule:

    courses = []
    sections = []

    schedule = []
    conflicts = []
    incompletes = []

    def __init__(self, input_courses=[]):
        if not input_courses:
            self.courses = Course.query.all()
        else:
            self.courses = input_courses
        self.scheduler = Scheduler(self.courses)
        self.getSections(self.courses)
        print(self.sections)

    def getSections(self, courses):
        for course in courses:
            self.sections.append(Section.query.filter_by(course_id = course.id).all())
        return


