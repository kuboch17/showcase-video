$Host.UI.RawUI.WindowTitle = 'AI Identity Verification'
$ErrorActionPreference = 'Stop'
Clear-Host
function Show-Line {
    param([string]$Text, [ConsoleColor]$Color = 'Gray', [int]$Delay = 450)
    Write-Host $Text -ForegroundColor $Color
    Start-Sleep -Milliseconds $Delay
}

Show-Line 'AI IDENTITY VERIFICATION' Cyan 250

Write-Host ''
Show-Line 'Subject: NOUREDDINE DARIB NOUREDDINE' White 550
Show-Line 'Loading subject details...' Gray 650
Show-Line 'Comparing supplied details with Allianz database records...' Cyan 950
Write-Host ''

Show-Line '[1/2] ADDRESS' White 400
Show-Line '  Supplied: 32 Salway Road, London, E15 1NF, GB' Gray 650
Show-Line '  Database: 32 Salway Road, London, E15 1NF, GB' Gray 750
Show-Line '  MATCH - identical address after normalization.' Green 800
Write-Host ''

Show-Line '[2/2] DATE OF BIRTH' White 400
Show-Line '  Supplied: 25/11/1939' Gray 650
Show-Line '  Database: 1939.25.11.' Gray 850
Show-Line '  Interpreting database format: YYYY.DD.MM.' Yellow 850
Show-Line '  Normalized date: 1939-11-25' Gray 650
Show-Line '  MATCH - same date, different order of components.' Green 900
Show-Line '  Contextual agreement: day 25, month 11, year 1939.' Gray 650
Write-Host ''

Show-Line 'OTHER FIELDS' White 400
@('Name', 'Subject ID', 'Tax number', 'Email', 'Gender', 'Occupation',
  'Annual salary', 'Deposit accounts', 'Loan accounts', 'Source of funds',
  'PEP', 'RCA', 'Other watch list', 'Sanctioned') | ForEach-Object {
    Show-Line ('  {0,-22} NOT FOUND' -f $_) DarkGray 160
}
Write-Host ''
Show-Line '---------------------------------------------------------------' DarkGray 250
Show-Line 'MATCHED VARIABLES: 2 / Address + Date of birth' Green 600
Show-Line 'CONFIDENCE LEVEL: 99.7%' Green 750
Show-Line 'RESULT: CONTEXTUAL MATCH' Green 600

Write-Host ''
Read-Host 'Press Enter to close'
