import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildPaperSearchIndex } from "@/lib/content/search-index";
import { sanitizeString } from "@/lib/security/sanitize";

const querySchema = z.object({
  q: z.string().max(200).optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = querySchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const q = parsed.data.q ? sanitizeString(parsed.data.q, 200).toLowerCase() : "";
  const limit = parsed.data.limit ?? 20;

  const index = await buildPaperSearchIndex();
  const results = q
    ? index
        .filter((item) => {
          const authors = item.authors ?? [];
          const kw = item.keywords?.toLowerCase() ?? "";
          return (
            item.title.toLowerCase().includes(q) ||
            authors.some((a) => a.toLowerCase().includes(q)) ||
            kw.includes(q)
          );
        })
        .slice(0, limit)
    : index.slice(0, limit);

  return NextResponse.json(
    { count: results.length, results },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
