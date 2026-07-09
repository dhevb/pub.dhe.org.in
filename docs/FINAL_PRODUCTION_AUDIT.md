# Final Production Audit — Viksit Bharat Journal

**Date:** July 9, 2026  
**Auditor:** Automated + code inspection (Principal Architect review)  
**Production URL:** https://pub.dhe.org.in  
**Repository:** dhevb/pub.dhe.org.in  
**Branch audited:** platform-upgrade / main @ post-Phase 6 hardening  

> This document does **not** trust prior phase reports. Every item includes evidence or is marked **NOT VERIFIED**.

---

## Executive Summary

| Area | Status | Score / Evidence |
|------|--------|------------------|
| Build & TypeScript | **PASS** | `npm run build` — 117 routes, 0 errors |
| Production smoke | **PASS** | 67/67 routes (2026-07-09) |
| Paper integrity | **PASS** | 20/20 JSON files (`npm run qa:papers`) |
| Lighthouse SEO | **PASS** | 100 homepage + paper |
| Lighthouse Best Practices | **PASS** | 100 |
| Lighthouse Performance | **WARNING** | 86 homepage, 75 paper (target 100) |
| Lighthouse Accessibility | **WARNING** | 89 homepage, 96 paper (target 100) |
| Google Scholar (production) | **WARNING** | 6/7 required tags live; `citation_abstract_html_url` pending deploy |
| Security (CSRF) | **FAIL** | No CSRF tokens on forms |
| WCAG AA manual audit | **NOT VERIFIED** | Automated only |
| Mobile/tablet responsive | **NOT VERIFIED** | No device lab run in this audit |

---

## Step 1 — Verification Report

### Build & Tooling

| Item | Status | Evidence |
|------|--------|----------|
| `npm run build` | **PASS** | Exit 0; 117 static pages generated |
| TypeScript strict | **PASS** | `npx tsc --noEmit` exit 0 |
| ESLint | **WARNING** | Exit 0; 3 warnings in legacy `Filter.tsx`, `Notification.tsx` |
| Route count | **PASS** | 117 app routes (build output) |
| Dynamic routes | **PASS** | `ArticleDetail/[id]`, API routes, `opengraph-image` |
| Paper JSON (20 files) | **PASS** | `scripts/qa/verify-papers.mjs` — 20/20 |
| Production smoke | **PASS** | `scripts/qa/smoke.mjs` — 67/67 on pub.dhe.org.in |
| Health endpoint | **PASS** | `GET /api/health` → 200, version `8012009` |
| QA scripts | **PASS** | `qa:papers`, `qa:smoke`, `verify-scholar.mjs` |

### SEO Infrastructure

| Item | Status | Evidence |
|------|--------|----------|
| `sitemap.xml` | **PASS** | Smoke 200; `src/app/sitemap.ts` + `sitemap-urls.ts` |
| `robots.txt` | **PASS** | Smoke 200; `src/app/robots.ts` |
| `feed.xml` | **PASS** | Smoke 200; real paper titles in RSS |
| Canonical URLs | **PASS** | `buildMetadata()` in `src/lib/seo/metadata.ts` |
| Open Graph | **PASS** | `buildMetadata` + `/opengraph-image` |
| Twitter Cards | **PASS** | `metadata.ts` twitter block |
| hreflang EN↔HI | **PASS** | `src/lib/seo/hreflang.ts` |
| JSON-LD Organization | **PASS** | `organizationSchema()` in layout |
| JSON-LD WebSite + SearchAction | **PASS** | `websiteSchema()` |
| JSON-LD Periodical | **PASS** | `journalSchema()` |
| JSON-LD ScholarlyArticle | **PASS** | Paper pages via `buildPaperJsonLd` |
| JSON-LD FAQPage | **PASS** | Homepage `faqSchema(FAQS)` |
| JSON-LD Event | **PASS** | `conferenceEventsSchema()` |
| JSON-LD BreadcrumbList | **PASS** | Paper pages |
| JSON-LD Person | **PASS** | `personSchema()` available |
| JSON-LD Book | **PASS** | `bookSchema()` added (hardening) |
| JSON-LD Dataset | **PASS** | `datasetSchema()` added (hardening) |

### Authentication & API

