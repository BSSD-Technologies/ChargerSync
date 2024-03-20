from flask import Flask, jsonify, request
from flask_cors import CORS  
from functions import *

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def hello_world():
    return 'Hello, World!'

"""
/import/courses
User uploads a course template .csv file to be parsed into JSON object.

Error Codes:
200 - OK
400 - No file parameter was provided
415 - File type is invalid (not a CSV)
412 - File does not match expected template
"""
@app.route('/import/courses',  methods=['POST'])
def process_courses_csv():
    # Check if a file is present in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Check if the file has a CSV extension
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Invalid file format. Must be a CSV file'}), 415
    
    # Parse file from csv to JSON object
    # Validate for course template headers
    parseFile = csv_to_json(file, "course")

    # Check if template was valid and return value
    if (parseFile):
        return parseFile, 200
    else:
        return jsonify({'error': "Invalid template."}), 412
    
"""
/import/rooms
User uploads a room template .csv file to be parsed into JSON object.

Error Codes:
200 - OK
400 - No file parameter was provided
415 - File type is invalid (not a CSV)
412 - File does not match expected template
"""
@app.route('/import/rooms',  methods=['POST'])
def process_rooms_csv():
    # Check if a file is present in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Check if the file has a CSV extension
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Invalid file format. Must be a CSV file'}), 415
    
    # Parse file from csv to JSON object
    # Validate for room template headers
    parseFile = csv_to_json(file, "room")

    # Check if template was valid and return value
    if (parseFile):
        return parseFile, 200
    else:
        return jsonify({'error': "Invalid template."}), 412

"""
/import/periods
User uploads a period template .csv file to be parsed into JSON object.

Error Codes:
200 - OK
400 - No file parameter was provided
415 - File type is invalid (not a CSV)
412 - File does not match expected template
"""
@app.route('/import/periods',  methods=['POST'])
def process_periods_csv():
    # Check if a file is present in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Check if the file has a CSV extension
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Invalid file format. Must be a CSV file'}), 415
    
    # Parse file from csv to JSON object
    # Validate for period template headers
    parseFile = csv_to_json(file, "period")

    # Check if template was valid and return value
    if (parseFile):
        return parseFile, 200
    else:
        return jsonify({'error': "Invalid template."}), 412
    
"""
/import/instructors
User uploads an instructor template .csv file to be parsed into JSON object.

Error Codes:
200 - OK
400 - No file parameter was provided
415 - File type is invalid (not a CSV)
412 - File does not match expected template
"""
@app.route('/import/instructors',  methods=['POST'])
def process_instructors_csv():
    # Check if a file is present in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Check if the file has a CSV extension
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Invalid file format. Must be a CSV file'}), 415
    
    # Parse file from csv to JSON object
    # Validate for instructor template headers
    parseFile = csv_to_json(file, "instructor")

    # Check if template was valid and return value
    if (parseFile):
        return parseFile, 200
    else:
        return jsonify({'error': "Invalid template."}), 412
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
