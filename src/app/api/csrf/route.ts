import { NextResponse } from "next/server";
import {
  CSRF_COOKIE_NAME,
  CSRF_MAX_AGE,
  generateCsrfToken,
} from "@/lib/security/csrf";

export async function GET() {
  const token = generateCsrfToken();
  const response = NextResponse.json({ token });
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: CSRF_MAX_AGE,
  });
  return response;
}
