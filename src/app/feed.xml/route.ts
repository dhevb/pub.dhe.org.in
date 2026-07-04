import { siteConfig } from "@/lib/seo/metadata";
import { JOURNAL_LIST, paperRoute } from "@/lib/journals/config";

export async function GET() {
  const base = siteConfig.url;
  const items = JOURNAL_LIST.flatMap((j) =>
    Array.from({ length: j.paperCount }, (_, i) => {
      const num = i + 1;
      return `
    <item>
      <title>${j.name} — Paper ${num}</title>
      <link>${base}${paperRoute(j, num)}</link>
      <guid>${base}${paperRoute(j, num)}</guid>
      <description>Published research article from ${j.name}</description>
    </item>`;
    })
  ).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${base}</link>
    <description>${siteConfig.description}</description>
    <language>en-in</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
