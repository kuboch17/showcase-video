@echo off
set "REMOTION_NODE="
for /f "delims=" %%N in ('where node.exe 2^>nul') do if not defined REMOTION_NODE set "REMOTION_NODE=%%N"
if not defined REMOTION_NODE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "REMOTION_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not defined REMOTION_NODE if exist "%ProgramFiles%\nodejs\node.exe" set "REMOTION_NODE=%ProgramFiles%\nodejs\node.exe"
if not defined REMOTION_NODE (
  echo Node.js sa nepodarilo najst. Nainstaluj Node.js LTS a spusti tento subor znova.
  exit /b 1
)
for %%N in ("%REMOTION_NODE%") do set "PATH=%%~dpN;%PATH%"
exit /b 0
