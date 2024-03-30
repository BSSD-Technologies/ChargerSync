from models.Course import Course, Section

class ConflictIdentifier():

    sections = []

    def __init__(self, input_sections = []):
        if not input_sections:
            self.sections = Section.query.all()
        else:
            self.sections = input_sections

    
        
    
        