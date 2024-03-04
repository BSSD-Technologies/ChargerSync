#! /usr/bin/env python3
import pandas as pd
from functions.Course import load_course_data
from functions.Instructor import load_prof_data
from functions.Room import load_room_data
from functions.Period import load_time_data

course_CSV_File = "./dummyData/CourseListTemplate.csv"
course_ID, course_Max, course_Prelim = load_course_data(course_CSV_File)

professor_CSV_File = "./dummyData/InstructorListTemplate.csv"
prof_Fname, prof_Lname, prof_Prio = load_prof_data(professor_CSV_File)

room_CSV_File = "./dummyData/RoomListTemplate.csv"
room_ID, room_Max = load_room_data(room_CSV_File)

time_CSV_File = "./dummyData/TimeBlockTemplate.csv"
startTime, endTime = load_time_data(time_CSV_File)