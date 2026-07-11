import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAMES } from "@/lib/auth/constants";
import {
  CSRF_COOKIE_NAME,
  generateCsrfToken,
  validateCsrfToken,
} from "@/lib/security/csrf";

export async function POST(request: NextRequest) {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!validateCsrfToken(cookieToken, headerToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const store = cookies();
  store.delete(AUTH_COOKIE_NAMES.token);
  store.delete(AUTH_COOKIE_NAMES.authToken);
  store.delete(AUTH_COOKIE_NAMES.userId);
  store.delete(AUTH_COOKIE_NAMES.role);

  const newCsrf = generateCsrfToken();
  store.set(CSRF_COOKIE_NAME, newCsrf, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ success: true, csrfToken: newCsrf });
}
