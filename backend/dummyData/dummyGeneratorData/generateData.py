import pandas as pd
import json
import csv
import random
from os import remove

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
    writer.writerow(['department', 'course', 'max_enrollment', 'enrollment'])
    for data_list in csv_data:
        writer.writerow(data_list)
    myFile.close()


# Convert JSON data to CSV
json_to_csv("rawCourseData.json", csv_mapping)
removeCourseHyphensAndDuplicates('courseTemplate.csv')
