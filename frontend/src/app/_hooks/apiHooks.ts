import axios from "axios";
import toast from "react-hot-toast";
import { readCourses } from "./utilHooks";

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
