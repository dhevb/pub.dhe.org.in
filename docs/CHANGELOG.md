# Changelog

All notable changes to Viksit Bharat Journal platform.  
Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.3] — 2026-07-10 — Operations & Governance

### Added
- `docs/OPERATIONS_MANUAL.md` — production operations handbook
- `docs/GOVERNANCE.md` — editorial and technical governance model
- `docs/SUPPORT_MATRIX.md` — version, runtime, and browser support policy
- `docs/PILOT_MODE_CURSOR_PROMPT.md` — master Cursor prompt for pilot / feature freeze
- `docs/PROJECT_STEWARD_CURSOR_PROMPT.md` — permanent project steward prompt
- `docs/RELEASE_NOTES_v1.0.3.md` — operations release notes

### Changed
- Package version `1.0.2` → `1.0.3` (documentation only)
- README, ROADMAP, PHASE_STATUS — operations and governance references

### Note
- Separated from v1.0.2 certification release for narrow audit scope

---

## [1.0.2] — 2026-07-10 — Independent Certification

### Added
- `docs/FINAL_CERTIFICATION_AUDIT.md` — full independent certification audit
- `docs/CERTIFICATION_SCORECARD.md` — domain scores (overall 76/100)
- `docs/PRODUCTION_READINESS_CERTIFICATE.md` — LEVEL 3 certificate
- `docs/OPEN_ITEMS.md` — P0–P3 tracked gaps
- `docs/RECOMMENDED_NEXT_RELEASE.md` — release sequencing
- `docs/RELEASE_NOTES_v1.0.2.md` — this release
- ADR-018: Independent certification audit (LEVEL 3 — Production Ready)

### Changed
- Package version `1.0.1` → `1.0.2` (documentation release; no app logic changes)
- README, ROADMAP, PHASE_STATUS — certification audit references

### Certification
- **LEVEL 3 — Production Ready** (76/100)
- Not certified: international publishing ecosystem (Crossref, OAI-PMH, editorial engine)

### Production verified (2026-07-10)
- Vercel deploy: commit `c152991` live
- `/api/health`: `status: ok`, `version: c152991`
- Smoke test: **67/67 PASS**
- Scholar meta: 7/7 required PASS
- **Status: Production Verified — Closed**

---

## [1.1.0] — 2026-07-09 — Engineering Excellence

### Added
- Vitest test suite (58 tests, 88.7% coverage on critical `src/lib/` modules)
- Standardized error handling (`src/lib/errors/`)
- `not-found.tsx` and `global-error.tsx` error boundaries
- Monitoring: feature flags, audit logging, Sentry hooks
- Shared `requireCsrf()` API route helper
- Module READMEs for security, errors, monitoring
- `docs/RELEASE.md`, `docs/SECURITY_AUDIT_V1_1.md`, `docs/V1_1_ENGINEERING_REPORT.md`
- CI test step in GitHub Actions
- `npm run test`, `test:coverage`, `qa:all` scripts

### Changed
- `error.tsx` uses `reportClientError` for client-side tracking
- `/api/health` returns enabled `features[]`
- `/api/auth/login` and `/api/search` emit audit logs
- Package version `0.1.0` → `1.1.0`

### Security
- Security re-audit documented (score 88/100)
- `.env.example` expanded with Sentry and feature flag overrides

---

## [Unreleased] — V2 Planning Documentation

### Added
- `docs/V2_ROADMAP.md` — enterprise academic publishing roadmap (10 phases)
- `docs/PUBLISHING_ARCHITECTURE.md`, `EDITORIAL_WORKFLOW.md`, `INTEGRATIONS.md`
- `docs/INDEXING_READINESS.md`, `DATABASE_MIGRATION_PLAN.md`
- `docs/OBSERVABILITY_PLAN.md`, `AI_READINESS.md`
- ADR-016: V2 enterprise publishing strategy

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
