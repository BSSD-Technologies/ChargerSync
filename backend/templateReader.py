#! /usr/bin/env python3
import pandas as pd
from functions.Course import *
from functions.Instructor import *
from functions.Room import *
from functions.Period import *
from functions.csv2List import *
import json

course_CSV_File = "./dummyData/CourseListTemplate.csv"
professor_CSV_File = "./dummyData/InstructorListTemplate.csv"
room_CSV_File = "./dummyData/RoomListTemplate.csv"
time_CSV_File = "./dummyData/TimeBlockTemplate.csv"




# # Using csv2List.py
# # Will automatically send everything to a list
# course_ID, course_Max, course_Prelim = csv_to_lists(course_CSV_File)
# prof_Fname, prof_Lname, prof_Prio = csv_to_lists(professor_CSV_File)
# room_ID, room_Max = csv_to_lists(room_CSV_File)
# startTime, endTime = csv_to_lists(time_CSV_File)

# print(course_ID, course_Max, course_Prelim)
# print(prof_Fname, prof_Lname, prof_Prio)
# print(room_ID, room_Max)
# print(startTime, endTime)

courses = csv_to_json(course_CSV_File)
professors = csv_to_json(professor_CSV_File)
print(professors)




# course_ID, course_Max, course_Prelim = course_CSV_to_List(course_CSV_File)
# prof_Fname, prof_Lname, prof_Prio = prof_CSV_to_List(professor_CSV_File)
# room_ID, room_Max = room_CSV_to_List(room_CSV_File)
# startTime, endTime = time_CSV_to_List(time_CSV_File)

# # Used to make JSON print pretty
# x = json.loads(course_CSV_to_JSON(course_ID,course_Max,course_Prelim))
# print(json.dumps(x, indent=2))