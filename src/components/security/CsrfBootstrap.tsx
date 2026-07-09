"use client";

import { useEffect } from "react";
import { getCsrfToken } from "@/lib/security/client";

/** Bootstrap CSRF token on app load for form submissions. */
export function CsrfBootstrap() {
  useEffect(() => {
    getCsrfToken().catch(() => {
      /* non-fatal on static pages */
    });
  }, []);
  return null;
}
