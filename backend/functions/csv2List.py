import pandas as pd
import json

def csv_to_lists(csv_file):
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
    column_lists = df.values.T.tolist()

    return column_lists


import pandas as pd

def csv_to_json(csv_file):
    """
    Convert CSV data to a dictionary containing lists for each column.

    Args:
    - csv_file (str): Path to the CSV file.

    Returns:
    - dict: A dictionary where keys are column names and values are lists containing the column data.
    """
    # Read the CSV file
    df = pd.read_csv(csv_file)

    # Convert column names to snake_case
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]

    # Convert DataFrame to dictionary of lists
    data_dict = df.to_dict(orient='list')

    return data_dict
