from models.Course import Section

class ConflictIdentifier():

    sections = []

    def __init__(self, input_sections = []):
        if not input_sections:
            self.sections = Section.query.all()
        else:
            self.sections = input_sections

    def labelSections(self):
        for section in self.sections:
            if section.period_id == None:
                section.status = 'Conflict'
                continue
            elif section.instructor_id == None:
                section.status = 'Incomplete'
                continue
            elif section.room_id == None:
                section.status = 'Incomplete'
                continue
            else:
                section.status = 'Complete'
                continue