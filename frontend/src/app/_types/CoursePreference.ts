/**
 * Course Preference
 * @uuid Unique ID for course preference;
 * @instructor_uuid unique ID to corresponding instructor;
 * @course_uuid unique ID to corresponding course;
 */
export type CoursePreference = {
  uuid: string;
  instructor_uuid: string;
  course_uuid: string;
};

export const defaultCoursePreference = {
  instructor_uuid: "",
  course_uuid: "",
};