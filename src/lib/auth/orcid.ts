import { SITE_URL } from "@/lib/site-url";

const ORCID_AUTH_URL = "https://orcid.org/oauth/authorize";

export function getOrcidAuthUrl(state: string): string | null {
  const clientId = process.env.ORCID_CLIENT_ID;
  if (!clientId) return null;

  const redirectUri = `${SITE_URL}/api/auth/orcid/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    scope: "/authenticate",
    redirect_uri: redirectUri,
    state,
  });

  return `${ORCID_AUTH_URL}?${params.toString()}`;
}

export async function exchangeOrcidCode(
  code: string
): Promise<{ orcid?: string; error?: string }> {
  const clientId = process.env.ORCID_CLIENT_ID;
  const clientSecret = process.env.ORCID_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return { error: "ORCID not configured" };
  }

  const redirectUri = `${SITE_URL}/api/auth/orcid/callback`;
  const tokenRes = await fetch("https://orcid.org/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    return { error: "ORCID token exchange failed" };
  }

  const data = (await tokenRes.json()) as { orcid?: string };
  return { orcid: data.orcid };
}
