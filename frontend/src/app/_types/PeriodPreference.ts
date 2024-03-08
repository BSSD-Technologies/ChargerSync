import { v4 as uuidv4 } from "uuid";

/**
 * Period Preference
 * @uuid Unique ID for period preference;
 * @instructor_uuid unique ID to corresponding instructor;
 * @course_uuid unique ID to corresponding period;
 */
export type PeriodPreference = {
  uuid: string;
  instructor_uuid: string;
  period_uuid: string;
};

export const defaultPeriodPreference = {
  uuid: uuidv4(),
  instructor_uuid: "",
  period_uuid: "",
};