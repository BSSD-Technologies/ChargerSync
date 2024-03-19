import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UseUploadCourses } from "@/app/_hooks/apiHooks";

const UploadFileComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 0) return;
    else
      UseUploadCourses(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    UseUploadCourses(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFileComponent;
