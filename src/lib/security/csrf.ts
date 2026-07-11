export const CSRF_COOKIE_NAME = "csrf-token";
export const CSRF_HEADER_NAME = "x-csrf-token";
export const CSRF_TOKEN_BYTES = 32;
export const CSRF_MAX_AGE = 60 * 60 * 8;

/** Edge-safe token generation via Web Crypto. */
export function generateCsrfToken(): string {
  const bytes = new Uint8Array(CSRF_TOKEN_BYTES);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Double Submit Cookie validation — cookie must match header exactly. */
export function validateCsrfToken(
  cookieValue: string | undefined,
  headerValue: string | null
): boolean {
  if (!cookieValue || !headerValue) return false;
  if (cookieValue.length < CSRF_TOKEN_BYTES * 2) return false;
  return cookieValue === headerValue;
}

export const CSRF_PROTECTED_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/** API routes exempt from CSRF (read-only or token bootstrap). */
export const CSRF_EXEMPT_PATHS = new Set([
  "/api/health",
  "/api/cms",
  "/api/csrf",
  "/api/metrics",
  "/api/oai",
  "/api/citations",
  "/api/setup/supabase",
]);

export function requiresCsrfValidation(pathname: string, method: string): boolean {
  if (!pathname.startsWith("/api/")) return false;
  if (!CSRF_PROTECTED_METHODS.has(method.toUpperCase())) return false;
  if (CSRF_EXEMPT_PATHS.has(pathname)) return false;
  return true;
}
