#!/bin/bash

# Set project root directory
PROJECT_NAME="fraud-detection-system"
echo "Setting up project: $PROJECT_NAME"

# Create project directories
mkdir -p $PROJECT_NAME/{backend/{app/{controllers,models,services,routes},ai-model},frontend/src/{components,pages,utils},config,database,scripts}

# Create backend files
touch $PROJECT_NAME/backend/app/{main.py,__init__.py}
touch $PROJECT_NAME/backend/app/controllers/{fraud_detection.py,batch_detection.py,fraud_reporting.py}
touch $PROJECT_NAME/backend/app/models/{database.py,transaction.py,fraud_report.py}
touch $PROJECT_NAME/backend/app/services/{rule_engine.py,ai_model.py}
touch $PROJECT_NAME/backend/app/routes/{fraud_routes.py,report_routes.py}
touch $PROJECT_NAME/backend/ai-model/{train.py,model.pkl}

# Create frontend files
touch $PROJECT_NAME/frontend/src/{App.js,index.js}

# Create configuration files
touch $PROJECT_NAME/config/settings.py
touch $PROJECT_NAME/database/init_db.py
touch $PROJECT_NAME/scripts/.gitkeep

# Create environment and install dependencies
cd $PROJECT_NAME
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn psycopg2 sqlalchemy pydantic pandas scikit-learn numpy pickle-mixin python-dotenv

# Create environment file
cat <<EOT >> .env
DATABASE_URL=postgresql://user:password@localhost:5432/fraud_db
EOT

# Create README
cat <<EOT >> README.md
# Fraud Detection System
A real-time fraud detection system with AI and rule-based validation.

## Setup
1. Run \`bash setup.sh\` to create project structure.
2. Activate virtual environment: \`source venv/bin/activate\`
3. Start the FastAPI server: \`uvicorn app.main:app --reload\`
EOT

echo "Project setup complete!"
