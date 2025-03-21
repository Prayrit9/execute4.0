import { useState } from "react";
import api from "../services/api";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage(""); // Clear any previous messages
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    // Create form data object
    const formData = new FormData();
    formData.append("file", file);
    
    setIsLoading(true);
    
    try {
      // If your api.js sets baseURL to http://localhost:5000/api
      const response = await api.post("/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data" 
        },
      });
      
      console.log("Upload response:", response.data);
      setMessage(`✅ File "${file.name}" uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage(`❌ Upload failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Excel File</h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 mb-4 border border-gray-500 rounded-md bg-transparent text-white file:bg-blue-500 file:border-0 file:py-2 file:px-4 file:rounded-lg file:text-white file:cursor-pointer hover:file:bg-blue-600"
        />

        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-blue-500 to-pink-500 py-2 rounded-lg text-white font-semibold transition-transform ${
            isLoading ? "opacity-60" : "hover:scale-105"
          }`}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes("❌") ? "text-red-300" : "text-green-300"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadFile;