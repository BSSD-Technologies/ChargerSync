from output import formatForOutput
from models.Course import Section, Course
from models.Instructor import Instructor
from models.Room import Room
from models.Period import Period
from models.Preferences import CoursePreference, PeriodPreference
from extensions import db
from sqlalchemy import or_, and_

def filter_by_department(departments):
    filteredSections = Section.query.filter(or_(Section.status=='Complete', Section.status=='Incomplete'), and_(Section.department.in_(departments))).all()
    formattedSections = formatForOutput(filteredSections)
    return formattedSections

# Needs an ID
def filter_by_room(rooms):
    filteredSections = Section.query.filter(or_(Section.status=='Complete', Section.status=='Incomplete'), and_(Section.room_id.in_(rooms))).all()
    formattedSections = formatForOutput(filteredSections)
    return formattedSections

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
    # Delete period preferences
    PeriodPreference.query.delete()

    # Delete course preferences
    CoursePreference.query.delete()

    # Delete sections
    Section.query.delete()

    # Delete courses
    Course.query.delete()

    # Delete instructors
    Instructor.query.delete()

    # Delete periods
    Period.query.delete()

    # Delete rooms
    Room.query.delete()

    db.session.commit()
    db.session.flush()