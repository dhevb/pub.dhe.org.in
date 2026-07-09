import { PortalShell } from "@/components/layout/PortalShell";
import ForgotPassword from "../component/ForgotPassword";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Forgot Password",
  description: "Reset your Viksit Bharat Journal account password.",
  path: "/ForgotPassword",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <PortalShell>
      <div className="container-wide section-padding">
        <ForgotPassword />
      </div>
    </PortalShell>
  );
}
