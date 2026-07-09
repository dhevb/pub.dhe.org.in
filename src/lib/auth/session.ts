import { cookies } from "next/headers";
import { AUTH_COOKIE_NAMES } from "./constants";

export function getAuthTokenFromCookies(): string | undefined {
  const store = cookies();
  return (
    store.get(AUTH_COOKIE_NAMES.token)?.value ||
    store.get(AUTH_COOKIE_NAMES.authToken)?.value
  );
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthTokenFromCookies());
}
