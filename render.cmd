@echo off
setlocal
cd /d "%~dp0"
call "scripts\resolve-node.cmd"
if errorlevel 1 (
  pause
  exit /b 1
)
"%REMOTION_NODE%" node_modules\@remotion\cli\remotion-cli.js render src/index.ts Main out\video.mp4 --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"
pause
