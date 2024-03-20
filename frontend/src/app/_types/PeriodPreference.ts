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
  instructor_uuid: "",
  period_uuid: "",
};