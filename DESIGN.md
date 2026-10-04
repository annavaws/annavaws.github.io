# Design System — Annava Wisha Sikoko Portfolio

## Product Context
- **What this is:** Personal portfolio for a full stack engineer working on commerce platforms, payments and automation.
- **Who it's for:** Recruiters, engineering leads and clients evaluating remote engineers.
- **Space/industry:** Developer portfolios. Work history centres on travel eSIM commerce.
- **Project type:** Single-page marketing site with a separate blog page. Static export to GitHub Pages.
- **Memorable thing:** "She ships real production systems, and the site itself proves she can build."

## Aesthetic Direction
- **Direction:** Orbital Mission Control (retro-futuristic, restrained).
- **Decoration level:** Expressive in the hero and game, intentional everywhere else.
- **Mood:** A calm control room at night. Deep space ink, one warm signal colour, telemetry labels. Serious engineering with a playful rocket.
- **Motifs:** Dotted globe with delivery routes (eSIM across countries), orbit rings, telemetry readouts, mission log.

## Typography
- **Display/Hero:** Big Shoulders Display (700–900), uppercase, tight leading. Industrial signage feel.
- **Body:** Instrument Sans (400–600).
- **UI/Labels/Data:** JetBrains Mono (400–500), uppercase with 0.14em tracking for labels, tabular numbers for stats.
- **Loading:** `next/font/google`, exposed as CSS variables `--font-display`, `--font-body`, `--font-mono`.
- **Scale:** label 12 / body 16 / lead 20 / h3 24 / h2 clamp(40, 6vw, 72) / hero clamp(56, 11vw, 152). Uppercase display type never goes below line-height 1.0.

## Color
- **Approach:** Restrained. One accent, one signal colour, cool neutrals.
- **Background:** ink `#070B14`
- **Surface:** `#0E1524`, raised `#151E31`, line `#223049`
- **Text:** `#E8ECF4`, muted `#8A96AD`
- **Accent (signal orange):** `#FF7A1A` for CTAs, active states, key numbers.
- **Signal (phosphor cyan):** `#5CE1E6` for telemetry labels, links, 3D wireframes. Never for CTAs.
- **Semantic:** success `#4ADE80`, error `#FF4D5E`.
- **Rules:** No purple. No gradient buttons. No blurred glows. Accent stays under about 5% of any screen: buttons and small details, never headline fills.
- **Tokens:** All colours live as CSS variables in `src/styles/globals.css`. Canvas and WebGL code read them through `src/utils/tokens.ts`. No hard-coded colour values elsewhere.

## Spacing
- **Base unit:** 4px. **Density:** spacious.
- **Section padding:** 96px mobile, 144px desktop. **Max content width:** 1200px.

## Layout
- **Approach:** Creative-editorial. Left-aligned headings without eyebrow labels, asymmetric grids, section padding varies by section.
- **Border radius:** sm 6px, md 12px, lg 20px, pill 9999px. Panels use md with a 1px line border.

## Motion
- **Approach:** Expressive, scroll-driven.
- **3D:** WebGL hero (three.js via react-three-fiber), lazy-loaded, paused off-screen. Pointer-tilt cards and a draggable skill sphere use CSS 3D.
- **Easing:** enter `cubic-bezier(0.16, 1, 0.3, 1)`, springs for pointer-driven motion.
- **Duration:** micro 100ms, short 200ms, medium 400ms, reveal 700ms.
- **Accessibility:** `prefers-reduced-motion` disables WebGL animation, tilt and reveals. The game only runs when started by the user.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-04 | Initial design system: Orbital Mission Control | Chosen via /design-consultation. Ties travel eSIM work, 3D and the rocket game into one story. |
| 2026-10-04 | Real WebGL with fallback | User wants heavy 3D. Static fallback covers reduced motion and missing WebGL. |
| 2026-10-04 | One-page scroll + Blog | Scroll-driven story. /about and /project redirect to anchors. |
| 2026-10-04 | Rocket Courier game section | Collect stack tokens, dodge 502s and race conditions from the CV. |
| 2026-10-04 | Hallmark audit fixes | Removed eyebrows, glows and accent headline fills; hero fits the fold; globe is draggable; colours moved to tokens; stats limited to figures verified in git. |
