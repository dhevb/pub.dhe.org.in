# Viksit Bharat Journal

**A Bharatiya Knowledge Journal** — indigenous academic publishing for the Department of Holistic Education.  
Live at **[pub.dhe.org.in](https://pub.dhe.org.in)**.

## Journals

| Code | Journal | Path |
|------|---------|------|
| VBE | Viksit Bharat Education | `/vbe` |
| VBH | Viksit Bharat Education (Hindi) | `/vbh` |
| VIE | Viksit Bharat Journal (English Legacy) | `/vie` |
| VIH | Viksit Bharat Journal (Hindi Legacy) | `/vih` |

Legacy routes (`/vbe.rase/*`, `/vbh.rase/*`, etc.) remain fully supported.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Backend API:** `https://vie-rase-backend.onrender.com`
- **CMS:** File-based JSON in `content/` (site settings, FAQs, announcements)
- **Design:** Bharatiya tokens (Saffron, Navy, Gold, Green)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## QA & Launch

```bash
npm run qa:papers    # Verify 20 paper JSON files
npm run build
npm run lint
npm run qa:smoke     # HTTP smoke test (requires running server)
```

See [docs/LAUNCH_READINESS.md](docs/LAUNCH_READINESS.md) for the full Phase 6 checklist.

## Developer Documentation

| Guide | Description |
|-------|-------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Folder structure, BFF pattern, middleware, auth flow |
| [docs/API_REFERENCE.md](docs/API_REFERENCE.md) | All `/api/*` routes and backend proxies |
| [docs/DATABASE.md](docs/DATABASE.md) | CMS JSON, paper files, backend data model |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel config, env vars, production checklist |
| [docs/SECURITY.md](docs/SECURITY.md) | CSRF, rate limiting, CSP, sanitization |
| [docs/SEO.md](docs/SEO.md) | Sitemap, JSON-LD, Scholar meta, RSS, OG images |
| [docs/CMS.md](docs/CMS.md) | `content/*.json` loader and site configuration |
| [docs/DASHBOARDS.md](docs/DASHBOARDS.md) | Author, editor, admin, reviewer dashboards |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Coding standards, QA commands, workflow |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Completed phases and future priorities |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Version history (Phases 1–9) |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common build, auth, API, and deploy issues |

**Phase reports:** [PERFORMANCE_AUDIT](docs/PERFORMANCE_AUDIT.md) · [PERFORMANCE_FINAL_REPORT](docs/PERFORMANCE_FINAL_REPORT.md) · [PHASE8_FINAL_REPORT](docs/PHASE8_FINAL_REPORT.md) · [PRODUCTION_CHECKLIST](docs/PRODUCTION_CHECKLIST.md)

## Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://pub.dhe.org.in
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

## Deployment

Production deploys via **Vercel**. Merge `platform-upgrade` → `main` to launch.

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md)
- [docs/LAUNCH_READINESS.md](docs/LAUNCH_READINESS.md)

## Repository

[github.com/dhevb/pub.dhe.org.in](https://github.com/dhevb/pub.dhe.org.in)
