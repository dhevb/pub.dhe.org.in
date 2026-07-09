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

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const data = await apiFetch<LoginResponse>(AUTH_ENDPOINTS.login, {
      method: "POST",
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });

    if (!data?.token || !data?.userId) {
      return NextResponse.json(
        { error: "Invalid response from authentication service" },
        { status: 502 }
      );
    }

    setAuthCookies(data.token, data.userId);

    return NextResponse.json({
      user: {
        userId: data.userId,
        email: data.email,
        institution: data.institution,
        role: data.role,
        areaOfStudy: data.areaOfStudy,
      },
      token: data.token,
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
