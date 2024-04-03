import { Day } from "./Period";

export type Section = {
  uuid: string;
  section_id: string;
  instructor: {
    fname: string;
    lname: string;
  }
  course: {
    department: string;
    course_num: string;
  }
  room: {
    id: string;
    max_capacity: number;
  }
  period: {
    start_time: string;
    end_time: string;
    day: Day;
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
}
