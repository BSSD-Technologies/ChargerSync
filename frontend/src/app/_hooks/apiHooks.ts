import axios from "axios";
import toast from "react-hot-toast";

export const UseUploadCourses = async (file: File) => {
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
    console.log("Upload successful:", response.data);
    toast.success("Upload successful!");
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Could not upload file.");
  }
};
