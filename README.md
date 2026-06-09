# OpenAI — Reimagined

A visually rich, animated re-interpretation of the OpenAI homepage. Built with Next.js 14, Tailwind CSS, and Framer Motion. Designed to deploy to Vercel in one command.

> Not affiliated with OpenAI. Concept/design project.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

The fastest path:

```bash
npm i -g vercel
vercel            # link / create project (follow prompts)
vercel --prod     # production deploy
```

Alternatively, push this folder to a GitHub repo and import it at https://vercel.com/new — Vercel auto-detects Next.js.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** with custom gradient, glass, and grid utilities
- **Framer Motion** for scroll-driven and entry animations
- **lucide-react** for icons

## Sections

- Sticky glass nav with shimmer underlines
- Hero with aurora orb, animated particles, cycling prompt input
- Trusted-by marquee
- Bento-grid product showcase (ChatGPT, Sora, DALL·E, API)
- Research highlights
- Safety / mission with aurora background
- Gradient CTA card
- Footer
