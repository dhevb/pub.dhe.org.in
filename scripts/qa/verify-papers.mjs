#!/usr/bin/env node
/**
 * Verify all 20 paper JSON files exist and contain required fields.
 * Run: node scripts/qa/verify-papers.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PAPER_PATHS } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

function getField(obj, path) {
  return path.reduce((acc, key) => acc?.[key], obj);
}

const REQUIRED_FIELDS = [
  { path: ["ArticleDetails", "Title"], label: "ArticleDetails.Title" },
];

let passed = 0;
let failed = 0;

for (const rel of PAPER_PATHS) {
  const filePath = path.join(ROOT, rel);
  const label = rel.replace(/\\/g, "/");
  let ok = true;

  if (!fs.existsSync(filePath)) {
    console.error(`FAIL  missing: ${label}`);
    failed++;
    continue;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    for (const field of REQUIRED_FIELDS) {
      const value = getField(data, field.path);
      if (!value) {
        console.error(`FAIL  ${label}: missing field "${field.label}"`);
        ok = false;
      }
    }

    if (ok) {
      passed++;
      const title = getField(data, ["ArticleDetails", "Title"]);
      console.log(`OK    ${label} — "${String(title).slice(0, 60)}…"`);
    } else {
      failed++;
    }
  } catch (err) {
    console.error(`FAIL  ${label}: ${err.message}`);
    failed++;
  }
}

console.log(`\nPapers: ${passed}/${PAPER_PATHS.length} passed`);

if (failed > 0) {
  process.exit(1);
}

console.log("All 20 paper JSON files verified.");
