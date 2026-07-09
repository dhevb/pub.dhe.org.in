import { siteConfig } from "./metadata";
import type { JournalConfig } from "@/lib/journals/config";
import { getJournalHreflangPaths } from "./sitemap-urls";

export function buildHreflangAlternates(
  path: string,
  journal?: JournalConfig
) {
  const canonical = `${siteConfig.url}${path}`;

  if (!journal) {
    return { canonical };
  }

  const suffix = path.replace(journal.routePrefix, "");
  const langs = getJournalHreflangPaths(journal, suffix);
  const languages: Record<string, string> = {};

  if (langs.en) languages["en-IN"] = langs.en;
  if (langs.hi) languages["hi-IN"] = langs.hi;

  return {
    canonical,
    languages: Object.keys(languages).length > 0 ? languages : undefined,
  };
}
