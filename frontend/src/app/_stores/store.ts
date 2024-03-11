import { create } from "zustand";
import { Course } from "../_types/Course";

interface GlobalState {
  courseList: Course[];
  updateCourseList: (course: Course) => void;
  addCourseList: (course: Course) => void;
  deleteCourseList: (id: string) => void;
  hasErrors: boolean[];
  getHasErrors: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  (set, get) => ({
    courseList: [],
    updateCourseList: (course: Course) =>
      set((state) => ({
        courseList: state.courseList.map((c) =>
          c.uuid === course.uuid ? { ...course } : c
        ),
      })),
    addCourseList: (course: Course) => {
      set((state) => ({
        courseList: [...state.courseList, course],
      }));
    },
    deleteCourseList: (id: string) =>
      set((state) => ({
        courseList: [
          ...state.courseList.filter((course) => course.uuid !== id),
        ],
      })),
    hasErrors: [],
    getHasErrors: () => {
      if (get().courseList.length == 0) {
        return true;
      } else if (get().hasErrors.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }),
);
