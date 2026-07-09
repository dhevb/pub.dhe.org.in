import { NextRequest, NextResponse } from "next/server";
import type { NextRequest as Req } from "next/server";
import {
  AUTH_PATHS,
  PROTECTED_PREFIXES,
} from "@/lib/auth/constants";
import {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  requiresCsrfValidation,
  validateCsrfToken,
} from "@/lib/security/csrf";
import {
  checkRateLimit,
  getRateLimitConfig,
  rateLimitKey,
} from "@/lib/security/rate-limit";

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

function getClientIp(request: Req): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.ip ||
    "unknown"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);
  const method = request.method;

  const rateConfig = getRateLimitConfig(pathname);
  const rl = checkRateLimit(rateLimitKey(ip, pathname), rateConfig);
  if (!rl.allowed) {
    return secureHeaders(
      new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((rl.resetAt - Date.now()) / 1000)
          ),
          "X-RateLimit-Remaining": "0",
        },
      })
    );
  }

  if (requiresCsrfValidation(pathname, method)) {
    const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
    const headerToken = request.headers.get(CSRF_HEADER_NAME);
    if (!validateCsrfToken(cookieToken, headerToken)) {
      return secureHeaders(
        NextResponse.json(
          { error: "Invalid or missing CSRF token" },
          { status: 403 }
        )
      );
    }
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

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  return secureHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};
