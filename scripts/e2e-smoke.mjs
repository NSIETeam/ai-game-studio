import { spawn } from 'node:child_process';

// Cross-platform smoke runner:
// 1) starts `vite preview` on :4173
// 2) runs `playwright test`
// 3) shuts preview down (even on failure)

// Default to 0 (ephemeral) to avoid local port conflicts in CI/dev.
const PORT = process.env.E2E_PORT || '0';
let BASE_URL = process.env.E2E_BASE_URL || '';

function run(cmd, args, opts = {}) {
  // pipe preview output so we can parse the chosen port (when using --port 0)
  const stdio = opts.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit';
  return spawn(cmd, args, { stdio, shell: true, ...opts });
}

// For stability and easier teardown, use a fixed port by default.
// You can override with E2E_PORT.
const resolvedPort = PORT === '0' ? '4173' : PORT;
const previewArgs = ['run', 'e2e:smoke:server', '--', '--port', resolvedPort, '--strictPort'];
const preview = run('npm', previewArgs);

let done = false;
function shutdown(code = 0) {
  if (done) return;
  done = true;
  try { preview.kill('SIGTERM'); } catch {}
  process.exit(code);
}

preview.on('exit', (code) => {
  if (!done) {
    console.error(`[e2e-smoke] vite preview exited early with code ${code}`);
    shutdown(code ?? 1);
  }
});

// Wait briefly for server to be ready, then run tests.
setTimeout(() => {
  const base = BASE_URL || `http://localhost:${resolvedPort}`;
  const env = { ...process.env, E2E_BASE_URL: base };
  const test = run('npm', ['run', 'e2e:smoke:test'], { env });
  test.on('exit', (code) => shutdown(code ?? 1));
}, 1200);

process.on('SIGINT', () => shutdown(130));
process.on('SIGTERM', () => shutdown(143));
