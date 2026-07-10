import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { requireCsrf } from "@/lib/api/route-helpers";
import { generateCsrfToken } from "@/lib/security/csrf";

describe("requireCsrf", () => {
  it("returns 403 when tokens missing", async () => {
    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
    });
    const res = requireCsrf(req);
    expect(res).not.toBeNull();
    expect(res!.status).toBe(403);
    const body = await res!.json();
    expect(body.error).toBe("Invalid CSRF token");
    expect(body.code).toBeUndefined();
  });

  it("returns null when cookie and header match", () => {
    const token = generateCsrfToken();
    const req = new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "x-csrf-token": token },
    });
    req.cookies.set("csrf-token", token);
    expect(requireCsrf(req)).toBeNull();
  });
});
