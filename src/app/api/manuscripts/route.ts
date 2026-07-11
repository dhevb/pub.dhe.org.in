import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getManuscriptsByUser } from "@/lib/api/manuscripts";
import { AUTH_COOKIE_NAMES } from "@/lib/auth/constants";
import {
  getManuscriptsFromSupabase,
  supabaseManuscriptsEnabled,
} from "@/lib/supabase/manuscripts";

export async function GET(request: NextRequest) {
  const store = cookies();
  const userId =
    store.get(AUTH_COOKIE_NAMES.userId)?.value ??
    request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Not authenticated. Sign in to view manuscripts." },
      { status: 401 }
    );
  }

  const token = store.get(AUTH_COOKIE_NAMES.token)?.value;

  try {
    let manuscripts;
    if (supabaseManuscriptsEnabled()) {
      manuscripts = await getManuscriptsFromSupabase(userId);
    } else {
      manuscripts = await getManuscriptsByUser(userId, token);
    }
    return NextResponse.json({ manuscripts, source: supabaseManuscriptsEnabled() ? "supabase" : "render" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load manuscripts";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
