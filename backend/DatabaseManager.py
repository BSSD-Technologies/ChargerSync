from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference
from extensions import db


def loadData(json_data):
    # PARSE DATA AND PUT INTO DATABASE
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

def clear():
    # Query everything
    courses = Course.query.all()
    sections = Section.query.all()
    instructors = Instructor.query.all()
    periods = Period.query.all()
    rooms = Room.query.all()
    period_prefs = PeriodPreference.query.all()
    course_prefs = CoursePreference.query.all()

    # delete everything 
    for course in courses:
        db.session.delete(course)

    for section in sections: 
        db.session.delete(section)

    for instructor in instructors:
        db.session.delete(instructor)
    
    for period in periods:
        db.session.delete(period)

    for room in rooms:
        db.session.delete(room)
    
    for period_pref in period_prefs:
        db.session.delete(period_pref)

    for course_pref in course_prefs:
        db.session.delete(course_pref)