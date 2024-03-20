import axios from "axios";
import toast from "react-hot-toast";
import { readCourses, readInstructors, readPeriods, readRooms } from "./utilHooks";

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
    toast.success("Upload successful!");
    const formattedData = readCourses(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400)
        toast.error("No file uploaded.");
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file format. Must be a CSV file.");
      // File does not match expected template
      if (status === 412)
        toast.error("Invalid template.");
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
    toast.success("Upload successful!");
    const formattedData = readRooms(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400)
        toast.error("No file uploaded.");
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file format. Must be a CSV file.");
      // File does not match expected template
      if (status === 412)
        toast.error("Invalid template.");
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
    toast.success("Upload successful!");
    const formattedData = readPeriods(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400)
        toast.error("No file uploaded.");
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file format. Must be a CSV file.");
      // File does not match expected template
      if (status === 412)
        toast.error("Invalid template.");
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
    toast.success("Upload successful!");
    const formattedData = readInstructors(response.data);
    return formattedData;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      // File parameter not provided
      if (status === 400)
        toast.error("No file uploaded.");
      // File does not match CSV extension
      if (status === 415)
        toast.error("Invalid file format. Must be a CSV file.");
      // File does not match expected template
      if (status === 412)
        toast.error("Invalid template.");
    }
  }
  return null;
};
