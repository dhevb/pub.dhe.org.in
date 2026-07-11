# Next.js Upgrade Plan

**Document version:** 1.0  
**Date:** 2026-07-10  
**Status:** Planning — **not approved for execution**

---

## Current State

| Component | Version |
|-----------|---------|
| Next.js | **14.2.35** (latest 14.2.x) |
| React | **18.3.1** |
| React DOM | **18.3.1** |
| eslint-config-next | **14.2.4** |
| Node.js | ≥ 20.x |
| Deployment | Vercel (`bom1`) |

**package.json constraint:** `"next": "^14.2.4"`

---

## Target State

| Phase | Target | Rationale |
|-------|--------|-----------|
| **Recommended** | **Next.js 15.5.16+** | Minimum version resolving all current npm audit GHSA ranges |
| **Alternative** | Next.js 16.2.x | Latest stable; larger breaking surface |
| **React** | 19.x (bundled with Next 15+) | Required peer for Next 15 |
| **eslint-config-next** | Match Next major | 15.x or 16.x |

**Recommendation:** Target **15.5.16** first (security-focused), not 16.x, unless 15 reaches EOL.

---

## Why Upgrade Is Required

`next@14.2.35` is the final 14.2 release but npm audit reports **14 unresolved advisories** with fix ranges requiring **≥ 15.5.16**.

### Advisories directly affecting this codebase

| ID | Title | Our exposure |
|----|-------|--------------|
| GHSA-3g8h-86w9-wvmq | Middleware redirect cache poisoning | **High** — `src/middleware.ts` active |
| GHSA-ffhc-5mcf-pf4q | CSP nonce XSS in App Router | **Medium** — CSP set in middleware |
| GHSA-h25m-26qc-wcjf | RSC deserialization DoS | **High** — App Router + RSC pages |
| GHSA-q4gf-8mx6-v5v3 | Server Components DoS | **High** |
| GHSA-c4j6-fc7j-m34r | WebSocket SSRF | **Low** — no WebSocket routes today |
| GHSA-ggv3-7p47-pfv8 | Rewrite request smuggling | **Medium** — `next.config.mjs` redirects |
| GHSA-36qx-fr4f-26g5 | Pages Router i18n middleware bypass | **None** — App Router only |

---

## Breaking Changes (14 → 15)

### Next.js 15

| Change | Impact on this project |
|--------|------------------------|
| **`cookies()` / `headers()` async** | **High** — used in `login/route.ts`, auth flows |
| **`params` / `searchParams` async in pages** | **Medium** — audit all `page.tsx` dynamic routes |
| **React 19 default** | **Medium** — 18 compat mode available initially |
| **Fetch caching defaults changed** | **Low** — most fetches use explicit `cache: "no-store"` |
| **`next/image` defaults** | **Low** — review `remotePatterns` if configured |
| **ESLint 9 optional** | **Low** — can defer eslint upgrade |

### Next.js 16 (if skipping 15)

Additional breaking changes in routing, Turbopack defaults, and config schema. **Not recommended** as first jump.

---

## Code Areas Affected

### 1. Middleware (`src/middleware.ts`)

- Rate limiting, CSRF, auth redirects, CSP headers
- **Test:** All protected routes, API CSRF, legacy redirects
- **Advisory fix:** GHSA-3g8h-86w9-wvmq (cache poisoning)

### 2. App Router API Routes (`src/app/api/`)

| Route | Async cookies? | CSRF? |
|-------|----------------|-------|
| `/api/auth/login` | ✅ `cookies()` | ✅ |
| `/api/auth/logout` | ✅ | — |
| `/api/auth/signup` | — | ✅ |
| `/api/auth/forgot-password` | — | ✅ |
| `/api/contact` | — | ✅ |
| `/api/manuscripts` | ✅ | — |
| `/api/search` | — | — |
| `/api/health` | — | — |
| `/api/csrf` | ✅ sets cookie | — |

**Migration:** Convert `cookies()` calls to `await cookies()` in all route handlers.

### 3. Server Components & Pages

- ~123 static/dynamic pages
- Homepage streaming (`Suspense` + async server components)
- Paper pages (`Paper{1-5}.json` — must not break)

### 4. Authentication

| Layer | Files |
|-------|-------|
| BFF routes | `src/app/api/auth/*` |
| Cookie constants | `src/lib/auth/constants.ts` |
| Client forms | `LoginForm`, `SignupForm`, `JournalLogin` |
| Legacy bridge | `persistLegacyAuth()` localStorage |
| Middleware | Token cookie check |

**No auth contract changes** — upgrade is internal API async only.

### 5. Configuration

| File | Review needed |
|------|---------------|
| `next.config.mjs` | `redirects`, `optimizePackageImports`, images |
| `vercel.json` | Region, build commands |
| `middleware.ts` matcher | Unchanged expected |

### 6. Legacy Pages (`src/app/component/`)

