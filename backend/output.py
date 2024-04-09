##############################################################
# Output.py
# Purpose: Format the results of the scheduler into JSON objects
#Format of the JSON object for each class
#{
#  "uuid": "string",
#  "section_id": "string",
#  "instructor":
#      {
#       "uuid": "string",
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
#       "uuid": "string",
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


def formatForOutput(scheduler):
    # List of sections
    section_list = []

    for section in scheduler:
        
        # All "except" conditions should return "TBD", EXCEPT for Period properties.
        try:   
            a = section.period.start_time
        except:
            a = "No Period Assigned"
        
        try:   
            b = section.period.day
        except:
            # IMPORTANT - "day" MUST have the following value in order to work on the frontend:
            # "No Period Assigned"
            b = "No Period Assigned"

        try:
            room_id = section.room.name
        except:
            room_id = "TBD"

        try:
            c = section.room.max_occupancy
        except:
            c = "TBD"

        try:
            roomUuid = section.room_id
        except:
            roomUuid = ""

        try:   
            d = section.period.end_time
        except:
            d = "No Period Assigned"

        try:
            instructorUuid = section.instructor_id
        except:
            instructorUuid = ""

        try:
            instructor_fname_assignment = section.instructor.fname
        except:
            instructor_fname_assignment = "TBD"
        
        try:
            instructor_lname_assignment = section.instructor.lname
        except:
            instructor_lname_assignment = "TBD"

        # Create an empty dictionary to hold the course information
        course_info = {}

        # Fill in the values for the course
        course_info["uuid"] = section.id
        course_info["section_id"] = section.section_no

        # Fill in instructor information
        course_info["instructor"] = {
            "uuid": instructorUuid,
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
            "uuid": roomUuid,
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