import JournalCard from "../component/JournalCard";
import { PortalShell } from "@/components/layout/PortalShell";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "All Journals",
  description:
    "Browse all Viksit Bharat and Viksit India journals — English and Hindi editions.",
  path: "/Journal",
});

export default function JournalPage() {
  return (
    <PortalShell>
      <JournalCard />
    </PortalShell>
  );
}
