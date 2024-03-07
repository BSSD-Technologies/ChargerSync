/**
 * Period
 * @uuid Unique ID for course object;
 * @start_time Start time for period;
 * @end_time End time for period;
 * @day Day enum for which day the period applies to;
 */
export type Period = {
  uuid: string;
  start_time: string;
  end_time: string;
  day: Day;
};

/**
 * Day
 * @MW - Monday/Wednesday class
 * @TR - Tuesday/Thursday class
 */
export enum Day {
  MW = "MW",
  TR = "TR",
}