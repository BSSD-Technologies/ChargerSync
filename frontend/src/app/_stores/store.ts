import { create } from "zustand";
import { Course, ExportCourse } from "../_types/Course";
import { ExportRoom, Room } from "../_types/Room";
import { Day, ExportPeriod, Period } from "../_types/Period";
import { ExportInstructor, Instructor } from "../_types/Instructor";
import { v4 as uuidv4 } from "uuid";
import { CoursePreference } from "../_types/CoursePreference";
import { PeriodPreference } from "../_types/PeriodPreference";
import { FormattedSection, Section } from "../_types/Section";
import { readSections } from "../_hooks/utilHooks";

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
  /** Delete all courses */
  deleteAllCourseList: () => void;
  /** Boolean stack of whether or not there are errors in the course list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
  /** Get formatted courses for export */
  getRawCourses: () => ExportCourse[];
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
      // Empty all course preferences
      useGlobalPreferenceListStore.getState().emptyCoursePrefList();
    },
    deleteCourseList: (id: string) => {
      set((state) => ({
        courseList: [
          // Filter out course with matching id
          ...state.courseList.filter((course) => course.uuid !== id),
        ],
      }));
      // Empty all course preferences
      useGlobalPreferenceListStore.getState().emptyCoursePrefList();
    },
    deleteAllCourseList: () => {
      set((state) => ({
        courseList: [],
        hasErrors: [],
      }));
      // Empty all course preferences
      useGlobalPreferenceListStore.getState().emptyCoursePrefList();
    },
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
    getRawCourses: () => {
      return get().courseList.map((course) => ({
        Department: course.department,
        "Course Number": course.course_num,
        "Max Enrollment": course.max_enrollment,
        "Preliminary Enrollment": course.prelim_enrollment
          ? course.prelim_enrollment
          : "",
      }));
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
  /** Delete all rooms */
  deleteAllRoomList: () => void;
  /** Boolean stack of whether or not there are errors in the room list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
  /** Get formatted room for export */
  getRawRooms: () => ExportRoom[];
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
    deleteAllRoomList: () => {
      set((state) => ({
        roomList: [],
        hasErrors: [],
      }));
    },
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
    getRawRooms: () => {
      return get().roomList.map((room) => ({
        "Room ID": room.room_id,
        "Max Capacity": room.max_capacity,
      }));
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
  /** Delete all periods */
  deleteAllPeriodList: () => void;
  /** Boolean stack of whether or not there are errors in the period list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
  /** Populate FULL period list */
  populateFullPeriodList: () => void;
  /** Get formatted periods for export */
  getRawPeriods: () => ExportPeriod[];
}

export const useGlobalPeriodListStore = create<GlobalPeriodListState>()(
  (set, get) => ({
    periodList: [],
    fullPeriodList: [],
    updatePeriodList: (period: Period) => {
      set((state) => ({
        periodList: state.periodList.map((p) =>
          // Find matching period object, update
          p.uuid === period.uuid ? { ...period } : p
        ),
      }));
    },
    addPeriodList: (period: Period) => {
      set((state) => ({
        periodList: [...state.periodList, period],
      }));
    },
    deletePeriodList: (id: string) => {
      set((state) => ({
        periodList: [
          // Filter out period with matching id
          ...state.periodList.filter((period) => period.uuid !== id),
        ],
      }));
    },
    deleteAllPeriodList: () => {
      set((state) => ({
        periodList: [],
        hasErrors: [],
      }));
    },
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
      const fullPeriodList: Period[] = [];
      const periodList = get().periodList;
      for (let i = 0; i < periodList.length; i++) {
        const period = periodList[i];
        // Duplicate the period for TR days
        const duplicatedPeriod: Period = {
          ...period,
          uuid: uuidv4(),
          day: Day["TR"],
        };
        // Insert the original period
        fullPeriodList.push(period);
        // Insert the duplicated period
        fullPeriodList.push(duplicatedPeriod);
      }

      // Set fullPeriodList
      set({ fullPeriodList });

      // Empty all period preferences
      useGlobalPreferenceListStore.getState().emptyPeriodPrefList();
    },
    getRawPeriods: () => {
      return get().periodList.map((period) => {
        // Convert start time to 12-hour format
        let startTime = period.start_time.split(":");
        let startHour = parseInt(startTime[0], 10);
        let startSuffix = startHour >= 12 ? "PM" : "AM";
        startHour = startHour % 12 || 12; // Convert midnight (00:00) to 12:00 AM
        let formattedStart = startHour + ":" + startTime[1] + " " + startSuffix;

        // Convert end time to 12-hour format
        let endTime = period.end_time.split(":");
        let endHour = parseInt(endTime[0], 10);
        let endSuffix = endHour >= 12 ? "PM" : "AM";
        endHour = endHour % 12 || 12; // Convert midnight (00:00) to 12:00 AM
        let formattedEnd = endHour + ":" + endTime[1] + " " + endSuffix;

        return {
          "Start Time": formattedStart,
          "End Time": formattedEnd,
        };
      });
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
  /** Delete all instructors */
  deleteAllInstructorList: () => void;
  /** Boolean stack of whether or not there are errors in the instructor list */
  hasErrors: boolean[];
  /** Custom getter for hasErrors */
  getHasErrors: () => boolean;
  /** Get formatted instructors for export */
  getRawInstructors: () => ExportInstructor[];
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
    deleteInstructorList: (id: string) => {
      set((state) => ({
        instructorList: [
          // Filter out instructor with matching id
          ...state.instructorList.filter(
            (instructor) => instructor.uuid !== id
          ),
        ],
      }));
      useGlobalPreferenceListStore.getState().emptyInstructorPref(id);
    },
    deleteAllInstructorList: () => {
      set((state) => ({
        instructorList: [],
        hasErrors: [],
      }));
      // Empty all course and period preferences
      useGlobalPreferenceListStore.getState().emptyCoursePrefList();
      useGlobalPreferenceListStore.getState().emptyPeriodPrefList();
    },
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
    getRawInstructors: () => {
      return get().instructorList.map((instructor) => ({
        "First Name": instructor.fname,
        "Last Name": instructor.lname,
        Priority: instructor.priority ? instructor.priority : "",
      }));
    },
  })
);

/** PREFERENCE STORE */
interface GlobalPreferenceListState {
  /** Array of course preferences */
  coursePrefList: CoursePreference[];
  /** Populate course preference list */
  setCoursePrefList: (
    list: CoursePreference[],
    instructor_uuid: string
  ) => void;
  /** Empty entire coursePrefList */
  emptyCoursePrefList: () => void;
  /** Array of period preferences */
  periodPrefList: PeriodPreference[];
  /** Add a period preference to list based on uuid */
  setPeriodPrefList: (
    list: PeriodPreference[],
    instructor_uuid: string
  ) => void;
  /** Empty entire periodPrefList */
  emptyPeriodPrefList: () => void;
  /** Remove all preferences for given instructor from course and period pref lists */
  emptyInstructorPref: (instructor_uuid: string) => void;
}

export const useGlobalPreferenceListStore = create<GlobalPreferenceListState>()(
  (set, get) => ({
    coursePrefList: [],
    setCoursePrefList: (list: CoursePreference[], instructor_uuid: string) =>
      set((state) => ({
        // Filter out objects with matching instructor_uuid and append the new list
        coursePrefList: [
          ...state.coursePrefList.filter(
            (pref) => pref.instructor_uuid !== instructor_uuid
          ),
          ...list,
        ],
      })),
    emptyCoursePrefList: () => set((state) => ({ coursePrefList: [] })),
    periodPrefList: [],
    setPeriodPrefList: (list: PeriodPreference[], instructor_uuid: string) =>
      set((state) => ({
        // Filter out objects with matching instructor_uuid and append the new list
        periodPrefList: [
          ...state.periodPrefList.filter(
            (pref) => pref.instructor_uuid !== instructor_uuid
          ),
          ...list,
        ],
      })),
    emptyPeriodPrefList: () => set((state) => ({ periodPrefList: [] })),
    emptyInstructorPref: (instructor_uuid: string) => {
      set((state) => ({
        // Filter out course prefs with matching instructor_uuid
        coursePrefList: [
          ...state.coursePrefList.filter(
            (pref) => pref.instructor_uuid !== instructor_uuid
          ),
        ],
        // Filter out period prefs with matching instructor_uuid
        periodPrefList: [
          ...state.periodPrefList.filter(
            (pref) => pref.instructor_uuid !== instructor_uuid
          ),
        ],
      }));
    },
  })
);

/** SCHEDULE STORE */
interface GlobalScheduleState {
  /** Array of sections */
  sectionList: FormattedSection[];
  /** Raw array of sections */
  rawSectionList: Section[];
  /** List of departments */
  currentDepartments: string[];
  /** List of rooms */
  currentRooms: string[];
  /** List of instructors */
  currentInstructors: string[];
  /** List of rooms UUIDs */
  currentRoomsID: string[];
  /** List of instructors UUIDs */
  currentInstructorsID: string[];
  /** Populate section list with formatted data */
  setSectionList: (list: Section[]) => void;
  /** Generate list of departments in sectionList */
  getCurrentDepartments: () => void;
  /** Generate list of rooms in sectionList */
  getCurrentRooms: () => void;
  /** Generate list of instructors in sectionList */
  getCurrentInstructors: () => void;
  /** Selected departments */
  selectedDepartments: string[];
  /** Selected rooms */
  selectedRooms: string[];
  /** Selected instructors */
  selectedInstructors: string[];
  /** Update selected departments */
  updateSelectedDepartments: (list: string[]) => void;
  /** Update selected rooms */
  updateSelectedRooms: (list: string[]) => void;
  /** Update selected instructors */
  updateSelectedInstructors: (list: string[]) => void;
}

export const useGlobalScheduleStore = create<GlobalScheduleState>()(
  (set, get) => ({
    sectionList: [],
    rawSectionList: [],
    currentDepartments: [],
    currentRooms: [],
    currentInstructors: [],
    currentRoomsID: [],
    currentInstructorsID: [],
    setSectionList: (list: Section[]) => {
      set((state) => ({
        rawSectionList: list,
        sectionList: readSections(list),
      }));
      get().getCurrentDepartments();
      get().getCurrentRooms();
      get().getCurrentInstructors();
    },
    getCurrentDepartments: () => {
      const uniqueSet = new Set<string>();
      get().rawSectionList.forEach((obj) => {
        if (obj.course.department) {
          uniqueSet.add(obj.course.department);
        }
      });
      set((state) => ({ currentDepartments: Array.from(uniqueSet) }));
    },
    getCurrentRooms: () => {
      const uniqueSet = new Set<string>();
      const uniqueIdSet = new Set<string>();
      get().rawSectionList.forEach((obj) => {
        if (obj.room.uuid) {
          uniqueSet.add(obj.room.id); // Room ID, as in name
          uniqueIdSet.add(obj.room.uuid); // UUID for room object
        }
      });
      set((state) => ({ currentRooms: Array.from(uniqueSet) }));
      set((state) => ({ currentRoomsID: Array.from(uniqueIdSet) }));
    },
    getCurrentInstructors: () => {
      const uniqueSet = new Set<string>();
      const uniqueIdSet = new Set<string>();
      get().rawSectionList.forEach((obj) => {
        if (obj.instructor.uuid) {
          uniqueSet.add(obj.instructor.fname + " " + obj.instructor.lname); // Instructor full name
          uniqueIdSet.add(obj.instructor.uuid); // UUID for instructor object
        }
      });
      set((state) => ({ currentInstructors: Array.from(uniqueSet) }));
      set((state) => ({ currentInstructorsID: Array.from(uniqueIdSet) }));
    },
    selectedDepartments: [],
    selectedRooms: [],
    selectedInstructors: [],
    updateSelectedDepartments: (list: string[]) => {
      set((state) => ({ selectedDepartments: list }));
    },
    updateSelectedRooms: (list: string[]) => {
      set((state) => ({ selectedRooms: list }));
    },
    updateSelectedInstructors: (list: string[]) => {
      set((state) => ({ selectedInstructors: list }));
    },
  })
);

/** CONFLICT STORE */
interface GlobalConflictState {
  /** Array of conflict sections */
  conflictList: FormattedSection[];
  /** Array of raw conflict sections */
  rawConflictList: Section[];
  /** Populate conflict list with formatted data */
  setConflictList: (list: Section[]) => void;
}

export const useGlobalConflictStore = create<GlobalConflictState>()(
  (set, get) => ({
    conflictList: [],
    rawConflictList: [],
    setConflictList: (list: Section[]) => {
      set((state) => ({
        rawConflictList: list,
        conflictList: readSections(list),
      }));
    },
  })
);

/** INCOMPLETE STORE */
interface GlobalIncompleteState {
  /** Array of incomplete sections */
  incompleteList: FormattedSection[];
  /** Array of raw incomplete sections */
  rawIncompleteList: Section[];
  /** Populate incomplete list with formatted data */
  setIncompleteList: (list: Section[]) => void;
}

export const useGlobalIncompleteStore = create<GlobalIncompleteState>()(
  (set, get) => ({
    incompleteList: [],
    rawIncompleteList: [],
    setIncompleteList: (list: Section[]) => {
      set((state) => ({
        rawIncompleteList: list,
        incompleteList: readSections(list),
      }));
    },
  })
);
