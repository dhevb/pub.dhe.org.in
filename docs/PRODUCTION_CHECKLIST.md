# Production Checklist

## Build & Deploy
- [x] `npm run build` passes (107 routes)
- [x] TypeScript strict mode enabled
- [x] ESLint passes (warnings only in legacy components)
- [x] GitHub Actions CI configured
- [ ] Vercel deployment with env vars

## Content Preservation
- [x] All 20 static papers accessible
- [x] All 98+ legacy routes working
- [x] Backward-compatible journal entry routes (/vbe, /vbh, /vie, /vih)

## SEO
- [x] sitemap.xml (dynamic)
- [x] robots.txt
- [x] RSS feed (/feed.xml)
- [x] PWA manifest
- [x] JSON-LD Organization schema
- [x] Per-article dynamic metadata (Paper pages)
- [x] Open Graph + Twitter Cards
- [x] Canonical URLs
- [ ] Google Search Console verification
- [ ] Google Scholar meta tags per article

## Accessibility
- [x] Skip links
- [x] Focus visible states
- [x] ARIA labels on search/forms
- [x] Semantic HTML landmarks
- [ ] Full WCAG AA audit (manual)

## Security
- [x] Security headers (X-Frame-Options, nosniff)
- [x] Middleware for protected routes
- [ ] JWT httpOnly cookies (currently localStorage)
- [ ] Rate limiting on API routes
- [ ] CSRF protection

## Future Roadmap
- PostgreSQL + Prisma migration
- Full editorial dashboard (Reviewer/Editor/Admin)
- ORCID OAuth integration
- DOI/Crossref XML export
- AI Research Assistant
- Bilingual i18n (next-intl)
- Plagiarism status dashboard
- OAI-PMH endpoint
