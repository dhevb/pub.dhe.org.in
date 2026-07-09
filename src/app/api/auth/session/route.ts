import { NextResponse } from "next/server";
import { getAuthTokenFromCookies } from "@/lib/auth/session";

export async function GET() {
  const token = getAuthTokenFromCookies();

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: { hasToken: true },
  });
}
