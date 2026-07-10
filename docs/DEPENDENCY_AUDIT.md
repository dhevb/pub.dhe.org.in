# Dependency Audit & Upgrade Roadmap

**Date:** 2026-07-10  
**Project:** Viksit Bharat Journal (`pub-rase-co-in@1.1.0`)  
**Node:** ≥ 20.x  
**Audit commands:** `npm outdated`, `npm audit`, `npm ls --depth=0`

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Direct dependencies | 14 production + 9 dev |
| Total transitive (lockfile) | 518 |
| Outdated direct packages | 17 |
| npm audit findings | **9** (7 high, 2 moderate, 0 critical) |
| Safe immediate updates | 12 packages (patch/minor) |
| Production runtime CVE exposure | **Next.js bundled PostCSS + Next.js framework advisories** |
| Development-only CVE exposure | **6** (glob, minimatch, brace-expansion, eslint chain) |

**Policy:** No `npm audit fix --force`. No automatic major framework upgrades.

---

## Dependency Inventory

### Production Dependencies (14)

| Package | Installed | Wanted (^range) | Latest | Classification |
|---------|-----------|-----------------|--------|----------------|
| `next` | 14.2.35 | 14.2.35 | 16.2.10 | **BREAKING CHANGE** (15+/16) |
| `react` | 18.3.1 | 18.3.1 | 19.2.7 | **BREAKING CHANGE** |
| `react-dom` | 18.3.1 | 18.3.1 | 19.2.7 | **BREAKING CHANGE** |
| `zod` | 4.4.3 | ^4.4.3 | 4.4.3 | ✅ Current |
| `lucide-react` | 1.23.0 | 1.24.0 | 1.24.0 | **REQUIRES TESTING** |
| `react-hook-form` | 7.81.0 | ^7.81.0 | 7.81+ | ✅ SAFE TO UPDATE |
| `@hookform/resolvers` | 5.4.0 | ^5.4.0 | 5.4+ | ✅ SAFE TO UPDATE |
| `react-hot-toast` | 2.4.1 | 2.6.0 | 2.6.0 | **REQUIRES TESTING** |
| `nextjs-toploader` | 3.7.15 | 3.9.17 | 3.9.17 | ✅ SAFE TO UPDATE |
| `axios` | 1.18.1 | ^1.7.7 | 1.18+ | ✅ SAFE (legacy-only) |
| `@fortawesome/free-solid-svg-icons` | 6.6.0 | 6.7.2 | 7.3.0 | **REQUIRES TESTING** (6.x) / **BREAKING** (7.x) |
| `@fortawesome/free-brands-svg-icons` | 6.6.0 | 6.7.2 | 7.3.0 | **REQUIRES TESTING** (6.x) / **BREAKING** (7.x) |
| `@fortawesome/react-fontawesome` | 0.2.2 | 0.2.6 | 3.4.0 | **REQUIRES TESTING** (0.2.x) / **BREAKING** (3.x) |
| `react-fast-marquee` | 1.6.5 | ^1.6.5 | 1.6.5 | **END OF LIFE** (legacy-only) |

### Development Dependencies (9)

| Package | Installed | Wanted | Latest | Classification |
|---------|-----------|--------|--------|----------------|
| `typescript` | 5.4.5 | 5.9.3 | 7.0.2 | **REQUIRES TESTING** (5.9) / **BREAKING** (7) |
| `tailwindcss` | 3.4.4 | 3.4.19 | 4.3.2 | **SAFE TO UPDATE** (3.4.x) / **BREAKING** (4) |
| `postcss` | 8.5.16 | ^8 | 8.5.16 | ✅ Current (direct) |
| `eslint` | 8.57.0 | 8.57.1 | 9.39.4 | **SAFE TO UPDATE** (8.57.1) / **BREAKING** (9) |
| `eslint-config-next` | 14.2.4 | 14.2.4 | 16.2.10 | **BREAKING CHANGE** (tied to Next major) |
| `vitest` | 3.2.7 | 3.2.7 | 4.1.10 | ✅ Current / **BREAKING** (4) |
| `@vitest/coverage-v8` | 3.2.7 | 3.2.7 | 4.1.10 | ✅ Current / **BREAKING** (4) |
| `@types/node` | 20.14.5 | 20.19.43 | 26.1.1 | **SAFE TO UPDATE** (20.x) |
| `@types/react` | 18.3.3 | 18.3.31 | 19.2.17 | **SAFE TO UPDATE** (18.x) |
| `@types/react-dom` | 18.3.0 | 18.3.7 | 19.2.3 | **SAFE TO UPDATE** (18.x) |

