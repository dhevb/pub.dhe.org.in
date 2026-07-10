import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filterPath = path.join(__dirname, "../src/app/component/vie_Component/Filter.tsx");
const text = fs.readFileSync(filterPath, "utf8");

const pages = [...text.matchAll(/page:\s*"([^"]+)"/g)].map((m) => m[1]);

const volumes = {};
for (const block of text.split("// -------")) {
  const volMatch = block.match(/Volume (\d)/);
  if (!volMatch) continue;
  const vol = volMatch[1];
  const issues = [...block.matchAll(/issue: "Issue (\d+)"/g)].map((m) => m[1]);
  volumes[vol] = new Set(issues).size;
}

console.log("Issues per volume:", volumes);

const paperPages = pages.filter(
  (p) =>
    p.startsWith("/vie/") &&
    !/Content|Journal Title|ci\d|cv\d/i.test(p)
);

console.log("Paper paths:", paperPages.length);

const base = "https://pub.dhe.org.in";
let ok = 0;
let missing = 0;
const missingList = [];

for (const page of paperPages) {
  const url = `${base}${page}.pdf`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) ok++;
    else {
      missing++;
      missingList.push(page);
    }
  } catch {
    missing++;
    missingList.push(page);
  }
}

console.log(`PDF check: ${ok} ok, ${missing} missing`);
if (missingList.length) {
  console.log("Missing:");
  missingList.forEach((p) => console.log(" ", p));
}
