import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { apiFetch } from "@/lib/api/client";
import type { LoginResponse } from "@/lib/api/types";
import { AUTH_ENDPOINTS } from "@/lib/api/auth";
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAMES,
  AUTH_COOKIE_OPTIONS,
} from "@/lib/auth/constants";
import {
  CSRF_COOKIE_NAME,
  CSRF_MAX_AGE,
  generateCsrfToken,
  validateCsrfToken,
} from "@/lib/security/csrf";
import { sanitizeEmail, sanitizeString } from "@/lib/security/sanitize";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required").max(256),
});

function setAuthCookies(token: string, userId: string) {
  const store = cookies();
  const options = {
    httpOnly: AUTH_COOKIE_OPTIONS.httpOnly,
    secure: AUTH_COOKIE_OPTIONS.secure,
    sameSite: AUTH_COOKIE_OPTIONS.sameSite,
    path: AUTH_COOKIE_OPTIONS.path,
    maxAge: AUTH_COOKIE_MAX_AGE,
  };
  store.set(AUTH_COOKIE_NAMES.token, token, options);
  store.set(AUTH_COOKIE_NAMES.authToken, token, options);
  store.set(AUTH_COOKIE_NAMES.userId, userId, options);
}

function rotateCsrf(): string {
  const token = generateCsrfToken();
  cookies().set(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: CSRF_MAX_AGE,
  });
  return token;
}

export async function POST(request: NextRequest) {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!validateCsrfToken(cookieToken, headerToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const payload = {
      email: sanitizeEmail(parsed.data.email),
      password: sanitizeString(parsed.data.password, 256),
    };

    const data = await apiFetch<LoginResponse>(AUTH_ENDPOINTS.login, {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!data?.token || !data?.userId) {
      return NextResponse.json(
        { error: "Invalid response from authentication service" },
        { status: 502 }
      );
    }

    setAuthCookies(data.token, data.userId);
    const newCsrf = rotateCsrf();

    return NextResponse.json({
      user: {
        userId: data.userId,
        email: data.email,
        institution: data.institution,
        role: data.role,
        areaOfStudy: data.areaOfStudy,
      },
      token: data.token,
      csrfToken: newCsrf,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication failed";
    const isUnauthorized =
      message.includes("401") || message.includes("403");

    return NextResponse.json(
      {
        error: isUnauthorized
          ? "Invalid email or password"
          : "Login failed. Please try again.",
      },
      { status: isUnauthorized ? 401 : 500 }
    );
  }
}
