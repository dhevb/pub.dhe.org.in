# Dashboards

Role-based dashboards at `/dashboard/*`. Protected by middleware — requires auth cookie.

---

## Routes

| URL | Component | Purpose |
|-----|-----------|---------|
| `/dashboard` | Hub page | Cards linking to role dashboards |
| `/dashboard/author` | `AuthorDashboardView` | Submissions, timeline, author tools |
| `/dashboard/editor` | `EditorDashboardView` | Editorial queue, workflow panel |
| `/dashboard/reviewer` | `ReviewerDashboardView` | Review assignments (placeholder) |
| `/dashboard/admin` | `AdminDashboardView` | CMS overview, analytics, architecture |

All pages use `DashboardShell` + `buildMetadata({ noIndex: true })`.

---

## Layout

```
DashboardShell
├── DashboardNav (role tabs)
└── {children} — role-specific view
```

**Files:**
- `src/components/dashboard/DashboardShell.tsx`
- `src/components/dashboard/DashboardNav.tsx`

---

## Author Dashboard

**File:** `src/components/dashboard/AuthorDashboard.tsx`

### Sections

1. **Your submissions** — `ManuscriptList` fetches `GET /api/manuscripts` using `userId` cookie
2. **Submit to a journal** — `AuthorQuickLinks` links to `/{journal}.rase/SubmitManuscript`
3. **Author experience** — `AuthorExperiencePanel`:
   - `SubmissionTimeline` — visual workflow steps
   - ORCID / DOI status from `getSiteSettings()`
   - Revision requests, certificates, bookmarks (architecture placeholders)

### Data source

```typescript
// ManuscriptList.tsx — client component
fetch("/api/manuscripts", { credentials: "same-origin" })
// Requires userId cookie set at login
```

---

## Editor Dashboard

**File:** `src/components/dashboard/EditorDashboard.tsx`

### Sections

1. **EditorExperiencePanel** — queue stats (pending, under review, published)
2. **EditorialWorkflowPanel** — review queue table, decision types, status timeline
3. **Journal editorial tools** — links to `/{journal}.rase/AddArticle`, `/issues`, `/table`

### Editorial workflow module

`src/lib/editorial/workflow.ts`:

| Type | Values |
|------|--------|
| `ManuscriptStatus` | submitted → screening → under_review → revision_requested → accepted → scheduled → published |
| `EditorialDecision` | accept, reject, minor_revision, major_revision |
| `canTransition(from, to)` | State machine validation |

**Note:** Live reviewer assignment requires backend editorial API — UI is architecture-ready.

---

## Reviewer Dashboard

**File:** `src/components/dashboard/ReviewerDashboard.tsx`

Placeholder for peer review assignments. Links to legacy manuscript views.

---

## Admin Dashboard

**File:** `src/components/dashboard/AdminDashboard.tsx`

### Sections

1. **File-based CMS** — links to `content/` files, `/api/cms` preview
2. **CMS stats** — counts from `getAnnouncements()`, `getNewsItems()`, etc.
3. **Indexing & AI architecture** — `IDENTIFIER_PROVIDERS`, `AI_MODULES` registries
4. **Analytics** — `getActiveProviders()` from env-configured analytics
5. **Publication analytics** — `AnalyticsDashboard` with `getDashboardMetrics()`
6. **Active announcements** — rendered from CMS
7. **Platform settings** — ISSN, ORCID, Crossref flags from `site.json`

---

## Analytics Dashboard

**File:** `src/components/dashboard/AnalyticsDashboard.tsx`

| Metric | Source |
|--------|--------|
| Published papers | `PAPER_PATHS.length` (20) |
| Views, downloads, acceptance rate | Placeholder `—` until analytics backend |

---

## Authentication Requirement

Middleware (`src/middleware.ts`):

```typescript
PROTECTED_PREFIXES = ["/profile", "/dashboard"]
```

Unauthenticated access → redirect to `/login?redirect=/dashboard/...`

Login via `LoginForm` → `loginViaAppRoute()` → sets cookies → redirect to `?redirect` param.

---

## Adding a New Dashboard Panel

1. Create component in `src/components/dashboard/`
2. Import into role view (e.g. `AuthorDashboard.tsx`)
3. Use server components where possible; client only for interactivity
4. Set `noIndex: true` in page metadata (already on all dashboard pages)

---

## Related Docs

- [API_REFERENCE.md](./API_REFERENCE.md) — `/api/manuscripts`
- [CMS.md](./CMS.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
