@echo off
setlocal
cd /d "%~dp0"
call "scripts\resolve-node.cmd"
if errorlevel 1 (
  pause
  exit /b 1
)
"%REMOTION_NODE%" node_modules\@remotion\cli\remotion-cli.js studio src/index.ts --port=3001
pause
