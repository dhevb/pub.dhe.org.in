# V1.0.1 Dependency Maintenance Report

**Branch:** `release/v1.0.1-maintenance`  
**Date:** 2026-07-10  
**Release type:** Safe patch/minor dependency maintenance  
**Package version:** `1.0.1`

---

## Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| npm audit vulnerabilities | 9 (2 mod, 7 high) | **8** (1 mod, 7 high) | **−1** |
| Outdated direct packages | 17 | **11** | **−6** |
| Next.js | 14.2.35 | 14.2.35 | Unchanged |
| React | 18.3.1 | 18.3.1 | Unchanged |

**Policy followed:** No `npm audit fix --force`. No major framework upgrades.

---

## Package Updates Applied

| Package | Old | New | Reason | Risk | Regression? | Rollback? |
|---------|-----|-----|--------|------|-------------|-----------|
| `eslint` | 8.57.0 | **8.57.1** | Patch bugfix release | Low | No | No |
| `@types/node` | 20.14.5 | **20.19.43** | Node 20 type definitions (minor within 20.x) | Low | No | No |
| `@types/react` | 18.3.3 | **18.3.31** | React 18 type patches | Low | No | No |
| `@types/react-dom` | 18.3.0 | **18.3.7** | React DOM 18 type patches | Low | No | No |
| `tailwindcss` | 3.4.4 | **3.4.19** | 3.4.x bugfix/security patches | Low | No | No |
| `nextjs-toploader` | 3.7.15 | **3.9.17** | Minor bugfixes; same API (`Providers.tsx`) | Low | No | No |
| Transitive (via `npm audit fix`) | various | patched | Safe dev-chain fixes (brace-expansion/minimatch) | Low | No | No |

### Compatibility Notes

- **eslint 8.57.1:** Patch only; no rule changes.
- **@types/*:** Type-only packages; no runtime impact.
- **tailwindcss 3.4.19:** Stays on v3; no Tailwind 4 breaking changes.
- **nextjs-toploader 3.9.17:** Changelog shows bug fixes and Next 14/15 compatibility; no API changes to `<NextTopLoader />`.

---

## Packages Skipped (Risk Assessment)

| Package | Current | Available | Skip reason |
|---------|---------|-----------|-------------|
| `next` | 14.2.35 | 16.2.10 | **Major upgrade** — requires planned migration ([NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md)) |
| `react` / `react-dom` | 18.3.1 | 19.2.7 | **Major upgrade** — tied to Next 15+ |
| `typescript` | 5.4.5 | 5.9.3 | **Requires testing** — minor jump; deferred to V1.0.2 |
| `lucide-react` | 1.23.0 | 1.24.0 | **Requires testing** — icon bundle changes; deferred |
| `react-hot-toast` | 2.4.1 | 2.6.0 | **Requires testing** — toast API minor changes; deferred |
| `@fortawesome/*` | 6.6.0 | 6.7.2 / 7.x | Legacy-only; 7.x is **major**; deferred |
| `eslint-config-next` | 14.2.4 | 16.x | Tied to Next major; unchanged |
| `vitest` | 3.2.7 | 4.x | **Major upgrade** — deferred |

---

## Verification Results

| Command | Result |
|---------|--------|
| `npm install` | ✅ Pass |
| `npm run lint` | ✅ Pass (3 pre-existing legacy warnings) |
| `npx tsc --noEmit` | ✅ Pass (after test fixture type fix) |
| `npm run build` | ✅ Pass (123 pages) |
| `npm run qa` | ✅ Pass (20/20 papers) |
| `npm run test` | ✅ Pass (58/58) |
| Production smoke (`pub.dhe.org.in`) | ✅ Pass (67 routes) |

### Test Fix (non-functional)

`src/lib/search/__tests__/engine.test.ts` — added missing `href`, `paperNum`, `type` fields to satisfy `SearchDocument` type. No application code changed.

---

## Remaining Vulnerabilities (8)

| Package | Severity | Scope | Action |
|---------|----------|-------|--------|
| `next@14.2.35` | High (aggregate) | **Production runtime** | Planned Next 15.5.16+ upgrade |
| `postcss@8.4.31` (nested in next) | Moderate | **Build only** | Override or Next upgrade |
| `glob` | High | **Development only** | eslint-config-next chain |
| `minimatch` | High | **Development only** | ESLint/typescript-eslint chain |
| `@next/eslint-plugin-next` | High | **Development only** | Next/eslint major upgrade |
| `eslint-config-next` | High | **Development only** | Next major upgrade |

> **Not fixable** without `--force` or Next.js major upgrade. See [DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md).

---

## Remaining Outdated Packages (11)

```
@fortawesome/* (3)     → 6.7.2 available (legacy)
lucide-react           → 1.24.0 (deferred)
react-hot-toast        → 2.6.0 (deferred)
typescript             → 5.9.3 (deferred)
eslint-config-next     → 16.x (blocked by Next major)
next / react           → latest majors blocked
vitest                 → 4.x (major)
```

---

## Rollback Procedure

```bash
git checkout platform-upgrade -- package.json package-lock.json
npm ci
npm run qa:all
```

Or revert merge commit on `main` after deploy.

---

## Production Readiness

| Criterion | Status |
|-----------|--------|
| No breaking changes | ✅ |
| Build passes | ✅ |
| Lint passes | ✅ |
| TypeScript passes | ✅ |
| QA passes | ✅ |
| Smoke tests pass | ✅ |
| Vulnerabilities reduced safely | ✅ (−1) |
| No forced upgrades | ✅ |
| Ready for production review | ✅ |

---

## Related

- [DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md)
- [NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md)
- [RELEASE.md](./RELEASE.md)
