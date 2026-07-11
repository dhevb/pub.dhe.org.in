"use client";

import { useEffect } from "react";
import { reportClientError } from "@/lib/errors/client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError(error, { scope: "global-error" });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground">
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <h1 className="mb-4 text-2xl font-semibold">Service unavailable</h1>
          <p className="mb-6 text-muted-foreground">
            A critical error occurred. Please try again or return to the homepage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Try again
            </button>
            <a href="/" className="rounded-lg border px-4 py-2 text-sm font-medium">
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
