import { cookies } from "next/headers";
import { AUTH_COOKIE_NAMES } from "./constants";

export interface AuthSession {
  token: string;
  userId?: string;
  role?: string;
}

export function getAuthTokenFromCookies(): string | undefined {
  const store = cookies();
  return (
    store.get(AUTH_COOKIE_NAMES.token)?.value ||
    store.get(AUTH_COOKIE_NAMES.authToken)?.value
  );
}

export function getAuthSessionFromCookies(): AuthSession | undefined {
  const store = cookies();
  const token =
    store.get(AUTH_COOKIE_NAMES.token)?.value ||
    store.get(AUTH_COOKIE_NAMES.authToken)?.value;
  if (!token) return undefined;

  return {
    token,
    userId: store.get(AUTH_COOKIE_NAMES.userId)?.value,
    role: store.get(AUTH_COOKIE_NAMES.role)?.value,
  };
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthTokenFromCookies());
}
