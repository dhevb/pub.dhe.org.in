import { NextRequest, NextResponse } from "next/server";
import { getOrcidAuthUrl } from "@/lib/auth/orcid";
import crypto from "crypto";

export async function GET() {
  const state = crypto.randomBytes(16).toString("hex");
  const url = getOrcidAuthUrl(state);

  if (!url) {
    return NextResponse.json(
      { error: "ORCID OAuth not configured. Set ORCID_CLIENT_ID in environment." },
      { status: 503 }
    );
  }

  const response = NextResponse.redirect(url);
  response.cookies.set("orcid_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
    path: "/",
  });

  return response;
}
