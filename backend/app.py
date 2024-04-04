from flask import Flask, jsonify, request
from flask_cors import CORS  
from functions import *
from extensions import db
from Schedule import Schedule
from output import formatForOutput
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference

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
    global generated_schedule
    # Ensure request contains JSON data
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400
    else:
        #return jsonify({'no error': 'Request was good'}), 200
        #DataGenerator.loadData()
        global generated_schedule

        if generated_schedule:
            generated_schedule = None
            db.drop_all()
            db.create_all()

        # Read JSON data from request
        json_data = request.json
        
        # Parse data to put into database
        # Add Courses
        for course in json_data.get("courses"):
            new_course = Course(id=course.get("uuid"), department=course.get("department"), num=course.get("course_num"), max_enrollment=course.get("max_enrollment"))
            db.session.add(new_course)
        db.session.commit()

        # Add Rooms
        for room in json_data.get("rooms"):
            new_room = Room(id=room.get("uuid"), name=room.get("room_id"), max_occupancy=room.get("max_capacity"))
            db.session.add(new_room)
        db.session.commit()

        # Add Periods
        for period in json_data.get("periods"):
            new_period = Period(id=period.get("uuid"), start_time=period.get("start_time"), end_time=period.get("end_time"), day=period.get("day"))
            db.session.add(new_period)
        db.session.commit()

        # Add Instructors
        for instructor in json_data.get("instructors"):
            new_instructor = Instructor(id=instructor.get("uuid"), fname=instructor.get("fname"), lname=instructor.get("lname"), priority=instructor.get("priority"))
            db.session.add(new_instructor)
        db.session.commit()

        # Add Course Preference
        for course_pref in json_data.get("course_prefs"):
            new_course_pref = CoursePreference(id=course_pref.get("uuid"), instructor_id=course_pref.get("instructor_uuid"), course_id=course_pref.get("course_uuid"))
            db.session.add(new_course_pref)
        db.session.commit()

        # Add Period Preference
        for period_pref in json_data.get("period_prefs"):
            new_period_pref = PeriodPreference(id=period_pref.get("uuid"), instructor_id=period_pref.get("instructor_uuid"), period_id=period_pref.get("period_uuid"))
            db.session.add(new_period_pref)
        db.session.commit()

        
        schedule = Schedule()
        schedule.generate()
        generated_schedule = schedule

        
        schedule_data = formatForOutput(schedule.schedule)
        return jsonify({'schedule': schedule_data}), 200
        #return jsonify({'schedule': "still testing"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()

    app.run(debug=True, host="0.0.0.0")
