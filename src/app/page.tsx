import { PortalShell } from "@/components/layout/PortalShell";
import { Homepage } from "@/components/home/Homepage";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/content/homepage";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema, organizationSchema } from "@/lib/seo/schemas";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Viksit Bharat Journal — A Bharatiya Knowledge Journal",
  description:
    "Bharat's indigenous open-access multidisciplinary knowledge journal. Research for nation building — publishing education, innovation, policy, and IKS research for every knowledge creator.",
  path: "/",
});

export default function HomePage() {
  return (
    <PortalShell>
      <JsonLd data={[organizationSchema(), faqSchema(FAQS)]} />
      <Homepage />
    </PortalShell>
  );
}
