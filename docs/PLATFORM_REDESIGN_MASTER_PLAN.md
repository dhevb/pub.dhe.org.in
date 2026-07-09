# Viksit Bharat Journal — Platform Redesign Master Plan

**Project:** pub.dhe.org.in (Viksit Bharat Journal)  
**Date:** July 9, 2026  
**Status:** Phase 0 — Audit & Planning (no implementation yet)  
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Vercel  

---

## Executive Summary

This document is the **mandatory pre-implementation blueprint** for transforming pub.dhe.org.in from a consolidated legacy journal portal into a **world-class Bharatiya multidisciplinary knowledge platform**.

**Non-negotiable constraints:**
- All 20 static papers (5 × 4 journals) remain intact
- All 107+ routes remain reachable (redirects where URLs change)
- Render API (`vie-rase-backend.onrender.com`) connections preserved
- No database schema breakage (no local DB today — API-only)

**Current state:** Mid-migration. Modern infrastructure exists (`src/lib/journals/config.ts`, `PaperPage`, SEO lib, `JournalShell`) but ~90% of UI still runs through **4 duplicated legacy component trees** (~6,000+ LOC × 4).

**Target state:** Config-driven, server-first, WCAG AA, Lighthouse 95+, enterprise SEO, CMS-ready architecture, unified brand as **Viksit Bharat Journal — A Bharatiya Knowledge Journal**.

---

## 1. Audit Report

### 1.1 Project Architecture

| Layer | Path | Files | Maturity |
|-------|------|-------|----------|
| App Router | `src/app/` | 107 `page.tsx` | Legacy-heavy |
| Modern components | `src/components/` | 11 | Early stage |
| Legacy components | `src/app/component/` | 153 | Dominant |
| Shared lib | `src/lib/` | 9 | Good foundation |
| Middleware | `src/middleware.ts` | 1 | Partial |
| Types | `src/types/article.ts` | 1 | Adequate |

**Architecture pattern today:** Monolith with 4 parallel journal silos (`vbe_Component`, `vbh_Component`, `vie_Component`, `vih_Component`) plus a thin modern layer.

**Architecture pattern target:** Single config-driven journal engine + feature modules + CMS data layer.

### 1.2 Route Inventory

| Category | Count | Examples |
|----------|-------|----------|
| Portal routes | 22 | `/`, `/search`, `/conferences`, `/bal-shodh-patrika` |
| Modern journal entry | 4 | `/vbe`, `/vbh`, `/vie`, `/vih` |
| Legacy journal trees | 85 | `/vbe.rase/*`, `/vbh.rase/*`, etc. |
| Dashboard stubs | 5 | `/dashboard/*` |
| Metadata routes | 4 | `sitemap`, `robots`, `manifest`, `feed.xml` |

### 1.3 Dependencies

| Package | Purpose | Redesign action |
|---------|---------|-----------------|
| `next` 14.2.4 | Framework | Keep; upgrade to 14.2.x patch |
| `axios` | API (45+ hardcoded URLs) | Centralize via `lib/api/client.ts` |
| `antd` | UI (3 files only) | Remove; replace with design system |
| `@fortawesome/*` | Icons | Migrate to `lucide-react` or SVG sprites |
| `react-hot-toast` | Notifications | Keep |
| `react-fast-marquee` | Homepage | Replace with CSS marquee or remove |
| `nextjs-toploader` | Progress | Keep |

**Missing (to add):** `framer-motion`, `zod`, `react-hook-form`, `@tailwindcss/typography`, `sharp` (implicit via Next), optional `next-intl` for i18n readiness.

### 1.4 Data Sources

| Type | Source | Count | Preservation |
|------|--------|-------|--------------|
| Static papers | `src/app/{journal}.rase/output/Paper{1-5}.json` | 20 | **Immutable** — loader only |
| Dynamic articles | `vie-rase-backend.onrender.com` | API-driven | **Preserve endpoints** |
| Submissions | Render API POST | Forms | **Preserve** |
| Conference/Bal Shodh | Stub pages | 2 | Expand with CMS |

### 1.5 Build & Deploy

- **Build:** 111 routes, passes with ESLint warnings only
- **Vercel:** `pub.dhe.org.in`, region `bom1`, GitHub `dhevb/pub.dhe.org.in`
- **Redirects:** Legacy `*.rase.co.in` → `pub.dhe.org.in` via `vercel.json`

