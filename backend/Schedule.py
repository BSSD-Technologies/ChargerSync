from Scheduler import Scheduler
from ConflictIdentifier import ConflictIdentifier
from models.Course import Section, Course


class Schedule:
    # Courses used to generate schedule
    courses = []

    # ALL sections generated from scheduler
    sections = []

    # Only incompletes and complete type sections
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
            sections = Section.query.filter_by(course_id = course.id).all()
            for section in sections:
                self.sections.append(section)
        return
    
    def generate(self):
        # fills everything in the class arrays
        self.scheduler.generateSchedule()
        self.getSections()
        self.generateConflicts()

    def generateConflicts(self):
        self.conflict_identifier = ConflictIdentifier(self.sections)
        self.conflict_identifier.labelSections()
        self.separateSections()

    def separateSections(self):
        for section in self.sections:
            if section.status == 'Conflict':
                self.conflicts.append(section)
                continue
            elif section.status == 'Incomplete':
                self.schedule.append(section)
                self.incompletes.append(section)
                continue
            else:
                self.schedule.append(section)
                continue

    def clear(self):
        # Clear all arrays
        self.courses = []
        self.sections = []
        self.schedule = []
        self.conflicts = []
        self.incompletes = []

        





