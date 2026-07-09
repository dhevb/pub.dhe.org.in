import Link from "next/link";
import { PortalShell } from "@/components/layout/PortalShell";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Offline",
  path: "/offline",
  noIndex: true,
});

export default function OfflinePage() {
  return (
    <PortalShell>
      <div className="container-wide section-padding text-center">
        <h1 className="heading-section mb-4">You are offline</h1>
        <p className="mb-6 text-muted-foreground">
          Some pages may be unavailable. Reconnect to browse the full journal.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Return home
        </Link>
      </div>
    </PortalShell>
  );
}
