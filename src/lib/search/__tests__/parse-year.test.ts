import { describe, expect, it } from "vitest";
import { parseYear } from "../engine";

describe("parseYear", () => {
  it("extracts year from date strings", () => {
    expect(parseYear("March 2024")).toBe(2024);
    expect(parseYear("2023-01-15")).toBe(2023);
  });

  it("returns undefined for empty input", () => {
    expect(parseYear(undefined)).toBeUndefined();
    expect(parseYear("no year")).toBeUndefined();
  });
});
