##############################################################
# Output.py
# Purpose: Format the results of the scheduler into JSON objects
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
#################################################################

def getFirstPart(name):
    names = name.split()
    return names[0]

def getLastPart(name):
    names = name.split()
    return names[1]


def formatForOutput(schedule):
    for section in schedule.schedule:
        
        try:   
            a = section.period.start_time
        except:
            a = "No Period Assigned"
        
        try:   
            b = section.period.day
        except:
            b = "No Period Assigned"

        try:
            c = section.room.max_occupancy
        except:
            c = "No Room Assigned"

        try:   
            d = section.period.end_time
        except:
            d = "No Period Assigned" 

        try:
            instructor_assignment = section.instructor
        except:
            instructor_assignment = "No Instructor Assigned"

        # Create an empty dictionary to hold the course information
        course_info = {}

        # Fill in the values for the course
        course_info["uuid"] = section.id
        course_info["section_id"] = section.course_id

        # Fill in instructor information
        course_info["instructor"] = {
            "fname": instructor_assignment,
            "lname": instructor_assignment
        }

        # Fill in course information
        course_info["course"] = {
            "department": getFirstPart(section.name),
            "course_num": getLastPart(section.name)
        }

        # Fill in room information
        course_info["room"] = {
            "id": section.room,
            "max_capacity": c
        }

        # Fill in period information
        course_info["period"] = {
            "start_time": a,
            "end_time": d,
            "day": b
        }

        #To Do: replace with funciton to pass to front-end
        print(course_info)