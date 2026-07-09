# Production Checklist

**Platform:** Viksit Bharat Journal — pub.dhe.org.in  
**Last updated:** Phase 6 (QA & launch) — July 2026

## Build & Deploy

- [x] `npm run build` passes (~115 routes)
- [x] `npm run lint` passes (warnings only in legacy components)
- [x] `npm run qa:papers` — 20/20 paper JSON files verified in CI
- [x] TypeScript strict mode enabled
- [x] GitHub Actions CI configured (lint + papers + build)
- [x] Vercel deployment with env vars
- [ ] Merge `platform-upgrade` → `main` via PR
- [ ] Post-merge smoke test: `BASE_URL=https://pub.dhe.org.in npm run qa:smoke`

## Content Preservation

- [x] All 20 static papers accessible (`/vbe.rase/Paper1` … `/vih.rase/Paper5`)
- [x] Paper JSON files never modified by redesign
- [x] All legacy journal routes working
- [x] Legacy domain redirect configs (pub, vbe, vie, vbh, vih)
- [x] Backward-compatible journal entry routes (`/vbe`, `/vbh`, `/vie`, `/vih`)

## SEO

- [x] sitemap.xml (dynamic, ~83+ URLs)
- [x] robots.txt
- [x] RSS feed (`/feed.xml`)
- [x] PWA manifest
- [x] JSON-LD (Organization, ScholarlyArticle, FAQ, WebSite, Periodical)
- [x] Per-article dynamic metadata (paper pages)
- [x] Open Graph + Twitter Cards + dynamic `/opengraph-image`
- [x] Canonical URLs + hreflang EN↔HI journal pairs
- [x] Google Scholar `citation_*` meta on all paper pages
- [ ] Google Search Console verification (manual — post-launch)

## Auth & Dashboards

- [x] httpOnly cookie auth (`token`, `auth-token`, `userId`)
- [x] API routes: `/api/auth/login`, `/logout`, `/session`
- [x] Author dashboard with live manuscript list (`/api/manuscripts`)
- [x] File-based CMS (`content/*.json`, `/api/cms`)
- [x] Protected `/dashboard/*` routes (redirect to login)

## Accessibility

- [x] Skip links
- [x] Focus visible states
- [x] ARIA labels on search/forms
- [x] Semantic HTML landmarks
- [x] `prefers-reduced-motion` support
- [ ] Full WCAG AA audit (manual)

## Security

- [x] Security headers (HSTS, X-Frame-Options, nosniff)
- [x] Content-Security-Policy in middleware
- [x] Middleware rate limiting (120 req/min)
- [x] `public/security.txt`
- [ ] CSRF tokens on state-changing forms (future)

## Monitoring

- [x] Health endpoint: `GET /api/health`
- [ ] Vercel Analytics / Core Web Vitals (enable in Vercel dashboard)
- [ ] Uptime monitor on `/api/health` (optional: UptimeRobot, Better Stack)

## Launch Steps

1. Open PR: `platform-upgrade` → `main`
2. Verify CI green on PR
3. Merge and confirm Vercel production deploy
4. Run production smoke: `BASE_URL=https://pub.dhe.org.in npm run qa:smoke`
5. Spot-check: 4 journal homes, 1 paper per journal, login, author dashboard
6. Submit sitemap in Google Search Console

## Future Roadmap

- Headless CMS (Phase 2)
- Full reviewer/editor API integration
- ORCID OAuth
- DOI/Crossref XML export
- OAI-PMH endpoint
- Bilingual i18n (`next-intl`)
