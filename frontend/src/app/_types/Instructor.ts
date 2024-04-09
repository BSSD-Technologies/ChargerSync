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
  priority: number;
}

export const defaultInstructor = {
  fname: "",
  lname: "",
  priority: NaN,
}

export type ExportInstructor = {
  "First Name": string;
  "Last Name": string;
  "Priority": number;
};
