---
name: maison-design-system
description: Design tokens, type scale, layout, component and chart rules for the Maison Commune club website. Use whenever you create or change a page, component, dashboard, table or chart in this project, so the result matches the existing brand and stays consistent.
---

# Maison Commune design system

Apply these rules to every visual change in this project. If a one-off idea conflicts with a rule, keep the rule and adapt the idea.

## Colour
Tokens live in `src/app/globals.css`.

- `paper` #f4efe6: page background. `paper-deep` #ebe3d3: tinted bands.
- `ink` #1c1b18: headings and primary text. `ink-soft` #5a564e: secondary text.
- `forest` #1d3a2f: primary actions and dark panels. `forest-deep` #132820: hover states and the footer.
- `brass` #b08a4e: highlights and emphasis on dark surfaces. `clay` #b4573a: eyebrows, alerts and negative deltas.
- `mist` #d8cfbd: hairlines and borders.
- Cards: `bg-white/70`, `border-mist/80`, `shadow-sm`.

Do not add a new hue. Use opacity variants of these tokens instead.

## Typography
- Display serif (`font-display`, Fraunces): public page titles and section titles, workspace page titles, the wordmark, large quotes.
- Sans (`font-sans`, Inter): body text, UI labels, tables, workspace card titles (`text-base font-semibold`), stat values.
- Public H1: `PageHero` (`text-5xl md:text-7xl`). Public H2: `SectionHeading` (`text-4xl md:text-5xl`).
- Workspace H1: `PageTitle` (`text-3xl md:text-4xl`). Never set a custom H1 size inside a workspace page.
- Eyebrow: `Eyebrow` (xs, uppercase, wide tracking, clay).

## Shape and spacing
- Cards and panels: `rounded-3xl`. Inner tiles and thumbnails: `rounded-2xl`. Pills, buttons and segmented controls: `rounded-full`. Inputs: `rounded-xl`. The membership card alone keeps its physical radius.
- Container: `Container` (max 1280px, `px-6 md:px-10`).
- Public sections: `py-28 md:py-36`, or `py-20 md:py-28` for compact bands.
- Workspace: `gap-6` between cards, `p-6 md:p-7` inside a card.

## Components
- Buttons: `Button` or `buttonVariants` only. Variants: primary (forest), outline, ghost, inverse (on forest), brass (rare).
- Forms: `Field` with `inputClass` or `textareaClass`. Validate with zod and react-hook-form. Errors use `role="alert"`.
- Cards: `Card` and `CardHeader`. Use `ChartCard` for any chart.
- Tables: `tableWrapClass`, `tableClass`, `theadClass`, `thClass`, `tdClass`, `rowClass`. Right-align numbers and use `tabular-nums`.
- Status: `Pill` tones. Forest means good, brass means attention, clay means critical, muted is neutral. Always pair colour with text.
- KPIs: `StatTile`. Its delta says what changed and since when.
- Filters: `SegmentedControl` for periods and statuses. Put one filter row above the content it controls.

## Charts
Follow the dataviz skill's rules, and apply these brand choices:
- Magnitude over time: area chart in forest with a light gradient. Single series, so name it in the card title.
- Magnitude by category: horizontal bars in forest, 14px thick, rounded at the data end.
- Ordered categories such as tiers: the forest ordinal ramp `#8fb1a0`, `#3d6a57`, `#1d3a2f`. Validated with `--ordinal` on `#fdfcf9`.
- Emphasis: brass for the one series that matters on a dashboard.
- Never use a dual y-axis, and never generate a categorical palette. Gridlines are solid hairlines (`#ece6d9`).
- Every chart needs a hover tooltip and a table twin, which `ChartCard` provides through its Chart / Table toggle.
- Validate any new multi-hue palette with `scripts/validate_palette.js` from the dataviz skill before you use it.

## Motion
Use `motion/react` for entrances and hover lifts only. Keep durations between 300 and 800 ms, and respect reduced motion.

## Copy and formatting
- Money: CAD through `formatCurrency` (en-CA). Dates: `formatDate`, which formats in UTC. Times: `formatTime`.
- Relative dates use the mock "today" constant `TODAY` (2026-10-26). Never call `new Date()` in a server-rendered component, because prerendering breaks.
- Use sentence case for headings and button labels. Keep sentences short.

## Accessibility
- Keep the brass `:focus-visible` ring. Never remove outlines.
- Text colour: ink or ink-soft on paper or white only. On forest, use paper at 70% opacity.
- Icon-only buttons need an `aria-label`.

## Do not
- Use `bg-gradient-to-*`. Use `bg-linear-to-*`.
- Put a display serif on numbers in tables, axes or KPI values.
- Add a new page-title size or a new card radius.
- Ship a chart without a table view.
