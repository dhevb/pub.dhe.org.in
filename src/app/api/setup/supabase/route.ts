import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseSetupStatus,
  runSupabaseSetup,
} from "@/lib/supabase/setup";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: NextRequest): boolean {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const secret =
    process.env.SUPABASE_SETUP_TOKEN || process.env.CRON_SECRET || "";
  return Boolean(secret && token === secret);
}

export async function GET() {
  try {
    const status = await getSupabaseSetupStatus();
    return NextResponse.json(status);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Setup status failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const status = await runSupabaseSetup();
    return NextResponse.json({ success: true, ...status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Setup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
