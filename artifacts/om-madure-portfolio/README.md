# Portfolio_fullstack

Om Madure's interactive frontend developer portfolio, built with Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, React Router, and optional lazy-loaded Three.js scenes.

## Setup

Use Node.js 20+ and pnpm from the monorepo root (the manifest uses workspace catalog versions):

```sh
pnpm install
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/om-madure-portfolio dev
pnpm --filter @workspace/om-madure-portfolio typecheck
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/om-madure-portfolio build
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/om-madure-portfolio serve
```

The repository packages use the workspace's catalog declarations where available. The contact form currently prepares a mailto message; no backend is required. The prebuild hook regenerates `public/sitemap.xml` from project slugs in `src/data/projects.ts`; set `SITE_URL` to the deployed canonical host.

## Customizing content

All personal copy, links, and project details are under `src/data/`.
- Edit `profile.ts` for name, title, summary, social/source links, resume path, and stats.
- Edit `skills.ts`, `experience.ts`, `education.ts`, and `certifications.ts` to change those sections.
- Add or edit a project by adding one typed object to `projects.ts`. Cards, tech filters, detail routes, command palette items, and sitemap project URLs derive from this array. Keep project screenshots in `images`; empty arrays intentionally show the shared placeholder.
- Project source links are intentionally absent. Add `links.github` only when a repository URL is supplied.
- To add DevFlow's live URL later, set its `links.live` value in its single project object; the shared deployment component will replace the coming-soon badge automatically.
- Change the accent colors and signature gradient in `src/config/theme.ts`; CSS theme tokens live in `src/index.css`.
- Toggle optional effects in `src/config/features.ts`. Performance mode and reduced-motion preferences disable heavy effects at runtime.

Replace `public/resume.pdf`, currently a tiny placeholder, with the real resume before deployment.

## Performance and accessibility

3D scenes are loaded through React lazy boundaries and the separate `three-vendor` build chunk. Hardware/data/reduced-motion checks retain a stable static fallback. The experience supports keyboard navigation, skip link, theme persistence, semantic landmarks, contrast-focused tokens, and responsive layouts.

## Project map

`src/data` typed portfolio content · `src/config` theme and feature flags · `src/components` UI/layout/sections/3D · `src/pages` routes · `src/context` UI and theme state · `src/hooks` motion controls · `public` static SEO and resume assets.

## Deployment

Build with `npm run build`; deploy `dist/public` as a static site. Configure SPA rewrites to serve `index.html` for `/projects/*`. On Replit use the provided Vite dev/preview scripts and set the required `PORT` and `BASE_PATH` environment values. On Vercel set the framework to Vite, output directory to `dist/public`, and add a rewrite from `/(.*)` to `/index.html`.
