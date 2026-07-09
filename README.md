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

## Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://pub.dhe.org.in
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

## Deployment

Production deploys via **Vercel**. Merge `platform-upgrade` → `main` to launch.

- [docs/Deployment.md](docs/Deployment.md)
- [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md)
- [docs/LAUNCH_READINESS.md](docs/LAUNCH_READINESS.md)

## Repository

[github.com/dhevb/pub.dhe.org.in](https://github.com/dhevb/pub.dhe.org.in)
