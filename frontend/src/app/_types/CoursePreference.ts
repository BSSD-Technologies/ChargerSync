import { v4 as uuidv4 } from "uuid";

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
  uuid: uuidv4(),
  instructor_uuid: "",
  course_uuid: "",
};