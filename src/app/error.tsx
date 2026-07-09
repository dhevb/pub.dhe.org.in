"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-wide section-padding text-center">
      <h1 className="heading-section mb-4">Something went wrong</h1>
      <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
        <a href="/" className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
          Go home
        </a>
      </div>
    </div>
  );
}
