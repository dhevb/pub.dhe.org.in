import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeOrcidCode } from "@/lib/auth/orcid";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const store = cookies();
  const savedState = store.get("orcid_oauth_state")?.value;

  if (!code || !state || state !== savedState) {
    return NextResponse.redirect("/login?error=orcid_state_mismatch");
  }

  const result = await exchangeOrcidCode(code);
  store.delete("orcid_oauth_state");

  if (result.error || !result.orcid) {
    return NextResponse.redirect("/login?error=orcid_failed");
  }

  return NextResponse.redirect(`/dashboard/author?orcid=${encodeURIComponent(result.orcid)}`);
}
