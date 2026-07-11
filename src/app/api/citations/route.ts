import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { loadPaper } from "@/lib/journals/papers";
import { getJournal, type JournalId } from "@/lib/journals/config";
import { paperRoute } from "@/lib/journals/config";
import { formatCitation, CITATION_STYLES, type CitationStyle } from "@/lib/research/citations";
import { SITE_URL } from "@/lib/site-url";

const querySchema = z.object({
  journal: z.enum(["vbe", "vbh", "vie", "vih"]),
  paper: z.coerce.number().int().min(1).max(5),
  style: z.enum(["apa", "mla", "chicago", "ieee", "bibtex", "ris"]).default("apa"),
});

export async function GET(request: NextRequest) {
  try {
    const params = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    const journal = getJournal(params.journal as JournalId);
    const paper = await loadPaper(params.journal as JournalId, params.paper);
    const url = `${SITE_URL}${paperRoute(journal, params.paper)}`;
    const citation = formatCitation(params.style as CitationStyle, paper, {
      journalName: journal.name,
      url,
    });

    return NextResponse.json({
      style: params.style,
      citation,
      styles: CITATION_STYLES,
      url,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Citation generation failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
