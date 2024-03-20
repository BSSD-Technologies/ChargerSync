import { create } from "zustand";
import { Course } from "../_types/Course";
import { Room } from "../_types/Room";
import { Day, Period } from "../_types/Period";
import { Instructor } from "../_types/Instructor";
import { v4 as uuidv4 } from "uuid";

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

/** PERIOD STORE */
interface GlobalPeriodListState {
  /** Array of period blocks */
  periodList: Period[];
  /** Array of FULL period blocks */
  fullPeriodList: Period[];
  /** Update existing period */
  updatePeriodList: (period: Period) => void;
  /** Add a period to list */
  addPeriodList: (period: Period) => void;
  /** Delete a period by id */
  deletePeriodList: (id: string) => void;
  /** Boolean stack of whether or not there are errors in the period list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
  /** Populate FULL period list */
  populateFullPeriodList: () => void;
}

export const useGlobalPeriodListStore = create<GlobalPeriodListState>()(
  (set, get) => ({
    periodList: [],
    fullPeriodList: [],
    updatePeriodList: (period: Period) =>
      set((state) => ({
        periodList: state.periodList.map((p) =>
          // Find matching period object, update
          p.uuid === period.uuid ? { ...period } : p
        ),
      })),
    addPeriodList: (period: Period) => {
      set((state) => ({
        periodList: [...state.periodList, period],
      }));
    },
    deletePeriodList: (id: string) =>
      set((state) => ({
        periodList: [
          // Filter out period with matching id
          ...state.periodList.filter((period) => period.uuid !== id),
        ],
      })),
    hasErrors: [],
    getHasErrors: () => {
      // If array (table) is empty, error
      if (get().periodList.length == 0) {
        return true;
      }
      // If errors exist in stack
      else if (get().hasErrors.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    populateFullPeriodList: () => {
      // Empty the fullPeriodList
      set({ fullPeriodList: [] });

      // Iterate through periodList, duplicate each period for TR days
      const duplicatedPeriods: Period[] = [];
      for (const period of get().periodList) {
        duplicatedPeriods.push({...period, uuid: uuidv4(), day: Day["TR"]});
      }

      // Set fullPeriodList to the duplicated periods AND original
      set({ fullPeriodList: [...get().periodList, ...duplicatedPeriods] });
    },
  })
);

/** INSTRUCTOR STORE */
interface GlobalInstructorListState {
  /** Array of instructors */
  instructorList: Instructor[];
  /** Update existing instructor */
  updateInstructorList: (instructor: Instructor) => void;
  /** Add an instructor to list */
  addInstructorList: (instructor: Instructor) => void;
  /** Delete an instructor by id */
  deleteInstructorList: (id: string) => void;
  /** Boolean stack of whether or not there are errors in the instructor list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
}

export const useGlobalInstructorListStore = create<GlobalInstructorListState>()(
  (set, get) => ({
    instructorList: [],
    updateInstructorList: (instructor: Instructor) =>
      set((state) => ({
        instructorList: state.instructorList.map((i) =>
          // Find matching instructor object, update
          i.uuid === instructor.uuid ? { ...instructor } : i
        ),
      })),
    addInstructorList: (instructor: Instructor) => {
      set((state) => ({
        instructorList: [...state.instructorList, instructor],
      }));
    },
    deleteInstructorList: (id: string) =>
      set((state) => ({
        instructorList: [
          // Filter out period with matching id
          ...state.instructorList.filter((instructor) => instructor.uuid !== id),
        ],
      })),
    hasErrors: [],
    getHasErrors: () => {
      // If array (table) is empty, error
      if (get().instructorList.length == 0) {
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
