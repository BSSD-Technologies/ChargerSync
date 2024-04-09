import { Day } from "./Period";

export type Section = {
  uuid: string;
  section_id: string;
  instructor: {
    uuid: string,
    fname: string;
    lname: string;
  }
  course: {
    department: string;
    course_num: string;
  }
  room: {
    uuid: string,
    id: string;
    max_capacity: number;
  }
  period: {
    start_time: string;
    end_time: string;
    day: Day | "No Period Assigned";
  }
  status: "Complete" | "Incomplete" | "Conflict"
};

export type FormattedSection = {
  id: string,
  course: string,
  days: string,
  start: string,
  end: string,
  location: string,
  instructor: string,
  status: "Complete" | "Incomplete" | "Conflict",
  section: string,
}
