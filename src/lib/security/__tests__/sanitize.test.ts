import { describe, expect, it } from "vitest";
import { escapeHtml, sanitizeEmail, sanitizeString } from "../sanitize";

describe("sanitize", () => {
  it("strips HTML tags and control characters", () => {
    expect(sanitizeString("<script>alert(1)</script>Hello")).toBe("alert(1)Hello");
    expect(sanitizeString("  trimmed  ")).toBe("trimmed");
  });

  it("enforces max length", () => {
    expect(sanitizeString("abcdef", 3)).toBe("abc");
  });

  it("normalizes email", () => {
    expect(sanitizeEmail("  User@Example.COM  ")).toBe("user@example.com");
  });

  it("escapes HTML entities", () => {
    expect(escapeHtml(`<a href="x">'test'`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;test&#39;"
    );
  });
});
