import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms";
import { PAPER_PATHS } from "@/lib/qa/paths";

export const dynamic = "force-dynamic";

export async function GET() {
  const site = getSiteSettings();
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://vie-rase-backend.onrender.com";

  let backendStatus: "ok" | "degraded" | "down" = "down";
  try {
    const res = await fetch(`${apiUrl}/api/vbe_getallarticles`, {
      cache: "no-store",
    });
    backendStatus = res.status < 500 ? "ok" : "degraded";
  } catch {
    backendStatus = "down";
  }

  const body = {
    status: backendStatus === "down" ? "degraded" : "ok",
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
    site: site.siteName,
    papers: {
      expected: PAPER_PATHS.length,
      contract: "20 immutable JSON files preserved",
    },
    backend: {
      url: apiUrl,
      status: backendStatus,
    },
    maintenanceMode: site.maintenanceMode,
    security: {
      csrf: "double-submit-cookie",
      rateLimit: "middleware",
      authCookies: "httpOnly",
    },
  };

  const status = body.status === "ok" ? 200 : 503;
  return NextResponse.json(body, { status });
}
