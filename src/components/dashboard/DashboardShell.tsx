import { ReactNode } from "react";
import Link from "next/link";
import { PortalShell } from "@/components/layout/PortalShell";
import { getAuthSessionFromCookies } from "@/lib/auth/session";
import { DashboardNav } from "./DashboardNav";

interface DashboardShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  allowedRoles?: string[];
}

export function DashboardShell({
  children,
  title,
  description,
  allowedRoles,
}: DashboardShellProps) {
  const session = getAuthSessionFromCookies();
  const role = session?.role?.toLowerCase();
  const authorized =
    !allowedRoles?.length || (role ? allowedRoles.includes(role) : false);

  return (
    <PortalShell className="flex-1">
      <div className="container-wide section-padding">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {title && <h1 className="heading-section">{title}</h1>}
            {description && (
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            Account &amp; sign in
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-xl border bg-card p-4 lg:sticky lg:top-24 lg:self-start">
            <DashboardNav />
          </aside>
          <div className="min-w-0">
            {authorized ? (
              children
            ) : (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                <h2 className="font-display text-xl font-semibold text-navy">
                  Role access required
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                  This dashboard is limited to{" "}
                  {allowedRoles?.join(", ") ?? "authorized"} accounts. Please sign
                  in with the correct account or contact the editorial office.
                </p>
                <Link
                  href="/login"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Sign in with another account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
