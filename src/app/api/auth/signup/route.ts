import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiFetch } from "@/lib/api/client";
import { AUTH_ENDPOINTS } from "@/lib/api/auth";
import {
  CSRF_COOKIE_NAME,
  validateCsrfToken,
} from "@/lib/security/csrf";
import { sanitizeEmail, sanitizeString } from "@/lib/security/sanitize";

const signupSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  password: z.string().min(6).max(256),
  institution: z.string().max(500).optional(),
  areaOfStudy: z.string().max(500).optional(),
  role: z.enum(["student", "teacher", "researcher", "other"]),
  confirmPassword: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!validateCsrfToken(cookieToken, headerToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const payload = {
      ...parsed.data,
      email: sanitizeEmail(parsed.data.email),
      name: sanitizeString(parsed.data.name, 200),
      password: sanitizeString(parsed.data.password, 256),
      institution: parsed.data.institution
        ? sanitizeString(parsed.data.institution, 500)
        : undefined,
      areaOfStudy: parsed.data.areaOfStudy
        ? sanitizeString(parsed.data.areaOfStudy, 500)
        : undefined,
    };

    const data = await apiFetch(AUTH_ENDPOINTS.signup, {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Signup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
