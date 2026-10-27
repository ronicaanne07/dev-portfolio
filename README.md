# Developer Portfolio

A Next.js (App Router) + TypeScript portfolio with a React Three Fiber hero animation. The page structure follows the classic single-page developer portfolio pattern: fixed top nav, hero, numbered sections, tabbed experience, featured projects and a contact call to action. All code and content are original.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make it yours

Edit `src/data/portfolio.ts`. Your name, bio, skills, jobs, projects, links and resume path all live there.

- Set `profile.resumeUrl` (for example `/resume.pdf`, with the file in `public/`) to show a Resume button in the nav.
- Uncomment the GitHub and LinkedIn entries in `socials` once you have URLs.
- Mark a project `featured: true` to show it in the large alternating layout. Others appear in the grid.
- Replace the placeholder initials in `About.tsx` and `Projects.tsx` with real images via `next/image`.

## Structure

```
src/
  app/
    layout.tsx        Metadata and root layout
    page.tsx          Page composition
    globals.css       Theme variables and all styles
  components/
    Header.tsx        Fixed nav, hide-on-scroll, mobile menu
    SideRails.tsx     Vertical social and email rails (desktop)
    Hero.tsx          Intro text
    BackgroundCanvas.tsx  Fixed full-page layer; loads the 3D scene client-side only
    BackgroundScene.tsx   React Three Fiber scene (shapes scattered down the page)
    Assistant.tsx     Navigation prompt below the hero
    About.tsx, Experience.tsx, Projects.tsx, Contact.tsx, Footer.tsx
    Reveal.tsx        Fade-up on scroll
  data/
    portfolio.ts      Your content
```

## The 3D background

`BackgroundScene.tsx` fills a fixed canvas behind the whole page with simple 3D shapes. They are scattered from the top of the page to the bottom, rotate and float, drift at a slower speed than the content as you scroll (parallax), and lean slightly toward the pointer. It respects `prefers-reduced-motion` (the shapes stop turning and floating). See "Background shapes" below to change them.

## Navigation prompt

`Assistant.tsx` is the "Ask about Ronica's work" panel below the hero. The suggested questions and answers live in `assistant.intents` in `src/data/portfolio.ts`. Each intent has keywords (used to match typed questions), a pre-written answer, and a `target` section id (or `href`) for its button. It does not call an AI service; to use a real model, replace `match()` with a call to a Next.js Route Handler that talks to your LLM provider.

## Theming

The palette is defined at the top of `src/app/globals.css` (`--slate`, `--maroon`, `--pink`, `--teal`, `--forest`), and everything else derives from those. The 3D shape colors are passed to `makeMaterial` in `BackgroundScene.tsx`.

## Texture

- A film-grain overlay covers the page via `body::after` in `globals.css` (an inline SVG noise filter). Change `opacity` to make it stronger or softer, or delete the rule to remove it.
- The shapes use a small shader in `BackgroundScene.tsx` that speckles each pixel between a lit and a shaded color. Adjust the `0.6` noise strength in the fragment shader for a coarser or finer grain.

## Background shapes

At the top of `BackgroundScene.tsx`, the "Tweak these" block controls the layout:

- `ROW_GAP` is the vertical spacing between rows (smaller = more shapes).
- `SIZE_MIN` and `SIZE_MAX` set how big the shapes are.
- `SHAPES` and `KINDS` choose which shapes and colors (pink, teal, dark) appear.
- `PARALLAX` sets how fast shapes move while scrolling (1 = same speed as the page).

The layout is generated from a fixed random seed (`mulberry32(7)` in `buildItems`), so it looks the same every time. Change the seed for a different arrangement. The overall strength of the layer is the `.bg-canvas` opacity in `globals.css`.

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm run start` serve the production build
- `npm run lint` type-check
