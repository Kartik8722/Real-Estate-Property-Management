@echo off
echo ==========================================
echo   Starting Property Management App
echo ==========================================

echo 1. Starting MongoDB...
start "MongoDB Service" mongod

timeout /t 3 /nobreak >nul

echo 2. Starting Backend Server (Port 5001)...
cd server
start "Backend Server" npm run dev
cd ..

timeout /t 2 /nobreak >nul

echo 3. Starting Frontend Client...
cd client
start "Frontend Client" npm run dev
cd ..

echo ==========================================
echo   All services started! 
echo   Client URL: http://localhost:5174 (Check Client Window)
echo ==========================================
pause
