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

export async function signupViaAppRoute(
  payload: SignupPayload & { confirmPassword?: string }
): Promise<unknown> {
  const { secureFetch } = await import("@/lib/security/client");
  const res = await secureFetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Signup failed");
  return data;
}

export async function forgotPasswordViaAppRoute(email: string): Promise<unknown> {
  const { secureFetch } = await import("@/lib/security/client");
  const res = await secureFetch("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Password reset failed");
  return data;
}

/** Client-side login via Next.js API route (sets httpOnly cookies) */
export async function loginViaAppRoute(
  email: string,
  password: string
): Promise<{ user: Omit<LoginResponse, "token">; token: string }> {
  const { secureFetch, clearCsrfCache } = await import("@/lib/security/client");
  const res = await secureFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Login failed");
  }

  clearCsrfCache();
  return data;
}

export async function logoutViaAppRoute(): Promise<void> {
  const { secureFetch, clearCsrfCache } = await import("@/lib/security/client");
  await secureFetch("/api/auth/logout", { method: "POST" });
  clearCsrfCache();
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