- Not using Pages Router — **lower risk**
- Legacy routes mount via App Router wrappers (`legacy-content.tsx`)
- axios calls unaffected by Next upgrade but should migrate separately

---

## Prerequisites Checklist

### Engineering

- [ ] V1.1 test suite green (`npm run test` — 58 tests)
- [ ] Paper regression green (`npm run qa:papers` — 20/20)
- [ ] Smoke test baseline (`npm run qa:smoke` — 67 routes)
- [ ] Document current Lighthouse scores
- [ ] Backup Vercel production deployment ID

### Dependencies (before Next upgrade)

- [ ] Complete [DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md) Phase A (safe patches)
- [ ] Complete Phase B (tested minors)
- [ ] TypeScript 5.9.x recommended

### Infrastructure

- [ ] Vercel preview environment verified
- [ ] `NEXT_PUBLIC_*` env vars documented
- [ ] Rollback procedure tested (promote previous deployment)

---

## Migration Steps (Planned)

### Step 1 — Preparation branch

```bash
git checkout -b upgrade/next-15
npm install next@15.5.16 react@19 react-dom@19 eslint-config-next@15
npx @next/codemod@latest upgrade latest
```

### Step 2 — Async API migration

Run codemod for async `cookies()`, `headers()`, `params`, `searchParams`.

Manual review:
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/app/api/csrf/route.ts`
- All dynamic `[id]` routes

### Step 3 — Config updates

- Review `next.config.mjs` against Next 15 migration guide
- Verify `images.remotePatterns` (GHSA-9g9p-9gw9-jx7f)
- Confirm middleware matcher still correct

### Step 4 — Test matrix

```bash
npm run qa:all
npm run qa:smoke
node scripts/qa/verify-scholar.mjs
```

Manual:
- Login → dashboard → logout
- CSRF on signup/contact
- Legacy journal route sample (`/vbe.rase/Paper1`)
- Middleware redirect (`/dashboard` without auth)
- `/api/health` version check

### Step 5 — Preview deploy

- Push to `upgrade/next-15`
- Vercel preview URL
- Production smoke against preview
- Lighthouse comparison

### Step 6 — Production

- Merge to `main` during low-traffic window
- Monitor `/api/health`, Vercel logs, Sentry (when enabled)
- Keep previous deployment ready for promote

---

## Testing Checklist

### Automated

- [ ] `npm run test` (58/58)
- [ ] `npm run test:coverage` (≥80% critical modules)
- [ ] `npm run lint`
- [ ] `npm run qa:papers` (20/20)
- [ ] `npm run build` (123 pages)
- [ ] `npm run qa:smoke` (67 routes)

### Security

- [ ] `npm audit` — verify Next advisories cleared
- [ ] CSRF rejection on missing token (403)
- [ ] Rate limit 429 on brute force
- [ ] CSP headers present
- [ ] httpOnly cookies set on login

### Functional

- [ ] Homepage LCP ≤ 3s
- [ ] Search API returns results
- [ ] Paper pages render + Scholar meta
- [ ] Submission wizard steps
- [ ] PWA service worker registers
- [ ] Offline page loads
- [ ] Legacy domain redirects (vercel.json)

### Accessibility

- [ ] Lighthouse a11y ≥ 96

---

## Rollback Plan

| Trigger | Action | Time |
|---------|--------|------|
| Build failure on main | Revert merge commit | < 5 min |
| Runtime errors in production | Vercel → Promote previous deployment | < 2 min |
| Auth broken | Revert + promote | < 5 min |
| Paper routes broken | **Immediate rollback** — non-negotiable | < 2 min |

```bash
# Git rollback
git revert <merge-commit-sha>
git push origin main

# Vercel rollback (preferred for speed)
# Dashboard → Deployments → [previous] → Promote to Production
```

---

## Migration Estimate

| Task | Estimate |
|------|----------|
| Codemod + async API fixes | 4–8 hours |
| Manual route review (32 journal + API) | 4–6 hours |
| Testing + fixes | 4–8 hours |
| Preview validation | 2 hours |
| Production deploy + monitor | 2 hours |
| **Total** | **16–26 hours (2–3 dev days)** |

Add 1 week buffer for legacy route edge cases.

---

## Post-Upgrade

1. Update `docs/CHANGELOG.md` with Next 15 entry
2. Update `docs/DEPENDENCY_AUDIT.md` — re-run `npm audit`
3. Update `docs/ARCHITECTURE.md` — version numbers
4. Close security advisories in `SECURITY_AUDIT_V1_1.md`
5. Plan Tailwind 4 + ESLint 9 as separate tracks

---

## What NOT To Do

- ❌ `npm audit fix --force` (jumps to Next 16 uncontrolled)
- ❌ Upgrade React 19 before Next 15
- ❌ Upgrade Tailwind 4 in same PR as Next 15
- ❌ Remove legacy routes during framework upgrade
- ❌ Change API response shapes during upgrade

---

## Related Documents

- [DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [SECURITY.md](./SECURITY.md)
- [RELEASE.md](./RELEASE.md)
