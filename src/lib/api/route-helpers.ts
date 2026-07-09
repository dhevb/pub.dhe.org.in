import { NextRequest, NextResponse } from "next/server";
import {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  validateCsrfToken,
} from "@/lib/security/csrf";

/** Shared CSRF guard for mutating API routes. Returns error response when invalid. */
export function requireCsrf(request: NextRequest) {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  if (!validateCsrfToken(cookieToken, headerToken)) {
    // Backward-compatible body (no `code` field) for existing clients
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
  return null;
}
