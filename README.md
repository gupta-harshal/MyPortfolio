# Harshal Gupta — Portfolio

Tech-first portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Dark literary aesthetic, film grain, warm amber accents — with an interactive 3D electric/acoustic guitar.

## Features

- Hero, About + tech stack, Experience & wins, Projects, Beyond (guitar / books / languages / 3D), Contact
- Socials: GitHub, LinkedIn, Twitter/X, Instagram, LeetCode, Codeforces, CodeChef, Medium, Substack
- Persistent social rail (top vertical rail on desktop, top bar on mobile) — always visible, never only at the bottom
- Project cards: **GitHub** when set; **Live** only when set
- Interactive guitar: layered pseudo-3D, strum with mouse/touch, keyboard `1–6` to play, `Space` to strum, electric ↔ acoustic
- Real contact email via **Nodemailer / SMTP** (with a graceful `mailto` fallback)
- All content in **`lib/data.ts`**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

Open **`lib/data.ts`**:

- `profile` (name, role, email, cgpa), `socials` (incl. `codolio`)
- `techStack`, `experience`, `achievements`
- `projects` — paste `github` and optional `live` URLs
- `passions`, `marqueeWords`

## Contact email (Nodemailer / SMTP)

The contact form posts to `app/api/contact/route.ts`, which emails you via SMTP.

1. Copy `.env.example` → `.env.local` and fill in your SMTP details.
2. **Gmail:** enable 2-Step Verification, then create an **App Password**
   (Google Account → Security → App passwords) and use it as `SMTP_PASS`.
   Messages are delivered to `CONTACT_TO` (default `guptharshal.hg@gmail.com`).
3. Restart `npm run dev`.

If the SMTP vars are missing, the form automatically falls back to opening the
visitor's email client — so it never breaks.

## Deploy on Vercel

1. Push to GitHub → import on [vercel.com](https://vercel.com).
2. Add the same variables from `.env.example` under
   **Project → Settings → Environment Variables**.
3. Deploy (Next.js + the API route are auto-detected). The API route runs as a
   serverless function — no separate backend to manage.
