#! /usr/bin/env python3
from functions import *


course_CSV_File = "./dummyData/courseTemplate.csv"
instructor_CSV_File = "./dummyData/instructorTemplate.csv"
room_CSV_File = "./dummyData/roomTemplate.csv"
period_CSV_File = "./dummyData/periodTemplate.csv"

# Using def csv_to_json from functions.py
# Create objects for the respective item with data from their CSV sheet
courses = csv_to_json(course_CSV_File)
instructors = csv_to_json(instructor_CSV_File)
rooms = csv_to_json(room_CSV_File)
periods = csv_to_json(period_CSV_File)


# Used to print and see the JSON object of the data from the CSV sheet
# print_JSON(periods)
# print_JSON(courses)
# print_JSON(instructors)
# print_JSON(rooms)