import csv

def getFirstPart(name):
    names = name.split()
    return names[0]


def return_fullSchedule_CSV(scheduler):
    for section in scheduler.schedule:

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


        course = section.name
        days = b
        start_time = a
        end_time = d
        room = str(section.room)
        room2 = room.replace("'", "").replace("<", "").replace(">", "").replace("Room ","")
        instructor = str(instructor_assignment)
        instructor2 = instructor.replace("'", "").replace("<", "").replace(">", "").replace("Instructor ","")

        with open("FullSchedule.csv", 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([course, days, start_time, end_time, room2, instructor2])

def return_filtered_dept(scheduler, filtered_department):
    for section in scheduler.schedule:
        if filtered_department == getFirstPart(section.name):
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


            course = section.name
            days = b
            start_time = a
            end_time = d
            room = str(section.room)
            room2 = room.replace("'", "").replace("<", "").replace(">", "").replace("Room ","")
            instructor = str(instructor_assignment)
            instructor2 = instructor.replace("'", "").replace("<", "").replace(">", "").replace("Instructor ","")
            
            with open("FilteredDepartmentSchedule.csv", 'a', newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([course, days, start_time, end_time, room2, instructor2])
        else:
            continue

def return_filtered_prof(scheduler, filtered_professor):
    for section in scheduler.schedule:

        try:
            instructor_assignment = section.instructor
        except:
            instructor_assignment = "No Instructor Assigned"
        instructor = str(instructor_assignment)
        instructor2 = instructor.replace("'", "").replace("<", "").replace(">", "").replace("Instructor ","").strip()
        if(filtered_professor == instructor2):

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


            course = section.name
            days = b
            start_time = a
            end_time = d
            room = str(section.room)
            room2 = room.replace("'", "").replace("<", "").replace(">", "").replace("Room ","")
            
            with open("FilteredProfessorSchedule.csv", 'a', newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([course, days, start_time, end_time, room2, instructor2])
        else:
            continue

def return_filtered_room(scheduler, filtered_room):
    for section in scheduler.schedule:

        room = str(section.room)
        room2 = room.replace("'", "").replace("<", "").replace(">", "").replace("Room ","")

        if(filtered_room == room2):

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


            course = section.name
            days = b
            start_time = a
            end_time = d
            instructor = str(instructor_assignment)
            instructor2 = instructor.replace("'", "").replace("<", "").replace(">", "").replace("Instructor ","")
            
            with open("FilteredRoomSchedule.csv", 'a', newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([course, days, start_time, end_time, room2, instructor2])
        else:
            continue
