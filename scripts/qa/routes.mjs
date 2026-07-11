/**
 * Critical public routes for smoke testing.
 * Mirrors src/lib/seo/sitemap-urls.ts (subset + infra).
 */

const JOURNALS = [
  { id: "vbe", entry: "/vbe", prefix: "/vbe.rase" },
  { id: "vbh", entry: "/vbh", prefix: "/vbh.rase" },
  { id: "vie", entry: "/vie", prefix: "/vie.rase" },
  { id: "vih", entry: "/vih", prefix: "/vih.rase" },
];

const PORTAL = [
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
];

const JOURNAL_SECTIONS = [
  "ReadArticlePage",
  "SubmitManuscript",
  "EditorialBoard",
  "Indexing",
  "ContactUs",
];

const INFRA = [
  "/sitemap.xml",
  "/robots.txt",
  "/feed.xml",
  "/manifest.webmanifest",
  "/api/health",
  "/api/cms",
  "/api/oai?verb=Identify",
  "/api/citations?journal=vbe&paper=1&style=apa",
  "/api/editorial",
  "/api/setup/supabase",
];

/** @type {string[]} */
export const SMOKE_ROUTES = [...PORTAL];

for (const j of JOURNALS) {
  SMOKE_ROUTES.push(j.entry);
  if (j.id === "vie") {
    SMOKE_ROUTES.push(`${j.prefix}/table`);
  }
  for (const section of JOURNAL_SECTIONS) {
    SMOKE_ROUTES.push(`${j.prefix}/${section}`);
  }
  for (let i = 1; i <= 5; i++) {
    SMOKE_ROUTES.push(`${j.prefix}/Paper${i}`);
  }
}

export const INFRA_ROUTES = INFRA;

/** Permanent redirects defined in next.config.mjs */
export const REDIRECT_CHECKS = [
  { from: "/AboutUs", to: "/about" },
  { from: "/vbe.rase/home", to: "/vbe" },
  { from: "/vbh.rase/home", to: "/vbh" },
  { from: "/vie.rase/home", to: "/vie" },
  { from: "/vie.rase/issues", to: "/vie.rase/table" },
  { from: "/vih.rase/home", to: "/vih" },
  { from: "/forgot-password", to: "/ForgotPassword" },
];

export const PAPER_PATHS = JOURNALS.flatMap((j) =>
  [1, 2, 3, 4, 5].map((n) => `src/app/${j.id}.rase/output/Paper${n}.json`)
);

export const JOURNAL_IDS = JOURNALS.map((j) => j.id);
