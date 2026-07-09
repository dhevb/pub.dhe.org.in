import { describe, expect, it } from "vitest";
import { PAPER_COUNT, PAPER_PATHS } from "../paths";

describe("paper integrity paths", () => {
  it("defines exactly 20 paper paths across 4 journals", () => {
    expect(PAPER_COUNT).toBe(20);
    expect(PAPER_PATHS).toHaveLength(20);
  });

  it("covers vbe, vbh, vie, vih with papers 1-5", () => {
    for (const journal of ["vbe", "vbh", "vie", "vih"]) {
      for (let n = 1; n <= 5; n++) {
        expect(
          PAPER_PATHS.some((p) => p.includes(`${journal}.rase/output/Paper${n}.json`))
        ).toBe(true);
      }
    }
  });
});
