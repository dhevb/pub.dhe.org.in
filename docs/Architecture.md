# Architecture

## Overview

The Viksit Bharat Education Journal Platform uses a **config-driven multi-journal architecture** to eliminate code duplication while preserving all 98 existing routes and 20 static papers.

## Directory Structure

```
src/
├── app/                    # Next.js App Router (all routes preserved)
│   ├── layout.tsx          # Root layout (fonts, SEO, providers)
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Crawler rules
│   ├── manifest.ts         # PWA manifest
│   ├── feed.xml/route.ts   # RSS feed
│   ├── bal-shodh-patrika/  # Student research section
│   ├── conferences/        # Multi-track conferences
│   ├── dashboard/          # Role-based dashboards
│   ├── search/             # Global search
│   ├── vbe/ → vbe.rase/    # Journal routes (×4)
│   └── component/          # Legacy components (wrappers)
├── components/
│   ├── ui/                 # Atomic design system
│   ├── journal/            # Shared journal components
│   ├── home/               # Homepage sections
│   └── seo/                # JSON-LD components
├── lib/
│   ├── journals/           # Journal config + paper loaders
│   ├── api/                # API client
│   ├── seo/                # Metadata + schema generators
│   └── content/            # Static content data
└── types/                  # TypeScript interfaces
```

## Journal Configuration

Each journal is defined in `src/lib/journals/config.ts`:

```typescript
{ id, name, routePrefix, apiPrefix, language, logo, paperCount }
```

Shared components receive journal config as props — no duplicated component trees.

## Paper Preservation

All 20 JSON papers remain at their original paths:
`src/app/{journal}.rase/output/Paper{1-5}.json`

Loaded via `loadPaper(journalId, paperNum)` with dynamic imports.

## Backward Compatibility

Every existing URL continues to work:
- `/vbe.rase/Paper1` → shared `PaperPage` component
- `/vbe` → premium `JournalHomepage`
- All auth, submission, editorial routes unchanged

## SEO Strategy

- Dynamic `generateMetadata()` per article
- JSON-LD: Organization, ScholarlyArticle, BreadcrumbList, FAQPage
- RSS feed at `/feed.xml`
- Google Scholar compatible meta tags (via article schema)

## Backend Integration

External API at `vie-rase-backend.onrender.com` handles:
- Authentication, article CRUD, manuscript workflow

Future: migrate to Next.js API routes + PostgreSQL.
