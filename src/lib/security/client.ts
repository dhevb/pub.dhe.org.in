import {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  generateCsrfToken,
} from "@/lib/security/csrf";

let cachedToken: string | null = null;

/** Fetch CSRF token (double-submit cookie pattern). */
export async function getCsrfToken(): Promise<string> {
  if (cachedToken) return cachedToken;
  const res = await fetch("/api/csrf", {
    credentials: "same-origin",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to obtain CSRF token");
  const data = (await res.json()) as { token: string };
  cachedToken = data.token;
  return data.token;
}

/** Rotate CSRF after sensitive actions (login/logout). */
export function clearCsrfCache(): void {
  cachedToken = null;
}

/** Authenticated fetch with CSRF header for state-changing API calls. */
export async function secureFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const token = await getCsrfToken();
  const headers = new Headers(init?.headers);
  headers.set(CSRF_HEADER_NAME, token);
  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(input, {
    ...init,
    credentials: "same-origin",
    headers,
  });
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME };
