import { siteConfig } from "@/lib/seo/metadata";
import { JOURNAL_LIST, paperRoute } from "@/lib/journals/config";
import { loadPaper } from "@/lib/journals/papers";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const base = siteConfig.url;
  const items: string[] = [];

  for (const journal of JOURNAL_LIST) {
    for (let num = 1; num <= journal.paperCount; num++) {
      try {
        const paper = await loadPaper(journal.id, num);
        const title =
          paper.ArticleDetails?.Title ?? `${journal.name} — Paper ${num}`;
        const link = `${base}${paperRoute(journal, num)}`;
        const description = escapeXml(
          paper.Abstract?.slice(0, 300) ??
            `Published research article from ${journal.name}`
        );

        items.push(`
    <item>
      <title>${escapeXml(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${paper.ArticleInfo?.Published ?? new Date().toUTCString()}</pubDate>
    </item>`);
      } catch {
        // skip missing papers
      }
    }
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${base}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items.join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
