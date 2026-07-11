import { NextRequest, NextResponse } from "next/server";
import { buildPaperSearchIndex } from "@/lib/content/search-index";
import { buildOaiIdentify, buildOaiListRecords } from "@/lib/publishing/oai-pmh";

export async function GET(request: NextRequest) {
  const verb = request.nextUrl.searchParams.get("verb") ?? "Identify";

  if (verb === "Identify") {
    return new NextResponse(buildOaiIdentify(), {
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  }

  if (verb === "ListRecords") {
    const metadataPrefix = request.nextUrl.searchParams.get("metadataPrefix");
    if (metadataPrefix !== "oai_dc") {
      return new NextResponse("BadArgument: unsupported metadataPrefix", { status: 400 });
    }
    const items = await buildPaperSearchIndex();
    return new NextResponse(buildOaiListRecords(items), {
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  }

  return new NextResponse("BadVerb", { status: 400 });
}
