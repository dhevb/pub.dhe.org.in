/** Client-side error reporting — safe for browser bundles. */
export function reportClientError(
  error: Error,
  context?: Record<string, unknown>
): void {
  console.error("[client-error]", error.message, context);

  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "client_error",
      error_message: error.message,
      error_digest: (error as Error & { digest?: string }).digest,
      ...context,
    });
  }
}
