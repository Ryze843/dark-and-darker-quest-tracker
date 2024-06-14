@echo off
echo Starting http-server in the current directory...

REM Run http-server bound to localhost (127.0.0.1)
start http-server -a 127.0.0.1

REM Wait for the server to start (optional, can be adjusted as needed)
timeout /t 3 /nobreak >nul

REM Open the default web browser to http://127.0.0.1:8080
start http://127.0.0.1:8080

echo http-server is running locally at http://127.0.0.1:8080
pause
