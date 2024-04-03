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
#   "status": { "Complete" | "Conflict" | "Incomplete" }
#}
#################################################################

# def getFirstPart(name):
#     names = name.split()
#     return names[0]

# def getLastPart(name):
#     names = name.split()
#     return names[1]


def formatForOutput(schedule):
    # List of sections
    section_list = []

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
            room_id = section.room.name
        except:
            room_id = "No Room Assigned"

        try:
            c = section.room.max_occupancy
        except:
            c = "No Room Assigned"

        try:   
            d = section.period.end_time
        except:
            d = "No Period Assigned"

        try:
            instructor_fname_assignment = section.instructor.fname
        except:
            instructor_fname_assignment = "No Instructor Assigned"
        
        try:
            instructor_lname_assignment = section.instructor.lname
        except:
            instructor_lname_assignment = "No Instructor Assigned"

        # Create an empty dictionary to hold the course information
        course_info = {}

        # Fill in the values for the course
        course_info["uuid"] = section.id
        course_info["section_id"] = section.name

        # Fill in instructor information
        course_info["instructor"] = {
            "fname": instructor_fname_assignment,
            "lname": instructor_lname_assignment
        }

        # Fill in course information
        course_info["course"] = {
            "department": section.department,
            "course_num": section.num
        }

        # Fill in room information
        course_info["room"] = {
            "id": room_id,
            "max_capacity": c
        }

        # Fill in period information
        course_info["period"] = {
            "start_time": a,
            "end_time": d,
            "day": b
        }

        # Fill in section status
        course_info["status"] = section.status

        # Append course_info to section_list
        section_list.append(course_info)

        #To Do: replace with funciton to pass to front-end
        #print(course_info)
    
    return(section_list)