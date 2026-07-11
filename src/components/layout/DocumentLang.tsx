"use client";

import { getPageLanguage } from "@/lib/i18n/language";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Keeps `<html lang>` in sync on client navigations. */
export function DocumentLang() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = getPageLanguage(pathname ?? "/");
    document.documentElement.lang = lang === "hi" ? "hi-IN" : "en-IN";
  }, [pathname]);

  return null;
}
