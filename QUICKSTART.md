# Quick Start Guide - Legal Advisory Platform

This guide will help you get the Legal Advisory Platform up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 15+
- **Git**

## Setup Instructions

### Step 1: Navigate to Project Directory

```powershell
cd "c:\Users\User\OneDrive\Desktop\FULL STACK\NLM MODEL\legal-advisory-platform"
```

### Step 2: Set Up PostgreSQL Database

1. Open PostgreSQL (pgAdmin or command line)
2. Create a new database:

```sql
CREATE DATABASE legal_db;
```

3. Note your PostgreSQL credentials (username, password, port)

### Step 3: Set Up Backend

```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit .env file with your database credentials
# DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/legal_db

# Run database migration
python scripts/migrate_data.py

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: http://localhost:8000
API Documentation: http://localhost:8000/api/v1/docs

### Step 4: Set Up Frontend (New Terminal)

```powershell
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at: http://localhost:3000

## Troubleshooting

### PowerShell Execution Policy Error

If you encounter an execution policy error when running npm commands:

**Option 1: Use Command Prompt instead**
```cmd
cd "c:\Users\User\OneDrive\Desktop\FULL STACK\NLM MODEL\legal-advisory-platform\frontend"
npm install
npm run dev
```

**Option 2: Temporarily bypass policy (PowerShell as Admin)**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Database Connection Error

If you get a database connection error:

1. Verify PostgreSQL is running
2. Check your `.env` file has correct credentials
3. Ensure the database `legal_db` exists
4. Test connection: `psql -U postgres -d legal_db`

### Port Already in Use

If port 8000 or 3000 is already in use:

**Backend (change port):**
```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

**Frontend (change port):**
```powershell
npm run dev -- -p 3001
```

Then update `frontend/.env.local` with the new backend URL.

## Verification

Once both servers are running:

1. **Test Backend API**: Visit http://localhost:8000/api/v1/docs
2. **Test Frontend**: Visit http://localhost:3000
3. **Test Chatbot**: Navigate to http://localhost:3000/chatbot
4. **Test Library**: Navigate to http://localhost:3000/library

## Next Steps

- Explore the chatbot interface
- Browse the constitution library
- View landmark cases
- Check out legal procedures

## Need Help?

- Check the main [README.md](../README.md) for detailed documentation
- Review API documentation at http://localhost:8000/api/v1/docs
- Check backend logs in the terminal where uvicorn is running
- Check frontend logs in the browser console (F12)

---

**Happy coding! 🚀**
