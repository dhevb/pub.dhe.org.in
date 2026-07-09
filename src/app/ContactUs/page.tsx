import { PortalShell } from "@/components/layout/PortalShell";
import ContactUs from "../component/ContactUs";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Support",
  description:
    "Contact the Viksit Bharat Journal editorial office for submissions, indexing inquiries, partnerships, and technical support.",
  path: "/ContactUs",
});

export default function ContactPage() {
  return (
    <PortalShell>
      <div className="container-wide section-padding">
        <ContactUs />
      </div>
    </PortalShell>
  );
}
