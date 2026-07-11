import { PortalShell } from "@/components/layout/PortalShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { Suspense } from "react";

export const metadata = buildMetadata({
  title: "Sign In",
  description:
    "Sign in to Viksit Bharat Journal to submit manuscripts, track reviews, and manage your research publications.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <PortalShell className="flex-1">
      <div className="section-padding">
        <div className="container-narrow">
          <Suspense fallback={<div className="skeleton h-96 rounded-xl" aria-hidden />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </PortalShell>
  );
}