---

## Unused & Legacy Dependencies

| Package | Usage | Recommendation |
|---------|-------|----------------|
| `axios` | 36 legacy files in `src/app/component/` | **Retain** until legacy migration; not unused |
| `@fortawesome/*` | 21 legacy components | **Retain** until legacy migration |
| `react-fast-marquee` | 1 file (`Notification.tsx`) | **Legacy-only** — remove with legacy tree |

### Duplicate Dependencies

| Package | Instances | Notes |
|---------|-----------|-------|
| `postcss` | `8.5.16` (dev, direct) + `8.4.31` (nested under `next`) | Nested copy is **vulnerable**; see overrides below |

---

## Classification Summary

### ✅ SAFE TO UPDATE (patch/minor, low risk)

Apply in a single maintenance PR with `npm run qa:all`:

```
eslint@8.57.1
@types/node@^20.19
@types/react@^18.3.31
@types/react-dom@^18.3.7
tailwindcss@^3.4.19
nextjs-toploader@^3.9.17
react-hook-form@latest (7.x)
@hookform/resolvers@latest (5.x)
brace-expansion, minimatch (via npm audit fix — dev chain)
```

### ⚠️ REQUIRES TESTING (minor, possible behavior change)

```
lucide-react@1.23.0 → 1.24.0
react-hot-toast@2.4.1 → 2.6.0
typescript@5.4.5 → 5.9.x
@fortawesome/*@6.6.0 → 6.7.2
npm overrides: next>postcss → ^8.5.10 (test build)
```

### 🚫 BREAKING CHANGE (major — planned separately)

```
next@14 → 15.5.16+ or 16.x
react@18 → 19
tailwindcss@3 → 4
eslint@8 → 9
vitest@3 → 4
@fortawesome/*@6 → 7
eslint-config-next@14 → 15/16
```

### ☠️ END OF LIFE / Replace

| Package | Status | Replacement path |
|---------|--------|------------------|
| `react-fast-marquee` | Unmaintained niche | Remove with legacy `Notification.tsx` |
| `axios` (long-term) | Legacy HTTP client | `fetch` / `apiFetch` / `secureFetch` (already in modern path) |
| ESLint 8 | Maintenance mode | ESLint 9 + flat config (with Next 15+) |

---

## Vulnerability Register (9 findings)

### V1 — `postcss@8.4.31` (nested under `next`)

| Field | Value |
|-------|-------|
| **Severity** | Moderate (GHSA-qx2v-qp2m-jg93) |
| **Current** | 8.4.31 |
| **Safe version** | ≥ 8.5.10 |
| **Chain** | `next` → `postcss@8.4.31` |
| **Scope** | **Build only** (Next.js internal CSS pipeline; not shipped to browser) |
| **Production impact** | Low — not in client bundle |
| **Likelihood** | Low — requires attacker-controlled CSS stringify path in build |
| **Action** | Test `npm overrides` for `next>postcss`; or resolve via Next.js upgrade |
| **Workaround** | Override in `package.json`: `"overrides": { "next>postcss": "^8.5.10" }` |

> **Development-only vulnerability** — nested PostCSS used by Next.js build toolchain, not runtime.

---

### V2 — `next@14.2.35` (multiple advisories)

