import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Sign In",
  description:
    "Sign in to Viksit Bharat Journal to submit manuscripts, track reviews, and manage your research publications.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}
