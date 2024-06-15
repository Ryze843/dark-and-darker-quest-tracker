@echo off
echo Installing Node.js and npm...

REM Download the latest LTS version of Node.js installer
curl -o nodejs.msi https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi

REM Install Node.js and npm silently
msiexec /i nodejs.msi /quiet

REM Remove the installer file
del nodejs.msi

REM Verify the installation
echo Verifying installation...
node -v
npm -v

REM Install http-server globally
echo Installing http-server globally...
npm install -g http-server

echo Installation complete. You can now use http-server to serve your static site.
pause
