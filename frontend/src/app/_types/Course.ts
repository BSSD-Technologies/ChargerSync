/**
 * Course
 * @uuid Unique ID for course object;
 * @department Course department code;
 * @course_num Course number;
 * @max_enrollment Maximum enrollment for course;
 * @prelim_enrollment Preliminary enrollment for course; OPTIONAL
 */
export type Course = {
  uuid: string;
  department: string;
  course_num: string;
  max_enrollment: number;
  prelim_enrollment?: number;
};

export const defaultCourse = {
  department: "",
  course_num: "",
  max_enrollment: NaN,
};

export type ExportCourse = {
  "Department": string;
  "Course Number": string;
  "Max Enrollment": number;
  "Preliminary Enrollment"?: number | "";
};