| Item | Status | Evidence |
|------|--------|----------|
| httpOnly cookies | **PASS** | `token`, `auth-token`, `userId` in `src/lib/auth/constants.ts` |
| Login API | **PASS** | `POST /api/auth/login` |
| Logout API | **PASS** | `POST /api/auth/logout` |
| Session API | **PASS** | `GET /api/auth/session` |
| Manuscripts API | **PASS** | `GET /api/manuscripts` proxies Render backend |
| Render API contract | **PASS** | `src/lib/api/client.ts` paths unchanged |
| Protected dashboards | **PASS** | Middleware redirects `/dashboard/*` without token |
| CSRF protection | **FAIL** | No CSRF token on POST forms |

### Dashboards & CMS

| Item | Status | Evidence |
|------|--------|----------|
| Dashboard hub | **PASS** | `/dashboard` |
| Author dashboard | **PASS** | Live manuscript list + timeline (hardening) |
| Reviewer dashboard | **WARNING** | Placeholder counts; CMS announcements shown |
| Editor dashboard | **PASS** | Queue stats + editorial tools links (hardening) |
| Admin CMS | **PASS** | File-based CMS + provider registry (hardening) |
| CMS files | **PASS** | 6 JSON files in `content/` |

### Search

| Item | Status | Evidence |
|------|--------|----------|
| Keyword search | **PASS** | Original `filterSearchIndex` |
| Full-text + filters | **PASS** | `AdvancedSearchClient` + `src/lib/search/engine.ts` (hardening) |
| Sort (newest/oldest/A-Z) | **PASS** | `searchDocuments()` sort options |
| AI semantic search | **WARNING** | Architecture only (`semanticSearchRegistry`) |

### Security

| Item | Status | Evidence |
|------|--------|----------|
| CSP | **PASS** | `src/middleware.ts` |
| HSTS | **PASS** | `next.config.mjs` Strict-Transport-Security |
| X-Frame-Options | **PASS** | middleware + next.config |
| X-Content-Type-Options | **PASS** | nosniff |
| Rate limiting | **PASS** | 120 req/min in middleware |
| `security.txt` | **PASS** | `public/security.txt` |
| Secrets in client bundle | **PASS** | Only `NEXT_PUBLIC_*` in `.env.example` |
| Input validation (login) | **PASS** | Zod in `/api/auth/login` |
| CSRF | **FAIL** | Not implemented |

### Accessibility

| Item | Status | Evidence |
|------|--------|----------|
| Skip link | **PASS** | `layout.tsx` `#main-content` |
| Focus visible | **PASS** | `globals.css` focus styles |
| ARIA on search | **PASS** | `aria-label` on search input |
| Form labels | **PASS** | Advanced search filter labels (hardening) |
| Reduced motion | **PASS** | `prefers-reduced-motion` in globals.css |
| Heading hierarchy | **WARNING** | Not audited page-by-page |
| WCAG AA manual | **NOT VERIFIED** | — |
| Screen reader test | **NOT VERIFIED** | — |

### Performance (runtime)

| Item | Status | Evidence |
|------|--------|----------|
| LCP | **WARNING** | Lighthouse 3.3s (target <2.0s) |
| CLS | **PASS** | Lighthouse 0 |
| INP/TBT | **WARNING** | 220ms TBT on homepage |
| Homepage bundle | **WARNING** | 149 kB First Load JS (framer-motion) |
| Dynamic homepage import | **PASS** | `dynamic()` on Homepage (hardening) |
| Error boundary | **PASS** | `src/app/error.tsx` (hardening) |
| Image optimization | **WARNING** | Legacy `<img>` in Notification.tsx |

### PWA

| Item | Status | Evidence |
|------|--------|----------|
| Manifest | **PASS** | `manifest.ts` with shortcuts (hardening) |
| Icons 192/512 | **WARNING** | Uses `/logo.png` for both sizes |
| Service worker / offline | **FAIL** | Not implemented (documented as future) |
| Install prompt | **NOT VERIFIED** | — |

### Legacy & Redirects

| Item | Status | Evidence |
|------|--------|----------|
| 20 paper routes | **PASS** | Smoke + qa:papers |
| Journal legacy routes | **PASS** | `/vbe.rase/*` etc. in smoke |
| `AboutUs` → `/about` | **PASS** | Smoke redirect check |
| `*.rase/home` → journal | **PASS** | Smoke redirect check |
| Host redirects | **PASS** | `vercel.json` pub.rase.co.in etc. |

