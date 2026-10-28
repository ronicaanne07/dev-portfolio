# Ronica Anne Matawaran | Developer Portfolio

A personal portfolio built with Next.js, React and TypeScript, featuring an interactive 3D background, scroll-triggered animations, and an AI assistant that answers visitors' questions about my work and guides them to the right section.

**Live site:** [add your link here]

## Features

- Interactive 3D background of animated shapes (React Three Fiber)
- Typed job-title animation in the hero
- Auto-scrolling project previews that start when they enter view
- AI assistant powered by the Groq API, answering from my resume data, with a keyword-based fallback
- Optional voice input and spoken replies using the browser's Web Speech API
- Responsive layout and reduced-motion support

## Tech stack

Next.js 15 (App Router), React 19, TypeScript, React Three Fiber and three.js, plain CSS, Groq API.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Create a `.env.local` file in the project root:

```
GROQ_API_KEY=your_key_here
GROQ_MODEL=openai/gpt-oss-20b
```

The AI assistant needs these. Without them, the site still works and falls back to pre-written answers. Never commit this file.

## Customising

All content (profile, skills, experience, projects and assistant answers) lives in `src/data/portfolio.ts`. Colours are CSS variables at the top of `src/app/globals.css`.

## Scripts

- `npm run dev` starts the dev server
- `npm run build` creates a production build
- `npm run start` serves the production build

## Contact

dronicaanne@gmail.com