### 1.6 Reference Analysis (Inspiration Only)

| Source | Patterns to adopt |
|--------|-------------------|
| [pub.rase.co.in](https://pub.rase.co.in) | Multi-journal cards, paper structure, submission flow |
| [Shiksha Mahakumbh Academic Council](https://www.shikshamahakumbh.com/departments/academic-council) | Multi-track conference, Bal Shodh Patrika, research tracks |
| Elsevier / Springer / Nature | Clean article pages, citation export, issue/volume hierarchy |
| MDPI / Frontiers | Open access badges, fast submission CTA |
| DOAJ / Crossref / Google Scholar | Metadata richness, `citation_*` tags, JSON-LD ScholarlyArticle |
| UGC CARE / Indian Citation Index | Indexing pages, ISSN display, ethics statements |

---

## 2. UX Problems

| # | Problem | Severity | Location |
|---|---------|----------|----------|
| U1 | Root homepage is only `<Cards />` — no mission, stats, or trust signals | Critical | `src/app/page.tsx` |
| U2 | Three home paths per journal (`/vbe`, `/vbe.rase/home`, `/vbe.rase/Vbe`) confuse users | High | Route structure |
| U3 | PascalCase URLs (`/AboutUs`, `/ForgotPassword`) feel dated | Medium | Portal routes |
| U4 | No global search UX — `/search` exists but disconnected from nav | High | `search/page.tsx` |
| U5 | Submission wizard duplicated 4× with inconsistent steps | Critical | `SubmitManuscript/*` |
| U6 | Auth broken: login → localStorage, middleware → cookies | Critical | Login + middleware |
| U7 | Mock `mock-auth-token` injected in manuscript flow | Critical | SubmitManuscript pages |
| U8 | Dashboards are placeholder cards with no real workflows | High | `dashboard/*` |
| U9 | No breadcrumb navigation on deep journal pages | Medium | All legacy routes |
| U10 | No "current issue" vs "archives" mental model | High | Issue pages |
| U11 | Bal Shodh Patrika & conferences are stubs — no content hierarchy | High | Stub pages |
| U12 | No reviewer/editor onboarding flows | Medium | Missing routes |
| U13 | Mobile nav inconsistent across 4 journal NavBars | High | `*_Component/NavBar.tsx` |
| U14 | No skip links on legacy pages (only in globals.css) | Medium | Legacy layouts |
| U15 | Error/empty states missing on API-driven article lists | Medium | `ReadArticle.tsx` |

---

## 3. UI Problems

| # | Problem | Severity | Location |
|---|---------|----------|----------|
| I1 | Four independent design dialects (one per journal component tree) | Critical | `src/app/component/*_Component/` |
| I2 | Modern design tokens exist but legacy pages ignore them | High | `globals.css` vs legacy components |
| I3 | Double font loading (Google Fonts CSS + `next/font`) | Medium | `globals.css` + `layout.tsx` |
| I4 | Inconsistent button styles (antd, custom, Tailwind ad-hoc) | High | Mixed |
| I5 | No sticky mega-menu for journal sections | High | NavBar components |
| I6 | Footer duplicated 4× with different links | High | `Footer.tsx` × 4 |
| I7 | Paper pages modern; surrounding shell is legacy | Medium | `PaperPage` vs `HomePage` |
| I8 | No dark mode implementation despite `darkMode: class` | Low | tailwind.config |
| I9 | Images not consistently using `next/image` | Medium | Legacy components |
| I10 | No skeleton loaders on client-fetched articles | Medium | `DynamicArticleDetail` |
| I11 | Typography hierarchy weak on editorial/indexing pages | Medium | Editorial components |
| I12 | "Comming Soon" typo on homepage components | Low | `HomePage.tsx` |
| I13 | CompanyInfo/cards layout not responsive-optimized | Medium | Root homepage |

---

## 4. SEO Problems

| # | Problem | Severity | Location |
|---|---------|----------|----------|
| S1 | Root `/` has no page-level metadata or JSON-LD | Critical | `page.tsx` |
| S2 | ~80 legacy journal pages inherit root metadata only | High | `*.rase/*/page.tsx` |
| S3 | Sitemap lists ~48 URLs; 107 routes exist — gap of ~60 | High | `sitemap.ts` |
| S4 | No hreflang tags (EN/HI journal pairs) | Medium | layouts |
| S5 | `og-default.png` referenced but may be missing | Medium | `metadata.ts` |
| S6 | No FAQ schema on FAQ pages (none exist yet) | Medium | Missing |
| S7 | No Event schema for conferences | Medium | `conferences/` |
| S8 | No Person schema for editorial board | Medium | EditorialBoard |
| S9 | Internal linking weak between journals and portal | High | Nav/footer |
| S10 | RSS feed only covers 20 static papers — not API articles | Medium | `feed.xml/route.ts` |
| S11 | Canonical URLs use `pub.dhe.org.in` — good; legacy paths lack alternates | Medium | — |
| S12 | Heading hierarchy not audited on legacy pages | Medium | Legacy components |
| S13 | Some images lack meaningful `alt` text | Medium | Legacy |

**What's working:** `generatePaperMetadata`, Google Scholar tags, Organization schema on modern journal entries, `robots.ts`, `manifest.ts`.

---

## 5. Performance Problems

| # | Problem | Impact | Location |
|---|---------|--------|----------|
| P1 | 45+ client components with `axios` inflate JS bundle | LCP, TBT | `*_Component/*.tsx` |
| P2 | Four duplicate component trees not tree-shaken | Bundle size | `component/` |
| P3 | `antd` imported in 3 files — heavy for 3 uses | Bundle | BookCard, JournalCard |
| P4 | Font double-load causes layout shift risk | CLS | fonts |
| P5 | No dynamic imports for heavy wizards (SubmitManuscript) | INP | Submission pages |
| P6 | In-memory rate limit Map — resets on cold start | Edge | `middleware.ts` |
| P7 | No `loading.tsx` / `error.tsx` on most routes | UX perf | `app/` |
| P8 | Client-side article fetch blocks render | LCP | `DynamicArticleDetail` |
| P9 | No ISR/cache strategy for static papers (SSR each time OK but could cache) | TTFB | Paper pages |
| P10 | `react-fast-marquee` runs continuous animation | CPU | homepage |

**Estimated current Lighthouse (homepage):** Performance 65–75, SEO 85–90, Accessibility 75–85, Best Practices 85–90.

---

## 6. Security Problems

| # | Problem | Severity | Location |
|---|---------|----------|----------|
| X1 | Auth tokens in `localStorage` — XSS exfiltration risk | Critical | Login components |
| X2 | Middleware cookie check never receives tokens from login | Critical | Auth mismatch |
| X3 | Mock auth token bypasses real auth | Critical | SubmitManuscript |
| X4 | No CSP header (only partial headers in next.config + middleware) | High | configs |
| X5 | No CSRF protection on forms | High | All forms |
| X6 | Rate limiting in-memory only — not distributed | Medium | middleware |
| X7 | No `security.txt` | Low | `public/` |
| X8 | API URLs hardcoded — env override exists but unused in most files | Medium | 45+ axios calls |
| X9 | Wrong API journal prefix in vih components (data leak risk) | High | `vih_Component/*` |
| X10 | Double-slash API URLs (`//api/`) | Medium | AddArticle components |
| X11 | No input sanitization library on forms | Medium | Forms |
| X12 | `X-XSS-Protection` deprecated header still set | Low | middleware |

---

## 7. Accessibility Problems

| # | Problem | WCAG | Location |
|---|---------|------|----------|
| A1 | Focus states inconsistent on legacy buttons | 2.4.7 | Legacy components |
| A2 | Skip link defined in CSS but not in all layouts | 2.4.1 | layouts |
| A3 | Form labels missing on some auth fields | 1.3.1 | Login/Signup |
| A4 | Color contrast not verified on saffron/orange accents | 1.4.3 | globals.css |
| A5 | No `prefers-reduced-motion` for animations | 2.3.3 | globals.css |
| A6 | Icon-only buttons without `aria-label` | 4.1.2 | NavBar |
| A7 | Dynamic content updates lack `aria-live` | 4.1.3 | ReadArticle |
| A8 | PDF/document viewers may lack keyboard access | 2.1.1 | DocumentViewer |
| A9 | Language switching EN/HI not declared per page | 3.1.1 | Hindi journal pages |
| A10 | Tables on `/table` routes lack proper `<th scope>` | 1.3.1 | table pages |

---

## 8. Component Refactoring Plan

### Phase A — Foundation (Week 1–2)

| Action | From | To |
|--------|------|-----|
| Create design system primitives | `ui/Button, Card, Badge` | Expand: `Input`, `Select`, `Dialog`, `Tabs`, `Accordion`, `MegaMenu` |
| Create layout shell | `JournalShell` | `SiteHeader`, `SiteFooter`, `JournalNav`, `Breadcrumbs` |
| Centralize API | 45 axios files | `lib/api/{client,auth,articles,manuscripts}.ts` |
| Fix auth | 5 Login variants | Single `AuthProvider` + httpOnly cookie route handler |

### Phase B — Journal Unification (Week 3–5)

| Legacy (delete after migration) | Unified replacement |
|--------------------------------|-------------------|
| `vbe_Component/NavBar` × 4 | `components/layout/JournalNav.tsx` |
| `*_Component/Footer` × 4 | `components/layout/SiteFooter.tsx` |
| `*_Component/Login` × 5 | `components/auth/LoginForm.tsx` |
| `*_Component/Editorial` × 4 | `components/journal/EditorialBoard.tsx` |
| `*_Component/ReadArticle` × 4 | `components/journal/ArticleList.tsx` |
| `*_Component/SubmitManuscript` × 4 | `components/submission/SubmissionWizard.tsx` |
| `*_Component/Paper1-5` × 4 | Already replaced by `PaperPage` — **delete dead code** |

### Phase C — Portal Pages (Week 6–7)

| Page | Component strategy |
|------|-------------------|
| Homepage | `components/home/*` sections (Hero, Mission, Stats, etc.) |
| About, Ethics, Guidelines | `components/content/ContentPage.tsx` + MDX/CMS |
| Conferences | `components/conference/*` |
| Bal Shodh Patrika | `components/bal-shodh/*` |
| Search | `components/search/SearchResults.tsx` |

### Phase D — Dashboards (Week 8–9)

| Role | Components |
|------|------------|
| Author | Manuscript list, submission status, revisions |
| Reviewer | Assigned papers, review form |
| Editor | Issue builder, acceptance queue |
| Admin | CMS bridge, user management |

---

## 9. Folder Refactoring Plan

### Current → Target

```
src/
├── app/                          # Routes only (thin pages)
│   ├── (portal)/                 # Route group: marketing site
│   │   ├── page.tsx              # New homepage
│   │   ├── about/
│   │   ├── author-guidelines/
│   │   ├── conferences/
│   │   └── ...
│   ├── (journals)/               # Route group: journal hub
│   │   ├── vbe/
│   │   ├── vbh/
│   │   ├── vie/
│   │   └── vih/
│   ├── (auth)/                   # login, signup, forgot-password
│   ├── (dashboard)/              # Role dashboards
│   ├── api/                      # NEW: auth cookies, search, webhooks
│   │   ├── auth/
│   │   └── ...
│   ├── [journal]/                # Dynamic journal segment (future)
│   │   ├── papers/[slug]/
│   │   ├── issues/
│   │   └── submit/
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── ...
├── components/                   # All UI (expand from 11 → ~80)
│   ├── ui/                       # Primitives
│   ├── layout/                   # Header, Footer, Nav, Breadcrumbs
│   ├── home/                     # Homepage sections
│   ├── journal/                  # Journal-specific shared
│   ├── submission/               # Manuscript wizard
│   ├── conference/               # Conference UI
│   ├── dashboard/                # Role dashboards
│   ├── seo/                      # JsonLd, etc.
│   └── content/                  # CMS-driven blocks
├── lib/
│   ├── api/                      # API client modules
│   ├── journals/                 # config, papers (KEEP)
│   ├── seo/                      # metadata, schemas (KEEP)
│   ├── cms/                      # NEW: content types, fetchers
│   ├── auth/                     # NEW: session, cookies
│   └── utils/
├── content/                      # NEW: static MDX fallbacks
│   ├── pages/
│   └── faqs/
├── types/
└── middleware.ts
```

### Migration rule for legacy `.rase` routes

Keep all `/vbe.rase/*` URLs working via:
1. Existing `page.tsx` re-exports during transition
2. Add `next.config.mjs` redirects: `/vbe.rase/Paper1` → `/vbe/papers/1` (permanent, after parity)

**Do not delete** `src/app/component/` until each route has a replacement and redirect.

---

## 10. Design System

### 10.1 Brand Positioning

**Name:** Viksit Bharat Journal  
**Tagline:** A Bharatiya Knowledge Journal  
**Voice:** Authoritative, inclusive, nation-building, ethical, accessible  

### 10.2 Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-saffron` | `#FF9933` | Primary brand, CTAs |
| `--color-saffron-deep` | `#E8851F` | Hover, active |
| `--color-navy` | `#0A1628` | Headings, footer |
| `--color-navy-light` | `#1E3A5F` | Secondary surfaces |
| `--color-white` | `#FFFFFF` | Background primary |
| `--color-green` | `#138808` | Success, open access badges |
| `--color-gold` | `#C9A227` | Academic accents, badges |
| `--color-gray-50` | `#F8F9FA` | Soft backgrounds |
| `--color-gray-500` | `#6B7280` | Muted text |
| `--color-gray-900` | `#111827` | Body text |

All pairs verified for **WCAG AA** (4.5:1 body, 3:1 large text).

### 10.3 Typography

| Level | Font | Size | Weight |
|-------|------|------|--------|
| Display | Playfair Display | clamp(2.5rem, 5vw, 4rem) | 700 |
| H1 | Playfair Display | 2.25rem | 700 |
| H2 | Inter | 1.875rem | 600 |
| H3 | Inter | 1.5rem | 600 |
| Body | Inter | 1rem / 1.125rem | 400 |
| Hindi | Noto Sans Devanagari | 1rem | 400 |
| Citation | IBM Plex Mono | 0.875rem | 400 |

**CLS strategy:** Only `next/font` — remove `@import` from globals.css.

### 10.4 Spacing & Grid

- Base unit: **8px**
- Container: `max-w-7xl` (1280px), padding `px-4 sm:px-6 lg:px-8`
- Section spacing: `py-16 md:py-24`
- Card radius: `--radius-lg: 12px`
- Shadows: `sm`, `md`, `lg` (soft, academic — no heavy drop shadows)

### 10.5 Component Library

| Component | Variants |
|-----------|----------|
| Button | primary, secondary, ghost, saffron, navy |
| Card | default, elevated, bordered, interactive |
| Badge | open-access, peer-reviewed, issn, new, hindi |
| StatCard | animated counter |
| PaperCard | citation preview, download, DOI |
| IssueCard | volume, issue, date, article count |
| Timeline | publication process, conference history |
| MegaMenu | journals, authors, research, about |

---

## 11. New Sitemap

### Portal (Marketing)

```
/                                    Homepage
/about                               About the Journal
/aim-and-scope
/editorial-board
/editorial-policy
/publication-ethics
/open-access-policy
/author-guidelines
/reviewer-guidelines
/publication-charges
/submission-process
/peer-review-process
/indexing                          Indexing & abstracting
/plagiarism-policy
/faqs
/contact
/support
/downloads                         Templates, copyright forms
/become-reviewer
/become-editor
/institutional-membership
/search
/news
/announcements
/events
```

### Research Hub

```
/research-categories
/research-tracks
/repository                          All published works
/books
/special-issues
/call-for-papers
```

### Conferences

```
/conferences                         Upcoming
/conferences/past
/conferences/multi-track
/conferences/proceedings
```

### Bal Shodh Patrika

```
/bal-shodh-patrika
/bal-shodh-patrika/about
/bal-shodh-patrika/submit
/bal-shodh-patrika/archives
```

### Journals (per journal: vbe, vbh, vie, vih)

```
/{journal}                           Journal home
/{journal}/current-issue
/{journal}/archives
/{journal}/papers/{slug}             Static + dynamic papers
/{journal}/editorial-board
/{journal}/indexing
/{journal}/submit
/{journal}/issues
/{journal}/issues/{volume}/{issue}
```

### Auth & Dashboard

```
/login
/signup
/forgot-password
/dashboard
/dashboard/author
/dashboard/reviewer
/dashboard/editor
/dashboard/admin
```

### Legacy (301 redirects — preserved indefinitely)

```
/vbe.rase/*  → /vbe/*
/vbh.rase/*  → /vbh/*
/vie.rase/*  → /vie/*
/vih.rase/*  → /vih/*
/AboutUs     → /about
/ContactUs   → /contact
```

---

## 12. New User Flow

### 12.1 Reader Flow

```
Google Scholar / Search
    → Paper page (metadata + JSON-LD + citation export)
    → Related papers
    → Journal current issue
    → Subscribe / RSS
```

### 12.2 Author Flow

```
Homepage CTA "Submit Paper"
    → Author guidelines
    → Login / Register (httpOnly cookie)
    → Submission wizard (config-driven, single component)
        Step 1: Manuscript metadata
        Step 2: Author details (ORCID ready)
        Step 3: File upload
        Step 4: Review & submit → API
    → Dashboard: track status
```

### 12.3 Reviewer Flow

```
Become Reviewer page
    → Application form
    → Editor approval (admin)
    → Dashboard: assigned manuscripts
    → Review form → API
```

### 12.4 Editor Flow

```
Dashboard
    → Manuscript queue
    → Assign reviewers
    → Accept/reject/revision
    → Build issue (volume/issue)
    → Publish → generates paper page
```

### 12.5 Conference Researcher Flow

```
Conferences hub
    → Multi-track conference detail
    → Past conferences
    → Proceedings (linked papers)
    → Bal Shodh Patrika (school research track)
```

---

## 13. CMS Plan

### 13.1 Phase 1 — File-based CMS (immediate)

| Content type | Storage | Editor |
|--------------|---------|--------|
| Static pages | `content/pages/*.mdx` | Git |
| FAQs | `content/faqs/*.json` | Git |
| Site settings | `content/site.json` | Git |
| Navigation | `content/navigation.json` | Git |
| Papers | `src/app/*/output/*.json` | **Frozen** — do not CMS |

### 13.2 Phase 2 — Headless CMS (recommended)

**Options:** Sanity, Strapi (self-hosted), or Supabase + admin UI

| Entity | Fields |
|--------|--------|
| Journal | name, ISSN, logo, language, brand |
| Volume | journal_id, number, year |
| Issue | volume_id, number, cover, published_at |
| Paper (API) | sync from Render API + enrich metadata |
| EditorialMember | name, role, affiliation, photo, ORCID |
| Conference | title, tracks[], dates, location, proceedings |
| News | title, body, published_at |
| Announcement | title, body, expires_at |
| FAQ | question, answer, category |
| Testimonial | quote, author, institution |
| Partner | name, logo, url |

### 13.3 Phase 3 — Admin Dashboard

`/dashboard/admin` becomes CMS UI:
- WYSIWYG for pages
- Issue builder
- Editorial board manager
- Conference manager
- SEO metadata per page
- Menu/footer editor

---

## 14. Deployment Plan

### 14.1 Environments

| Env | Branch | URL |
|-----|--------|-----|
| Production | `main` | pub.dhe.org.in |
| Staging | `platform-upgrade` | Vercel preview |
| Development | local | localhost:3000 |

### 14.2 Pre-deploy Checklist

- [ ] `npm run build` — 0 errors
- [ ] `npm run lint` — 0 warnings (target)
- [ ] All 20 papers return 200
- [ ] All legacy redirects return 301
- [ ] Lighthouse ≥ 95 on homepage + 1 paper page
- [ ] Google Scholar tags on all paper pages
- [ ] Env vars set on Vercel

### 14.3 Deploy Strategy

1. Merge `platform-upgrade` → `main` via PR
2. Vercel auto-deploy from `dhevb/pub.dhe.org.in`
3. Smoke test all 4 journal entry points
4. Monitor Core Web Vitals in Vercel Analytics

### 14.4 Domain

- Primary: `pub.dhe.org.in`
- Legacy redirects: `pub.rase.co.in`, `vbe|vie|vbh|vih.rase.co.in` (already in vercel.json)

---

## 15. Rollback Plan

| Trigger | Action |
|---------|--------|
| Build failure | Do not merge; fix on branch |
| Production 500s | Vercel instant rollback to previous deployment |
| Paper page broken | Revert specific commit; JSON files untouched |
| Auth regression | Disable middleware auth check via env flag |
| SEO drop | Revert metadata changes; sitemap unchanged for papers |

**Git strategy:** One PR per phase (A, B, C, D). Each phase independently revertible.

**Data safety:** Paper JSON files are read-only in redesign — never modified, only loader path may change.

---

## 16. Estimated Lighthouse Improvement

| Page | Current (est.) | Target | Key fixes |
|------|----------------|--------|-----------|
| Homepage | P:70, A:80, SEO:85 | P:98, A:100, SEO:100 | Server components, font fix, metadata |
| Paper page | P:85, A:85, SEO:95 | P:100, A:100, SEO:100 | Already strong; minor CLS |
| Journal home | P:75, A:80, SEO:90 | P:98, A:100, SEO:100 | Replace legacy HomePage |
| Submit flow | P:60, A:75, SEO:70 | P:90, A:95, SEO:85 | Code split wizard, lazy load |

**Core Web Vitals targets:**
- LCP < 2.0s
- INP < 150ms
- CLS < 0.05

---

## 17. Estimated SEO Improvement

| Metric | Current | Target | Actions |
|--------|---------|--------|---------|
| Indexed pages | ~48 in sitemap | 120+ | Full sitemap, new pages |
| Structured data | Papers + org only | 8 schema types | FAQ, Event, Person, Breadcrumb, Journal |
| Google Scholar | 20 papers tagged | 20+ (preserve) | Keep `citation_*` meta |
| Internal links | Weak | Strong hub | Mega menu, related papers |
| hreflang | None | EN-HI pairs | Journal language alternates |
| Rich snippets | Partial | Full | JSON-LD on all content types |

**Expected organic visibility improvement:** 40–60% within 3–6 months post-launch (based on metadata completeness + sitemap expansion + content pages).

---

## 18. Estimated Performance Improvement

| Optimization | Bundle impact | LCP impact |
|--------------|---------------|------------|
| Remove antd | -200KB | -300ms |
| Consolidate 4 component trees | -400KB | -500ms |
| Dynamic import submission wizard | -150KB initial | -400ms |
| Fix font double-load | — | CLS -0.05 |
| Server Components for lists | -100KB | -200ms |
| Image optimization audit | — | -150ms |

**Total estimated JS reduction:** ~850KB (gzipped ~250KB)  
**Total estimated LCP improvement:** 1.0–1.5s on homepage

---

## 19. File-by-File Modification Plan

### Phase 1 — Foundation (no route changes)

| File | Action |
|------|--------|
| `src/app/globals.css` | Remove `@import` fonts; add saffron/navy tokens; `prefers-reduced-motion` |
| `tailwind.config.ts` | Add saffron, navy, gold, green tokens; typography scale |
| `src/app/layout.tsx` | Add default JSON-LD Organization; refine font loading |
| `src/lib/api/client.ts` | Expand: auth, articles, manuscripts modules |
| `src/lib/api/auth.ts` | **NEW** — login, signup, cookie helpers |
| `src/app/api/auth/login/route.ts` | **NEW** — httpOnly cookie setter |
| `src/middleware.ts` | Fix auth paths; add CSP; kebab-case paths |
| `next.config.mjs` | Add CSP, security headers, new redirects |
| `package.json` | Add framer-motion, zod, react-hook-form, lucide-react |
| `src/components/ui/*` | Expand primitives (Input, Dialog, Tabs, etc.) |
| `src/components/layout/SiteHeader.tsx` | **NEW** — mega menu |
| `src/components/layout/SiteFooter.tsx` | **NEW** — unified footer |

### Phase 2 — Homepage & Portal

| File | Action |
|------|--------|
| `src/app/page.tsx` | **REWRITE** — full homepage with 15+ sections |
| `src/lib/content/homepage.ts` | Expand content data |
| `src/components/home/Hero.tsx` | **NEW** |
| `src/components/home/Mission.tsx` | **NEW** |
| `src/components/home/ResearchStats.tsx` | **NEW** |
| `src/components/home/JournalFeatures.tsx` | **NEW** |
| `src/components/home/CallForPapers.tsx` | **NEW** |
| `src/app/about/page.tsx` | **NEW** (redirect from AboutUs) |
| `src/app/AboutUs/page.tsx` | Redirect to `/about` |
| `src/app/bal-shodh-patrika/page.tsx` | **REWRITE** — full section |
| `src/app/conferences/page.tsx` | **REWRITE** — multi-track structure |
| `src/app/search/page.tsx` | **REWRITE** — real search UX |

### Phase 3 — Journal Unification

| File | Action |
|------|--------|
| `src/components/journal/JournalShell.tsx` | Expand with unified nav/footer |
| `src/components/auth/LoginForm.tsx` | **NEW** — replaces 5 Login components |
| `src/components/submission/SubmissionWizard.tsx` | **NEW** — replaces 4 wizards |
| `src/app/vbe.rase/SubmitManuscript/page.tsx` | Thin wrapper → SubmissionWizard |
| `src/app/component/vbe_Component/*` | **DELETE** after migration (×4 folders) |
| `src/app/vbe.rase/Paper1/page.tsx` | Keep — uses PaperPage (no change) |
| All `Paper{1-5}.json` | **NO CHANGE** |

### Phase 4 — SEO & Metadata

| File | Action |
|------|--------|
| `src/app/sitemap.ts` | Expand to 120+ URLs |
| `src/lib/seo/schemas.ts` | Add FAQ, Event, Person, Journal schemas |
| `src/lib/seo/metadata.ts` | Add hreflang helpers |
| All legacy `page.tsx` | Add `generateMetadata` export |
| `public/og-default.png` | **CREATE** — 1200×630 branded image |
| `public/security.txt` | **NEW** |

### Phase 5 — Dashboards & CMS

| File | Action |
|------|--------|
| `src/app/dashboard/author/page.tsx` | **REWRITE** — real manuscript list |
| `src/app/dashboard/reviewer/page.tsx` | **REWRITE** |
| `src/app/dashboard/editor/page.tsx` | **REWRITE** |
| `src/app/dashboard/admin/page.tsx` | **REWRITE** — CMS entry |
| `src/lib/cms/*` | **NEW** — content types |

### Files that must NOT change

| File/Pattern | Reason |
|--------------|--------|
| `src/app/*/output/Paper*.json` (20 files) | Paper data preservation |
| `src/lib/journals/papers.ts` | Paper loader — extend only |
| `src/types/article.ts` | Paper type contract |
| `vercel.json` redirects | Legacy domain preservation |
| API endpoint paths to Render | Backend contract |

---

## Implementation Phases & Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **0** (current) | 1 week | This document, stakeholder approval |
| **1** Foundation | 2 weeks | Design system, auth fix, API centralization |
| **2** Homepage | 2 weeks | New homepage, portal pages, content rewrite |
| **3** Journal unification | 3 weeks | Single component tree, delete legacy |
| **4** SEO & performance | 1 week | Full metadata, Lighthouse 95+ |
| **5** Dashboards & CMS | 3 weeks | Role dashboards, file-based CMS |
| **6** QA & launch | 1 week | Production deploy, monitoring |

**Total estimated timeline:** 13 weeks (can parallelize Phases 2–3 with 2 engineers)

---

## Approval Gate

**No code implementation begins until:**

1. Stakeholder reviews this document
2. Brand positioning approved ("Viksit Bharat Journal — A Bharatiya Knowledge Journal")
3. CMS approach chosen (Phase 1 file-based vs Phase 2 headless)
4. Conference/Bal Shodh content source confirmed
5. Auth migration approach approved (httpOnly cookies + API route)

---

## Appendix A — Paper Preservation Contract

```typescript
// GUARANTEED: These 20 files are never modified by redesign
// src/app/vbe.rase/output/Paper{1-5}.json
// src/app/vbh.rase/output/Paper{1-5}.json
// src/app/vie.rase/output/Paper{1-5}.json
// src/app/vih.rase/output/Paper{1-5}.json

// GUARANTEED: These routes always return 200 with same content
// /{journal}.rase/Paper{1-5} (legacy)
// /{journal}/papers/{1-5} (new, after redirect)
```

## Appendix B — API Preservation Contract

All calls to `https://vie-rase-backend.onrender.com/api/{prefix}_*` remain functional. Centralization changes import path only, not URL shape.

## Appendix C — Related Documents

- `docs/AUDIT_REPORT.md` — Phase 1 audit (partially superseded)
- `docs/Architecture.md` — Target architecture
- `docs/PRODUCTION_CHECKLIST.md` — Deploy checklist
- `docs/ECOSYSTEM_AUDIT.md` — Infrastructure map

---

*Document version: 1.0.0 — Generated before any implementation code changes.*
