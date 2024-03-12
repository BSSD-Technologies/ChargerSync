#To Do: Remove unused imports, copied all from app_db
from flask import Flask
from datetime import time
from extensions import db
from models.Course import Section, Course
import DataGenerator
from Scheduler import Scheduler
import json

def getFirstPart(name):
    names = name.split()
    return names[0]

def getLastPart(name):
    names = name.split()
    return names[1]


#Check course.py to confirm placements
#To Do: Write getter for the scheduler object in app_db.py
#scheduler = Scheduler() #Temporary, just to make the highlighting pretty

def formatForOutput(scheduler):
    for section in scheduler.sections:
        
        # Create an empty dictionary to hold the course information
        course_info = {}

        # Fill in the values for the course
        course_info["uuid"] = section.id
        course_info["section_id"] = section.course_id

        # Fill in instructor information
        #instructor = assigned_instructor
        course_info["instructor"] = {
            "fname": section.instructor.fname,
            "name": section.instructor.lname
        }

        # Fill in course information
        course_info["course"] = {
            "department": getFirstPart(section.name),
            "course_num": getLastPart(section.name)
        }

        # Fill in room information
        course_info["room"] = {
            "id": section.room,
            "max_capacity": "max_capacity_of_room" #To Do, write querying logic
        }

        # Fill in period information
        course_info["period"] = {
            "start_time": section.period.start_time,
            "end_time": "end_time_of_period", #To Do, write querying logic
            "day": section.period.day
        }

        #To Do: replace with funciton to pass to front-end
        print(course_info)




#Format of the JSON object for each class
#{
#  "uuid": "string",
#  "section_id": "string",
#  "instructor":
#      {
#       "fname": "string",
#       "lname": "string"
#      },
#   "course":
#      {
#       "department": "string",
#       "couse_num": "string"
#      },
#  "room":
#      {
#       "id": "string",
#       "max_capacity": "string"
#      },
#  "period": 
#      {
#        "start_time": "string",
#        "end_time": "string",
#        "day": "enum"
#      }
#}