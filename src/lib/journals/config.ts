export type JournalId = "vbe" | "vbh" | "vie" | "vih";

export interface JournalConfig {
  id: JournalId;
  name: string;
  nameHindi: string;
  slug: string;
  entryRoute: string;
  routePrefix: string;
  language: "en" | "hi";
  brand: "viksit-bharat" | "viksit-india";
  logo: string;
  apiPrefix: string;
  paperCount: number;
  publisher: string;
  issn?: string;
}

export const JOURNALS: Record<JournalId, JournalConfig> = {
  vbe: {
    id: "vbe",
    name: "Viksit Bharat Education Journal",
    nameHindi: "विकसित भारत शिक्षा पत्रिका",
    slug: "viksit-bharat-education-journal",
    entryRoute: "/vbe",
    routePrefix: "/vbe.rase",
    language: "en",
    brand: "viksit-bharat",
    logo: "/vbe.png",
    apiPrefix: "vbe",
    paperCount: 5,
    publisher: "Department of Holistic Education",
  },
  vbh: {
    id: "vbh",
    name: "Viksit Bharat Education Journal (Hindi)",
    nameHindi: "विकसित भारत शिक्षा पत्रिका (हिंदी)",
    slug: "viksit-bharat-education-journal-hindi",
    entryRoute: "/vbh",
    routePrefix: "/vbh.rase",
    language: "hi",
    brand: "viksit-bharat",
    logo: "/vbh.png",
    apiPrefix: "vbh",
    paperCount: 5,
    publisher: "Department of Holistic Education",
  },
  vie: {
    id: "vie",
    name: "Viksit Bharat Journal (English Legacy)",
    nameHindi: "विकसित भारत पत्रिका",
    slug: "viksit-bharat-journal-english",
    entryRoute: "/vie",
    routePrefix: "/vie.rase",
    language: "en",
    brand: "viksit-india",
    logo: "/vie.jpeg",
    apiPrefix: "vie",
    paperCount: 5,
    publisher: "Department of Holistic Education",
  },
  vih: {
    id: "vih",
    name: "Viksit Bharat Journal (Hindi Legacy)",
    nameHindi: "विकसित भारत पत्रिका (हिंदी)",
    slug: "viksit-bharat-journal-hindi",
    entryRoute: "/vih",
    routePrefix: "/vih.rase",
    language: "hi",
    brand: "viksit-india",
    logo: "/vih.jpeg",
    apiPrefix: "vih",
    paperCount: 5,
    publisher: "Department of Holistic Education",
  },
};

export const JOURNAL_LIST = Object.values(JOURNALS);

export function getJournal(id: JournalId): JournalConfig {
  return JOURNALS[id];
}

export function getJournalByRoutePrefix(prefix: string): JournalConfig | undefined {
  return JOURNAL_LIST.find((j) => prefix.startsWith(j.routePrefix));
}

export function paperRoute(journal: JournalConfig, num: number): string {
  return `${journal.routePrefix}/Paper${num}`;
}

export function articleDetailRoute(journal: JournalConfig, id: string): string {
  return `${journal.routePrefix}/ArticleDetail/${id}`;
}
