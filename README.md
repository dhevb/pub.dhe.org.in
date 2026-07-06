# Viksit Bharat Education Journal Platform

Indigenous academic publishing ecosystem for the Department of Higher Education — live at **[pub.dhe.org.in](https://pub.dhe.org.in)**.

## Journals

| Code | Journal | Path |
|------|---------|------|
| VBE | Viksit Bharat Education | `/vbe` |
| VBH | Viksit Bharat Hindi | `/vbh` |
| VIE | Viksit Bharat Innovation & Entrepreneurship | `/vie` |
| VIH | Viksit Bharat Humanities | `/vih` |

Legacy routes (`/vbe.rase/*`, `/vbh.rase/*`, etc.) remain fully supported.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Backend API:** `https://vie-rase-backend.onrender.com`
- **Design:** Bharatiya tokens (Saffron, Navy, Peacock Green), Playfair Display + Inter + Noto Sans Devanagari

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://pub.dhe.org.in
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

## Deployment

Production deploys via **Vercel** (team: `dhe-projects`). Default branch: `platform-upgrade`.

See [docs/Deployment.md](docs/Deployment.md) and [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md).

## Repository

[github.com/dhevb/pub.dhe.org.in](https://github.com/dhevb/pub.dhe.org.in)
