import { useState } from "react";
import api from "../services/api";

const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    setMessage("");

    try {
      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("File uploaded successfully!");
    } catch (error) {
      setMessage("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return { file, uploading, message, handleFileChange, handleUpload };
};

export default useFileUpload;
