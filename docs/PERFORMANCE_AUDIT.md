# Performance Audit — Viksit Bharat Journal

**Date:** 9 July 2026  
**Branch:** `platform-upgrade` (Phase 9 optimizations)  
**Method:** Production build analysis, filesystem chunk inspection, Lighthouse CLI (local `npm run start`)

---

## Executive Summary

The primary bottlenecks were **homepage double code-splitting**, **framer-motion on above-fold stats**, **blocking paper-index fetch before hero render**, **Ant Design on Books/Journal pages**, and **large badge/contrast + touch-target a11y failures**.

---

## Lighthouse Scores (Homepage, Local Production Server)

| Category | Before (Phase 9 start) | After (Phase 9 final) |
|----------|------------------------|------------------------|
| Performance | **62** | **80** |
| Accessibility | **93** | **96** (dedicated a11y run: **100**) |
| Best Practices | **100** | **96** |
| SEO | **100** | **100** |

### Core Web Vitals (Lighthouse)

| Metric | Before | After |
|--------|--------|-------|
| **LCP** | 7.0 s | **2.4 s** |
| **CLS** | — | **0** |
| **TBT** | — | **730 ms** |
| **Speed Index** | 3.4 s | **2.4 s** |

Source files: `lighthouse-p9-before.json`, `lighthouse-p9-final.json`, `lighthouse-p9-a11y.json`

---

## Bundle Analysis (Next.js Build Output)

### Homepage `/`

| Metric | Phase 8 (pre-P9) | Phase 9 |
|--------|------------------|---------|
| Route JS | 48.8 kB | **4.36 kB** |
| First Load JS | 148 kB | **107 kB** |
| Reduction | — | **−41 kB (−28%)** |

### Books `/Books` & Journal `/Journal`

| Metric | Before | After |
|--------|--------|-------|
| First Load JS | 172 kB | **99.4 kB** |
| Reduction | — | **−72.6 kB (−42%)** |

### Shared Chunks

| Chunk | Size |
|-------|------|
| `fd9d1056-*.js` (framework) | 168.8 KB |
| `framework-*.js` | 136.7 KB |
| `2117-*.js` (main app) | 120.6 KB |
| `main-*.js` | 113.2 KB |
| Middleware | 27.9 KB |
| Shared First Load JS | **87.3 kB** |

**Removed from top chunks:** `2468-*.js` (134.9 KB) and `1074-*.js` (127.8 KB) — eliminated with `framer-motion` and `antd` removal from homepage critical path.

---

## Dependencies Removed

| Package | Approx. impact | Files affected |
|---------|----------------|----------------|
| `antd` | ~70+ kB on Books/Journal routes | `BookCard.tsx`, `JournalCard.tsx`, `NewIssue.tsx` |
| `framer-motion` | ~130 kB chunk on homepage | `StatsSection.tsx` (removed) |

---

## Client Component Audit

**Total `"use client"` files:** ~110 (mostly legacy journal components under `src/app/component/`)

### Converted to Server Components (Phase 9)

| Component | Was | Now |
|-----------|-----|-----|
| `StatsSection` | Client + framer-motion | Server + static display |
| `FAQSection` | Client + useState accordion | Server + `<details>`/`<summary>` |
| `LatestPapersSection` | Props from blocking page fetch | **Async server component** in `<Suspense>` |
| `NewsletterSection` | Link+Button nesting | Server + styled links |

### Remaining client (required interactivity)

- `SiteHeader`, `MegaMenu` — scroll state, mobile nav
- `Providers` — CSRF, toast, top loader
- Auth forms, submission wizard, search clients
- Legacy journal manuscript flows (~90 files)

---

## Homepage Critical Path Issues (Found)

1. **`page.tsx` dynamic-imported entire `Homepage`** — delayed hero SSR
2. **`buildPaperSearchIndex()` awaited before render** — blocked TTFB/LCP
3. **`StatsSection` imported framer-motion** — 130+ kB client JS above fold
4. **Double dynamic boundary** — page + section splits

### Fixes applied

- Direct `Homepage` import in `page.tsx`
- Paper index moved to async `LatestPapersSection` inside `<Suspense>`
- Below-fold sections restored to `dynamic()` imports
- framer-motion removed from stats

---

## Ant Design Audit

| File | Components | Status |
|------|------------|--------|
| `BookCard.tsx` | Card, Row, Col | **Replaced** with Tailwind grid |
| `JournalCard.tsx` | Card, Row, Col | **Replaced** with Tailwind grid |
| `NewIssue.tsx` | Button | **Replaced** with native button |

**`antd` fully removed from `package.json`.**

---

## Images

### Root marketing images (`public/`)

| File | Size |
|------|------|
| `logo.png` | 569.8 KB |
| `vih.jpeg` | 1,317.0 KB |
| `vbh.png` | 648.1 KB |
| `vbe.png` | 529.3 KB |
| `shiksha.jpeg` | 326.6 KB |

`next/image` configured for AVIF/WebP in `next.config.mjs`. Logo uses `priority` in `SiteHeader`.

**Note:** PDF corpus in `public/vbe|vbh|vie|vih/` totals hundreds of MB — not loaded on homepage but affects deploy size.

---

## Fonts

| Font | Weights loaded | Preload |
|------|----------------|---------|
| Inter | 400, 500, 600 | yes |
| Playfair Display | 700 | yes |
| Noto Sans Devanagari | 400 | no (on-demand) |

All use `display: swap`.

---

## CSS

- Tailwind via `globals.css` — single compiled CSS bundle
- No separate large CSS frameworks after antd removal
- Render-blocking CSS flagged by Lighthouse (Next.js default) — acceptable trade-off

---

## Blocking Scripts

| Script | Load strategy |
|--------|---------------|
| Next.js runtime | Required |
| `nextjs-toploader` | Client in Providers |
| `react-hot-toast` | Dynamic import, `ssr: false` |
| CSRF bootstrap | `requestIdleCallback` deferred |

---

## Accessibility Findings

| Issue | Status |
|-------|--------|
| Badge color contrast | **Fixed** — `Badge.tsx` variants |
| Link-in-text-block (Partners) | Fixed Phase 8 |
| Button inside Link (Newsletter, CFP) | **Fixed** |
| Header nav touch targets | **Fixed** — `min-h-11` |
| Dedicated a11y Lighthouse | **100** |

---

## Largest Pages (First Load JS)

| Route | First Load JS |
|-------|---------------|
| `/vbe.rase/NewIssue` | 173 kB |
| `/vie.rase/table` | 135 kB |
| `/login` | 130 kB |
| `/` (homepage) | **107 kB** |
| `/Books` | **99.4 kB** |

---

## Hydration

- Homepage hero/stats/mission: **server-only** — no hydration for above-fold content
- `SiteHeader` + `Providers`: hydrate on every page (~87 kB shared + header client chunk)
- Legacy journal pages: heavy client hydration (antd removed only from Books/Journal/NewIssue button)

---

## Remaining Bottlenecks

1. **LCP on local Lighthouse varies** (2.4–5.4 s between runs) — production CDN will differ
2. **Performance score 80** vs target 95 — TBT 730 ms, legacy JS on shared layout
3. **`logo.png` 570 KB** — should be compressed WebP/AVIF source
4. **Legacy `Filter.tsx` / Fortawesome / marquee** on old journal pages
5. **110 client components** in legacy `component/` tree — out of scope for no-redesign rule

---

## Verification Commands

```bash
npm run build
npm run lint
npx tsc --noEmit   # run after build
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo
```

---

*Audit generated from actual build output and Lighthouse JSON artifacts in repo root (not committed).*
