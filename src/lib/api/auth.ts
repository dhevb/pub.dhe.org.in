import { apiFetch, apiUrl } from "./client";
import type { LoginResponse, SignupPayload } from "./types";

export const AUTH_ENDPOINTS = {
  login: "/api/login",
  signup: "/api/signup",
  resetPassword: "/api/reset-password",
} as const;

export async function loginWithCredentials(
  email: string,
  password: string
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>(AUTH_ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
}

export async function signupUser(
  payload: SignupPayload & { confirmPassword?: string }
): Promise<unknown> {
  return apiFetch(AUTH_ENDPOINTS.signup, {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

export async function requestPasswordReset(email: string): Promise<unknown> {
  return apiFetch(AUTH_ENDPOINTS.resetPassword, {
    method: "POST",
    body: JSON.stringify({ email }),
    cache: "no-store",
  });
}

/** Client-side login via Next.js API route (sets httpOnly cookies) */
export async function loginViaAppRoute(
  email: string,
  password: string
): Promise<{ user: Omit<LoginResponse, "token">; token: string }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "same-origin",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Login failed");
  }

  return data;
}

export async function logoutViaAppRoute(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
}

export async function getSessionViaAppRoute(): Promise<{
  authenticated: boolean;
  user?: Omit<LoginResponse, "token">;
}> {
  const res = await fetch("/api/auth/session", {
    credentials: "same-origin",
    cache: "no-store",
  });
  return res.json();
}

export { apiUrl };
