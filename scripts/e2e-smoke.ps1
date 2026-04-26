param(
  [int]$Port = 4173,
  [string]$BaseUrl = ''
)

$ErrorActionPreference = 'Stop'

if (-not $BaseUrl) { $BaseUrl = "http://localhost:$Port" }

Write-Host "[e2e-smoke] build" -ForegroundColor Cyan
npm run build | Out-Host

Write-Host "[e2e-smoke] start vite preview on :$Port" -ForegroundColor Cyan
$npmCmd = (Get-Command npm.cmd -ErrorAction Stop).Source
$preview = Start-Process -FilePath $npmCmd -ArgumentList @("run","preview","--","--port",$Port,"--strictPort") -PassThru -WindowStyle Hidden

try {
  Start-Sleep -Seconds 2
  Write-Host "[e2e-smoke] run playwright (BASE=$BaseUrl)" -ForegroundColor Cyan
  $env:E2E_BASE_URL = $BaseUrl
  npx playwright test --reporter=line
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
  Write-Host "[e2e-smoke] stop vite preview (pid=$($preview.Id))" -ForegroundColor Cyan
  try { Stop-Process -Id $preview.Id -Force -ErrorAction SilentlyContinue } catch {}
}
