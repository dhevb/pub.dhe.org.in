import type { PaperData } from "@/types/article";

export type CitationStyle = "apa" | "mla" | "chicago" | "ieee" | "bibtex" | "ris";

function authorsApa(data: PaperData): string {
  const authors = [
    ...(data.ArticleDetails?.Authors ?? []),
    ...(data.ArticleDetails?.CoAuthors ?? []),
  ];
  if (authors.length === 0) return "Anonymous";
  return authors
    .map((a, i) => {
      const parts = a.Name.split(" ");
      const last = parts.pop() ?? a.Name;
      const initials = parts.map((p) => `${p[0]}.`).join(" ");
      return i === authors.length - 1 && authors.length > 1
        ? `& ${last}, ${initials}`.trim()
        : `${last}, ${initials}`.trim();
    })
    .join(", ");
}

export function formatCitation(
  style: CitationStyle,
  data: PaperData,
  opts: { journalName: string; url: string; year?: string }
): string {
  const title = data.ArticleDetails?.Title ?? "Untitled";
  const year = opts.year ?? data.ArticleInfo?.Published?.match(/\d{4}/)?.[0] ?? "n.d.";
  const authors = authorsApa(data);

  switch (style) {
    case "apa":
      return `${authors} (${year}). ${title}. ${opts.journalName}. ${opts.url}`;
    case "mla": {
      const first = data.ArticleDetails?.Authors?.[0]?.Name ?? "Anonymous";
      return `${first}. "${title}." ${opts.journalName}, ${year}, ${opts.url}.`;
    }
    case "chicago":
      return `${authors}. "${title}." ${opts.journalName} (${year}). ${opts.url}.`;
    case "ieee": {
      const ieeeAuthors = [
        ...(data.ArticleDetails?.Authors ?? []),
        ...(data.ArticleDetails?.CoAuthors ?? []),
      ]
        .map((a) => a.Name)
        .join(", ");
      return `${ieeeAuthors}, "${title}," ${opts.journalName}, ${year}. [Online]. Available: ${opts.url}`;
    }
    case "bibtex":
      return `@article{${title.replace(/\W+/g, "").slice(0, 20).toLowerCase()},
  title={${title}},
  author={${[
    ...(data.ArticleDetails?.Authors ?? []),
    ...(data.ArticleDetails?.CoAuthors ?? []),
  ]
    .map((a) => a.Name)
    .join(" and ")}},
  journal={${opts.journalName}},
  year={${year}},
  url={${opts.url}}
}`;
    case "ris":
      return `TY  - JOUR
TI  - ${title}
AU  - ${(data.ArticleDetails?.Authors ?? []).map((a) => a.Name).join("\nAU  - ")}
PY  - ${year}
JO  - ${opts.journalName}
UR  - ${opts.url}
ER  - `;
    default:
      return `${authors}. ${title}. ${opts.journalName} (${year}).`;
  }
}

export const CITATION_STYLES: { id: CitationStyle; label: string }[] = [
  { id: "apa", label: "APA" },
  { id: "mla", label: "MLA" },
  { id: "chicago", label: "Chicago" },
  { id: "ieee", label: "IEEE" },
  { id: "bibtex", label: "BibTeX" },
  { id: "ris", label: "RIS" },
];
