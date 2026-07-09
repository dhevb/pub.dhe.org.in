import { describe, expect, it } from "vitest";
import {
  checkRateLimit,
  getRateLimitConfig,
  rateLimitKey,
} from "../rate-limit";

describe("rate-limit", () => {
  it("allows requests within limit", () => {
    const key = rateLimitKey("1.2.3.4", "/api/auth/login");
    const config = getRateLimitConfig("/api/auth/login");
    const first = checkRateLimit(key, config);
    expect(first.allowed).toBe(true);
    expect(first.remaining).toBe(config.limit - 1);
  });

  it("blocks when limit exceeded", () => {
    const key = rateLimitKey("9.9.9.9", "/test-limit");
    const config = { limit: 2, windowMs: 60_000 };

    checkRateLimit(key, config);
    checkRateLimit(key, config);
    const third = checkRateLimit(key, config);

    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it("resolves route-specific configs", () => {
    expect(getRateLimitConfig("/api/search").limit).toBe(120);
    expect(getRateLimitConfig("/unknown-route").limit).toBe(120);
    expect(getRateLimitConfig("/api/auth/signup").limit).toBe(5);
  });
});
