# Architecture

**Viksit Bharat Journal** — `pub.dhe.org.in`  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Render API backend

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                     │
└───────────────┬─────────────────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────────┐
│  Vercel (bom1) — Next.js 14                                   │
│  ├── middleware.ts (rate limit, CSRF, auth redirects, CSP)     │
│  ├── App Router pages (SSR/SSG)                               │
│  ├── API routes (/api/*) — BFF proxies + CMS + search        │
│  └── Static assets (public/)                                  │
└───────┬───────────────────────────────┬─────────────────────┘
        │                               │
        ▼                               ▼
┌───────────────┐               ┌─────────────────────────────┐
│ content/*.json│               │ vie-rase-backend.onrender.com│
│ Paper*.json   │               │ (auth, manuscripts, articles)│
└───────────────┘               └─────────────────────────────┘
```

The frontend is a **Backend-for-Frontend (BFF)** layer: auth cookies and CSRF are managed by Next.js API routes; manuscript and article data live on the Render backend; site content and published papers are file-based in the repo.

---

## Folder Structure

```
pub.rase.co.in/
├── content/                 # File-based CMS (JSON)
├── docs/                    # Developer & audit documentation
├── public/                  # Static assets, PDFs, legacy HTML, sw.js
├── scripts/
│   ├── qa/                  # Paper verification, smoke tests
│   └── legacy-redirects/    # Per-domain Vercel redirect projects
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # Server API routes (11 handlers)
│   │   ├── dashboard/       # Role dashboards
│   │   ├── vbe|vbh|vie|vih/ # Short journal entry routes
│   │   ├── *.rase/          # Legacy journal routes + Paper JSON
│   │   ├── component/       # Legacy journal React components
│   │   ├── layout.tsx       # Root layout, fonts, Providers
│   │   ├── page.tsx         # Homepage
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   └── feed.xml/        # RSS route
│   ├── components/          # Modern shared UI
│   │   ├── auth/            # Login, signup forms
│   │   ├── dashboard/       # Dashboard views
│   │   ├── home/            # Homepage sections
│   │   ├── journal/         # Paper pages, article renderer
│   │   ├── layout/          # PortalShell, SiteHeader, footer
│   │   ├── search/          # Advanced search client
│   │   ├── security/        # CsrfBootstrap
│   │   ├── seo/             # JsonLd
│   │   ├── submission/      # Submission wizard
│   │   └── ui/              # Button, Card, Input, Badge, etc.
│   ├── lib/                 # Business logic (see module table)
│   ├── middleware.ts        # Edge middleware
│   └── types/               # Shared TypeScript types
├── next.config.mjs
├── vercel.json
├── tailwind.config.ts
└── package.json
```

---

## Component Architecture

### Layout layers

| Layer | Component | Scope |
|-------|-----------|-------|
| Root | `layout.tsx` + `Providers` | All pages — fonts, CSRF, toast, top loader |
| Portal | `PortalShell` | Marketing pages — `SiteHeader` + `main` + `SiteFooter` |
| Journal | `JournalShell` | `*.rase/*` routes — journal nav + content |
| Dashboard | `DashboardShell` | `/dashboard/*` — `DashboardNav` + role views |

### Homepage composition

`src/app/page.tsx` → `PortalShell` → `Homepage` (`src/components/home/Homepage.tsx`)

- **Above fold (server):** `HeroSection`, `MissionSection`, `WhyPublishSection`, `StatsSection`
- **Below fold (dynamic import):** 12 sections lazy-loaded
- **Streaming (Suspense):** `LatestPapersSection` — async server component fetches paper index independently

### Legacy vs modern

| Area | Path | Pattern |
|------|------|---------|
| Modern portal | `src/components/` | Server components + targeted client islands |
| Legacy journals | `src/app/component/` | Client-heavy React (manuscript flows) |
| Unified views | `src/components/journal/views.tsx` | Wraps legacy components for `*.rase` pages |

**Rule:** New work goes in `src/components/` and `src/lib/`. Legacy `component/` is preserved for backward compatibility.

---

## `src/lib/` Modules

| Module | Path | Purpose |
|--------|------|---------|
| `api/` | `client.ts`, `auth.ts`, `articles.ts`, `manuscripts.ts` | Backend HTTP client + BFF helpers |
| `auth/` | `constants.ts`, `session.ts`, `tokens.ts` | Cookies, protected paths, token strategy |
| `cms/` | `loader.ts`, `types.ts` | Read `content/*.json` |
| `content/` | `homepage.ts`, `search-index.ts`, `about.ts` | Static content constants + paper index |
| `editorial/` | `workflow.ts` | Editorial state machine (architecture) |
| `email/` | `queue.ts` | Email templates + in-memory queue |
| `security/` | `csrf.ts`, `rate-limit.ts`, `sanitize.ts`, `client.ts` | CSRF, rate limits, input sanitization |
| `seo/` | `metadata.ts`, `schemas.ts`, `google-scholar.ts`, `sitemap-urls.ts` | SEO, JSON-LD, Scholar meta |
| `journals/` | `config.ts`, `papers.ts` | Journal registry + paper JSON loader |
| `search/` | `engine.ts`, `from-index.ts` | Client-side search over paper index |
| `identifiers/` | `registry.ts` | DOI, ORCID, Crossref provider registry |
| `ai/` | `registry.ts` | AI module placeholders |
| `analytics/` | `providers.ts` | GA, Clarity, Plausible, Matomo hooks |
| `repository/` | `types.ts` | Research repository asset types |
| `publishing/` | `metadata.ts` | Crossref/OAI-PMH export placeholders |
| `backup/` | `export.ts` | CMS export manifest |
| `monitoring/` | `logger.ts` | Structured logging + Sentry hook |
| `research/` | `citations.ts` | Citation formatting |
| `env.ts` | — | Zod-validated environment variables |

---

## Journals

Four journals defined in `src/lib/journals/config.ts`:

| ID | Name | Entry | Legacy prefix | Language | Papers |
|----|------|-------|---------------|----------|--------|
| `vbe` | Viksit Bharat Education | `/vbe` | `/vbe.rase` | en | 5 |
| `vbh` | Viksit Bharat Education (Hindi) | `/vbh` | `/vbh.rase` | hi | 5 |
| `vie` | Viksit Bharat Journal (English) | `/vie` | `/vie.rase` | en | 5 |
| `vih` | Viksit Bharat Journal (Hindi) | `/vih` | `/vih.rase` | hi | 5 |

**ISSN:** `2278-1757` (all editions)

**Paper JSON:** `src/app/{journal}.rase/output/Paper{1-5}.json` — 20 immutable files.

---

## Rendering Strategy

| Route type | Strategy |
|------------|----------|
| Homepage, about, papers | Static generation at build |
| `/api/health` | `force-dynamic` |
| `/api/search` | Dynamic with cache headers |
| Dashboard | Static shell; client fetches manuscripts |
| Legacy manuscript pages | Client-side with backend API |

---

## Key Design Decisions

1. **File-based CMS** — no database for site content; Git is the source of truth.
2. **BFF auth** — httpOnly cookies set by Next.js routes; backend token never exposed to JS on login path.
3. **Legacy coexistence** — `*.rase` routes and `localStorage` auth preserved for manuscript flows.
4. **Modular architecture** — editorial, AI, publishing, repository modules are typed placeholders for future backend integration.
5. **No API contract changes** — frontend proxies to existing Render endpoints without renaming backend paths.

---

## Related Docs

- [API_REFERENCE.md](./API_REFERENCE.md)
- [DATABASE.md](./DATABASE.md)
- [SECURITY.md](./SECURITY.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
