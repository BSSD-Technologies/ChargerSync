import pandas as pd
import json

def csv_to_list(csv_file):
    """
    Load data from a CSV file.

    Args:
    - csv_file (str): Path to the CSV file.

    Returns:
    - Tuple: A tuple containing lists corresponding to the columns in the CSV file.
    """
    # Read the CSV file
    df = pd.read_csv(csv_file)

    # Convert column names to snake_case
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]

    # Convert each column to a list
    list_data = df.values.T.tolist()

    return list_data

import pandas as pd

def csv_to_json(csv_file):
    """
    Convert CSV data to a list of lists.

    Args:
    - csv_file (str): Path to the CSV file.

    Returns:
    - list: A list of lists where each inner list represents a row of data.
    """
    # Read the CSV file
    df = pd.read_csv(csv_file)

    # Convert column names to snake_case
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]

    # Convert DataFrame to dictionary of lists
    json_data = df.to_json(orient='records')

    return json_data

def print_JSON(json_data):
    # Used to make JSON print pretty
    x = json.loads(json_data)
    print(json.dumps(x, indent=2))

    return x

def process_time(time_str):
    """
    Process the time string and convert it to a different format.

    Args:
    - time_str (str): Time string.

    Returns:
    - str: Processed time string.
    """
    try:
        # Parse the time string
        time_obj = pd.to_datetime(time_str, format='%I:%M %p')

        # Convert to 24-hour format in HH:MM format
        time_24hr = time_obj.strftime('%H:%M')

        return time_24hr
    except ValueError:
        return f"Error: Invalid time format - {time_str}"
    
def convert_time_format(time_json):
    """
    Convert time format in JSON data and assign time slot IDs.

    Args:
    - time_json (str): JSON formatted string containing time data.

    Returns:
    - str: JSON formatted string with time data converted to a different format and time slot IDs assigned.
    """
    # Parse JSON string into Python object
    time_data = json.loads(time_json)

    # Initialize timeslot ID counter
    timeslot_id = 1

    # Process time strings and assign time slot IDs
    for item in time_data:
        start_time = pd.to_datetime(item['start_time'], format='%I:%M %p')
        end_time = pd.to_datetime(item['end_time'], format='%I:%M %p')
        time_slots = int((end_time - start_time).total_seconds() / 3600)  # Calculate number of time slots

        # Assign time slot IDs
        for i in range(1, time_slots + 1):
            item[f'timeslot'] = timeslot_id
            timeslot_id += 1

    # Convert Python object back to JSON string
    updated_time_json = json.dumps(time_data)

    return updated_time_json

