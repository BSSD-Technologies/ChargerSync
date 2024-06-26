import axios from "axios";
import toast from "react-hot-toast";
import {
  readCourses,
  readInstructors,
  readPeriods,
  readRooms,
} from "./utilHooks";
import { Course } from "../_types/Course";
import { Room } from "../_types/Room";
import { Period } from "../_types/Period";
import { Instructor } from "../_types/Instructor";
import { CoursePreference } from "../_types/CoursePreference";
import { PeriodPreference } from "../_types/PeriodPreference";

/**
 * UseUploadCourses
 * For an uploaded CSV file of course data, send to backend to be
 * processed and receive JSON object of data
 *
 * @param file CSV template
 * @returns JSON object
 */
export const UseUploadCourses = async (file: File) => {
  // Format file as form data object
  const formData = new FormData();
  formData.append("file", file);

  const toastId = toast.loading("Uploading...");
  try {
    const response = await axios.post(
      "http://localhost:5001/import/courses",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // 200: OK, success toast, return formatted data
    toast.success("Upload successful!", { id: toastId });
    const formattedData = readCourses(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400) toast.error("No file uploaded.", { id: toastId });
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file type. Must be a CSV file.", { id: toastId });
      // File does not match expected template
      if (status === 412) toast.error("Invalid template.", { id: toastId });
    }
  }
  return null;
};

/**
 * UseUploadRooms
 * For an uploaded CSV file of room data, send to backend to be
 * processed and receive JSON object of data
 *
 * @param file CSV template
 * @returns JSON object
 */
export const UseUploadRooms = async (file: File) => {
  // Format file as form data object
  const formData = new FormData();
  formData.append("file", file);

  const toastId = toast.loading("Uploading...");
  try {
    const response = await axios.post(
      "http://localhost:5001/import/rooms",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // 200: OK, success toast, return formatted data
    toast.success("Upload successful!", { id: toastId });
    const formattedData = readRooms(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400) toast.error("No file uploaded.", { id: toastId });
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file type. Must be a CSV file.", { id: toastId });
      // File does not match expected template
      if (status === 412) toast.error("Invalid template.", { id: toastId });
    }
  }
  return null;
};

/**
 * UseUploadPeriods
 * For an uploaded CSV file of period data, send to backend to be
 * processed and receive JSON object of data
 *
 * @param file CSV template
 * @returns JSON object
 */
export const UseUploadPeriods = async (file: File) => {
  // Format file as form data object
  const formData = new FormData();
  formData.append("file", file);

  const toastId = toast.loading("Uploading...");
  try {
    const response = await axios.post(
      "http://localhost:5001/import/periods",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // 200: OK, success toast, return formatted data
    toast.success("Upload successful!", { id: toastId });
    const formattedData = readPeriods(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400) toast.error("No file uploaded.", { id: toastId });
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file type. Must be a CSV file.", { id: toastId });
      // File does not match expected template
      if (status === 412) toast.error("Invalid template.", { id: toastId });
    }
  }
  return null;
};

/**
 * UseUploadInstructors
 * For an uploaded CSV file of instructor data, send to backend to be
 * processed and receive JSON object of data
 *
 * @param file CSV template
 * @returns JSON object
 */
export const UseUploadInstructors = async (file: File) => {
  // Format file as form data object
  const formData = new FormData();
  formData.append("file", file);

  const toastId = toast.loading("Uploading...");
  try {
    const response = await axios.post(
      "http://localhost:5001/import/instructors",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // 200: OK, success toast, return formatted data
    toast.success("Upload successful!", { id: toastId });
    const formattedData = readInstructors(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400) toast.error("No file uploaded.", { id: toastId });
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file type. Must be a CSV file.", { id: toastId });
      // File does not match expected template
      if (status === 412) toast.error("Invalid template.", { id: toastId });
    }
  }
  return null;
};

/**
 * UseGenerateSchedule
 * Send all completed inputted user data to backend to generate a schedule,
 * then get the generated schedule to be returned to the user.
 *
 * @param JSON object
 * @returns JSON object
 */
export const UseGenerateSchedule = async (
  courseList: Course[],
  roomList: Room[],
  periodList: Period[],
  instructorList: Instructor[],
  coursePrefList: CoursePreference[],
  periodPrefList: PeriodPreference[]
) => {
  // Format file as form data object
  const formData = {
    courses: courseList,
    rooms: roomList,
    periods: periodList,
    instructors: instructorList,
    course_prefs: coursePrefList,
    period_prefs: periodPrefList,
  };

  try {
    const response = await axios.post(
      "http://localhost:5001/generate/schedule",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 200: OK, return response data
    return response.data["schedule"];
  } catch (error: any) {
    console.error("Failed to fetch", error);
    if (error.response) {
      const status = error.response.status;
      // JSON object parameter not provided
      if (status === 400)
        toast.error("Error generating schedule. Please try again.");
    }
  }
  return null;
};

/**
 * UseGenerateConflicts
 * Get all sections with conflicts from generated schedule
 *
 * @returns JSON object
 */
export const UseGenerateConflicts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/generate/conflicts"
    );
    // 200: OK, return response data
    return response.data["conflicts"];
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // No schedule exists yet
      if (status === 400) console.error("Error:", error.response.data["error"]);
    }
  }
  return null;
};

/**
 * UseGenerateIncompletes
 * Get all sections with incompletes from generated schedule
 *
 * @returns JSON object
 */
export const UseGenerateIncompletes = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5001/generate/incompletes"
    );
    // 200: OK, return response data
    return response.data["incompletes"];
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // No schedule exists yet
      if (status === 400) console.error("Error:", error.response.data["error"]);
    }
  }
  return null;
};

/**
 * UseCountConflicts
 * Get all sections with conflicts from generated schedule
 *
 * @returns JSON object
 */
export const UseCountConflicts = async () => {
  try {
    const response = await axios.get("http://localhost:5001/countConflicts");
    // 200: OK, return response data
    return response.data["count"];
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // No schedule exists yet
      if (status === 400) console.error("Error:", error.response.data["error"]);
    }
  }
  return null;
};

/**
 * UseCountIncompletes
 * Get all sections with incompletes from generated schedule
 *
 * @returns JSON object
 */
export const UseCountIncompletes = async () => {
  try {
    const response = await axios.get("http://localhost:5001/countIncompletes");
    // 200: OK, return response data
    return response.data["count"];
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // No schedule exists yet
      if (status === 400) console.error("Error:", error.response.data["error"]);
    }
  }
  return null;
};

/**
 * UseExportSchedule
 * Export a schedule as a CSV, with any filters if desired
 *
 * @params Filter types (string) and filter options (string[])
 * @returns JSON object
 */
export const UseExportSchedule = async (filter: string, data: string[]) => {
  const formData = {
    filter: filter,
    data: data,
  };

  const toastId = toast.loading("Generating report...");
  try {
    const response = await axios.post(
      "http://localhost:5001/export/schedule",
      { filter, data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 200: OK, return response data
    toast.success("Report generated!", { id: toastId });
    return response.data["response"];
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // Not proper parameter format
      if (status === 400) {
        console.error("Error:", error.response.data["error"]);
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
      // Invalid filter type
      if (status === 412) {
        console.error("Error:", error.response.data["error"]);
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    }
  }
  return null;
};
