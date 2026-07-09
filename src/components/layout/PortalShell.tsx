import { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface PortalShellProps {
  children: ReactNode;
  className?: string;
}

/** Unified layout for portal/marketing pages (not journal-specific routes). */
export function PortalShell({ children, className }: PortalShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className={className ?? "flex-1"}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
