# Deployment Guide

## Vercel Deployment

1. Connect GitHub repository to Vercel
2. Set environment variables:

```
NEXT_PUBLIC_SITE_URL=https://pub.dhe.org.in
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

3. Add custom domain **pub.dhe.org.in** in Vercel → Settings → Domains
4. Deploy — production URL should be `https://pub.dhe.org.in`

## Aligning GitHub & Vercel names (optional)

The live site uses **pub.dhe.org.in**. GitHub repo: [dhevb/pub.dhe.org.in](https://github.com/dhevb/pub.dhe.org.in)

To rename for consistency:

| Platform | Steps |
|----------|--------|
| **GitHub** | Repo → Settings → General → Repository name → `pub.dhe.org.in` |
| **Vercel** | Project → Settings → General → Project Name → `pub.dhe.org.in` |

After rename, update the Git remote URL locally:

```bash
git remote set-url origin https://github.com/dhevb/pub.dhe.org.in.git
```

## Legacy domain redirects

Standalone redirect projects in `scripts/legacy-redirects/` handle old domains:

| Old domain | Redirect target |
|------------|-----------------|
| pub.rase.co.in | https://pub.dhe.org.in |
| vbe.rase.co.in | https://pub.dhe.org.in/vbe (+ `/vbe.rase/*` paths) |
| vie.rase.co.in | https://pub.dhe.org.in/vie (+ `/vie.rase/*` paths) |
| vbh.rase.co.in | https://pub.dhe.org.in/vbh (+ `/vbh.rase/*` paths) |
| vih.rase.co.in | https://pub.dhe.org.in/vih (+ `/vih.rase/*` paths) |

Deploy a redirect project:

```bash
cd scripts/legacy-redirects/vbe-rase-co-in
vercel link --yes --project vbe.rase.co.in --scope dhe-projects
vercel --prod --yes --scope dhe-projects
```

The main `vercel.json` also includes host-based redirects when old domains are added to the primary project.

## Build Verification

```bash
npm run build
npm run start
```

## Post-Deployment Checklist

- [ ] All 98 routes accessible
- [ ] All 20 papers load correctly
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` accessible
- [ ] `/feed.xml` RSS feed works
- [ ] `/manifest.webmanifest` loads
- [ ] Login/signup connects to backend API
- [ ] Mobile responsive on all pages
- [ ] No console errors on homepage

## GitHub Actions (Recommended)

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```
