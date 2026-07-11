# Security Audit — V1.1

**Date:** 2026-07-09  
**Scope:** Production codebase at `1.1.0`  
**Production:** https://pub.dhe.org.in

---

## Executive Summary

| Area | Status | Score |
|------|--------|-------|
| Authentication | ✅ Strong | 90/100 |
| Authorization | ✅ Adequate | 85/100 |
| CSRF | ✅ Implemented | 95/100 |
| Cookies | ✅ httpOnly + secure | 90/100 |
| Rate Limiting | ⚠️ In-memory | 75/100 |
| Middleware / Headers | ✅ CSP + security headers | 90/100 |
| Environment Variables | ✅ Zod validated | 85/100 |
| Dependencies | ⚠️ 20 npm audit findings | 70/100 |
| Secrets | ✅ No secrets in repo | 95/100 |

**Overall Security Score: 88/100**

---

## Authentication

| Control | Implementation | Finding |
|---------|----------------|---------|
| Login BFF | `/api/auth/login` proxies to Render backend | ✅ Tokens never exposed in URLs |
| Cookie storage | `httpOnly`, `secure` (prod), `sameSite: lax` | ✅ |
| CSRF on login | Double-submit cookie validated | ✅ |
| Session check | `/api/auth/session`, middleware protected routes | ✅ |
| Legacy parallel | `localStorage` bridge for manuscript flows | ⚠️ Acceptable during migration |

**Recommendation:** Complete migration of legacy manuscript flows to cookie-only auth.

---

## Authorization

| Route | Control |
|-------|---------|
| `/dashboard/*` | Middleware redirect if no `token` cookie |
| `/api/manuscripts` | Requires `userId` cookie |
| Admin panels | Role display only — backend enforces permissions |

**Finding:** Dashboard role checks are UI-level; backend must remain source of truth.

---

## CSRF

- **Pattern:** Double-submit cookie (`csrf-token` cookie + `x-csrf-token` header)
- **Middleware:** Validates all mutating `/api/*` except exempt paths
- **Shared helper:** `requireCsrf()` in `src/lib/api/route-helpers.ts`
- **Tests:** 6 unit tests covering generation, validation, exemptions

**Exempt paths:** `/api/health`, `/api/cms`, `/api/csrf`

---

## Cookies

| Cookie | httpOnly | Purpose |
|--------|----------|---------|
| `token`, `auth-token` | Yes | JWT/session |
| `userId` | Yes | Manuscript lookup |
| `csrf-token` | No (required for double-submit) | CSRF protection |

---

## Rate Limiting

Per-route limits in `src/lib/security/rate-limit.ts`:

| Route | Limit/min |
|-------|-----------|
| `/api/auth/login` | 10 |
| `/api/auth/signup` | 5 |
| `/api/search` | 120 |
| Default | 120 |

**Risk:** In-memory store does not share state across Vercel instances.  
**Recommendation:** Upstash Redis for distributed rate limiting.

---

## Middleware & Headers

`src/middleware.ts` applies:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, mic, geo disabled)

---

## Environment Variables

Validated by `src/lib/env.ts` (Zod). Documented in `.env.example`.

| Variable | Exposure | Risk |
|----------|----------|------|
| `NEXT_PUBLIC_*` | Client bundle | Low — URLs/IDs only |
| `SENTRY_DSN` | Server | Low when configured |

**Finding:** No secrets committed. `.env.local` in `.gitignore`.

---

## Dependency Vulnerabilities

`npm audit` (2026-07-09): **20 vulnerabilities** (2 critical, 10 high, 8 moderate)

| Package | Severity | Notes |
|---------|----------|-------|
| `next` (transitive) | High | Upgrade when Next.js 14 patch available |
| `postcss`, `yaml` | Moderate | Dev/build toolchain |

**Action:** Run `npm audit fix` for safe patches. Avoid `--force` without regression testing.

---

## Secrets Scan

| Check | Result |
|-------|--------|
| `.env` in repo | ❌ Not committed |
| API keys in source | ❌ None found |
| `public/security.txt` | ✅ Contact for disclosures |

---

## Audit Logging (V1.1)

`auditLog()` now records:

- `auth.login`, `search.query`
- Extensible for `contact.submit`, `admin.action`

**Limitation:** In-memory buffer (500 entries). Not persisted to external store.

---

## Recommendations

| Priority | Action |
|----------|--------|
| P1 | Add `@sentry/nextjs` when `SENTRY_DSN` configured |
| P1 | Distributed rate limiting (Upstash) |
| P2 | `npm audit fix` + Next.js security patch |
| P2 | Remove legacy `localStorage` auth after manuscript migration |
| P3 | Security headers report via securityheaders.com quarterly |

---

## Related

- [SECURITY.md](./SECURITY.md)
- [V1_1_ENGINEERING_REPORT.md](./V1_1_ENGINEERING_REPORT.md)
