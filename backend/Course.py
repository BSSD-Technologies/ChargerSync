from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)

    def __repr__(self):
        return '<Course %r>' % self.name
    
with app.app_context():
    # Now you can perform database operations
    db.create_all()

    existing_course_names = {course.name for course in Course.query.all()} # This prevents Integrity Errors!

    courses_to_add = [
        Course(name='CS121'),
        Course(name='CS453')
    ]
    
    for course in courses_to_add:
        if course.name not in existing_course_names:
            db.session.add(course)

    db.session.commit()
    print(Course.query.all())



