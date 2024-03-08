import { v4 as uuidv4 } from "uuid";

/**
 * Instructor
 * @uuid - unique ID for instructor
 * @fname Instructor first name;
 * @lname Instructor last name;
 * @priority Priority relative to other instructors;
 */
export type Instructor = {
  uuid: string;
  fname: string;
  lname: string;
  priority: number | 0;
}

export const defaultInstructor = {
  uuid: uuidv4(),
  fname: "",
  lname: "",
  priority: 0,
}
