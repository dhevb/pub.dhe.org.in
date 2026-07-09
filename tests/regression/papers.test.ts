import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { PAPER_PATHS } from "@/lib/qa/paths";

/** Regression: 20 immutable paper JSON files must exist with valid structure. */
describe("paper integrity regression", () => {
  for (const relPath of PAPER_PATHS) {
    it(`exists and has ArticleDetails: ${relPath}`, () => {
      const filePath = path.join(process.cwd(), relPath);
      expect(fs.existsSync(filePath)).toBe(true);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      expect(data.ArticleDetails?.Title).toBeTruthy();
    });
  }
});
