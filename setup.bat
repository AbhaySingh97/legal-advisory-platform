@echo off
echo ========================================
echo Legal Advisory Platform - Setup Script
echo ========================================
echo.

echo [1/2] Installing Frontend Dependencies...
echo.
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo.
echo Frontend dependencies installed successfully!
echo.

echo [2/2] Installing Backend Dependencies...
echo.
cd ..\backend
python -m venv venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment!
    pause
    exit /b 1
)

call venv\Scripts\activate.bat
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo.
echo Backend dependencies installed successfully!
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Set up PostgreSQL database (create 'legal_db')
echo 2. Update backend\.env with your database credentials
echo 3. Run: cd backend ^&^& python scripts\migrate_data.py
echo 4. Start backend: cd backend ^&^& venv\Scripts\activate ^&^& uvicorn app.main:app --reload
echo 5. Start frontend: cd frontend ^&^& npm run dev
echo.
pause
