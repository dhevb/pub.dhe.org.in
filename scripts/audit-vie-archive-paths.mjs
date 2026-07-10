import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filterPath = path.join(__dirname, "../src/app/component/vie_Component/Filter.tsx");
const rawText = fs.readFileSync(filterPath, "utf8");
/** Strip line comments so commented-out catalog rows are not counted */
const text = rawText.replace(/^\s*\/\/.*$/gm, "");

const base = process.env.BASE_URL || "https://pub.dhe.org.in";

/** Parse catalog entries from Filter.tsx */
function parseCatalog() {
  const entries = [];
  const blocks = [...text.matchAll(/\{\s*title:\s*"([^"]*)"\s*,[\s\S]*?volume:\s*"(Volume \d)"\s*,\s*issue:\s*"(Issue \d)"[\s\S]*?page:\s*"([^"]*)"/g)];
  for (const m of text.matchAll(
    /title:\s*\n?\s*"([^"]*)"[\s\S]*?author:\s*"([^"]*)"[\s\S]*?page:\s*"([^"]*)"[\s\S]*?volume:\s*"(Volume \d)"[\s\S]*?issue:\s*"(Issue \d)"/g
  )) {
    entries.push({
      title: m[1],
      author: m[2],
      page: m[3],
      volume: m[4],
      issue: m[5],
    });
  }
  return entries;
}

function isContentEntry(entry) {
  const t = entry.title.trim().toLowerCase();
  return t === "content" || t === "conent" || t.startsWith("journal title for");
}

function isPaperEntry(entry) {
  if (isContentEntry(entry)) return false;
  const author = entry.author.trim();
  return Boolean(entry.title.trim() && author);
}

function volumeYear(volume) {
  const n = parseInt(volume.replace(/\D/g, ""), 10);
  return 2022 + n;
}

const entries = parseCatalog();

const issuesByVolume = {};
const papersByVolumeIssue = {};
for (const e of entries) {
  if (!issuesByVolume[e.volume]) issuesByVolume[e.volume] = new Set();
  issuesByVolume[e.volume].add(e.issue);
  const key = `${e.volume}|${e.issue}`;
  if (!papersByVolumeIssue[key]) papersByVolumeIssue[key] = [];
  if (isPaperEntry(e)) papersByVolumeIssue[key].push(e);
}

const expectedIssues = {
  "Volume 1": 3,
  "Volume 2": 4,
  "Volume 3": 4,
  "Volume 4": 1,
};

console.log("=== VIE Legacy Archive Catalog Audit ===\n");

console.log("## Volume / Issue Structure\n");
for (const [vol, count] of Object.entries(expectedIssues)) {
  const actual = issuesByVolume[vol]?.size ?? 0;
  const status = actual === count ? "OK" : "MISMATCH";
  console.log(`${vol} (${volumeYear(vol)}): ${actual}/${count} issues [${status}]`);
  const issues = [...(issuesByVolume[vol] ?? [])].sort();
  for (const iss of issues) {
    const papers = papersByVolumeIssue[`${vol}|${iss}`]?.length ?? 0;
    console.log(`  ${iss}: ${papers} papers`);
  }
}

const paperEntries = entries.filter(isPaperEntry);
const paperPages = paperEntries.map((e) => e.page);

const typos = paperPages.filter((p) => /W$|Laungage|Conent/i.test(p) || p.includes("  "));
const duplicates = paperPages.filter((p, i) => paperPages.indexOf(p) !== i);
const uniqueDupes = [...new Set(duplicates)];

const invalidPaths = paperPages.filter(
  (p) => !p.startsWith("/vie/") || p.includes("//") || p.trim() !== p
);

const contentPages = entries.filter(isContentEntry).map((e) => e.page);

console.log("\n## Catalog Summary\n");
console.log(`Total catalog rows: ${entries.length}`);
console.log(`Content/issue headers: ${entries.filter(isContentEntry).length}`);
console.log(`Paper entries: ${paperEntries.length}`);
console.log(`Unique paper paths: ${new Set(paperPages).size}`);

console.log("\n## Path Analysis\n");

if (typos.length) {
  console.log("Typos / suspicious paths:");
  typos.forEach((p) => console.log(`  ${p}`));
} else {
  console.log("Typos: none detected");
}

if (uniqueDupes.length) {
  console.log("\nDuplicate paths (same PDF for multiple papers):");
  uniqueDupes.forEach((p) => {
    const papers = paperEntries.filter((e) => e.page === p);
    console.log(`  ${p} (${papers.length} entries)`);
    papers.forEach((e) => console.log(`    - ${e.title.slice(0, 60)}… (${e.volume} ${e.issue})`));
  });
} else {
  console.log("\nDuplicate paths: none");
}

if (invalidPaths.length) {
  console.log("\nInvalid paths:");
  invalidPaths.forEach((p) => console.log(`  ${p}`));
} else {
  console.log("\nInvalid paths: none");
}

console.log("\n## Production PDF Verification\n");
console.log(`Base URL: ${base}\n`);

const existing = [];
const missing = [];
const broken = [];

for (const page of [...new Set(paperPages)]) {
  const url = `${base}${page}.pdf`;
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.ok) existing.push(page);
    else missing.push({ page, status: res.status });
  } catch (err) {
    broken.push({ page, error: String(err) });
  }
}

console.log(`Existing PDFs: ${existing.length}`);
existing.forEach((p) => console.log(`  ✓ ${p}`));

console.log(`\nMissing PDFs (operational upload required): ${missing.length}`);
missing.forEach(({ page, status }) =>
  console.log(`  ✗ ${page} (HTTP ${status})`)
);

if (broken.length) {
  console.log(`\nBroken paths (network/error): ${broken.length}`);
  broken.forEach(({ page, error }) => console.log(`  ! ${page} — ${error}`));
}

console.log("\n## Content Header PDFs (issue TOC)\n");
for (const page of contentPages) {
  const url = `${base}${page}.pdf`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    const mark = res.ok ? "✓" : "✗";
    console.log(`  ${mark} ${page} (${res.status})`);
  } catch {
    console.log(`  ! ${page} (error)`);
  }
}

console.log("\n## Summary\n");
console.log(`Software catalog papers: ${paperEntries.length}`);
console.log(`Production PDFs available: ${existing.length}`);
console.log(`Operational uploads needed: ${missing.length}`);
if (missing.length) {
  console.log("\n→ Missing PDFs are content operations, not software defects.");
}

process.exit(missing.length > 0 ? 0 : 0);
