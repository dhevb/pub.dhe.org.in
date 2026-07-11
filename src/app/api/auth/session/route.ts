import { NextResponse } from "next/server";
import { getAuthSessionFromCookies } from "@/lib/auth/session";

export async function GET() {
  const session = getAuthSessionFromCookies();

  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      hasToken: true,
      userId: session.userId,
      role: session.role,
    },
  });
}
