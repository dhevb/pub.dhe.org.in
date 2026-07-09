import { PortalShell } from "@/components/layout/PortalShell";
import { SignupForm } from "@/components/auth/SignupForm";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Create Account",
  description:
    "Register as an author on Viksit Bharat Journal to submit manuscripts and track publications.",
  path: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  return (
    <PortalShell>
      <SignupForm />
    </PortalShell>
  );
}
