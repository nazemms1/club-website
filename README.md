# Maison Commune

Maison Commune is a members' house of small clubs for readers, cooks, musicians, swimmers and late-night card players, with houses in Toronto, Montréal and Vancouver.

This repository is the web prototype of the Maison Commune site. It includes a public website, a member workspace and a staff console, built with Next.js.

> **Status:** front-end prototype. Sign-in, membership data and bookings are mocked in the browser. There is no backend or database yet.

## Features

- **Public site:** home page, clubs directory, events listing and event pages, membership tiers, services, about, and contact.
- **Membership:** a multi-step application flow and sign-up form.
- **Member workspace (`/dashboard`):** overview, profile editing, and membership and billing.
- **Staff console (`/admin`):** applications queue, member table, events manager and overview charts.
- **Sign-in:** `/login`, with separate member and staff access.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- Radix UI (dialog and tabs), Motion (animation), Recharts (charts) and Lucide (icons)
- React Hook Form and Zod for forms and validation
- Fraunces and Inter fonts through `next/font/google`

## Getting started

**Requirements:** Node.js 20.9 or newer, which Next.js 16 needs, and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create a production build            |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Demo accounts

Authentication is mocked for the prototype. These accounts work only in this app:

- **Staff:** `admin@admin.com` / `password`. Opens the staff console.
- **Member:** any valid email with a password of at least 8 characters. Opens a member account.

Session, RSVPs and joined clubs are saved in the browser's `localStorage` under the key `maison-commune:v1`.

## Project structure

```text
src/
├── app/
│   ├── (site)/          Public pages: home, clubs, events, membership, services, about, contact, login
│   ├── (workspace)/     Member dashboard (/dashboard) and staff console (/admin)
│   ├── layout.tsx       Root layout, fonts and metadata
│   └── globals.css      Global styles and theme tokens
├── components/          UI primitives, landing, site chrome, workspace, admin, membership and motion
├── data/                Mock content: clubs, events, members, membership tiers and analytics
└── lib/                 Auth helpers, membership logic, shared types and utilities
public/                  Static assets
```

## Before going to production

- Replace the mock sign-in in `src/lib/auth.ts` with server-side authentication that checks hashed passwords.
- Replace the mock data in `src/data/` with a real API or database.
- Set real contact details in `src/data/content.ts`. The current values are placeholders.

## Deployment

The app can be deployed to [Vercel](https://vercel.com) or any Node.js host that supports Next.js:

```bash
npm run build
npm run start
```

## Contributing

This project uses Next.js 16, which has breaking changes from earlier versions. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework code. See [AGENTS.md](AGENTS.md) for details.
