# Test Plan (L3)

## Scope
- Web demo/game (Three.js)
- Website landing page (Vue/Vite)

## Automated E2E (Playwright)
- Open landing page
- Ensure iframe/demo reachable
- Open demo directly
- Click start
- Simulate controls (W/A/S/D/Space)
- Assert:
  - Canvas exists
  - HUD numbers change
  - No console errors
  - No 404 requests

## Manual Smoke
- Verify controls feel responsive
- Verify camera follow stable
- Verify win/lose screens

## Performance Smoke
- 60s run, record FPS + memory snapshot trend

