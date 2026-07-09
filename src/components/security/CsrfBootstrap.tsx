"use client";

import { useEffect } from "react";
import { getCsrfToken } from "@/lib/security/client";

/** Bootstrap CSRF token after idle — avoids blocking initial paint. */
export function CsrfBootstrap() {
  useEffect(() => {
    const run = () => {
      getCsrfToken().catch(() => {
        /* non-fatal on static pages */
      });
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const t = setTimeout(run, 1500);
    return () => clearTimeout(t);
  }, []);
  return null;
}
