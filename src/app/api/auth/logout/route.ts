import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAMES } from "@/lib/auth/constants";

export async function POST() {
  const store = cookies();
  store.delete(AUTH_COOKIE_NAMES.token);
  store.delete(AUTH_COOKIE_NAMES.authToken);
  store.delete(AUTH_COOKIE_NAMES.userId);
  return NextResponse.json({ success: true });
}
