import { useCallback, useEffect, useState } from "react";
import { Day, Period } from "../_types/Period";
import { v4 as uuidv4 } from "uuid";

/**
 * Detect first render of a component
 * @returns isFirstRender
 */
export function useFirstRender() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  return isFirstRender;
}

interface UseValidateString {
  /** Whether the string is valid */
  hasError: boolean;
  /** Helper text message for error */
  errorText: string;
  /** Check if a string is valid or not */
  validateString: (value: string) => void;
}

/**
 * Validate string input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateString
 */
export function useValidateString(hasErrorDefault = false): UseValidateString {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const validateString = useCallback((value: string) => {
    if (!value || value.length <= 0) {
      setHasError(true);
      setErrorText("Please enter a value.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateString };
}

interface UseValidateInt {
  /** Whether the int is valid */
  hasError: boolean;
  /** Helper text message for error */
  errorText: string;
  /** Check if an int, sent as string, is valid or not. Optionally check if exceeds max */
  validateInt: (value: string, max?: number) => void;
  /** Set the value for hasError manually */
  setError: (value: boolean) => void;
}

/**
 * Validate REQUIRED int input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateInt
 */
export function useValidateInt(hasErrorDefault = false): UseValidateInt {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const setError = useCallback((value: boolean) => {
    setHasError(value);
  }, []);

  const validateInt = useCallback((value: string, max?: number) => {
    // Check if value DNE, is empty string, or NaN
    if (!value || value.length <= 0 || value == "NaN") {
      setHasError(true);
      setErrorText("Please enter a value.");
    }
    // Check if value is negative
    else if (value.includes("-")) {
      setHasError(true);
      setErrorText("Negative values are not allowed.");
    }
    // Check if int value is greater than 0
    else if (parseInt(value) == 0) {
      setHasError(true);
      setErrorText("Value must be at least 1.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateInt, setError };
}

/**
 * Validate NON-REQUIRED int input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateInt
 */
export function useValidateIntNR(hasErrorDefault = false): UseValidateInt {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const setError = useCallback((value: boolean) => {
    setHasError(value);
  }, []);

  const validateInt = useCallback((value: string, max?: number) => {
    // Check if value is negative
    if (value.includes("-")) {
      setHasError(true);
      setErrorText("Negative values are not allowed.");
    }
    // Check if int value is greater than 0
    else if (parseInt(value) == 0) {
      setHasError(true);
      setErrorText("Value must be at least 1.");
    }
    // Check if value exceeds maximum value
    else if (max && parseInt(value) > max) {
      setHasError(true);
      setErrorText("Cannot exceed maximum enrollment.");
    } else {
      setHasError(false);
      setErrorText(" ");
    }
  }, []);

  return { hasError, errorText, validateInt, setError };
}

interface UseValidateTime {
  /** Whether the time string is valid */
  hasError: boolean;
  /** Helper text message for error */
  errorText: string;
  /** Check if a string is valid or not */
  validateTime: (
    value: string,
    uuid: string,
    periodList: Period[],
    min?: string
  ) => void;
  /** Set the value for hasError manually */
  setError: (value: boolean) => void;
}

/**
 * Validate time string input, and deal with error handling
 * @param hasErrorDefault = false
 * @returns hasError, errorText, validateTime
 */
export function useValidateTime(hasErrorDefault = false): UseValidateTime {
  const [hasError, setHasError] = useState(hasErrorDefault);
  const [errorText, setErrorText] = useState(" ");

  const setError = useCallback((value: boolean) => {
    setHasError(value);
  }, []);

  const validateTime = useCallback(
    (value: string, uuid: string, periodList: Period[], min?: string) => {
      // Check if empty string
      if (!value || value.length <= 0) {
        setHasError(true);
        setErrorText("Please enter a time.");
        return;
      }
      // Check for time range overlaps
      for (const range of periodList) {
        // SKIP current time range being validated, otherwise it will obv throw an error!
        if (range.uuid != uuid) {
          if (value >= range.start_time && value <= range.end_time) {
            setHasError(true);
            setErrorText("This time overlaps with an existing period block.");
            return;
          }
        }
      }
      // Check if value is below minimum value
      if (min && value < min) {
        setHasError(true);
        setErrorText("End time must come after start time.");
      } else {
        setHasError(false);
        setErrorText(" ");
      }
    },
    []
  );

  return { hasError, errorText, validateTime, setError };
}

/**
 * Convert 24-hr format time to 12-hr format
 * @returns
 */
export function useConvertTime12(time: string): string {
  // Split time into hours and minutes
  const [hours, minutes] = time.split(":").map(Number);

  // Check for invalid time format
  if (hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
    throw new Error("Invalid time format");
  }

  const period = hours < 12 ? "AM" : "PM"; // Set period based on hours
  const twelveHour = hours % 12 || 12; // Convert to 12 hr format hours
  const convertedTime = `${twelveHour.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`; // Format 12 hr format string
  return convertedTime;
}

/**
 * Convert 12-hr format time to 24-hr format
 * @returns
 */
export function useConvertTime24(time: string): string {
  // Split time value from AM/PM
  const [timeStr, period] = time.split(" ");
  // Split time into hours and minutes
  const [hoursStr, minutesStr] = timeStr.split(":");

  // Parse as Ints
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Check for time string errors
  if (
    hours < 1 ||
    hours > 12 ||
    minutes < 0 ||
    minutes >= 60 ||
    !["AM", "PM", "am", "pm"].includes(period)
  ) {
    throw new Error("Invalid time format");
  }

  // Convert hours to 24 hr format based on AM/PM
  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  const convertedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return convertedTime;
}

/** Type for raw imported course data */
type RawCourseData = {
  department: string;
  course_number: string;
  max_enrollment: number;
  preliminary_enrollment?: number;
};

/** Parse raw imported course data into Course object array */
export function readCourses(rawData: RawCourseData[]) {
  return rawData.map((course) => ({
    uuid: uuidv4(),
    department: course.department,
    course_num: course.course_number.toString(),
    max_enrollment: course.max_enrollment,
    prelim_enrollment:
      course.preliminary_enrollment !== undefined
        ? course.preliminary_enrollment
        : NaN,
  }));
}

/** Type for raw imported room data */
type RawRoomData = {
  room_id: string;
  max_capacity: number;
};

/** Parse raw imported room data into Room object array */
export function readRooms(rawData: RawRoomData[]) {
  return rawData.map((room) => ({
    uuid: uuidv4(),
    room_id: room.room_id.toString(),
    max_capacity: room.max_capacity,
  }));
}

/** Type for raw imported period data */
type RawPeriodData = {
  start_time: string;
  end_time: string;
};

/** Parse raw imported period data into Period object array */
export function readPeriods(rawData: RawPeriodData[]) {
  return rawData.map((period) => ({
    uuid: uuidv4(),
    start_time: useConvertTime24(period.start_time.toString()),
    end_time: useConvertTime24(period.end_time.toString()),
    day: Day["MW"],
  }));
}

/** Type for raw imported instructor data */
type RawInstructorData = {
  first_name: string;
  last_name: string;
  priority: number;
};

/** Parse raw imported instructor data into Instructor object array */
export function readInstructors(rawData: RawInstructorData[]) {
  return rawData.map((instructor) => ({
    uuid: uuidv4(),
    fname: instructor.first_name.toString(),
    lname: instructor.last_name.toString(),
    priority: instructor.priority,
  }));
}
