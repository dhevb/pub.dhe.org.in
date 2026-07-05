/** Canonical production URL — always use pub.dhe.org.in */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pub.dhe.org.in";

export const JOURNAL_SUBMIT_URLS = {
  vbe: `${SITE_URL}/vbe.rase/SubmitManuscript`,
  vbh: `${SITE_URL}/vbh.rase/SubmitManuscript`,
  vie: `${SITE_URL}/vie.rase/SubmitManuscript`,
  vih: `${SITE_URL}/vih.rase/SubmitManuscript`,
} as const;

export const JOURNAL_ENTRY_URLS = {
  vbe: `${SITE_URL}/vbe`,
  vbh: `${SITE_URL}/vbh`,
  vie: `${SITE_URL}/vie`,
  vih: `${SITE_URL}/vih`,
} as const;
