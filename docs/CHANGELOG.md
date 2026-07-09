# Changelog

All notable changes to Viksit Bharat Journal platform.  
Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased] — Phase 9 Performance

### Removed
- `antd` dependency — replaced with Tailwind in `BookCard`, `JournalCard`, `NewIssue`
- `framer-motion` dependency — `StatsSection` converted to server component

### Changed
- Homepage: removed double `dynamic()` import; hero renders immediately
- `LatestPapersSection`: async server component with `<Suspense>` streaming
- `FAQSection`: native `<details>`/`<summary>` (server component)
- `StatsSection`: static display without animation library
- `NewsletterSection`, `CallForPapersSection`, `LatestPapersSection`: fixed link+button nesting (a11y)
- `Badge` component: improved contrast tokens
- `SiteHeader`: touch target sizing (`min-h-11`)
- Font loading: subset weights, Devanagari preload disabled
- `next.config.mjs`: `optimizePackageImports: ['lucide-react']`
- `Providers`: lazy-loaded `react-hot-toast` Toaster
- `CsrfBootstrap`: deferred via `requestIdleCallback`

### Performance (verified local Lighthouse)
- Homepage First Load JS: 148 kB → **107 kB**
- Books/Journal First Load JS: 172 kB → **99.4 kB**
- LCP: 7.0 s → **2.4 s**
- Lighthouse Performance: 62 → **80**
- Accessibility: 93 → **96** (100 on dedicated a11y audit)

### Added
- `docs/PERFORMANCE_AUDIT.md`
- `docs/PERFORMANCE_FINAL_REPORT.md`
- Complete developer documentation set (`docs/*.md`)

---

## [0.1.0] — 2026-07-09 — Phase 8 Production Hardening

### Added
- CSRF double-submit cookie (`src/lib/security/`)
- Per-route rate limiting in middleware
- API routes: `/api/csrf`, `/api/auth/signup`, `/api/auth/forgot-password`, `/api/search`, `/api/contact`
- PWA service worker (`public/sw.js`), offline page (`/offline`)
- Architecture modules: `editorial/`, `email/`, `repository/`, `publishing/`, `monitoring/`, `backup/`
- `EditorialWorkflowPanel`, `AnalyticsDashboard`
- Expanded author/editor dashboards
- AI registry expanded to 9 modules
- `docs/PHASE8_FINAL_REPORT.md`
- Health endpoint security flags

### Changed
- Login/signup/forgot-password use CSRF-proxied app routes
- Middleware: CSRF validation, enhanced rate limits, CSP
- `ForgotPassword` component uses `forgotPasswordViaAppRoute`

---

## [0.1.0] — 2026-07 — ISSN Registration

### Added
- ISSN `2278-1757` in `content/site.json`, journal config, JSON-LD, Google Scholar meta

---

## [0.1.0] — 2026-07 — Production Hardening (Phase 7)

### Added
- Advanced search (`/search`, `AdvancedSearchClient`)
- Citation toolbar on paper pages
- Author/editor/admin/reviewer dashboards
- Architecture modules: `identifiers/`, `search/`, `analytics/`, `ai/`, `research/`
- Error boundary (`src/app/error.tsx`)
- Enhanced PWA manifest
- QA scripts: smoke (67 routes), scholar verification

---

## [0.1.0] — 2026 — Platform Redesign (Phases 1–6)

### Added
- Unified portal at `pub.dhe.org.in`
- Bharatiya design system (Saffron, Navy, Gold, Green)
- 32 journal routes (`/vbe`, `/vbh`, `/vie`, `/vih` + `*.rase` legacy)
- File-based CMS (`content/`)
- Submission wizard (`src/components/submission/`)
- SEO: sitemap (~83 URLs), hreflang, JSON-LD, RSS, dynamic OG images
- httpOnly auth cookies via BFF login route
- `GET /api/health`, `GET /api/cms`, `GET /api/manuscripts`
- Legacy domain redirects (Vercel `vercel.json`)
- CI pipeline (`.github/workflows/ci.yml`)
- 20 immutable paper JSON files preserved across migration

### Changed
- Migrated from multi-repo journal sites to monorepo
- Consolidated GitHub org under `dhevb`

---

## Versioning

Package version in `package.json`: `0.1.0`  
Production version in `/api/health`: `VERCEL_GIT_COMMIT_SHA` (first 7 chars)

---

## Related Docs

- [ROADMAP.md](./ROADMAP.md)
- [docs/PHASE8_FINAL_REPORT.md](./PHASE8_FINAL_REPORT.md)
- [docs/PERFORMANCE_FINAL_REPORT.md](./PERFORMANCE_FINAL_REPORT.md)
