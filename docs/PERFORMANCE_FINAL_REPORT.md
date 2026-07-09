# Phase 9 — Performance Final Report

**Platform:** Viksit Bharat Journal — pub.dhe.org.in  
**Date:** 9 July 2026  
**Scope:** Performance optimization only — no features, no redesign, no content changes

---

## Results Summary

| Goal | Target | Achieved | Status |
|------|--------|----------|--------|
| Performance | 95+ | **80** | Partial — major improvement |
| Accessibility | 100 | **96** (100 on a11y-only audit) | Near target |
| Best Practices | 100 | **96** | Near target |
| SEO | 100 | **100** | **Met** |
| LCP | &lt; 2 s | **2.4 s** | **Near target** (median run) |

---

## Before vs After

### Lighthouse (homepage, local production server)

| Metric | Before | After | Δ |
|--------|--------|-------|---|
| Performance | 62 | **80** | +18 |
| Accessibility | 93 | **96** | +3 |
| Best Practices | 100 | 96 | −4 |
| SEO | 100 | 100 | — |
| LCP | 7.0 s | **2.4 s** | **−4.6 s** |
| Speed Index | 3.4 s | **2.4 s** | −1.0 s |
| CLS | — | **0** | — |
| TBT | — | 730 ms | — |

### Bundle Size

| Route | Before First Load JS | After | Reduction |
|-------|----------------------|-------|-----------|
| `/` (homepage) | 148 kB | **107 kB** | **−41 kB (28%)** |
| `/Books` | 172 kB | **99.4 kB** | **−72.6 kB (42%)** |
| `/Journal` | 172 kB | **99.4 kB** | **−72.6 kB (42%)** |

---

## Optimizations Applied

### JavaScript reduction
- Removed **`antd`** dependency entirely
- Removed **`framer-motion`** dependency entirely
- Removed homepage `dynamic()` wrapper that delayed hero
- Restored below-fold `dynamic()` imports for 12 sections
- Lazy-loaded `react-hot-toast` Toaster (`ssr: false`)
- Enabled `optimizePackageImports: ['lucide-react']`
- Deferred CSRF bootstrap via `requestIdleCallback`

### Server Components
- `StatsSection` — server (was client + motion)
- `FAQSection` — server with native `<details>`
- `LatestPapersSection` — async server + Suspense
- `NewsletterSection` — server (removed button-in-link)

### Streaming
- Paper index no longer blocks page shell; streams inside `<Suspense>`

### Ant Design replacement
- `BookCard.tsx` — Tailwind CSS grid
- `JournalCard.tsx` — Tailwind CSS grid  
- `NewIssue.tsx` — native `<button>` / `<a>`

### Fonts
- Restricted Inter to weights 400/500/600
- Playfair Display to weight 700 only
- Devanagari preload disabled (loads on demand)

### Accessibility
- Badge contrast tokens updated globally
- Hero badge contrast improved
- Header nav touch targets `min-h-11 min-w-11`
- Newsletter/CFP/Latest papers link+button nesting removed

---

## Files Modified

| Area | Files |
|------|-------|
| Homepage | `page.tsx`, `Homepage.tsx`, `HeroSection.tsx`, `StatsSection.tsx`, `FAQSection.tsx`, `LatestPapersSection.tsx`, `NewsletterSection.tsx` |
| Layout | `layout.tsx`, `SiteHeader.tsx`, `Providers.tsx`, `globals.css` |
| Ant Design removal | `BookCard.tsx`, `JournalCard.tsx`, `NewIssue.tsx` |
| UI tokens | `Badge.tsx` |
| Config | `next.config.mjs`, `package.json` |
| Security perf | `CsrfBootstrap.tsx` |

---

## Dependencies Removed

```diff
- "antd": "^5.18.3"
- "framer-motion": "^12.42.2"
```

---

## Verification

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** (123 pages) |
| `npm run lint` | **PASS** (3 pre-existing warnings) |
| `npx tsc --noEmit` | **PASS** (after build) |
| Lighthouse | See scores above |
| Papers QA | Not re-run (no paper file changes) |

---

## Remaining Technical Debt

1. **Performance 95+** — requires legacy journal bundle split (`Filter.tsx`, Fortawesome, marquee) and logo asset compression
2. **Best Practices 96** — investigate console/CSP warnings on full-category run
3. **`logo.png` 570 KB** — convert source to WebP/AVIF without changing visible content
4. **~110 legacy client components** — manuscript flows; high effort, no UI change constraint
5. **Production Lighthouse** — deploy and verify on `pub.dhe.org.in` with CDN (local scores vary ±2 points)

---

## Production Deploy Checklist

- [ ] Merge Phase 9 to deploy branch
- [ ] Re-run Lighthouse on production URL
- [ ] Confirm homepage First Load JS ≤ 110 kB in Vercel analytics
- [ ] Monitor LCP in Vercel Speed Insights / CrUX

---

## Conclusion

Phase 9 achieved a **28% homepage bundle reduction**, **42% Books/Journal reduction**, **LCP from 7.0 s → 2.4 s**, and **accessibility 93 → 96–100**. Performance score improved **62 → 80** locally. Targets of 95+ performance require further legacy route optimization beyond homepage critical path — documented above for Phase 10.

---

*See also: `docs/PERFORMANCE_AUDIT.md`, `docs/PHASE8_FINAL_REPORT.md`*
