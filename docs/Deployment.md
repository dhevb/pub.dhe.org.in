# Deployment Guide

## Vercel Deployment

1. Connect GitHub repository to Vercel
2. Set environment variables:

```
NEXT_PUBLIC_SITE_URL=https://pub.rase.co.in
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

3. Deploy — Vercel auto-detects Next.js

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
