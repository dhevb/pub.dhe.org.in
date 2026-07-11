import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface HindiTextProps {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
}

/** Devanagari copy with correct `lang` for screen readers and SEO. */
export function HindiText({ children, className, as: Tag = "span" }: HindiTextProps) {
  return (
    <Tag lang="hi" className={cn("font-devanagari", className)}>
      {children}
    </Tag>
  );
}
