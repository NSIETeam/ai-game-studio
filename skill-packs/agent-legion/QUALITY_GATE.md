# Quality Gate (L3)

A release is **blocked** unless all checks pass.

## 1. Functional Gate
- The app loads with no blank screen
- Core user path works (start → play → end)

## 2. Browser Gate
- Console errors: **0**
- Network 404 errors: **0**

## 3. Automated Test Gate
- Unit tests: pass
- Integration tests: pass (if present)
- E2E tests: pass (Playwright)

## 4. Performance Smoke Gate
- FPS stays above target for 30s (configurable)
- No unbounded memory growth during a 60s run

## 5. Release Artifact Gate
- Zip is valid and can be extracted
- SHA256 checksums generated
- CHANGELOG updated

## Rollback
Maintain:
- `stable` (last known good)
- `latest` (candidate)

If `latest` fails in the wild, revert download link to `stable`.
