#!/usr/bin/env node
/** Verify Google Scholar citation_* meta tags on a paper URL. */
const url = process.argv[2] || "https://pub.dhe.org.in/vbe.rase/Paper1";

const REQUIRED = [
  "citation_title",
  "citation_author",
  "citation_journal_title",
  "citation_publication_date",
  "citation_language",
  "citation_pdf_url",
  "citation_abstract_html_url",
];

const OPTIONAL = [
  "citation_keywords",
  "citation_issn",
  "citation_doi",
  "citation_volume",
  "citation_issue",
  "citation_firstpage",
  "citation_lastpage",
];

async function main() {
  const res = await fetch(url);
  const html = await res.text();
  const found = new Set(
    [...html.matchAll(/name="(citation_[^"]+)"/g)].map((m) => m[1].replace(/\d+$/, ""))
  );

  console.log(`URL: ${url}\n`);
  for (const tag of REQUIRED) {
    const ok = [...found].some((t) => t.startsWith(tag));
    console.log(`${ok ? "PASS" : "FAIL"}  ${tag}`);
  }
  console.log("\nOptional:");
  for (const tag of OPTIONAL) {
    const ok = [...found].some((t) => t.startsWith(tag));
    console.log(`${ok ? "PASS" : "WARN"}  ${tag}`);
  }
}

main();
