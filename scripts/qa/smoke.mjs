#!/usr/bin/env node
/**
 * HTTP smoke test against a running server.
 * Usage: BASE_URL=http://localhost:3000 node scripts/qa/smoke.mjs
 */

import {
  INFRA_ROUTES,
  REDIRECT_CHECKS,
  SMOKE_ROUTES,
} from "./routes.mjs";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

const TIMEOUT_MS = Number(process.env.QA_TIMEOUT_MS || 45000);
const CONCURRENCY = Number(process.env.QA_CONCURRENCY || 4);

let passed = 0;
let failed = 0;
const failures = [];

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`;
  try {
    const res = await fetchWithTimeout(url, { redirect: "follow" });
    if (res.status >= 200 && res.status < 400) {
      passed++;
      return;
    }
    failed++;
    failures.push(`${route} → HTTP ${res.status}`);
  } catch (err) {
    failed++;
    failures.push(`${route} → ${err.message}`);
  }
}

async function checkRedirect({ from, to }) {
  const url = `${BASE_URL}${from}`;
  try {
    const res = await fetchWithTimeout(url, { redirect: "manual" });
    const location = res.headers.get("location") || "";
    const ok =
      (res.status === 301 || res.status === 308) &&
      (location.endsWith(to) || location.includes(to));

    if (ok) {
      passed++;
      return;
    }
    failed++;
    failures.push(
      `redirect ${from} → expected ${to}, got ${res.status} ${location}`
    );
  } catch (err) {
    failed++;
    failures.push(`redirect ${from} → ${err.message}`);
  }
}

async function runPool(tasks, fn) {
  const queue = [...tasks];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item !== undefined) await fn(item);
    }
  });
  await Promise.all(workers);
}

async function checkBackendReachable() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://vie-rase-backend.onrender.com";
  try {
    const res = await fetchWithTimeout(`${apiUrl}/api/vbe_getallarticles`, {
      method: "GET",
    });
    if (res.status < 500) {
      console.log(`OK    Backend API reachable (${res.status})`);
      passed++;
      return;
    }
    console.warn(`WARN  Backend API returned ${res.status}`);
  } catch (err) {
    console.warn(`WARN  Backend API unreachable: ${err.message}`);
  }
}

async function main() {
  console.log(`Smoke test → ${BASE_URL}\n`);

  const allRoutes = [...SMOKE_ROUTES, ...INFRA_ROUTES];
  console.log(`Checking ${allRoutes.length} routes…`);
  await runPool(allRoutes, checkRoute);

  console.log(`Checking ${REDIRECT_CHECKS.length} redirects…`);
  await runPool(REDIRECT_CHECKS, checkRedirect);

  await checkBackendReachable();

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failures.length > 0) {
    console.error("\nFailures:");
    for (const f of failures.slice(0, 30)) {
      console.error(`  • ${f}`);
    }
    if (failures.length > 30) {
      console.error(`  … and ${failures.length - 30} more`);
    }
    process.exit(1);
  }

  console.log("Smoke test passed.");
}

main();
