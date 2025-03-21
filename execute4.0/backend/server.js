const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Set up CORS middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));
console.log("✅ CORS middleware applied!");

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("📁 Created uploads directory");
}

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Where to store the file
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // How to name the file (timestamp + original extension)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// File upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("🔵 Upload endpoint hit");
  
  // Check if file exists in the request
  if (!req.file) {
    console.log("❌ No file received");
    return res.status(400).json({ message: "No file uploaded" });
  }
  
  // Log successful upload
  console.log("✅ File received:", req.file.filename);
  console.log("✅ File details:", req.file);
  
  // Send success response
  res.json({ 
    message: "File uploaded successfully!",
    filename: req.file.filename
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));