---

## Step 2 — Lighthouse (Actual Run)

**Tool:** `npx lighthouse@12.8.2` against production (2026-07-09)

### Homepage (`/`)

| Category | Score |
|----------|-------|
| Performance | **86** |
| Accessibility | **89** |
| Best Practices | **100** |
| SEO | **100** |

**Core metrics:** LCP 3.3s · CLS 0 · TBT 220ms

**Top performance issues:**
- LCP element render delay (score 0.69)
- Unused JavaScript ~23 KiB
- Total Blocking Time elevated

### Paper page (`/vbe.rase/Paper1`)

| Category | Score |
|----------|-------|
| Performance | **75** |
| Accessibility | **96** |
| Best Practices | **100** |
| SEO | **100** |

**Gap to target 100:** Performance requires font/bundle reduction, legacy component audit, and possible ISR/caching on paper pages. Not at 100 — **honest FAIL vs stated target**.

---

## Step 3 — SEO Hardening Status

Implemented and verified in code. Production deploy needed for latest Scholar + search changes.

**Added in hardening pass:**
- `bookSchema()`, `datasetSchema()` in `schemas.ts`
- Enhanced `google-scholar.ts` with `citation_abstract_html_url`, DOI builder, ISSN support
- Citation toolbar with copy + analytics event on papers

---

## Step 4 — Google Scholar (Production Verification)

**Script:** `node scripts/qa/verify-scholar.mjs https://pub.dhe.org.in/vbe.rase/Paper1`

| Tag | Production (pre-hardening deploy) |
|-----|-----------------------------------|
| citation_title | PASS |
| citation_author | PASS |
| citation_journal_title | PASS |
| citation_publication_date | PASS |
| citation_language | PASS |
| citation_keywords | PASS |
| citation_pdf_url | PASS |
| citation_abstract_html_url | **FAIL** (fixed in code, pending deploy) |
| citation_issn | WARN (empty in site.json) |
| citation_doi | WARN (empty doiPrefix) |
| citation_volume/issue/pages | WARN (not in paper JSON) |

**Action:** Set `issn` and `doiPrefix` in `content/site.json` when registered.

---

## Step 5 — International Identifier Architecture

**Location:** `src/lib/identifiers/`

| Provider | Status |
|----------|--------|
| DOI | configured (builder ready) |
| ORCID | configured |
| Crossref | placeholder |
| DataCite | placeholder |
| OpenAlex | placeholder |
| Semantic Scholar | placeholder |
| Google Scholar | active |
| Scopus | placeholder |
| UGC CARE | placeholder |
| ISSN | configured |
| ISBN | placeholder |
| Archive | placeholder |

---

## Step 6 — Advanced Search Architecture

**Location:** `src/lib/search/`

- Full-text token matching across title, abstract, authors, keywords
- Filters: journal, language, year, author, category, keywords
- Sort: newest, oldest, alphabetical, most-viewed (viewCount placeholder)
- Future: `semanticSearchRegistry` for AI vector search

**UI:** `AdvancedSearchClient` on `/search`

---

## Steps 7–9 — Dashboard Improvements

| Dashboard | Hardening |
|-----------|-----------|
| Author | `SubmissionTimeline`, `AuthorExperiencePanel` — timeline, revision/certificate placeholders |
| Editor | `EditorExperiencePanel` — queue stats, activity feed |
| Admin | CMS file registry, identifier providers, AI modules, analytics status |

Live editorial API integration remains **WARNING** (placeholder counts).

---

## Step 10 — Analytics Architecture

**Location:** `src/lib/analytics/`

Providers: GA4, GSC, Clarity, Plausible, Matomo — env-gated, no-op when unset.

Events: `page_view`, `paper_view`, `search_query`, `citation_copy`, etc.

**Status:** Architecture **PASS**; no provider IDs configured in production → **WARNING**.

---

## Step 11 — Security Summary

See Step 1 security table. Primary gap: **CSRF**.

---

## Step 12 — Accessibility Summary

Automated Lighthouse A11y 89–96. Manual WCAG AA audit **NOT VERIFIED**.

---

## Step 13 — Performance Summary

| Optimization | Status |
|--------------|--------|
| Dynamic Homepage import | Done |
| Error boundary | Done |
| Font display swap | Done (`next/font`) |
| antd bundle (legacy) | Still present — WARNING |
| 4 legacy component trees | Still present — WARNING |
| ISR on papers | Not implemented |

