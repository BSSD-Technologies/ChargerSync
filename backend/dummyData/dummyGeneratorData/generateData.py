import pandas as pd
import json

def json_to_csv(json_filename, csv_mapping):
    with open(json_filename, 'r') as file:
        json_data = json.load(file)

    for csv_filename, columns in csv_mapping.items():
        # Convert JSON data into a DataFrame
        df = pd.DataFrame(json_data)
        
        # Select only the required columns
        df = df[columns]
        
        # Write DataFrame to CSV file
        df.to_csv(csv_filename, index=False)

# Define CSV mappings
csv_mapping = {
    'courseTemplate.csv': ['department', 'course', 'max_enrollment', 'enrollment'],
    'instructorTemplate.csv': ['instructor'],
    'periodTemplate.csv': ['start', 'end'],
    'roomTemplate.csv': ['building']
}

# Convert JSON data to CSV
json_to_csv("rawCourseData.json", csv_mapping)
