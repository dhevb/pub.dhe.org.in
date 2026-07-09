import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_PATHS,
  PROTECTED_PREFIXES,
} from "@/lib/auth/constants";

const RATE_LIMIT = 120;
const WINDOW_MS = 60_000;

const hits = new Map<string, { count: number; reset: number }>();

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vie-rase-backend.onrender.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

function secureHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("Content-Security-Policy", CSP_DIRECTIVES);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.ip ||
    "unknown";

  if (!allowRequest(ip)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  const token =
    request.cookies.get("token")?.value ||
    request.cookies.get("auth-token")?.value ||
    "";

  const isAuthPath = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  const isProtected = PROTECTED_PREFIXES.some((p) =>
    pathname.startsWith(p)
  );

  if (isAuthPath && token) {
    return secureHeaders(NextResponse.redirect(new URL("/", request.url)));
  }

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return secureHeaders(NextResponse.redirect(loginUrl));
  }

  return secureHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};
