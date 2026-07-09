#!/usr/bin/env node
/**
 * Phase 6 QA runner — static checks always; smoke if server available.
 * Usage:
 *   npm run qa              # static only
 *   npm run qa:smoke        # static + smoke (needs running server)
 */

import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

function run(label, script, env = {}) {
  console.log(`\n── ${label} ──\n`);
  const result = spawnSync("node", [path.join(__dirname, script)], {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    console.error(`\n✗ ${label} failed`);
    process.exit(result.status ?? 1);
  }
  console.log(`\n✓ ${label} passed`);
}

async function main() {
  const mode = process.argv[2] || "static";

  run("Paper integrity (20 JSON files)", "verify-papers.mjs");

  if (mode === "smoke" || process.env.RUN_SMOKE === "1") {
    const base = process.env.BASE_URL || "http://localhost:3000";
    let ready = false;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch(base, { signal: AbortSignal.timeout(5000) });
        if (res.ok || res.status === 304) {
          ready = true;
          break;
        }
      } catch {
        /* wait for dev server compile */
      }
      await new Promise((r) => setTimeout(r, 2000));
    }
    if (!ready) {
      console.error(
        `\nNo server at ${base} after 60s. Start with "npm run dev" or set BASE_URL.`
      );
      process.exit(1);
    }
    run("HTTP smoke test", "smoke.mjs", { BASE_URL: base });
  } else {
    console.log(
      "\nTip: run `npm run qa:smoke` with dev server for full HTTP checks."
    );
  }

  console.log("\nQA complete.");
}

main();
