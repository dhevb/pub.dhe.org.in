import { describe, expect, it } from "vitest";
import {
  CSRF_EXEMPT_PATHS,
  generateCsrfToken,
  requiresCsrfValidation,
  validateCsrfToken,
} from "../csrf";

describe("CSRF", () => {
  it("generates 64-char hex tokens", () => {
    const token = generateCsrfToken();
    expect(token).toHaveLength(64);
    expect(token).toMatch(/^[0-9a-f]+$/);
  });

  it("validates matching cookie and header", () => {
    const token = generateCsrfToken();
    expect(validateCsrfToken(token, token)).toBe(true);
  });

  it("rejects missing or mismatched tokens", () => {
    const token = generateCsrfToken();
    expect(validateCsrfToken(undefined, token)).toBe(false);
    expect(validateCsrfToken(token, null)).toBe(false);
    expect(validateCsrfToken(token, "wrong")).toBe(false);
    expect(validateCsrfToken("short", token)).toBe(false);
  });

  it("requires CSRF for mutating API routes only", () => {
    expect(requiresCsrfValidation("/api/auth/login", "POST")).toBe(true);
    expect(requiresCsrfValidation("/api/health", "GET")).toBe(false);
    expect(requiresCsrfValidation("/api/health", "POST")).toBe(false);
    expect(CSRF_EXEMPT_PATHS.has("/api/csrf")).toBe(true);
    expect(requiresCsrfValidation("/api/csrf", "POST")).toBe(false);
    expect(requiresCsrfValidation("/login", "POST")).toBe(false);
  });
});
