import { JOURNAL_LIST, paperRoute, type JournalConfig, type JournalId } from "@/lib/journals/config";
import { siteConfig } from "./metadata";
import type { MetadataRoute } from "next";

const JOURNAL_SECTIONS = [
  "ReadArticlePage",
  "SubmitManuscript",
  "EditorialBoard",
  "Indexing",
  "ContactUs",
  "login",
  "signup",
] as const;

const LEGACY_JOURNAL_SECTIONS = [
  "AddArticle",
  "ManuscriptDetails",
  "issues",
  "issue",
  "table",
  "NewIssue",
] as const;

export function getAllPublicPaths(): string[] {
  const paths: string[] = [
    "/",
    "/about",
    "/search",
    "/bal-shodh-patrika",
    "/conferences",
    "/conferences/past",
    "/ContactUs",
    "/AllArticle",
    "/login",
    "/signup",
    "/ForgotPassword",
  ];

  for (const journal of JOURNAL_LIST) {
    paths.push(journal.entryRoute);

    for (const section of JOURNAL_SECTIONS) {
      paths.push(`${journal.routePrefix}/${section}`);
    }

    for (const section of LEGACY_JOURNAL_SECTIONS) {
      paths.push(`${journal.routePrefix}/${section}`);
    }

    for (let i = 1; i <= journal.paperCount; i++) {
      paths.push(paperRoute(journal, i));
    }
  }

  return paths;
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const priorityMap: Record<string, number> = {
    "/": 1,
    "/about": 0.9,
    "/search": 0.85,
    "/bal-shodh-patrika": 0.9,
    "/conferences": 0.9,
  };

  return getAllPublicPaths().map((path) => {
    const isPaper = /Paper\d+$/.test(path);
    const isJournalEntry = JOURNAL_LIST.some((j) => j.entryRoute === path);
    const isArticleList = path.endsWith("/ReadArticlePage");

    let priority = priorityMap[path] ?? 0.7;
    if (isJournalEntry) priority = 0.95;
    if (isPaper) priority = 0.85;
    if (isArticleList) priority = 0.8;
    if (path.includes("/login") || path.includes("/signup")) priority = 0.3;

    let changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] = "monthly";
    if (path === "/" || isArticleList) changeFrequency = "weekly";
    if (path === "/search") changeFrequency = "daily";
    if (isPaper) changeFrequency = "yearly";

    return {
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    };
  });
}

/** English ↔ Hindi journal pairs for hreflang */
export const HREFLANG_PAIRS: Record<JournalId, JournalId> = {
  vbe: "vbh",
  vbh: "vbe",
  vie: "vih",
  vih: "vie",
};

export function getJournalHreflangPaths(
  journal: JournalConfig,
  pathSuffix: string
): { en?: string; hi?: string } {
  const pairId = HREFLANG_PAIRS[journal.id];
  const pair = JOURNAL_LIST.find((j) => j.id === pairId);
  const base = siteConfig.url;

  if (journal.language === "en" && pair) {
    return {
      en: `${base}${journal.routePrefix}${pathSuffix}`,
      hi: `${base}${pair.routePrefix}${pathSuffix}`,
    };
  }
  if (journal.language === "hi" && pair) {
    return {
      en: `${base}${pair.routePrefix}${pathSuffix}`,
      hi: `${base}${journal.routePrefix}${pathSuffix}`,
    };
  }
  return { en: `${base}${journal.routePrefix}${pathSuffix}` };
}
