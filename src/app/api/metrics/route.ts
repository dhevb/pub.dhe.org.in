import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { incrementMetric, getMetrics } from "@/lib/metrics/store";

const postSchema = z.object({
  path: z.string().min(1).max(512),
  type: z.enum(["view", "download"]),
});

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? undefined;
  const metrics = await getMetrics(path);
  return NextResponse.json({ metrics });
}

export async function POST(request: NextRequest) {
  try {
    const body = postSchema.parse(await request.json());
    const count = await incrementMetric(body.path, body.type);
    return NextResponse.json({ path: body.path, type: body.type, count });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
