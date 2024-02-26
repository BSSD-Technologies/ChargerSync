import pandas as pd
import sqlalchemy as magic

# df = pd.read_excel("Template.xlsx", sheet_name=None)

courses = pd.read_excel('Template.xlsx', sheet_name='Courses')
classrooms = pd.read_excel('Template.xlsx', sheet_name='Classrooms')
timeSlots = pd.read_excel('Template.xlsx', sheet_name='Time')
professors = pd.read_excel('Template.xlsx', sheet_name='Professors')

print(courses.items())