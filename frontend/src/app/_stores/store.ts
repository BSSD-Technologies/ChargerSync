import { create } from "zustand";
import { Course } from "../_types/Course";
import { Room } from "../_types/Room";

/** COURSE STORE */
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

/** ROOM STORE */
interface GlobalRoomListState {
  /** Array of inputted rooms */
  roomList: Room[];
  /** Update existing course */
  updateRoomList: (room: Room) => void;
  /** Add a room to list */
  addRoomList: (room: Room) => void;
  /** Delete a room by id */
  deleteRoomList: (id: string) => void;
  /** Boolean stack of whether or not there are errors in the room list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
}

export const useGlobalRoomListStore = create<GlobalRoomListState>()(
  (set, get) => ({
    roomList: [],
    updateRoomList: (room: Room) =>
      set((state) => ({
        roomList: state.roomList.map((r) =>
          // Find matching room object, update
          r.uuid === room.uuid ? { ...room } : r
        ),
      })),
    addRoomList: (room: Room) => {
      set((state) => ({
        roomList: [...state.roomList, room],
      }));
    },
    deleteRoomList: (id: string) =>
      set((state) => ({
        roomList: [
          // Filter out room with matching id
          ...state.roomList.filter((room) => room.uuid !== id),
        ],
      })),
    hasErrors: [],
    getHasErrors: () => {
      // If array (table) is empty, error
      if (get().roomList.length == 0) {
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
