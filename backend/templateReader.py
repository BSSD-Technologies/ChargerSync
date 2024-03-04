#! /usr/bin/env python3
import pandas as pd
from functions import *
import json

course_CSV_File = "./dummyData/CourseListTemplate.csv"
professor_CSV_File = "./dummyData/InstructorListTemplate.csv"
room_CSV_File = "./dummyData/RoomListTemplate.csv"
time_CSV_File = "./dummyData/TimeBlockTemplate.csv"




# # Using fileConversion.py
# # Will automatically send everything to a list
# course_ID, course_Max, course_Prelim = csv_to_list(course_CSV_File)
# prof_Fname, prof_Lname, prof_Prio = csv_to_list(professor_CSV_File)
# room_ID, room_Max = csv_to_list(room_CSV_File)
# startTime, endTime = csv_to_list(time_CSV_File)


courses = csv_to_json(course_CSV_File)
professors = csv_to_json(professor_CSV_File)
rooms = csv_to_json(room_CSV_File)
time = csv_to_json(time_CSV_File)

# print(time)


# time = convert_time_format(time)

# print(time)

# print(time)
# print_JSON(courses)
# print_JSON(professors)
# print_JSON(rooms)
# print_JSON(courses)
# print_JSON(time)