---

## Step 14 — PWA

Manifest enhanced with shortcuts and categories. Service worker **not implemented** (by design — future).

---

## Step 15 — AI Architecture

**Location:** `src/lib/ai/registry.ts` — 5 modules, all `placeholder`.

No external AI APIs connected (per requirements).

---

## Step 16 — Research Features Architecture

**Location:** `src/lib/research/citations.ts`

- APA, MLA, Chicago, IEEE, BibTeX, RIS formatters
- `CitationToolbar` on paper pages with copy button
- Download/view statistics: **placeholder** (analytics events ready)

---

## Step 17 — Quality

| Item | Status |
|------|--------|
| Dead code removal | **WARNING** — legacy `src/app/component/*` retained intentionally |
| Unused deps (antd) | **WARNING** — still in package.json for legacy routes |
| Magic strings | **WARNING** — partial centralization in config/cms |
| Large components | **WARNING** — `Filter.tsx`, `Homepage` sections |

No mass refactor performed — backward compatibility priority.

---

## Remaining Technical Debt

1. **Performance:** Homepage LCP 3.3s — reduce framer-motion, defer non-critical sections
2. **CSRF:** Add token middleware for state-changing API routes
3. **ISSN/DOI:** Populate `content/site.json` when registered
4. **Editorial APIs:** Wire reviewer/editor dashboards to backend
5. **Service worker:** Offline reading mode for published papers
6. **Legacy migration:** Consolidate 4 component trees (~850KB potential savings)
7. **Google Search Console:** Manual verification pending
8. **WCAG manual audit:** Recommended before claiming AA+

---

## Future Roadmap

| Priority | Item |
|----------|------|
| P0 | Deploy hardening commit; re-run smoke + verify-scholar |
| P0 | Register ISSN + DOI prefix; update site.json |
| P1 | Lighthouse performance → 90+ (bundle diet, LCP) |
| P1 | Google Search Console + GA4 |
| P2 | ORCID OAuth |
| P2 | Crossref XML deposit |
| P3 | Semantic search / AI assistant |
| P3 | OAI-PMH endpoint |

---

## Production Checklist (Post-Hardening Deploy)

- [ ] `npm run build` — 0 errors
- [ ] `npm run qa:papers` — 20/20
- [ ] `BASE_URL=https://pub.dhe.org.in npm run qa:smoke` — 67/67
- [ ] `node scripts/qa/verify-scholar.mjs` — all required PASS
- [ ] Lighthouse homepage Performance ≥ 90
- [ ] Set `issn` + `doiPrefix` in CMS
- [ ] Google Search Console sitemap submit

---

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Render API cold start | Medium | Medium | Health check shows degraded |
| Legacy code regression | Low | High | Smoke test + paper contract |
| SEO drop on URL change | Low | High | Redirects verified |
| Scholar indexing delay | Medium | Medium | Complete citation meta after deploy |
| No CSRF | Medium | Medium | Add tokens in next sprint |

---

## Recommendations

1. **Deploy this hardening pass** and re-verify Scholar tags on production.
2. **Set ISSN and DOI prefix** in `content/site.json` as soon as registered.
3. **Enable GA4** via `NEXT_PUBLIC_GA_MEASUREMENT_ID` for download/view tracking.
4. **Target LCP < 2.5s** by code-splitting homepage animations and auditing legacy JS on paper pages.
5. **Schedule manual WCAG audit** on homepage, search, login, paper reader, dashboards.
6. **Do not delete** `src/app/component/*` until legacy routes are fully migrated.

---

## Architecture Map (Post-Hardening)

```
src/lib/
├── api/          # Render backend client
├── auth/         # Cookies, session, legacy storage
├── cms/          # File-based content loader
├── identifiers/  # DOI, ORCID, Crossref, etc. registry
├── search/       # Full-text engine + future semantic
├── analytics/    # Multi-provider event tracking
├── ai/           # AI module registry (placeholder)
├── research/     # Citation formatters (APA, BibTeX, …)
├── seo/          # Metadata, schemas, hreflang, Scholar
└── journals/     # Config + paper loader (20 JSON preserved)
```

---

*Audit complete. Hardening changes require commit + deploy before production reflects all improvements.*
