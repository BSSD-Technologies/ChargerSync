/**
 * Instructor
 * @uuid - unique ID for instructor
 * @firstName - instructor first name
 * @lastName - instructor last name
 * @priority - priority level among other instructors
 */
export type Instructor = {
  uuid: string;
  firstName: string;
  lastName: string;
  priority?: number | 0;
}