#!/usr/bin/env python3

import pandas as pd
import sqlalchemy as magic
from datetime import time
import os


# isFile = os.path.isfile(fpath)

# print(isFile)
# df = pd.read_excel("Template.xlsx", sheet_name=None)

courseList = pd.read_csv("./dummyData/CourseListTemplate.csv", dtype={0:'string', 1:'int', 2:'int'})

course_ID = courseList['Course ID']
course_Max = courseList['Max Enrollment']
course_Prelim = courseList['Preliminary Enrollment']

print(courseList.dtypes)


# professorList = pd.read_csv("./dummyData/InstructorListTemplate.csv", dtype={0:'string', 1:'string', 2:'int'})
# preferenceList = pd.read_csv("./dummyData/PreferenceList.csv")
# timeList = pd.read_csv("./dummyData/TimeBlockTemplate.csv")
# roomList = pd.read_csv("./dummyData/RoomListTemplate.csv")


