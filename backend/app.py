from flask import Flask, jsonify, request
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/import/courses', methods=['POST'])
def process_csv():
    # Check if a file is present in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Check if the file has a CSV extension
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Invalid file format. Must be a CSV file'}), 400
    
    

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
