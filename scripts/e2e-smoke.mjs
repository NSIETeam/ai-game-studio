import { spawn } from 'node:child_process';

// Cross-platform smoke runner (C scheme: ephemeral port by default, auto-detect URL)
// 1) starts `vite preview` on ephemeral port (E2E_PORT=0 default)
// 2) parses Vite output to get actual URL
// 3) runs `playwright test`
// 4) shuts preview down (even on failure)

const PORT = process.env.E2E_PORT || '0';
let BASE_URL = process.env.E2E_BASE_URL || '';

function run(cmd, args, opts = {}) {
  const stdio = opts.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit';
  return spawn(cmd, args, { stdio, shell: true, ...opts });
}

const previewArgs = ['run', 'e2e:smoke:server', '--'];
if (PORT === '0') {
  previewArgs.push('--port', '0');
} else {
  previewArgs.push('--port', PORT, '--strictPort');
}

const preview = run('npm', previewArgs, { capture: true });
preview.stderr?.pipe(process.stderr);

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

// Parse Vite output to get the actual URL (when using --port 0)
let started = false;
let buf = '';
preview.stdout?.on('data', (chunk) => {
  const s = chunk.toString();
  buf += s;
  // Vite prints e.g. "Local:   http://localhost:5173/ai-game-studio/"
  const m = buf.match(/Local:\s+(https?:\/\/[^\s]+)/);
  if (!started && m) {
    started = true;
    const localUrl = m[1].replace(/\/$/, '');
    BASE_URL = BASE_URL || localUrl.replace(/\/ai-game-studio$/, '');
    console.log(`[e2e-smoke] detected preview URL: ${localUrl}`);

    const env = { ...process.env, E2E_BASE_URL: BASE_URL };
    const test = run('npm', ['run', 'e2e:smoke:test'], { env });
    test.on('exit', (code) => shutdown(code ?? 1));
  }
});

// Fallback in case stdout capture isn't available after 2s.
setTimeout(() => {
  if (done || started) return;
  const fallbackPort = PORT === '0' ? '4173' : PORT;
  const fallbackBase = BASE_URL || `http://localhost:${fallbackPort}`;
  console.log(`[e2e-smoke] fallback to BASE=${fallbackBase}`);
  const env = { ...process.env, E2E_BASE_URL: fallbackBase };
  const test = run('npm', ['run', 'e2e:smoke:test'], { env });
  test.on('exit', (code) => shutdown(code ?? 1));
}, 2000);

process.on('SIGINT', () => shutdown(130));
process.on('SIGTERM', () => shutdown(143));
