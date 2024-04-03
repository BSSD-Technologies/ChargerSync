import json, csv, random, pandas as pd

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
        df = pd.DataFrame(json_data).sample(n=100)


        if csv_filename == 'courseTemplate.csv':
            # Combine logic to remove hyphens and duplicates
            df['course_number'] = df['course'].apply(lambda x: x[:3])  # Rename 'course' to 'course_number'
            df.drop_duplicates(subset=['department', 'course_number'], inplace=True)  # Update to 'course_number'
            df.rename(columns={'enrollment': 'preliminary_enrollment'}, inplace=True)
            df = df[['department', 'course_number', 'max_enrollment', 'preliminary_enrollment']]





        elif csv_filename == 'instructorTemplate.csv':
            # Remove duplicates based on 'instructor' column
            df.drop_duplicates(subset=['instructor'], inplace=True)
            
            # Split 'instructor' column into 'first_name' and 'last_name'
            df[['first_name', 'last_name']] = df['instructor'].str.split(n=1, expand=True)
            
            # Filter out rows where 'first_name' or 'last_name' is 'STAFF'
            df = df[(df['first_name'] != 'STAFF') & (df['last_name'] != 'STAFF')]
            
            # Add random priority column
            df['priority'] = [random.randint(1, 10) for _ in range(len(df))]

            df = df[['first_name', 'last_name', 'priority']]




        elif csv_filename == 'roomTemplate.csv':
            # Filter out rows where 'building' is 'ONLN' or 'TBA'
            df = df[~df['building'].isin(['ONLN', 'TBA', 'REMT', 'A&M', 'ONLINE'])]
            
            # Combine 'building' and 'room' to create 'room_id'
            df['room_id'] = df['building'] + '-' + df['room']

            min_capacity = 30
            max_capacity = 150
            capacity_increment = 10
            df['max_capacity'] = [random.randrange(min_capacity, max_capacity+1, capacity_increment) for _ in range(len(df))]
            
            # Sort DataFrame by 'room_id'
            df.sort_values(by='room_id', inplace=True)

            df = df[['room_id', 'max_capacity']]



        elif csv_filename == 'periodTemplate.csv':
            df = df[~df['start'].isin(['TBA'])]
            df.drop_duplicates(subset=['start', 'end'], inplace=True)
            df.sort_values(by='start', inplace=True)
            df.rename(columns={'start': 'start_time', 'end': 'end_time'}, inplace=True)

            # Convert time format from XX:YYAM/PM to XX:YY AM/PM
            df['start_time'] = pd.to_datetime(df['start_time'], format='%I:%M%p').dt.strftime('%I:%M %p')
            df['end_time'] = pd.to_datetime(df['end_time'], format='%I:%M%p').dt.strftime('%I:%M %p')

            df = df[['start_time', 'end_time']]


        # Select only the required columns
        df = df[columns]
        # Write DataFrame to CSV file
        df.to_csv(csv_filename, index=False)

# Define CSV mappings
csv_mapping = {
    'courseTemplate.csv': ['department', 'course_number', 'max_enrollment', 'preliminary_enrollment'],
    'instructorTemplate.csv': ['first_name', 'last_name', 'priority'],
    'periodTemplate.csv': ['start_time', 'end_time'],
    'roomTemplate.csv': ['room_id', 'max_capacity']
}

# Convert JSON data to CSV
json_to_csv("rawCourseData.json", csv_mapping)