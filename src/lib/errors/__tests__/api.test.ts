import { describe, expect, it } from "vitest";
import { AppError, apiError, handleRouteError, validationError } from "../index";
import { ZodError, z } from "zod";

describe("errors/api", () => {
  it("returns structured validation errors", async () => {
    const res = validationError("Invalid email");
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.code).toBe("VALIDATION_ERROR");
    expect(body.error).toBe("Invalid email");
  });

  it("maps AppError to response", async () => {
    const res = apiError("Not allowed", "FORBIDDEN", 403);
    const body = await res.json();
    expect(body.code).toBe("FORBIDDEN");
    expect(res.status).toBe(403);
  });

  it("handles ZodError via handleRouteError", async () => {
    const schema = z.object({ email: z.string().email() });
    try {
      schema.parse({ email: "bad" });
    } catch (error) {
      const res = handleRouteError(error);
      expect(res.status).toBe(400);
    }
  });

  it("handles AppError instances", async () => {
    const res = handleRouteError(
      new AppError("Upstream failed", { code: "UPSTREAM_ERROR", status: 502 })
    );
    expect(res.status).toBe(502);
  });
});
