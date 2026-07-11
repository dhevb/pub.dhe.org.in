#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");

const ROOT = path.join(__dirname, "..");
const FILTER_PATH = path.join(ROOT, "src/app/component/vie_Component/Filter.tsx");
const VIE_DIR = path.join(ROOT, "public/vie");

const PENDING_PDF_PATHS = new Set([
  "/vie/Volume 4 Issue 1 Article 61",
  "/vie/Volume 4 Issue 1 Article 62",
  "/vie/Volume 4 Issue 1 Article 63",
  "/vie/Volume 4 Issue 1 Article 64",
  "/vie/Volume 4 Issue 1 Article 65",
]);

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "of", "in", "on", "for", "to", "with", "by", "at", "as", "is", "are",
]);

function parseCatalog() {
  const rawText = fs.readFileSync(FILTER_PATH, "utf8");
  const text = rawText.replace(/^\s*\/\/.*$/gm, "");
  const entries = [];
  for (const m of text.matchAll(
    /title:\s*\n?\s*"([^"]*)"[\s\S]*?author:\s*"([^"]*)"[\s\S]*?page:\s*"([^"]*)"[\s\S]*?volume:\s*"(Volume \d)"[\s\S]*?issue:\s*"(Issue \d)"/g
  )) {
    entries.push({ title: m[1], author: m[2], page: m[3], volume: m[4], issue: m[5] });
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

function pageToPdfRel(page) {
  return `${page.replace(/^\/vie\//, "")}.pdf`;
}

function normalizeText(s) {
  return s
    .normalize("NFKD")
    .replace(/[\u2018\u2019\u201C\u201D]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordSet(s) {
  const words = normalizeText(s)
    .split(" ")
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  return new Set(words);
}

/** Word overlap ratio relative to catalog title (primary) with symmetric fallback. */
function wordOverlapRatio(catalogTitle, pdfTitle) {
  const a = wordSet(catalogTitle);
  const b = wordSet(pdfTitle);
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter += 1;
  const ratioA = inter / a.size;
  const ratioB = inter / b.size;
  return Math.max(ratioA, ratioB);
}

function classifyOverlap(ratio) {
  if (ratio >= 0.55) return "MATCH";
  if (ratio >= 0.35) return "PARTIAL";
  return "MISMATCH";
}

const BOILERPLATE_RE =
  /^(https?:|viksit india|issn|copyright|article info|open access|doi|creative commons|page \d|received|revised|published|editor|associate editor|corresponding|email|\d+$|\*+$|introduction|keywords|abstract)/i;

function looksLikeAuthorLine(line) {
  if (!line || line.length < 8) return false;
  if (/https?:|@|\.(com|in|org)\b/i.test(line)) return false;
  const hasNamePair = /[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+/.test(line);
  const hasAuthorMarkers = /[*]|,\s*[A-Z]|\d\s*[*]|\d,\s/.test(line);
  return hasNamePair && (hasAuthorMarkers || line.split(",").length >= 2);
}

function looksLikeTitleLine(line) {
  if (looksLikeAuthorLine(line)) return false;
  if (!line || line.length < 20 || line.length > 280) return false;
  if (BOILERPLATE_RE.test(line)) return false;
  if (/^https?:/i.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean);
  if (words.length < 4 || words.length > 35) return false;
  if (/^[a-z]/.test(line)) return false;
  if (line.endsWith(".") && words.length > 12) return false;
  return true;
}

function scoreTitleCandidate(line, nextLine, lineAfter) {
  let score = line.length;
  if (looksLikeAuthorLine(nextLine)) score += 500;
  if (/Institute|University|College|India|Punjab|Delhi/i.test(lineAfter || "")) score += 80;
  if (/[:(]/.test(line)) score -= 30;
  if (/\d{4}/.test(line)) score -= 40;
  return score;
}

/** Heuristic title from first-page text only. */
function extractTitleFromFirstPageText(text) {
  const cleaned = text
    .replace(/--\s*\d+\s+of\s+\d+\s+--/gi, "\n")
    .replace(/\r\n/g, "\n")
    .trim();
  if (!cleaned || cleaned.replace(/\s/g, "").length < 15) return "";

  const lines = cleaned
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);


  for (let i = lines.length - 2; i >= 0; i -= 1) {
    const line = lines[i];
    const next = lines[i + 1];
    if (looksLikeAuthorLine(next) && looksLikeTitleLine(line)) {
      return line;
    }
  }
  let best = { line: "", score: -1 };
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!looksLikeTitleLine(line)) continue;
    const score = scoreTitleCandidate(line, lines[i + 1], lines[i + 2]);
    if (score > best.score) best = { line, score };
  }

  if (best.line) return best.line;

  const volumeIdx = lines.findIndex((l) => /volume\s*:\s*\d+/i.test(l));
  if (volumeIdx >= 0) {
    for (let j = volumeIdx + 1; j < Math.min(volumeIdx + 8, lines.length); j += 1) {
      if (looksLikeTitleLine(lines[j])) return lines[j];
    }
  }

  return "";
}

async function extractFirstPageTitle(pdfPath) {
  const data = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data });
  try {
    const result = await parser.getText({ first: 1, pageJoiner: "\n" });
    const text = result.text || "";
    const title = extractTitleFromFirstPageText(text);
    return { title, rawLen: text.replace(/\s/g, "").length };
  } finally {
    await parser.destroy();
  }
}