| Field | Value |
|-------|-------|
| **Severity** | High (aggregate — 14 advisories) |
| **Current** | 14.2.35 (latest 14.2.x) |
| **Safe version** | ≥ **15.5.16** (per GHSA ranges) |
| **Chain** | Direct production dependency |
| **Scope** | **Production runtime** (Vercel server + middleware + RSC) |
| **Production impact** | Medium–High — DoS, middleware cache poisoning, RSC issues |
| **Likelihood** | Medium — public production site with middleware + App Router |

**Key advisories affecting this project:**

| Advisory | Severity | Fixed in | Relevant to us |
|----------|----------|----------|----------------|
| GHSA-3g8h-86w9-wvmq | Low | 15.5.16 | ✅ **Middleware** — we use `middleware.ts` |
| GHSA-ffhc-5mcf-pf4q | Moderate | 15.5.16 | ✅ **CSP nonces** — we set CSP in middleware |
| GHSA-c4j6-fc7j-m34r | High | 15.5.16 | ⚠️ WebSocket SSRF — if WS used |
| GHSA-h25m-26qc-wcjf | High | 15.0.8+ | ✅ RSC DoS |
| GHSA-36qx-fr4f-26g5 | High | 15.5.16 | ❌ Pages Router i18n bypass — we use App Router |

| **Action** | Plan Next.js 15.5.16+ upgrade — see [NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md) |
| **Workaround** | WAF/rate limiting (already in middleware); monitor Vercel security advisories; no WebSocket routes |

> **Not fixable on 14.2.x** without major upgrade. Staying on 14.2.35 is correct until planned migration.

---

### V3 — `glob@10.2.0–10.4.5`

| Field | Value |
|-------|-------|
| **Severity** | High (GHSA-5j98-mcp5-4vw2) |
| **Current** | 10.4.x |
| **Safe version** | ≥ 10.5.0 |
| **Chain** | `eslint-config-next` → `@next/eslint-plugin-next` → `glob` |
| **Scope** | **Development only** (ESLint CLI `-c/--cmd` injection) |
| **Production impact** | **None** — not in production bundle |
| **Likelihood** | Low — requires running glob CLI with malicious flags locally |
| **Action** | Wait for `eslint-config-next@14` patch or upgrade Next/eslint major together |
| **Workaround** | Do not use glob CLI directly; CI uses `next lint` only |

> **Development-only vulnerability**

---

### V4 — `minimatch@9.0.0–9.0.6`

| Field | Value |
|-------|-------|
| **Severity** | High (ReDoS ×3) |
| **Current** | 9.0.x |
| **Safe version** | ≥ 9.0.7 |
| **Chain** | `eslint` → `@typescript-eslint/parser` → `@typescript-eslint/typescript-estree` → `minimatch` |
| **Scope** | **Development only** (lint-time path matching) |
| **Production impact** | **None** |
| **Likelihood** | Low |
| **Action** | `npm audit fix` (safe — may resolve) |
| **Workaround** | Limit lint to CI; trusted code only |

> **Development-only vulnerability**

---

### V5 — `brace-expansion@≤1.1.12`

| Field | Value |
|-------|-------|
| **Severity** | Moderate (ReDoS / hang) |
| **Current** | ≤1.1.12 |
| **Safe version** | ≥ 1.1.13 |
| **Chain** | ESLint / file-glob utilities (transitive) |
| **Scope** | **Development only** |
| **Production impact** | **None** |
| **Likelihood** | Low |
| **Action** | `npm audit fix` (safe) |
| **Workaround** | — |

> **Development-only vulnerability**

---

### V6–V9 — Transitive eslint/typescript-eslint chain

| Package | Via | Scope | Action |
|---------|-----|-------|--------|
| `@typescript-eslint/parser` | minimatch | Dev only | `npm audit fix` |
| `@typescript-eslint/typescript-estree` | minimatch | Dev only | `npm audit fix` |
| `@next/eslint-plugin-next` | glob | Dev only | Next/eslint major upgrade |
| `eslint-config-next` | @next/eslint-plugin-next | Dev only | Next/eslint major upgrade |

