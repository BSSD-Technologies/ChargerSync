import pandas as pd
import json
import csv
import random
from os import remove
from functools import reduce

def read_csv_as_list(csv_file):
    data = []
    with open(csv_file, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            data.append(row)
    return data

def json_to_csv(json_filename, csv_mapping):
    with open(json_filename, 'r') as file:
        json_data = json.load(file)

    for csv_filename, columns in csv_mapping.items():
        # Convert JSON data into a DataFrame
        df = pd.DataFrame(json_data)
        
        # Select only the required columns
        df = df[columns]
        
        if csv_filename == 'roomTemplate.csv':
            min_capacity = 30
            max_capacity = 150
            capacity_increment = 10
            df['Max Capacity'] = [random.randrange(min_capacity, max_capacity+1, capacity_increment) for _ in range(len(df))]

        # Write DataFrame to CSV file
        df.to_csv(csv_filename, index=False)

# Define CSV mappings
csv_mapping = {
    'courseTemplate.csv': ['department', 'course', 'max_enrollment', 'enrollment'],
    'instructorTemplate.csv': ['instructor'],
    'periodTemplate.csv': ['start', 'end'],
    'roomTemplate.csv': ['building']
}
def removeCourseHyphensAndDuplicates(csv_filename):
    csv_data = read_csv_as_list(csv_filename)
    j = 0
    for i in csv_data:
        if j != 0:        
            temp = i[1]
            temp2 = temp[:3]
            csv_data[j][1] = temp2
            j+=1
        else:
            j+=1
    csv_data.pop(0)

    temparr = []
    results = []
    j = 0
    for i in csv_data:
        temp = i [0]
        temp2 = i[1]
        temp_str = i[0] + ' ' + i[1]

        if j!=0:
            if temp_str in temparr:
                results.append(i)
            else:
                temparr.append(temp_str)
            j+=1
        else:
            temparr.append(temp_str)
            j+=1

    for i in results:
        csv_data.remove(i)

    print(csv_data)
    remove(csv_filename)
    myFile = open(csv_filename, 'w')
    writer = csv.writer(myFile)
    writer.writerow(['Department', 'Course', 'Max Enrollment', 'Preliminary Enrollment'])
    for data_list in csv_data:
        writer.writerow(data_list)
    myFile.close()

def fixNameIssues(csv_filename):
    csv_data = read_csv_as_list(csv_filename)  # Assuming read_csv_as_list is defined elsewhere
    temparr = []
    unique_names = set()  # Store unique names to eliminate duplicates
    for i, row in enumerate(csv_data):
        if i != 0:  # Skip header
            full_name = ' '.join(row)  # Combine all parts of the name
            name_parts = full_name.split()
            last_name = name_parts[-1]
            if last_name != "STAFF":
                first_name = ' '.join(name_parts[:-1])
                name = (first_name, last_name)  # Tuple to represent the name
                if name not in unique_names:  # Check if the name is unique
                    unique_names.add(name)
                    temparr.append([first_name, last_name])
            else:
                continue

    # Write to the new CSV file
    with open("instructorTemplate.csv", 'w', newline='') as myFile:
        writer = csv.writer(myFile)
        writer.writerow(['First Name', 'Last Name'])
        writer.writerows(temparr)

    return

# Convert JSON data to CSV
json_to_csv("rawCourseData.json", csv_mapping)
removeCourseHyphensAndDuplicates('courseTemplate.csv')
fixNameIssues('instructorTemplate.csv')