function bestCatalogMatch(pdfTitle, catalogTitles) {
  let best = { title: "", page: "", ratio: 0, status: "MISMATCH" };
  for (const entry of catalogTitles) {
    const ratio = wordOverlapRatio(entry.title, pdfTitle);
    if (ratio > best.ratio) {
      best = {
        title: entry.title,
        page: entry.page,
        ratio,
        status: classifyOverlap(ratio),
      };
    }
  }
  return best;
}

async function main() {
  const entries = parseCatalog();
  const papers = entries.filter(isPaperEntry);
  const contentPages = entries.filter(isContentEntry).map((e) => e.page);

  const catalogPdfNames = new Set([
    ...papers.map((e) => pageToPdfRel(e.page)),
    ...contentPages.map((p) => pageToPdfRel(p)),
  ]);

  const localPdfNames = fs
    .readdirSync(VIE_DIR)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .sort();

  const orphans = localPdfNames.filter((f) => !catalogPdfNames.has(f));

  const counts = { MATCH: 0, PARTIAL: 0, MISMATCH: 0, deferred: 0, missingPdf: 0, noText: 0 };
  const catalogResults = [];
  const mismatchList = [];
  const partialList = [];

  console.log("=== VIE Catalog vs PDF Title Comparison ===\n");
  console.log(`Catalog papers: ${papers.length}`);
  console.log(`Local PDFs: ${localPdfNames.length}`);
  console.log(`Orphan PDFs: ${orphans.length}\n`);

  console.log("--- Catalog paper comparisons ---\n");

  for (const paper of papers) {
    const rel = pageToPdfRel(paper.page);
    const pdfPath = path.join(VIE_DIR, rel);

    if (PENDING_PDF_PATHS.has(paper.page)) {
      counts.deferred += 1;
      catalogResults.push({
        status: "DEFERRED",
        catalogTitle: paper.title,
        pdfTitle: "(pending upload)",
        file: `public/vie/${rel}`,
        page: paper.page,
        overlap: null,
      });
      console.log(`[DEFERRED] ${rel}`);
      continue;
    }

    if (!fs.existsSync(pdfPath)) {
      counts.missingPdf += 1;
      catalogResults.push({
        status: "MISSING_PDF",
        catalogTitle: paper.title,
        pdfTitle: "(file missing)",
        file: `public/vie/${rel}`,
        page: paper.page,
        overlap: 0,
      });
      mismatchList.push({
        catalogTitle: paper.title,
        pdfTitle: "(file missing)",
        file: `public/vie/${rel}`,
        overlap: 0,
        status: "MISMATCH",
      });
      counts.MISMATCH += 1;
      console.log(`[MISSING] ${rel}`);
      continue;
    }

    const { title: pdfTitle, rawLen } = await extractFirstPageTitle(pdfPath);
    const displayPdfTitle = pdfTitle || "(no extractable text on page 1)";
    if (!pdfTitle) counts.noText += 1;

    const overlap = wordOverlapRatio(paper.title, pdfTitle || "");
    const status = pdfTitle ? classifyOverlap(overlap) : "MISMATCH";
    counts[status] += 1;

    catalogResults.push({
      status,
      catalogTitle: paper.title,
      pdfTitle: displayPdfTitle,
      file: `public/vie/${rel}`,
      page: paper.page,
      overlap: pdfTitle ? overlap : 0,
      rawLen,
    });

    const tag = `[${status}]`;
    console.log(`${tag} ${rel} (${Math.round(overlap * 100)}%)`);
    if (status !== "MATCH") {
      console.log(`  catalog: ${paper.title}`);
      console.log(`  pdf:     ${displayPdfTitle}`);
    }

    if (status === "MISMATCH") {
      mismatchList.push({
        catalogTitle: paper.title,
        pdfTitle: displayPdfTitle,
        file: `public/vie/${rel}`,
        overlap,
        status,
      });
    } else if (status === "PARTIAL") {
      partialList.push({
        catalogTitle: paper.title,
        pdfTitle: displayPdfTitle,
        file: `public/vie/${rel}`,
        overlap,
        status,
      });
    }
  }

  console.log("\n--- Orphan PDFs (17 expected) ---\n");

  const orphanResults = [];
  const orphanCatalogHits = [];

  for (const name of orphans) {
    const pdfPath = path.join(VIE_DIR, name);
    const { title: pdfTitle } = await extractFirstPageTitle(pdfPath);
    const displayPdfTitle = pdfTitle || "(no extractable text on page 1)";
    const match = bestCatalogMatch(pdfTitle || "", papers);

    const row = {
      file: `public/vie/${name}`,
      pdfTitle: displayPdfTitle,
      bestCatalogTitle: match.title || null,
      bestCatalogPage: match.page || null,
      overlap: match.ratio,
      catalogStatus: pdfTitle ? match.status : "MISMATCH",
    };
    orphanResults.push(row);

    console.log(`* ${name}`);
    console.log(`  pdf title: ${displayPdfTitle}`);
    if (match.title && match.ratio >= 0.35) {
      console.log(
        `  catalog hit: [${match.status}] ${Math.round(match.ratio * 100)}% -> ${match.title}`
      );
      orphanCatalogHits.push(row);
    }

    console.log("");
  }

  console.log("=== Summary counts ===\n");
  console.log(`MATCH:    ${counts.MATCH}`);
  console.log(`PARTIAL:  ${counts.PARTIAL}`);
  console.log(`MISMATCH: ${counts.MISMATCH}`);
  console.log(`deferred: ${counts.deferred}`);
  console.log(`missing PDF on disk: ${counts.missingPdf}`);
  console.log(`catalog PDFs with no page-1 text: ${counts.noText}`);

  if (mismatchList.length) {
    console.log("\n=== Catalog mismatches (incl. missing / no text) ===\n");
    for (const m of mismatchList) {
      console.log(`- ${m.file}`);
      console.log(`  catalog: ${m.catalogTitle}`);
      console.log(`  pdf:     ${m.pdfTitle}`);
      console.log(`  overlap: ${Math.round((m.overlap || 0) * 100)}%`);
    }
  }

  if (partialList.length) {
    console.log("\n=== Catalog partial matches ===\n");
    for (const m of partialList) {
      console.log(`- ${m.file}`);
      console.log(`  catalog: ${m.catalogTitle}`);
      console.log(`  pdf:     ${m.pdfTitle}`);
      console.log(`  overlap: ${Math.round(m.overlap * 100)}%`);
    }
  }

  if (orphanCatalogHits.length) {
    console.log("\n=== Orphans matching a catalog title (potential missing wiring) ===\n");
    for (const o of orphanCatalogHits) {
      console.log(`- ${o.file}`);
      console.log(`  pdf title: ${o.pdfTitle}`);
      console.log(
        `  best catalog: [${o.catalogStatus}] ${Math.round(o.overlap * 100)}% -> ${o.bestCatalogTitle}`
      );
      console.log(`  catalog page: ${o.bestCatalogPage}`);
    }
  }

  const outPath = path.join(ROOT, "scripts", "compare-vie-pdf-titles-output.json");
  fs.writeFileSync(
    outPath,
    JSON.stringify({ counts, catalogResults, orphanResults, orphanCatalogHits, mismatchList, partialList }, null, 2),
    "utf8"
  );
  console.log(`\nWrote ${outPath}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
