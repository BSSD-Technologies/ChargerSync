from flask import Flask, jsonify, request
from flask_cors import CORS  
from functions import *
from extensions import db
from Schedule import Schedule
from output import formatForOutput
import DatabaseManager

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)
# Setting up the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db.init_app(app)

generated_schedule = None

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
    
"""
/generate/schedule
User sends all inputted data to be generated into a schedule, then the schedule
is sent back to the user.

Error Codes:
200 - OK
400 - Not JSON data
"""
@app.route('/generate/schedule',  methods=['POST'])
def generate_schedule():
    # Ensure request contains JSON data
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400
    else:
        global generated_schedule

        schedule = None

        print("Hello!")

        # Try to clear database before reloading
        if generated_schedule is not None:
            generated_schedule = None
            DatabaseManager.clear()
            db.session.commit()

        # Read JSON data from request
        json_data = request.json
        
        # PARSE DATA AND PUT INTO DATABASE
        DatabaseManager.loadData(json_data)

        # Generate schedule
        schedule = Schedule()
        schedule.generate()

        generated_schedule = schedule

        csvOutput.return_fullSchedule_CSV(schedule)
        csvOutput.return_filtered_dept(schedule, "CE")
        csvOutput.return_filtered_prof(schedule, "Johnson David")
        csvOutput.return_filtered_room(schedule, "SST-107")

        schedule_data = formatForOutput(schedule.schedule)
        return jsonify({'schedule': schedule_data}), 200

"""
/generate/conflicts
User requests all sections with conflicts, and data is returned as JSON

Error Codes:
200 - OK
400 - No schedule exists yet
"""
@app.route('/generate/conflicts',  methods=['GET'])
def generate_conflicts():
    # Ensure request happens after schedule is generated
    if not generated_schedule:
        return jsonify({'error': 'No schedule generated'}), 400
    else:
        # Format output of conflicts to be returned
        conflict_data = formatForOutput(generated_schedule.conflicts)
        return jsonify({'conflicts': conflict_data}), 200
    
"""
/generate/incompletes
User requests all sections with incompletes, and data is returned as JSON

Error Codes:
200 - OK
400 - No schedule exists yet
"""
@app.route('/generate/incompletes',  methods=['GET'])
def generate_incompletes():
    # Ensure request happens after schedule is generated
    if not generated_schedule:
        return jsonify({'error': 'No schedule generated'}), 400
    else:
        # Format output of incompletes to be returned
        incompletes_data = formatForOutput(generated_schedule.incompletes)
        return jsonify({'incompletes': incompletes_data}), 200
    
"""
/countConflicts
User requests number of sections with conflicts, and value is returned.

Error Codes:
200 - OK
400 - No schedule exists yet
"""
@app.route('/countConflicts',  methods=['GET'])
def count_conflicts():
    # Ensure request happens after schedule is generated
    if not generated_schedule:
        return jsonify({'error': 'No schedule generated'}), 400
    else:
        # Get number of sections with conflicts
        count = len(generated_schedule.conflicts)
        return jsonify({'count': count}), 200
    
"""
/countIncompletes
User requests number of sections with incompletes, and value is returned.

Error Codes:
200 - OK
400 - No schedule exists yet
"""
@app.route('/countIncompletes',  methods=['GET'])
def count_incompletes():
    # Ensure request happens after schedule is generated
    if not generated_schedule:
        return jsonify({'error': 'No schedule generated'}), 400
    else:
        # Get number of sections with incompletes
        count = len(generated_schedule.incompletes)
        return jsonify({'count': count}), 200

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()

    app.run(debug=True, host="0.0.0.0")
