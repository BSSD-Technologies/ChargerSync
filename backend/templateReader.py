#! /usr/bin/env python3
import pandas as pd

course_CSV_File = "./dummyData/CourseListTemplate.csv"
course_ID, course_Max, course_Prelim = load_course_data(course_CSV_File)

professor_CSV_File = "./dummyData/InstructorListTemplate.csv"
prof_Fname, prof_Lname, prof_Prio = load_prof_data(professor_CSV_File)

room_CSV_File = "./dummyData/RoomListTemplate.csv"
time_CSV_File = "./dummyData/TimeBlockTemplate.csv"