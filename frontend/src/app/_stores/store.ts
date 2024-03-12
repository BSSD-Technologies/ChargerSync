import { create } from "zustand";
import { Course } from "../_types/Course";

interface GlobalCourseListState {
  /** Array of inputted courses */
  courseList: Course[];
  /** Update existing course */
  updateCourseList: (course: Course) => void;
  /** Add a course to list */
  addCourseList: (course: Course) => void;
  /** Delete a course by id */
  deleteCourseList: (id: string) => void;
  /** Boolean stack of whether or not there are errors in the course list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
}

export const useGlobalCourseListStore = create<GlobalCourseListState>()(
  (set, get) => ({
    courseList: [],
    updateCourseList: (course: Course) =>
      set((state) => ({
        courseList: state.courseList.map((c) =>
          // Find matching course object, update
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
          // Filter out course with matching id
          ...state.courseList.filter((course) => course.uuid !== id),
        ],
      })),
    hasErrors: [],
    getHasErrors: () => {
      // If array (table) is empty, error
      if (get().courseList.length == 0) {
        return true;
      }
      // If errors exist in stack
      else if (get().hasErrors.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  })
);
