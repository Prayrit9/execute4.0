#!/bin/bash

# Define base directory
PROJECT_DIR="business-intelligence-app"

# Remove existing directory (if needed)
rm -rf $PROJECT_DIR
mkdir -p $PROJECT_DIR

# Backend structure
mkdir -p $PROJECT_DIR/backend/{controllers,models,routes,config,middleware,utils}
touch $PROJECT_DIR/backend/{server.js,package.json}
touch $PROJECT_DIR/backend/controllers/{authController.js,fileUploadController.js,dataProcessingController.js}
touch $PROJECT_DIR/backend/models/{User.js,UploadedFile.js}
touch $PROJECT_DIR/backend/routes/{authRoutes.js,fileUploadRoutes.js,dataProcessingRoutes.js}
touch $PROJECT_DIR/backend/config/{db.js,cloudStorage.js}
touch $PROJECT_DIR/backend/middleware/authMiddleware.js
touch $PROJECT_DIR/backend/utils/excelParser.js

# Frontend structure
mkdir -p $PROJECT_DIR/frontend/src/{assets,components,pages,hooks,services,context}
mkdir -p $PROJECT_DIR/frontend/public

# Creating frontend files
touch $PROJECT_DIR/frontend/src/components/{UploadFile.jsx,DataTable.jsx,ChartGenerator.jsx,Dashboard.jsx}
touch $PROJECT_DIR/frontend/src/pages/{Login.jsx,Signup.jsx,Home.jsx,Analytics.jsx}
touch $PROJECT_DIR/frontend/src/hooks/useFileUpload.js
touch $PROJECT_DIR/frontend/src/services/api.js
touch $PROJECT_DIR/frontend/src/context/AuthContext.js
touch $PROJECT_DIR/frontend/src/{App.js,main.js,index.css}
touch $PROJECT_DIR/frontend/public/index.html
touch $PROJECT_DIR/frontend/{vite.config.js,package.json}

# Root files
touch $PROJECT_DIR/.gitignore
touch $PROJECT_DIR/README.md

echo "✅ Project structure created successfully!"
