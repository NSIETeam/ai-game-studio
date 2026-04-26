// Playwright E2E smoke test (game)
// Run with a built + preview server. Vite preview serves under base '/ai-game-studio/'.

import { test, expect } from '@playwright/test';

const BASE = process.env.E2E_BASE_URL || 'http://localhost:4173';

test('zero-fighter: loads and can start', async ({ page }) => {
  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const t = msg.text();
      // Ignore favicon 404 noise.
      if (!/favicon/i.test(t)) consoleErrors.push(t);
    }
  });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('requestfailed', (req) => failedRequests.push(req.url()));
  page.on('response', (res) => {
    // Ignore favicon 404 noise on some pages.
    if (res.status() === 404 && !/favicon\.(ico|png|svg)(\?|$)/i.test(res.url())) failedRequests.push(res.url());
  });

  const baseUrl = BASE.replace(/\/$/, '');
  // Ensure we include Vite base path when using `vite preview`.
  const appRoot = baseUrl.endsWith('/ai-game-studio') ? baseUrl : `${baseUrl}/ai-game-studio`;

  await page.goto(`${appRoot}/games/zero-fighter/`, { waitUntil: 'domcontentloaded' });

  // Click the start/play button (Zero Fighter creates the canvas on start).
  // Avoid locale/encoding issues with Chinese text by selecting via onclick handler.
  const startBtn = page.locator('button[onclick*="startGame"]');
  await expect(startBtn).toBeVisible();
  await startBtn.click({ timeout: 8000 });

  // Canvas is inserted after startGame().
  const canvas = page.locator('canvas');
  await expect(canvas).toHaveCount(1, { timeout: 15000 });
  await expect(canvas.first()).toBeVisible();

  // Give the game loop a moment to initialize and surface async errors.
  await page.waitForTimeout(1200);

  expect(consoleErrors, `Console errors:\n${consoleErrors.join('\n')}`).toHaveLength(0);
  expect(failedRequests, `Failed/404 requests:\n${failedRequests.join('\n')}`).toHaveLength(0);
});
