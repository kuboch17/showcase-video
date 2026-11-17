@echo off
setlocal
cd /d "%~dp0"
call "scripts\resolve-node.cmd"
if errorlevel 1 (
  pause
  exit /b 1
)
"%REMOTION_NODE%" scripts\render.cjs
pause
