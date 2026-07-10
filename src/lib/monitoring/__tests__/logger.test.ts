import { describe, expect, it } from "vitest";
import {
  auditLog,
  captureException,
  getRecentAuditLogs,
  logEvent,
  getRecentLogs,
} from "../index";

describe("monitoring", () => {
  it("buffers log events", () => {
    const before = getRecentLogs().length;
    logEvent("info", "test event", { foo: "bar" });
    expect(getRecentLogs().length).toBeGreaterThanOrEqual(before + 1);
  });

  it("buffers audit entries", () => {
    const before = getRecentAuditLogs().length;
    auditLog("search.query", "user-1", { q: "iot" });
    const logs = getRecentAuditLogs();
    expect(logs.length).toBeGreaterThanOrEqual(before + 1);
    expect(logs[logs.length - 1].action).toBe("search.query");
  });

  it("captureException does not throw without Sentry", () => {
    expect(() => captureException(new Error("test"))).not.toThrow();
  });
});
