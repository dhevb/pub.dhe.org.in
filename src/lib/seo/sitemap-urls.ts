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

function findJournalForPath(
  path: string
): { journal: JournalConfig; suffix: string; isEntry: boolean } | undefined {
  for (const journal of JOURNAL_LIST) {
    if (path === journal.entryRoute) {
      return { journal, suffix: "", isEntry: true };
    }
    if (path.startsWith(`${journal.routePrefix}/`) || path === journal.routePrefix) {
      return {
        journal,
        suffix: path.slice(journal.routePrefix.length),
        isEntry: false,
      };
    }
  }
  return undefined;
}

export function getSitemapLanguageAlternates(
  path: string
): Record<string, string> | undefined {
  const found = findJournalForPath(path);
  if (!found) return undefined;

  const { journal, suffix, isEntry } = found;
  const pair = JOURNAL_LIST.find((j) => j.id === HREFLANG_PAIRS[journal.id]);
  if (!pair) return undefined;

  const base = siteConfig.url;

  if (isEntry) {
    const enJournal = journal.language === "en" ? journal : pair;
    const hiJournal = journal.language === "hi" ? journal : pair;
    return {
      "en-IN": `${base}${enJournal.entryRoute}`,
      "hi-IN": `${base}${hiJournal.entryRoute}`,
    };
  }

  const langs = getJournalHreflangPaths(journal, suffix);
  const languages: Record<string, string> = {};
  if (langs.en) languages["en-IN"] = langs.en;
  if (langs.hi) languages["hi-IN"] = langs.hi;
  return Object.keys(languages).length > 0 ? languages : undefined;
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

    const languages = getSitemapLanguageAlternates(path);

    return {
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      ...(languages ? { alternates: { languages } } : {}),
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
