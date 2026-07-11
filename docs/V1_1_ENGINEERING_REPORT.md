# V1.1 Engineering Report

**Version:** 1.1.0 — Stability, Maintainability & Enterprise Readiness  
**Date:** 2026-07-09  
**Production:** https://pub.dhe.org.in  
**Commit baseline:** Post Phase 9 (`0c7f48d`) + V1.1 engineering

---

## Executive Summary

V1.1 establishes the engineering foundation for 5–10 year maintainability without changing UI, APIs, URLs, papers, or CMS content. Key deliverables: automated test suite (58 tests), standardized error handling, monitoring hooks, feature flags, release management, and security re-audit.

| Dimension | Score | Status |
|-----------|-------|--------|
| **Code Quality** | 72/100 | Legacy duplication remains; new path is clean |
| **Security** | 88/100 | See [SECURITY_AUDIT_V1_1.md](./SECURITY_AUDIT_V1_1.md) |
| **Performance** | 92/100 | Production Lighthouse (Jul 2026) |
| **Maintainability** | 78/100 | Tests + docs + error standards added |
| **Testing** | 85/100 | 88.7% line coverage on critical modules |
| **Overall** | **83/100** | Production-ready with documented debt |

---

## 1. Code Quality Audit

### Architecture

Dual codebase pattern (intentional, not accidental):

| Layer | Files | Role |
|-------|-------|------|
| `src/components/` + `src/lib/` | ~112 | Modern portal, dashboards, submission wizard |
| `src/app/component/*_Component/` | ~168 | Legacy journal UI (4× duplication) |

### Files >300 Lines

| Lines | File | Action |
|------:|------|--------|
| 767 | `vie_Component/Filter.tsx` | **Defer** — legacy, hardcoded data |
| 724 | `vbe_Component/Editorial.tsx` | **Defer** — legacy |
| 655 | `*_Component/AddArticle.tsx` (×4) | **Defer** — superseded by submission wizard |
| 314 | `components/home/JournalHomepage.tsx` | **Monitor** — only modern file >300 lines |

**Policy:** No refactor of legacy components in V1.1 (preserves compatibility).

### Duplicate Patterns Identified

| Pattern | Instances | V1.1 Action |
|---------|-----------|-------------|
| Login forms | 6 variants | Documented; shared `loginViaAppRoute` |
| Signup/ForgotPassword | 5+ each | Documented |
| Journal component trees | 4× copies | Preserved for legacy routes |
| CSRF validation boilerplate | 5 API routes | **Extracted** `requireCsrf()` |
| axios vs fetch | 35 legacy / modern fetch | Documented; migrate in V2 |

### Dead Code (Architecture Placeholders)

| Module | Status |
|--------|--------|
| `lib/backup/` | Scaffold — export scripts for ops |
| `lib/publishing/` | Scaffold — DOI/OAI-PMH future |
| `lib/repository/` | Scaffold — research repository future |
| `lib/api/auth.ts` direct helpers | Unused exports — kept for future BFF expansion |

### Unused Dependencies

| Package | Status | Notes |
|---------|--------|-------|
| `axios` | **Legacy only** | Required until legacy migration |
| `@fortawesome/*` | **Legacy only** | 3 packages, ~6 legacy components |
| `react-fast-marquee` | **Single legacy import** | `Notification.tsx` |

**Removed in Phase 9:** `antd`, `framer-motion` (confirmed absent).

---

## 2. Testing

### Infrastructure

| Tool | Purpose |
|------|---------|
| **Vitest 3** | Unit + integration tests |
| `@vitest/coverage-v8` | Coverage on critical `src/lib/` modules |
| `scripts/qa/` | Smoke + paper integrity (existing) |

### Test Suite Summary

```
Test Files:  14 passed
Tests:       58 passed
Duration:    ~5s
```

| Category | Tests | Module |
|----------|-------|--------|
| Unit — Security | 11 | CSRF, sanitize, rate-limit |
| Unit — Search | 7 | engine, parseYear |
| Unit — Research | 3 | citations (6 styles) |
| Unit — SEO | 2 | Google Scholar meta |
| Unit — Errors | 4 | API error handling |
| Unit — CMS | 2 | loader |
| Unit — Monitoring | 5 | feature flags, logger, audit |
| API — Auth | 2 | CSRF guard |
| Regression — Papers | 20 | all Paper JSON files |
| QA paths | 2 | path constants |

