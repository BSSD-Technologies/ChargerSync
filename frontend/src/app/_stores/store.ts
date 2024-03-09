import { create } from "zustand";
import { Course, defaultCourse } from "../_types/Course";
import { v4 } from "uuid";

interface GlobalState {
  courseList: Course[];
  addCourseList: (course: Course) => void;
  deleteCourseList: (id: string) => void;
  courseListErrors: boolean;
  setCourseListErrors: (val: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  courseList: [{ ...defaultCourse, uuid: v4() }],
  addCourseList: (course: Course) =>
    set((state) => ({ courseList: [...state.courseList, course] })),
  deleteCourseList: (id: string) =>
    set((state) => ({
      courseList: [
        ...state.courseList.filter((course) => course.uuid !== id),
      ],
    })),
  courseListErrors: true,
  setCourseListErrors: (val: boolean) => set({ courseListErrors: val }),
}));
