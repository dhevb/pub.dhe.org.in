const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const LICENSE_MARKERS = ["Creative Commons", "creativecommons.org", "\u0915\u094d\u0930\u093f\u090f\u091f\u093f\u0935"];
function isLicenseText(v) { return typeof v === "string" && LICENSE_MARKERS.some((m) => v.includes(m)); }
const journalDirs = ["vbe.rase", "vbh.rase", "vie.rase", "vih.rase"];
let papersFixed = 0;
for (const dir of journalDirs) {
  const outDir = path.join(ROOT, "src/app", dir, "output");
  for (const file of fs.readdirSync(outDir).filter((f) => /^Paper\d+\.json$/.test(f))) {
    const filePath = path.join(outDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (data.DOI && isLicenseText(data.DOI)) {
      data.LicenseNotice = data.DOI.trim();
      delete data.DOI;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
      papersFixed += 1;
      console.log("fixed " + dir + "/output/" + file);
    }
  }
}
const catalogPath = path.join(ROOT, "src/lib/journals/vie-archive-catalog.ts");
let catalog = fs.readFileSync(catalogPath, "utf8");
const trimmed = catalog.replace(/(title:\s*"[^"]*?)\s+",/g, (_, p) => p.trim() + '",').replace(/(author:\s*"[^"]*?)\s+",/g, (_, p) => p.trim() + '",');
if (trimmed !== catalog) { fs.writeFileSync(catalogPath, trimmed, "utf8"); console.log("trimmed vie-archive-catalog.ts"); }
console.log("Done. " + papersFixed + " paper files updated.");