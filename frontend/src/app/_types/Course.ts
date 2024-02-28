/**
 * Course
 * @id - course ID
 * @maxEnroll - maximum students allowed to enroll in the course
 * @prelimEnroll (optional) - current number of students enrolled in the course
 */
export type Course = {
  id: string;
  maxEnroll: number;
  prelimEnroll?: number;
};