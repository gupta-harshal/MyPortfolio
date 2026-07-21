# Harshal Gupta — Portfolio

Tech-first portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Dark literary aesthetic, film grain, warm amber accents — with an interactive 3D electric/acoustic guitar.

## Features

- Hero, About + tech stack, Experience & wins, Projects, Beyond (guitar / books / languages / 3D), Contact
- Socials: GitHub, LinkedIn, Twitter/X, Instagram, LeetCode, Codeforces, CodeChef, Medium, Substack
- Project cards: **GitHub** when set; **Live** only when set
- Interactive guitar: mouse-tilt, string pluck, electric ↔ acoustic toggle
- Contact form with Formspree or mailto fallback
- All content in **`lib/data.ts`**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

Open **`lib/data.ts`**:

- `profile`, `socials`, `techStack`, `experience`, `achievements`
- `projects` — paste `github` and optional `live` URLs
- `passions`, `marqueeWords`

## Deploy on Vercel

Push to GitHub → import on [vercel.com](https://vercel.com) → Deploy (Next.js auto-detected). No backend required.
