# Harshal Gupta — Portfolio

An artistic, frontend-only portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Dark, literary aesthetic that blends the engineer and the artist — with film grain, a poet's-notebook texture, warm amber/rose palette, and smooth scroll animations.

## ✨ Features

- Fully responsive, animated single-page design
- Sections: Hero, About, Experience & Achievements, Projects, Craft (music/poetry/reading), Contact
- All social links: GitHub, LinkedIn, Twitter/X, LeetCode, Codeforces, CodeChef, Medium, Substack
- Working contact form (Formspree, with a zero-config `mailto` fallback)
- **All content lives in one file** so it's trivial to edit → `lib/data.ts`

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## ✏️ How to edit your content

Open **`lib/data.ts`** — everything is there:

- `profile` — name, role, tagline, email, CGPA, bio
- `socials` — paste your profile URLs (set any to `""` to hide it)
- `projects` — add/edit projects; fill in `github` / `live` links whenever ready (empty = button hidden)
- `experience`, `achievements`, `stats`, `passions`, `marqueeWords`

No component editing needed for normal updates.

### Enable the contact form (optional)

1. Create a free form at [formspree.io](https://formspree.io)
2. In `components/Contact.tsx`, set `FORMSPREE_ENDPOINT` to your endpoint.

Until then, the form opens the visitor's email client addressed to you — so it works with zero setup.

## ☁️ Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework is auto-detected as **Next.js** — just click **Deploy**.

No environment variables or backend required.

## 🛠 Tech

- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS · Framer Motion · react-icons
- Google Fonts (Fraunces, Inter, JetBrains Mono) via `next/font`
