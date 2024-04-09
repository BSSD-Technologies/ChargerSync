import csv

def return_fullSchedule_CSV(scheduler):
    i = 0

    with open("FullSchedule.csv", 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Course','Days', 'Start Time', 'End Time', 'Location', 'Instructor'])

    for section in scheduler.schedule:
        try:   
            a = section.period.start_time
        except:
            a = "TBD"
        
        try:   
            b = section.period.day
        except:
            b = "TBD"

        try:
            c = section.room.max_occupancy
        except:
            c = "TBD"

        try:   
            d = section.period.end_time
        except:
            d = "TBD" 

        try:
            instructor_assignment = section.instructor
        except:
            instructor_assignment = "TBD"


        course = section.name
        print(course)
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
    i = 0

    with open("FilteredDepartmentSchedule.csv", 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Course','Days', 'Start Time', 'End Time', 'Location', 'Instructor'])
    for i in filtered_department:
        for section in scheduler.schedule:
            if i == section.department:
                try:   
                    a = section.period.start_time
                except:
                    a = "TBD"
                
                try:   
                    b = section.period.day
                except:
                    b = "TBD"

                try:
                    c = section.room.max_occupancy
                except:
                    c = "TBD"

                try:   
                    d = section.period.end_time
                except:
                    d = "TBD" 

                try:
                    instructor_assignment = section.instructor
                except:
                    instructor_assignment = "TBD"


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
    i = 0

    with open("FilteredProfessorSchedule.csv", 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Course','Days', 'Start Time', 'End Time', 'Location', 'Instructor'])

    for i in filtered_professor:
        for section in scheduler.schedule:

            try:
                instructor_assignment = section.instructor
            except:
                instructor_assignment = "TBD"
            instructor = str(instructor_assignment)
            instructor2 = instructor.replace("'", "").replace("<", "").replace(">", "").replace("Instructor ","").strip()
            if(i == instructor2):

                try:   
                    a = section.period.start_time
                except:
                    a = "TBD"
                
                try:   
                    b = section.period.day
                except:
                    b = "TBD"

                try:
                    c = section.room.max_occupancy
                except:
                    c = "TBD"

                try:   
                    d = section.period.end_time
                except:
                    d = "TBD" 


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
    i = 0

    with open("FilteredRoomSchedule.csv", 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Course','Days', 'Start Time', 'End Time', 'Location', 'Instructor'])

    for i in filtered_room:
        for section in scheduler.schedule:

            room = str(section.room)
            room2 = room.replace("'", "").replace("<", "").replace(">", "").replace("Room ","")
            
            if(i == room2):

                try:   
                    a = section.period.start_time
                except:
                    a = "TBD"
                
                try:   
                    b = section.period.day
                except:
                    b = "TBD"

                try:
                    c = section.room.max_occupancy
                except:
                    c = "TBD"

                try:   
                    d = section.period.end_time
                except:
                    d = "TBD" 

                try:
                    instructor_assignment = section.instructor
                except:
                    instructor_assignment = "TBD"


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