### Coverage (Critical Modules)

```
Statements:  88.74% (481/542)
Lines:       88.74%
Functions:   80.48%
Branches:    64.73%
```

**Threshold:** 80% lines/functions/statements — **met**.

### Commands

```bash
npm run test           # Run all tests
npm run test:coverage  # With coverage report
npm run qa:all         # test + papers + lint + build
```

### CI Integration

`.github/workflows/ci.yml` now runs `npm run test` before lint/build.

### Future Test Gaps

| Area | Priority |
|------|----------|
| Component tests (LoginForm) | P2 — needs jsdom + Testing Library |
| E2E (Playwright) | P2 — login → dashboard flow |
| API route integration | P2 — mock backend fetch |

---

## 3. Error Handling

### Standardized Modules

| File | Purpose |
|------|---------|
| `src/lib/errors/types.ts` | `AppError`, `ApiErrorCode` |
| `src/lib/errors/api.ts` | `apiError`, `validationError`, `handleRouteError` |
| `src/lib/errors/client.ts` | `reportClientError` for boundaries |

### Error Pages

| Page | Status |
|------|--------|
| `error.tsx` | ✅ Updated — client reporting |
| `not-found.tsx` | ✅ **Added** — 404 with search link |
| `global-error.tsx` | ✅ **Added** — root layout failures |
| `offline/page.tsx` | ✅ Existing (PWA) |

### API Error Contract

Legacy routes: `{ error: string }` (unchanged).  
New standardized routes may include `{ error, code, details }`.

### Toast Messages

Existing `react-hot-toast` in auth flows — unchanged.

---

## 4. Monitoring

### Implemented (V1.1)

| Capability | Module | Status |
|------------|--------|--------|
| Structured logging | `logEvent()` | ✅ Wired |
| Audit logging | `auditLog()` | ✅ Login + search |
| Feature flags | `isFeatureEnabled()` | ✅ Env overrides |
| Sentry hook | `captureException()` | ✅ Stub (awaiting `@sentry/nextjs`) |
| Health check | `/api/health` | ✅ + `features[]` field |

### Analytics (Existing)

GA4, GSC, Clarity, Plausible, Matomo — env-gated in `src/lib/analytics/`.

### Production Monitoring Checklist

- [ ] Set `SENTRY_DSN` in Vercel
- [ ] Enable `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Configure GSC verification
- [ ] Optional: Clarity, Plausible
- [ ] Monitor `/api/health` via uptime service

---

## 5. Security Review

Full report: [SECURITY_AUDIT_V1_1.md](./SECURITY_AUDIT_V1_1.md)

**Score: 88/100**

Key findings:
- CSRF + httpOnly cookies: strong
- Rate limiting: in-memory (scale risk)
- npm audit: 20 vulnerabilities (mostly dev toolchain)
- Legacy localStorage auth: migration debt

---

## 6. Performance Maintenance

### Production Lighthouse (2026-07-09)

| Metric | Score |
|--------|-------|
| Performance | **92** |
| Accessibility | **96** |
| Best Practices | **100** |
| SEO | **100** |
| LCP | **2.8 s** |

### Bundle Analysis (Build Output)

| Route | First Load JS |
|-------|---------------|
| `/` (homepage) | **107 kB** |
| `/vbe`, `/vbh`, `/vie`, `/vih` | **107 kB** |
| Legacy journal pages | **132–152 kB** |
| Shared chunks | **87.3 kB** |
| Middleware | **27.9 kB** |

### Largest Debt Items

| Item | Impact | Recommendation |
|------|--------|----------------|
| `public/logo.png` (~570 KB) | LCP | Convert to WebP/AVIF |
| Legacy `src/app/component/` | +40–45 kB per route | Gradual migration |
| ~110 `"use client"` files | Hydration cost | Server-component migration |

### Core Web Vitals Targets

| Metric | Current | Target |
|--------|---------|--------|
| LCP | 2.8 s | < 2.5 s |
| INP | Not measured | < 200 ms |
| CLS | Good (static layout) | < 0.1 |

See [PERFORMANCE_FINAL_REPORT.md](./PERFORMANCE_FINAL_REPORT.md).

---

## 7. Documentation

### Verified Documentation Set

All 12 developer guides present and cross-linked from README.

### V1.1 Additions

| Doc | Purpose |
|-----|---------|
| `docs/RELEASE.md` | SemVer, hotfix, rollback |
| `docs/SECURITY_AUDIT_V1_1.md` | Security re-audit |
| `docs/V1_1_ENGINEERING_REPORT.md` | This report |
| `src/lib/security/README.md` | Module guide |
| `src/lib/errors/README.md` | Module guide |
| `src/lib/monitoring/README.md` | Module guide |

### Module Documentation Standard

Each public `src/lib/` module should include README with: Purpose, Architecture, Usage, Example, Limitations.

---

## 8. Dependency Management

### Required (Production)

`next`, `react`, `react-dom`, `zod`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`, `react-hot-toast`, `nextjs-toploader`

