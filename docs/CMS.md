# CMS — Content Management System

File-based CMS for site-wide content. No admin UI — edit JSON files in `content/` and deploy.

---

## Overview

```
content/*.json  →  src/lib/cms/loader.ts  →  pages / dashboards / /api/cms
```

All reads are **synchronous** at build/request time via `fs.readFileSync`.

---

## Content Files

| File | Function | Used by |
|------|----------|---------|
| `content/site.json` | `getSiteSettings()` | Metadata, footer, health, JSON-LD, dashboards |
| `content/announcements.json` | `getAnnouncements()` | Admin dashboard, future banner |
| `content/news.json` | `getNewsItems()` | Admin dashboard |
| `content/faqs.json` | `getCmsFaqs()` | Homepage FAQ, `/api/cms` |
| `content/editorial-board.json` | `getEditorialBoard()` | Editorial board pages |
| `content/research-categories.json` | `getResearchCategories()` | Homepage, research nav |

---

## `site.json` Schema

```json
{
  "siteName": "Viksit Bharat Journal",
  "tagline": "A Bharatiya Knowledge Journal",
  "publisher": "Department of Holistic Education",
  "email": "pub.dhe4@gmail.com",
  "address": "AMCF-132, Arya Nagar, Ballabgarh, Faridabad, 121004, Haryana",
  "issn": "2278-1757",
  "doiPrefix": "",
  "orcidEnabled": true,
  "crossrefReady": true,
  "maintenanceMode": false,
  "announcementBanner": "",
  "socialLinks": {
    "website": "https://pub.dhe.org.in"
  }
}
```

| Field | Purpose |
|-------|---------|
| `issn` | Google Scholar `citation_issn`, JSON-LD |
| `doiPrefix` | Prefix for `buildArticleDoi()` — empty until Crossref deposit |
| `orcidEnabled` | Author dashboard ORCID status display |
| `crossrefReady` | Admin dashboard Crossref readiness flag |
| `maintenanceMode` | `/api/health` reports maintenance state |

---

## Announcements

`content/announcements.json`:

```json
{
  "announcements": [
    {
      "id": "unique-id",
      "title": "...",
      "body": "...",
      "publishedAt": "2026-01-01T00:00:00.000Z",
      "expiresAt": "2026-12-31T23:59:59.000Z"
    }
  ]
}
```

`getAnnouncements()` filters out expired items automatically.

---

## FAQs

`content/faqs.json`:

```json
{
  "items": [
    {
      "question": "...",
      "answer": "...",
      "category": "submission"
    }
  ]
}
```

Also exported as static `FAQS` in `src/lib/content/homepage.ts` for homepage `FAQSection` and `faqSchema()`.

---

## Editorial Board

`content/editorial-board.json`:

```json
{
  "members": [
    {
      "name": "...",
      "role": "Editor-in-Chief",
      "affiliation": "...",
      "email": "optional@edu.in"
    }
  ]
}
```

---

## Research Categories

`content/research-categories.json`:

```json
{
  "categories": [
    { "id": "education", "label": "Education", "labelHi": "शिक्षा" }
  ],
  "tracks": [
    { "id": "iks", "label": "Indian Knowledge Systems", "href": "/search?q=iks" }
  ]
}
```

---

## Static Content (Not CMS)

Hardcoded in `src/lib/content/` — requires code change to update:

| File | Contents |
|------|----------|
| `homepage.ts` | Mission pillars, stats, conferences, books, FAQS duplicate |
| `about.ts` | About page sections, aim & scope |
| `indexing.ts` | Indexing database list |
| `search-index.ts` | Paper search index builder |

---

## API Preview

`GET /api/cms` returns:

```json
{
  "site": { ... },
  "announcements": [ ... ],
  "news": [ ... ],
  "faqs": [ ... ]
}
```

Use for admin dashboard preview — no authentication required (read-only public CMS data).

---

## Editing Workflow

1. Edit JSON in `content/`
2. Validate JSON syntax locally
3. `npm run build` — fails if JSON invalid at read time
4. Commit and deploy
5. Verify via `/api/cms` or admin dashboard

**Do not** store secrets in CMS files.

---

## Backup

`src/lib/backup/export.ts`:

```typescript
exportCmsBackup(): BackupManifest  // lists content/*.json files
listPaperPaths(): string[]        // 20 paper JSON paths
```

For full disaster recovery, also backup `src/app/*/output/Paper*.json`.

---

## Related Docs

- [DATABASE.md](./DATABASE.md)
- [DASHBOARDS.md](./DASHBOARDS.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
