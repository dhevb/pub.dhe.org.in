import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiFetch } from "@/lib/api/client";
import { AUTH_ENDPOINTS } from "@/lib/api/auth";
import {
  CSRF_COOKIE_NAME,
  validateCsrfToken,
} from "@/lib/security/csrf";
import { sanitizeEmail } from "@/lib/security/sanitize";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!validateCsrfToken(cookieToken, headerToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const data = await apiFetch(AUTH_ENDPOINTS.resetPassword, {
      method: "POST",
      body: JSON.stringify({ email: sanitizeEmail(parsed.data.email) }),
      cache: "no-store",
    });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Password reset failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