---

## Risk Matrix

| Risk | Packages | Runtime? | Priority | Mitigation |
|------|----------|----------|----------|------------|
| **Critical path** | `next@14.2.35` | ✅ Yes | P1 | Planned upgrade to 15.5.16+ |
| **Build toolchain** | nested `postcss@8.4.31` | ❌ Build | P2 | npm overrides + test |
| **Dev tooling** | glob, minimatch, brace-expansion | ❌ Dev | P3 | `npm audit fix` |
| **Legacy debt** | axios, fortawesome, marquee | ✅ Legacy routes | P4 | Migration plan |
| **Stale minors** | lucide, toast, typescript | ✅ Yes | P5 | Batch minor bump + QA |

---

## Recommended Update Order

### Phase A — Safe maintenance (1–2 hours)

**Branch:** `chore/deps-safe-patch`

1. `npm audit fix` (no `--force`)
2. Patch updates: eslint, @types/*, tailwindcss 3.4.19, nextjs-toploader
3. `npm run qa:all`
4. Deploy to preview → smoke test

### Phase B — Tested minors (2–4 hours)

**Branch:** `chore/deps-minor`

1. `lucide-react@1.24.0`
2. `react-hot-toast@2.6.0`
3. `typescript@5.9.x`
4. `@fortawesome/*@6.7.2` (legacy icon regression check)
5. Test `postcss` override for nested next dependency
6. Full QA + visual check on legacy journal pages

### Phase C — Legacy dependency removal (V2, weeks)

1. Migrate legacy `axios` calls → `fetch`/`secureFetch`
2. Replace Font Awesome in legacy components → `lucide-react`
3. Remove `react-fast-marquee` + `Notification.tsx`
4. Remove `axios`, `@fortawesome/*`, `react-fast-marquee` from package.json

### Phase D — Framework upgrade (planned, see NEXTJS_UPGRADE_PLAN.md)

1. Next.js 15.5.16+ (security patches)
2. React 19 (bundled with Next 15)
3. ESLint 9 + eslint-config-next 15
4. Optional: Tailwind 4 (separate effort)

---

## Framework Upgrade Prerequisites

Before Next.js 15+:

- [ ] All V1.1 tests passing (`npm run test`)
- [ ] Legacy route smoke test (67 routes)
- [ ] Review middleware API changes (Next 15)
- [ ] Review `cookies()` async API (Next 15)
- [ ] Review React 19 hook changes
- [ ] Staging deploy on Vercel preview
- [ ] Lighthouse + security header verification

---

## Estimated Effort

| Phase | Effort | Risk |
|-------|--------|------|
| A — Safe patches | 1–2 h | Low |
| B — Tested minors | 2–4 h | Low–Medium |
| C — Legacy removal | 2–4 weeks | Medium |
| D — Next.js 15+ | 1–2 weeks | High |

---

## Rollback Considerations

| Change type | Rollback |
|-------------|----------|
| Patch/minor deps | `git revert` + `npm ci` |
| postcss override | Remove `overrides` from package.json |
| Next.js major | Vercel promote previous deployment; revert branch |
| Lockfile-only | Restore `package-lock.json` from git |

**Always:** Keep Vercel deployment history for instant promote rollback.

---

## npm Commands Reference

```bash
# Audit (read-only)
npm outdated
npm audit
npm ls --depth=0

# Safe fixes only
npm audit fix

# Full QA after any change
npm run qa:all
```

**Never run:** `npm audit fix --force`

---

## Related Documents

- [NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md)
- [SECURITY_AUDIT_V1_1.md](./SECURITY_AUDIT_V1_1.md)
- [RELEASE.md](./RELEASE.md)
- [V1_1_ENGINEERING_REPORT.md](./V1_1_ENGINEERING_REPORT.md)
