# Agent Legion Skill Pack (L3)

This pack turns **AI Game Studio** into a **strong + stable** professional engineering team.

## What “L3” means
L3 is not "more roles" — it is **an end-to-end delivery system**:
- Works for **frontend + backend** projects
- Has **quality gates** (no publish without tests)
- Has **E2E automation** (Playwright)
- Has **release discipline** (versioning + stable/latest + checksums)
- Has **rollback plan**

## Included capabilities
- Project scaffolding (Vite/Vue/Three.js, Node backend)
- Code quality (lint/format, commit discipline)
- Automated testing:
  - unit
  - integration
  - E2E (browser-driven)
- Release tooling:
  - build
  - artifact packing
  - SHA256 checksums
  - changelog

## How to use
1. Install this skill pack into EasyClaw.
2. Ask for a task like:
   - "Fix the camera follow bug and ship a verified build"
   - "Add Level 6 with new enemy behavior, keep tests green"
   - "Create a backend leaderboard, deploy with CI"

## Quality Gate (hard rules)
- No publish unless:
  - E2E passes
  - console errors == 0
  - 404 network errors == 0
  - smoke performance check passes

