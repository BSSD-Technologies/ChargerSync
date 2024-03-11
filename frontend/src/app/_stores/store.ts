import { create } from "zustand";
import { Course, defaultCourse } from "../_types/Course";
import { v4 } from "uuid";

interface GlobalState {
  courseList: Course[];
  updateCourseList: (course: Course) => void;
  addCourseList: (course: Course) => void;
  deleteCourseList: (id: string) => void;
  hasCourseErrors: { [uuid: string]: boolean };
  setCourseErrors: (id: string, value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  courseList: [{ ...defaultCourse, uuid: v4() }],
  updateCourseList: (course: Course) =>
    set((state) => ({
      courseList: state.courseList.map((c) => 
        c.uuid === course.uuid ? { ...course } : c
      ),
    })),
  addCourseList: (course: Course) =>
    set((state) => ({ courseList: [...state.courseList, course] })),
  deleteCourseList: (id: string) =>
    set((state) => ({
      courseList: [...state.courseList.filter((course) => course.uuid !== id)],
    })),
  hasCourseErrors: {},
  setCourseErrors: (id: string, value: boolean) =>
    set((state) => ({
      hasCourseErrors: { ...state.hasCourseErrors, [id]: value },
    })),
}));