### Legacy (Retain Until Migration)

`axios`, `@fortawesome/*` (3), `react-fast-marquee`

### Dev

`typescript`, `eslint`, `tailwindcss`, `vitest`, `@vitest/coverage-v8`

### npm audit

20 vulnerabilities — run `npm audit fix` for safe patches. Do not `--force` without full regression.

---

## 9. Release Management

Documented in [RELEASE.md](./RELEASE.md):

- SemVer strategy (`1.1.0` current)
- Release notes template
- Hotfix workflow
- Rollback procedure (Vercel promote / git revert)
- Pre-deploy checklist (`npm run qa:all`)

---

## 10. Technical Debt Register

| ID | Item | Severity | ETA |
|----|------|----------|-----|
| TD-01 | 4× legacy journal component trees | High | V2 migration |
| TD-02 | In-memory rate limiting | Medium | Q3 2026 |
| TD-03 | localStorage auth parallel | Medium | Post-manuscript migration |
| TD-04 | logo.png 570 KB | Medium | Next patch |
| TD-05 | npm audit vulnerabilities | Medium | Ongoing |
| TD-06 | Sentry not installed | Low | When DSN ready |
| TD-07 | No E2E browser tests | Low | V1.2 |
| TD-08 | Architecture placeholder modules | Low | 2027 roadmap |

---

## 11. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Backend cold start | High | Low | Static pages work; health shows degraded |
| Rate limit bypass (multi-instance) | Medium | Medium | Upstash Redis |
| Legacy component regression | Medium | High | Smoke tests (67 routes) + paper regression |
| Dependency CVE | Medium | Medium | CI + audit fix cadence |
| Scholar indexing gap | Low | High | ISSN verified; DOI pending Crossref |

---

## 12. Future Recommendations

### V1.2 (Next Quarter)

1. Add `@sentry/nextjs` + wire `captureException`
2. Compress `logo.png` → WebP
3. Playwright E2E for login → dashboard
4. `npm audit fix` + Next.js patch
5. Redis rate limiting (Upstash)

### V2 (2027)

1. Legacy component migration plan (journal-by-journal)
2. Remove `axios` + Font Awesome
3. Component test suite with Testing Library
4. Distributed audit log (external store)

---

## Appendix: Files Changed in V1.1

### New

- `vitest.config.ts`
- `src/lib/errors/` (4 files)
- `src/lib/api/route-helpers.ts`
- `src/lib/monitoring/feature-flags.ts`, `sentry.ts`
- `src/app/not-found.tsx`, `global-error.tsx`
- `src/lib/*/README.md` (3 modules)
- `src/lib/*/__tests__/` (10 test files)
- `tests/api/csrf-guard.test.ts`
- `tests/regression/papers.test.ts`
- `docs/RELEASE.md`, `SECURITY_AUDIT_V1_1.md`, `V1_1_ENGINEERING_REPORT.md`

### Modified

- `package.json` → `1.1.0`, test scripts
- `.github/workflows/ci.yml` → test step
- `.env.example` → Sentry + feature flags
- `src/app/error.tsx` → client reporting
- `src/app/api/health/route.ts` → features field
- `src/app/api/auth/login/route.ts` → requireCsrf + auditLog
- `src/app/api/search/route.ts` → auditLog
- `src/lib/monitoring/logger.ts` → Sentry hook
- `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`

---

## Sign-off

| Check | Result |
|-------|--------|
| `npm run test` | ✅ 58/58 |
| `npm run test:coverage` | ✅ 88.7% lines |
| `npm run build` | ✅ 123 pages |
| `npm run lint` | ✅ (3 legacy warnings) |
| `npm run qa:papers` | ✅ 20/20 |
| Breaking changes | ❌ None |
| Papers preserved | ✅ 20/20 |
| UI redesign | ❌ None |

**V1.1 engineering objectives: complete.**
