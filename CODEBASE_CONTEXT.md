# Codebase Context: Interactive-Portfolio

<!-- Maintained by the codebase-context-analyzer skill. Prose outside the
     Snapshot, Modules and Change Log sections is preserved across updates —
     edit it freely. -->

## Snapshot

| Field | Value |
| --- | --- |
| Last analyzed | 2026-10-17T10:25:54Z |
| Repository root | `/home/ommadure/Desktop/Portfolio/Interactive-Portfolio` |
| Commit | `1402b85` |
| Files tracked | 238 |
| Documented modules | 18 |
| Last run | 238 added · 0 modified · 0 deleted · 0 unchanged |

## Overview

This workspace is a monorepo containing:
1. **Interactive Portfolio** (`artifacts/om-madure-portfolio`): A production-grade React 18 / Vite portfolio site for Om Madure, Frontend Developer. Features Framer Motion, Lenis smooth scrolling, Three.js 3D canvas visuals, dynamic theme controls, and full accessibility support.
2. **Mockup Sandbox** (`artifacts/mockup-sandbox`): A component preview sandbox environment built with Radix UI primitives and Tailwind CSS v4.
3. **API Server** (`artifacts/api-server`): Express 5 backend server with Pino logging and OpenAPI-driven route handling.
4. **Shared Libraries** (`lib/`):
   - `lib/db`: Drizzle ORM database setup for PostgreSQL.
   - `lib/api-spec`: OpenAPI specification for API codegen via Orval.
   - `lib/api-zod`: Auto-generated Zod validation schemas.
   - `lib/api-client-react`: Custom fetch-based React API client hooks.

## Architecture Map

| Area | Path | Responsibility |
| --- | --- | --- |
| Root Config | `pnpm-workspace.yaml` | Monorepo packages, security settings, dependency catalog |
| Main Portfolio | `artifacts/om-madure-portfolio` | Interactive portfolio web application (Vite + React 18 + Three.js + Framer Motion) |
| UI Sandbox | `artifacts/mockup-sandbox` | Radix UI + Tailwind CSS v4 mockup component sandbox |
| API Server | `artifacts/api-server` | Express.js 5 REST backend service |
| Database | `lib/db` | Drizzle ORM + Node-Postgres database interface |
| API Specification | `lib/api-spec` | OpenAPI spec & Orval client generation config |
| API Validation | `lib/api-zod` | Zod schemas generated from OpenAPI spec |
| API React Client | `lib/api-client-react` | React client fetch hooks generated from OpenAPI spec |

## Modules

### `package.json`

- **Purpose:** Root monorepo package configuration and script entrypoints.
- **Key symbols:** `build`, `typecheck`
- **Depends on:** `pnpm-workspace.yaml`
- **Tags:** monorepo, config
- **Notes:** Enforces pnpm usage in preinstall hook.
- <sub>updated 2026-10-17 · `0eee75b762d97c72`</sub>

### `pnpm-workspace.yaml`

- **Purpose:** Monorepo workspace definitions, security settings (minimumReleaseAge), and catalog dependency versions.
- **Tags:** monorepo, security, config
- **Notes:** Defines workspace packages in artifacts/*, lib/*, and scripts. Restricts esbuild/lightningcss target platforms for fast Replit linux-x64 installs.
- <sub>updated 2026-10-17 · `eca3f132f1e94e10`</sub>

### `artifacts/api-server/src/app.ts`

- **Purpose:** Express HTTP server setup with Pino HTTP logging and CORS middleware.
- **Key symbols:** `app`
- **Depends on:** `artifacts/api-server/src/routes/index.ts`, `artifacts/api-server/src/lib/logger.ts`
- **Used by:** `artifacts/api-server/src/index.ts`
- **Tags:** backend, express, api
- **Notes:** Mounts API router under /api.
- <sub>updated 2026-10-17 · `72f19250d5ea5e83`</sub>

### `artifacts/api-server/src/index.ts`

- **Purpose:** Entrypoint for the Express backend server.
- **Tags:** backend, express
- **Notes:** Reads PORT env var and starts server listener.
- <sub>updated 2026-10-17 · `9c1f296e0008006b`</sub>

### `artifacts/api-server/src/routes/health.ts`

- **Purpose:** Health check route handler.
- **Key symbols:** `GET /api/health`
- **Tags:** backend, api
- **Notes:** Returns { status: 'ok' }.
- <sub>updated 2026-10-17 · `0386ceddb4ff4bff`</sub>

### `artifacts/mockup-sandbox/src/App.tsx`

- **Purpose:** UI mockup preview component sandbox application.
- **Key symbols:** `App`
- **Tags:** sandbox, ui
- <sub>updated 2026-10-17 · `0e0e60da88a64ef6`</sub>

### `artifacts/om-madure-portfolio/src/App.tsx`

- **Purpose:** Main React application shell with ThemeProvider, UIProvider, BrowserRouter, Lenis smooth scrolling, and dynamic SEO head management.
- **Key symbols:** `App`, `AppShell`, `RouteContent`
- **Depends on:** `artifacts/om-madure-portfolio/src/pages/Home.tsx`, `artifacts/om-madure-portfolio/src/pages/ProjectDetail.tsx`, `artifacts/om-madure-portfolio/src/pages/NotFound.tsx`, `artifacts/om-madure-portfolio/src/context/ThemeContext.tsx`, `artifacts/om-madure-portfolio/src/context/UIContext.tsx`
- **Tags:** frontend, portfolio, react
- <sub>updated 2026-10-17 · `9a55192c33081510`</sub>

### `artifacts/om-madure-portfolio/src/components/sections/Hero.tsx`

- **Purpose:** Hero section featuring developer profile info, career stats animation, CTA buttons, and Three.js canvas HeroScene.
- **Key symbols:** `Hero`, `AnimatedStat`
- **Depends on:** `artifacts/om-madure-portfolio/src/data/profile.ts`, `artifacts/om-madure-portfolio/src/components/three/HeroScene.tsx`
- **Tags:** frontend, hero, threejs
- <sub>updated 2026-10-17 · `268b2f1bca2f0834`</sub>

### `artifacts/om-madure-portfolio/src/components/sections/Skills.tsx`

- **Purpose:** Interactive technical skills section featuring filterable categories and interactive 3D SkillSphere / canvas representation.
- **Key symbols:** `Skills`
- **Depends on:** `artifacts/om-madure-portfolio/src/data/skills.ts`
- **Tags:** frontend, skills
- <sub>updated 2026-10-17 · `2aae2dd918aa5c38`</sub>

### `artifacts/om-madure-portfolio/src/components/three/HeroScene.tsx`

- **Purpose:** Interactive 3D Three.js canvas rendered in Hero section with fallback detection.
- **Key symbols:** `HeroScene`
- **Depends on:** `artifacts/om-madure-portfolio/src/utils/canRenderThree.ts`
- **Tags:** threejs, 3d, frontend
- <sub>updated 2026-10-17 · `68a1eeb3acde5c97`</sub>

### `artifacts/om-madure-portfolio/src/data/profile.ts`

- **Purpose:** Profile data fixture containing Om Madure's bio, contact info, social links, and career statistics.
- **Key symbols:** `profile`
- **Used by:** `artifacts/om-madure-portfolio/src/App.tsx`, `artifacts/om-madure-portfolio/src/components/sections/Hero.tsx`
- **Tags:** data, profile
- <sub>updated 2026-10-17 · `d45d8043d1d03a56`</sub>

### `artifacts/om-madure-portfolio/src/data/projects.ts`

- **Purpose:** Showcase projects fixture detailing DevFlow, ReviewPilot, and HireMyTalent.
- **Key symbols:** `projects`
- **Used by:** `artifacts/om-madure-portfolio/src/pages/ProjectDetail.tsx`, `artifacts/om-madure-portfolio/src/components/sections/Projects.tsx`
- **Tags:** data, projects
- <sub>updated 2026-10-17 · `bc2f9ca6c73c20bb`</sub>

### `artifacts/om-madure-portfolio/src/pages/Home.tsx`

- **Purpose:** Portfolio landing page combining Hero, About, Skills, Experience, Projects, Contact, and Footer components.
- **Key symbols:** `Home`
- **Depends on:** `artifacts/om-madure-portfolio/src/components/sections/*`
- **Tags:** frontend, portfolio, page
- <sub>updated 2026-10-17 · `c99a8009c946ba57`</sub>

### `artifacts/om-madure-portfolio/src/pages/ProjectDetail.tsx`

- **Purpose:** Detailed view for showcase projects (DevFlow, ReviewPilot, HireMyTalent).
- **Key symbols:** `ProjectDetail`
- **Depends on:** `artifacts/om-madure-portfolio/src/data/projects.ts`
- **Tags:** frontend, portfolio, page
- <sub>updated 2026-10-17 · `50ca09eb211ab124`</sub>

### `lib/api-client-react/src/custom-fetch.ts`

- **Purpose:** Configurable fetch wrapper for React client API requests with optional authentication headers.
- **Key symbols:** `customFetch`, `setBaseUrl`, `setAuthTokenGetter`
- **Used by:** `lib/api-client-react/src/generated/api.ts`
- **Tags:** api, react, client
- <sub>updated 2026-10-17 · `3a5605ea89571cca`</sub>

### `lib/api-spec/openapi.yaml`

- **Purpose:** OpenAPI 0.1.0 specification defining server REST endpoints and schemas.
- **Tags:** api-spec, openapi
- **Notes:** Source of truth for generating Zod schemas and React API client via Orval.
- <sub>updated 2026-10-17 · `f9ab7c42c1b0ac5c`</sub>

### `lib/api-zod/src/generated/api.ts`

- **Purpose:** Orval-generated Zod validation schemas for API requests and responses.
- **Key symbols:** `HealthCheckResponse`
- **Used by:** `@workspace/api-server`
- **Tags:** api, validation, zod
- <sub>updated 2026-10-17 · `4696b75da77dd165`</sub>

### `lib/db/src/index.ts`

- **Purpose:** Drizzle ORM database instance initialized with node-postgres Pool.
- **Key symbols:** `pool`, `db`
- **Depends on:** `lib/db/src/schema/index.ts`
- **Tags:** database, drizzle, postgres
- **Notes:** Requires DATABASE_URL environment variable.
- <sub>updated 2026-10-17 · `fc285bc83108137b`</sub>

## Cross-Cutting Concerns

- **Package Management & Security**: Strict `minimumReleaseAge` configuration in `pnpm-workspace.yaml` to protect against supply-chain vulnerabilities.
- **Frontend Performance**: Route-level code splitting via `React.lazy`, idle scheduling (`scheduleIdle`), Lenis smooth scrolling, and reduced-motion detection.
- **3D Graphics & Fallbacks**: Canvas capability checking (`canRenderThree`) with static visual fallbacks when WebGL/Three.js is unsupported or reduced motion is requested.
- **Code Generation**: Automated OpenAPI-to-Zod and React client codegen pipeline using Orval.

## Open Questions

- Are there additional production database schemas planned for `lib/db/src/schema/`?
- Should live project URLs for DevFlow be populated in `artifacts/om-madure-portfolio/src/data/projects.ts` once deployed?

## Change Log

### 2026-10-17 — 10:25:54 UTC · `1402b85`

**238 added** (skipped 0 unchanged files)

Initial codebase analysis complete. Indexed monorepo structure, portfolio frontend, API server, database, and shared libraries.

- `package.json` — new
- `pnpm-workspace.yaml` — new
- `artifacts/api-server/src/app.ts` — new
- `artifacts/api-server/src/index.ts` — new
- `artifacts/api-server/src/routes/health.ts` — new
- `lib/db/src/index.ts` — new
- `lib/api-spec/openapi.yaml` — new
- `lib/api-zod/src/generated/api.ts` — new
- `lib/api-client-react/src/custom-fetch.ts` — new
- `artifacts/om-madure-portfolio/src/App.tsx` — new
- `artifacts/om-madure-portfolio/src/pages/Home.tsx` — new
- `artifacts/om-madure-portfolio/src/pages/ProjectDetail.tsx` — new
- `artifacts/om-madure-portfolio/src/components/sections/Hero.tsx` — new
- `artifacts/om-madure-portfolio/src/components/three/HeroScene.tsx` — new
- `artifacts/om-madure-portfolio/src/components/sections/Skills.tsx` — new
- `artifacts/om-madure-portfolio/src/data/profile.ts` — new
- `artifacts/om-madure-portfolio/src/data/projects.ts` — new
- `artifacts/mockup-sandbox/src/App.tsx` — new

---

<!-- codebase-context:manifest:begin -->
<details>
<summary>File fingerprint index — machine-managed, do not edit by hand</summary>

```json
{
 "files": {
  ".gitignore": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c6cd799e72ae14f9",
   "mtime": 1792228805,
   "size": 668
  },
  ".npmrc": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1ded4f26f4851b35",
   "mtime": 1792228805,
   "size": 56
  },
  ".replit": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c36bb332bbeca09c",
   "mtime": 1792228805,
   "size": 343
  },
  ".replitignore": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "44e7ee407200c8a5",
   "mtime": 1792228805,
   "size": 201
  },
  "artifacts/api-server/.replit-artifact/artifact.toml": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e461708bfe50f6eb",
   "mtime": 1792228805,
   "size": 784
  },
  "artifacts/api-server/build.mjs": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a268757bc319f2cc",
   "mtime": 1792228805,
   "size": 3455
  },
  "artifacts/api-server/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "069d632c9b9affea",
   "mtime": 1792228805,
   "size": 880
  },
  "artifacts/api-server/src/app.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "72f19250d5ea5e83",
   "mtime": 1792228805,
   "size": 656
  },
  "artifacts/api-server/src/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9c1f296e0008006b",
   "mtime": 1792228805,
   "size": 511
  },
  "artifacts/api-server/src/lib/logger.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "29e1ca75036fe917",
   "mtime": 1792228805,
   "size": 421
  },
  "artifacts/api-server/src/routes/health.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "0386ceddb4ff4bff",
   "mtime": 1792228805,
   "size": 288
  },
  "artifacts/api-server/src/routes/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "957c7d2e44a720dc",
   "mtime": 1792228805,
   "size": 171
  },
  "artifacts/api-server/tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "aa300909ccd1d428",
   "mtime": 1792228805,
   "size": 335
  },
  "artifacts/mockup-sandbox/.replit-artifact/artifact.toml": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e259a07aa72cd0a1",
   "mtime": 1792228805,
   "size": 327
  },
  "artifacts/mockup-sandbox/components.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "aa1b56411ed0e8fc",
   "mtime": 1792228805,
   "size": 426
  },
  "artifacts/mockup-sandbox/index.html": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "fa4111c44a19ea39",
   "mtime": 1792228805,
   "size": 4325
  },
  "artifacts/mockup-sandbox/mockupPreviewPlugin.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4d579d37f3d3d12e",
   "mtime": 1792228805,
   "size": 4639
  },
  "artifacts/mockup-sandbox/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4b1279fc2746617e",
   "mtime": 1792228805,
   "size": 2516
  },
  "artifacts/mockup-sandbox/src/.generated/mockup-components.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2c23d71ff9b2704c",
   "mtime": 1792228805,
   "size": 171
  },
  "artifacts/mockup-sandbox/src/App.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "0e0e60da88a64ef6",
   "mtime": 1792228805,
   "size": 3654
  },
  "artifacts/mockup-sandbox/src/components/ui/accordion.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "dcbfb3243a26096f",
   "mtime": 1792228805,
   "size": 2001
  },
  "artifacts/mockup-sandbox/src/components/ui/alert-dialog.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "311bede35f785d7b",
   "mtime": 1792228805,
   "size": 4419
  },
  "artifacts/mockup-sandbox/src/components/ui/alert.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "5950ac01377e7eed",
   "mtime": 1792228805,
   "size": 1598
  },
  "artifacts/mockup-sandbox/src/components/ui/aspect-ratio.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "08b0aa0b05efc573",
   "mtime": 1792228805,
   "size": 140
  },
  "artifacts/mockup-sandbox/src/components/ui/avatar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e78b35ed76c67d8f",
   "mtime": 1792228805,
   "size": 1419
  },
  "artifacts/mockup-sandbox/src/components/ui/badge.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "0564174ab513773e",
   "mtime": 1792228805,
   "size": 1163
  },
  "artifacts/mockup-sandbox/src/components/ui/breadcrumb.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c3d3dcb0d82fc5e9",
   "mtime": 1792228805,
   "size": 2712
  },
  "artifacts/mockup-sandbox/src/components/ui/button-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e3716d270e9ef645",
   "mtime": 1792228805,
   "size": 2209
  },
  "artifacts/mockup-sandbox/src/components/ui/button.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4ea01d60fddbf1a0",
   "mtime": 1792228805,
   "size": 1925
  },
  "artifacts/mockup-sandbox/src/components/ui/calendar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "787a19c855cf2b82",
   "mtime": 1792228805,
   "size": 7569
  },
  "artifacts/mockup-sandbox/src/components/ui/card.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "525c4bb2c051987b",
   "mtime": 1792228805,
   "size": 1828
  },
  "artifacts/mockup-sandbox/src/components/ui/carousel.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "5a4ff73c804e86c8",
   "mtime": 1792228805,
   "size": 6210
  },
  "artifacts/mockup-sandbox/src/components/ui/chart.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "74005899ffa62cff",
   "mtime": 1792228805,
   "size": 10674
  },
  "artifacts/mockup-sandbox/src/components/ui/checkbox.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ac389a574651c8be",
   "mtime": 1792228805,
   "size": 1031
  },
  "artifacts/mockup-sandbox/src/components/ui/collapsible.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "f4cdd104de29928b",
   "mtime": 1792228805,
   "size": 329
  },
  "artifacts/mockup-sandbox/src/components/ui/command.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "5a57ebc119f2357b",
   "mtime": 1792228805,
   "size": 4887
  },
  "artifacts/mockup-sandbox/src/components/ui/context-menu.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "5369fc82c51df067",
   "mtime": 1792228805,
   "size": 7406
  },
  "artifacts/mockup-sandbox/src/components/ui/dialog.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "f9c982ed8114c253",
   "mtime": 1792228805,
   "size": 3835
  },
  "artifacts/mockup-sandbox/src/components/ui/drawer.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "47ff6248307a4ac0",
   "mtime": 1792228805,
   "size": 3007
  },
  "artifacts/mockup-sandbox/src/components/ui/dropdown-menu.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "dc109123ecd59af0",
   "mtime": 1792228805,
   "size": 7606
  },
  "artifacts/mockup-sandbox/src/components/ui/empty.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9f975582a0290dbc",
   "mtime": 1792228805,
   "size": 2396
  },
  "artifacts/mockup-sandbox/src/components/ui/field.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e463611ab049c5e9",
   "mtime": 1792228805,
   "size": 6044
  },
  "artifacts/mockup-sandbox/src/components/ui/form.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d50adf86568f7624",
   "mtime": 1792228805,
   "size": 4175
  },
  "artifacts/mockup-sandbox/src/components/ui/hover-card.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "00f9086b1412843e",
   "mtime": 1792228805,
   "size": 1237
  },
  "artifacts/mockup-sandbox/src/components/ui/input-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "131052098fa8b16b",
   "mtime": 1792228805,
   "size": 4883
  },
  "artifacts/mockup-sandbox/src/components/ui/input-otp.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7c4799e3597f2780",
   "mtime": 1792228805,
   "size": 2143
  },
  "artifacts/mockup-sandbox/src/components/ui/input.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "6299a6a387dc55e5",
   "mtime": 1792228805,
   "size": 768
  },
  "artifacts/mockup-sandbox/src/components/ui/item.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "90983640aa7cfef8",
   "mtime": 1792228805,
   "size": 4494
  },
  "artifacts/mockup-sandbox/src/components/ui/kbd.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "0c025e7736d435f5",
   "mtime": 1792228805,
   "size": 862
  },
  "artifacts/mockup-sandbox/src/components/ui/label.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2eac8fbb04002c42",
   "mtime": 1792228805,
   "size": 724
  },
  "artifacts/mockup-sandbox/src/components/ui/menubar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "def61eb2c47c9ec3",
   "mtime": 1792228805,
   "size": 8608
  },
  "artifacts/mockup-sandbox/src/components/ui/navigation-menu.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a06d96a582ac207f",
   "mtime": 1792228805,
   "size": 5124
  },
  "artifacts/mockup-sandbox/src/components/ui/pagination.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9506dbd19ddd0c28",
   "mtime": 1792228805,
   "size": 2751
  },
  "artifacts/mockup-sandbox/src/components/ui/popover.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "04cf38bf94abd3fe",
   "mtime": 1792228805,
   "size": 1342
  },
  "artifacts/mockup-sandbox/src/components/ui/progress.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "6b3b4b69a1cb3610",
   "mtime": 1792228805,
   "size": 792
  },
  "artifacts/mockup-sandbox/src/components/ui/radio-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9ba7808b7404cdf2",
   "mtime": 1792228805,
   "size": 1410
  },
  "artifacts/mockup-sandbox/src/components/ui/resizable.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "70d1e35a5fb0897a",
   "mtime": 1792228805,
   "size": 1723
  },
  "artifacts/mockup-sandbox/src/components/ui/scroll-area.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d7d02600effca55d",
   "mtime": 1792228805,
   "size": 1642
  },
  "artifacts/mockup-sandbox/src/components/ui/select.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "3d93ae07a8f3fe12",
   "mtime": 1792228805,
   "size": 5745
  },
  "artifacts/mockup-sandbox/src/components/ui/separator.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c956c4cca4b8442f",
   "mtime": 1792228805,
   "size": 756
  },
  "artifacts/mockup-sandbox/src/components/ui/sheet.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "363f8e06aa5b53c6",
   "mtime": 1792228805,
   "size": 4280
  },
  "artifacts/mockup-sandbox/src/components/ui/sidebar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "53c5391594a46de2",
   "mtime": 1792228805,
   "size": 21056
  },
  "artifacts/mockup-sandbox/src/components/ui/skeleton.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "87608e7cc815ad3d",
   "mtime": 1792228805,
   "size": 266
  },
  "artifacts/mockup-sandbox/src/components/ui/slider.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "234e38fef59169bd",
   "mtime": 1792228805,
   "size": 1037
  },
  "artifacts/mockup-sandbox/src/components/ui/sonner.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "771ab8637d27384c",
   "mtime": 1792228805,
   "size": 894
  },
  "artifacts/mockup-sandbox/src/components/ui/spinner.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "3e6e6e8d37fb4069",
   "mtime": 1792228805,
   "size": 331
  },
  "artifacts/mockup-sandbox/src/components/ui/switch.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ba5867cd3145af12",
   "mtime": 1792228805,
   "size": 1148
  },
  "artifacts/mockup-sandbox/src/components/ui/table.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a4a6972c2d47d465",
   "mtime": 1792228805,
   "size": 2859
  },
  "artifacts/mockup-sandbox/src/components/ui/tabs.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "6f74706bc6b53f9e",
   "mtime": 1792228805,
   "size": 1877
  },
  "artifacts/mockup-sandbox/src/components/ui/textarea.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ec7c92aaed80f692",
   "mtime": 1792228805,
   "size": 649
  },
  "artifacts/mockup-sandbox/src/components/ui/toast.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "99f9f4a3e897f71d",
   "mtime": 1792228805,
   "size": 4845
  },
  "artifacts/mockup-sandbox/src/components/ui/toaster.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1348f1a1f9820e2f",
   "mtime": 1792228805,
   "size": 772
  },
  "artifacts/mockup-sandbox/src/components/ui/toggle-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "dba95ead40d163af",
   "mtime": 1792228805,
   "size": 1753
  },
  "artifacts/mockup-sandbox/src/components/ui/toggle.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "955fa1bb97505b7a",
   "mtime": 1792228805,
   "size": 1486
  },
  "artifacts/mockup-sandbox/src/components/ui/tooltip.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ce6afa34fb9dae51",
   "mtime": 1792228805,
   "size": 1267
  },
  "artifacts/mockup-sandbox/src/hooks/use-mobile.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ad0936f84f1df79d",
   "mtime": 1792228805,
   "size": 565
  },
  "artifacts/mockup-sandbox/src/hooks/use-toast.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "eb23d01c5e502ae1",
   "mtime": 1792228805,
   "size": 3767
  },
  "artifacts/mockup-sandbox/src/index.css": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "3935d982402c0101",
   "mtime": 1792228805,
   "size": 5760
  },
  "artifacts/mockup-sandbox/src/lib/utils.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7c8c3dfc0cdd370d",
   "mtime": 1792228805,
   "size": 166
  },
  "artifacts/mockup-sandbox/src/main.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "29946f51942fba11",
   "mtime": 1792228805,
   "size": 157
  },
  "artifacts/mockup-sandbox/tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "bd0a1d0c1afa46c5",
   "mtime": 1792228805,
   "size": 513
  },
  "artifacts/mockup-sandbox/vite.config.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7de0f52b190e4d8f",
   "mtime": 1792228805,
   "size": 1592
  },
  "artifacts/om-madure-portfolio/.gitignore": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7e51091856fdccdd",
   "mtime": 1792228805,
   "size": 65
  },
  "artifacts/om-madure-portfolio/.prettierrc.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "cb3b25949fd23c14",
   "mtime": 1792228805,
   "size": 89
  },
  "artifacts/om-madure-portfolio/.replit-artifact/artifact.toml": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "312f3349ecc2e10d",
   "mtime": 1792228805,
   "size": 796
  },
  "artifacts/om-madure-portfolio/README.md": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "413f203eeeefc761",
   "mtime": 1792228805,
   "size": 3098
  },
  "artifacts/om-madure-portfolio/components.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "3a5d5af62f05e6e3",
   "mtime": 1792228805,
   "size": 434
  },
  "artifacts/om-madure-portfolio/eslint.config.js": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1385d8beb7ed4718",
   "mtime": 1792228805,
   "size": 366
  },
  "artifacts/om-madure-portfolio/index.html": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1638b684e08329d0",
   "mtime": 1792228805,
   "size": 2012
  },
  "artifacts/om-madure-portfolio/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "f17b3c25e2e41d7b",
   "mtime": 1792228805,
   "size": 3199
  },
  "artifacts/om-madure-portfolio/public/robots.txt": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1d6af9b6b8652946",
   "mtime": 1792228805,
   "size": 74
  },
  "artifacts/om-madure-portfolio/public/sitemap.xml": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a8e4a20629f3034e",
   "mtime": 1792228805,
   "size": 387
  },
  "artifacts/om-madure-portfolio/scripts/generate-sitemap.mjs": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e7b5ebde4a0e30ea",
   "mtime": 1792228805,
   "size": 763
  },
  "artifacts/om-madure-portfolio/src/App.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9a55192c33081510",
   "mtime": 1792228805,
   "size": 5318
  },
  "artifacts/om-madure-portfolio/src/animations/variants.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "63eda95cb5431063",
   "mtime": 1792228805,
   "size": 370
  },
  "artifacts/om-madure-portfolio/src/components/command/CommandPalette.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "5f63294dd3877015",
   "mtime": 1792228805,
   "size": 5900
  },
  "artifacts/om-madure-portfolio/src/components/error-boundary.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c1ea4d88be8cd206",
   "mtime": 1792228805,
   "size": 2735
  },
  "artifacts/om-madure-portfolio/src/components/layout/Footer.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "eb81a793778b9b8d",
   "mtime": 1792228805,
   "size": 983
  },
  "artifacts/om-madure-portfolio/src/components/layout/GlobalEffects.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d0fe85432740eb30",
   "mtime": 1792228805,
   "size": 2239
  },
  "artifacts/om-madure-portfolio/src/components/layout/Navbar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "040125d805ea0384",
   "mtime": 1792228805,
   "size": 6667
  },
  "artifacts/om-madure-portfolio/src/components/sections/About.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ac4dfbbbb2b86561",
   "mtime": 1792228805,
   "size": 2160
  },
  "artifacts/om-madure-portfolio/src/components/sections/Contact.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "48bb263a5ee566da",
   "mtime": 1792228805,
   "size": 6291
  },
  "artifacts/om-madure-portfolio/src/components/sections/Experience.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "0574918bdec99424",
   "mtime": 1792228805,
   "size": 2050
  },
  "artifacts/om-madure-portfolio/src/components/sections/Hero.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "268b2f1bca2f0834",
   "mtime": 1792228805,
   "size": 4321
  },
  "artifacts/om-madure-portfolio/src/components/sections/Projects.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "20b544906f63ef64",
   "mtime": 1792228805,
   "size": 4158
  },
  "artifacts/om-madure-portfolio/src/components/sections/Skills.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2aae2dd918aa5c38",
   "mtime": 1792228805,
   "size": 3019
  },
  "artifacts/om-madure-portfolio/src/components/three/CanvasGuard.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9c2afd5d2875b94c",
   "mtime": 1792228805,
   "size": 648
  },
  "artifacts/om-madure-portfolio/src/components/three/ContactObject.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "041240c3c4e42455",
   "mtime": 1792228805,
   "size": 1746
  },
  "artifacts/om-madure-portfolio/src/components/three/HeroScene.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "68a1eeb3acde5c97",
   "mtime": 1792228805,
   "size": 2320
  },
  "artifacts/om-madure-portfolio/src/components/three/SkillSphere.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c61c99bf35b56a2c",
   "mtime": 1792228805,
   "size": 2287
  },
  "artifacts/om-madure-portfolio/src/components/three/StaticFallback.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7a51d56d64b614e8",
   "mtime": 1792228805,
   "size": 496
  },
  "artifacts/om-madure-portfolio/src/components/three/scenes/ContactCanvas.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "cfd0887fad27c0d4",
   "mtime": 1792228805,
   "size": 768
  },
  "artifacts/om-madure-portfolio/src/components/three/scenes/HeroCanvas.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1f2d21463cf085ea",
   "mtime": 1792228805,
   "size": 2018
  },
  "artifacts/om-madure-portfolio/src/components/three/scenes/SphereCanvas.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a6b5be40ffbf4370",
   "mtime": 1792228805,
   "size": 1889
  },
  "artifacts/om-madure-portfolio/src/components/ui/DeploymentLink.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4ac54f53179a7f3f",
   "mtime": 1792228805,
   "size": 970
  },
  "artifacts/om-madure-portfolio/src/components/ui/MagneticLink.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "51a74897e1f9a9a3",
   "mtime": 1792228805,
   "size": 1349
  },
  "artifacts/om-madure-portfolio/src/components/ui/PlaceholderImage.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ddbc42ea72f511f8",
   "mtime": 1792228805,
   "size": 975
  },
  "artifacts/om-madure-portfolio/src/components/ui/SectionHeading.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "b03fc5be7c227ea4",
   "mtime": 1792228805,
   "size": 553
  },
  "artifacts/om-madure-portfolio/src/components/ui/accordion.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "8e4230a3e6d38bfa",
   "mtime": 1792228805,
   "size": 2013
  },
  "artifacts/om-madure-portfolio/src/components/ui/alert-dialog.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d76901a06e6881e9",
   "mtime": 1792228805,
   "size": 4447
  },
  "artifacts/om-madure-portfolio/src/components/ui/alert.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "695369ea4d1ba443",
   "mtime": 1792228805,
   "size": 1609
  },
  "artifacts/om-madure-portfolio/src/components/ui/aspect-ratio.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2f5b0ed3cbcf84e5",
   "mtime": 1792228805,
   "size": 143
  },
  "artifacts/om-madure-portfolio/src/components/ui/avatar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "429f5e82fc3dcf26",
   "mtime": 1792228805,
   "size": 1431
  },
  "artifacts/om-madure-portfolio/src/components/ui/badge.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ba6f51e428a520f5",
   "mtime": 1792228805,
   "size": 1528
  },
  "artifacts/om-madure-portfolio/src/components/ui/breadcrumb.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "44b4de47f806eec0",
   "mtime": 1792228805,
   "size": 2735
  },
  "artifacts/om-madure-portfolio/src/components/ui/button-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "b89025c11d086525",
   "mtime": 1792228805,
   "size": 2222
  },
  "artifacts/om-madure-portfolio/src/components/ui/button.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9c20a340ca0c948d",
   "mtime": 1792228805,
   "size": 2370
  },
  "artifacts/om-madure-portfolio/src/components/ui/calendar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1cdd1e62797356fe",
   "mtime": 1792228805,
   "size": 7607
  },
  "artifacts/om-madure-portfolio/src/components/ui/card.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9fed39a53303c12f",
   "mtime": 1792228805,
   "size": 1856
  },
  "artifacts/om-madure-portfolio/src/components/ui/carousel.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4ae2f69bc2c1ce33",
   "mtime": 1792228805,
   "size": 6288
  },
  "artifacts/om-madure-portfolio/src/components/ui/chart.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ac747c83483d742e",
   "mtime": 1792228805,
   "size": 10846
  },
  "artifacts/om-madure-portfolio/src/components/ui/checkbox.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "6b9e336fa42475bb",
   "mtime": 1792228805,
   "size": 1038
  },
  "artifacts/om-madure-portfolio/src/components/ui/collapsible.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "aedcd10b62404b39",
   "mtime": 1792228805,
   "size": 335
  },
  "artifacts/om-madure-portfolio/src/components/ui/command.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d8fb66e44f9f8de5",
   "mtime": 1792228805,
   "size": 4918
  },
  "artifacts/om-madure-portfolio/src/components/ui/context-menu.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "bdff38b45a6010e3",
   "mtime": 1792228805,
   "size": 7446
  },
  "artifacts/om-madure-portfolio/src/components/ui/dialog.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e0d3fa53f4cb7d80",
   "mtime": 1792228805,
   "size": 3889
  },
  "artifacts/om-madure-portfolio/src/components/ui/drawer.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "152bc340ad982e84",
   "mtime": 1792228805,
   "size": 3029
  },
  "artifacts/om-madure-portfolio/src/components/ui/dropdown-menu.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a79d5419ee174de3",
   "mtime": 1792228805,
   "size": 7646
  },
  "artifacts/om-madure-portfolio/src/components/ui/empty.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "48824b1b37bd406f",
   "mtime": 1792228805,
   "size": 2410
  },
  "artifacts/om-madure-portfolio/src/components/ui/field.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c3787ffb045354e9",
   "mtime": 1792228805,
   "size": 6079
  },
  "artifacts/om-madure-portfolio/src/components/ui/form.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1960463b09152760",
   "mtime": 1792228805,
   "size": 4232
  },
  "artifacts/om-madure-portfolio/src/components/ui/hover-card.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e0b4e3f0126757a8",
   "mtime": 1792228805,
   "size": 1245
  },
  "artifacts/om-madure-portfolio/src/components/ui/input-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "f4befbf9bf8ebd75",
   "mtime": 1792228805,
   "size": 4993
  },
  "artifacts/om-madure-portfolio/src/components/ui/input-otp.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "b4891335e7092051",
   "mtime": 1792228805,
   "size": 2160
  },
  "artifacts/om-madure-portfolio/src/components/ui/input.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "03ac1648171bd5ad",
   "mtime": 1792228805,
   "size": 775
  },
  "artifacts/om-madure-portfolio/src/components/ui/item.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4a84cda22d692ee1",
   "mtime": 1792228805,
   "size": 4519
  },
  "artifacts/om-madure-portfolio/src/components/ui/kbd.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4348a7a06a715e9e",
   "mtime": 1792228805,
   "size": 867
  },
  "artifacts/om-madure-portfolio/src/components/ui/label.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "fbc0c7db42212279",
   "mtime": 1792228805,
   "size": 733
  },
  "artifacts/om-madure-portfolio/src/components/ui/menubar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "26dbbf36e4ffd87a",
   "mtime": 1792228805,
   "size": 8655
  },
  "artifacts/om-madure-portfolio/src/components/ui/navigation-menu.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "222020e1ac703ce0",
   "mtime": 1792228805,
   "size": 5150
  },
  "artifacts/om-madure-portfolio/src/components/ui/pagination.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "dd65d2e59226a3f3",
   "mtime": 1792228805,
   "size": 2772
  },
  "artifacts/om-madure-portfolio/src/components/ui/popover.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "dc574442536873c8",
   "mtime": 1792228805,
   "size": 1351
  },
  "artifacts/om-madure-portfolio/src/components/ui/progress.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "74223bcccf7ca2ed",
   "mtime": 1792228805,
   "size": 799
  },
  "artifacts/om-madure-portfolio/src/components/ui/radio-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "8155d32dea5d4dde",
   "mtime": 1792228805,
   "size": 1421
  },
  "artifacts/om-madure-portfolio/src/components/ui/resizable.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "8e73dfb8b5829443",
   "mtime": 1792228805,
   "size": 1733
  },
  "artifacts/om-madure-portfolio/src/components/ui/scroll-area.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "73f5dedda781e528",
   "mtime": 1792228805,
   "size": 1650
  },
  "artifacts/om-madure-portfolio/src/components/ui/select.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c64c9c1574c91f1e",
   "mtime": 1792228805,
   "size": 5773
  },
  "artifacts/om-madure-portfolio/src/components/ui/separator.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2b129347f918742b",
   "mtime": 1792228805,
   "size": 764
  },
  "artifacts/om-madure-portfolio/src/components/ui/sheet.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ef2ae35ccab1252c",
   "mtime": 1792228805,
   "size": 4307
  },
  "artifacts/om-madure-portfolio/src/components/ui/sidebar.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "de7566e708ba8bf3",
   "mtime": 1792228805,
   "size": 21969
  },
  "artifacts/om-madure-portfolio/src/components/ui/skeleton.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d78130b2e311a750",
   "mtime": 1792228805,
   "size": 269
  },
  "artifacts/om-madure-portfolio/src/components/ui/slider.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ecac74b8f3a044ba",
   "mtime": 1792228805,
   "size": 1043
  },
  "artifacts/om-madure-portfolio/src/components/ui/sonner.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "de5a5d9ae404545f",
   "mtime": 1792228805,
   "size": 902
  },
  "artifacts/om-madure-portfolio/src/components/ui/spinner.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4458ea392b32f439",
   "mtime": 1792228805,
   "size": 334
  },
  "artifacts/om-madure-portfolio/src/components/ui/switch.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "f81bc9b5ce2d6a92",
   "mtime": 1792228805,
   "size": 1155
  },
  "artifacts/om-madure-portfolio/src/components/ui/table.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "dd29f5ef260af67e",
   "mtime": 1792228805,
   "size": 2881
  },
  "artifacts/om-madure-portfolio/src/components/ui/tabs.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "320609101fbaa6cc",
   "mtime": 1792228805,
   "size": 1890
  },
  "artifacts/om-madure-portfolio/src/components/ui/textarea.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "63fb699771afe60c",
   "mtime": 1792228805,
   "size": 655
  },
  "artifacts/om-madure-portfolio/src/components/ui/toast.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "04d4ef720079342e",
   "mtime": 1792228805,
   "size": 4871
  },
  "artifacts/om-madure-portfolio/src/components/ui/toaster.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d34c7cd51482ddd5",
   "mtime": 1792228805,
   "size": 777
  },
  "artifacts/om-madure-portfolio/src/components/ui/toggle-group.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "6d7aca86245edf5d",
   "mtime": 1792228805,
   "size": 1767
  },
  "artifacts/om-madure-portfolio/src/components/ui/toggle.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "5800d2099224ef90",
   "mtime": 1792228805,
   "size": 1494
  },
  "artifacts/om-madure-portfolio/src/components/ui/tooltip.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e3c6ea9d4ecd6288",
   "mtime": 1792228805,
   "size": 1277
  },
  "artifacts/om-madure-portfolio/src/config/features.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "af7629eca933635a",
   "mtime": 1792228805,
   "size": 154
  },
  "artifacts/om-madure-portfolio/src/config/theme.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ec964702c283314b",
   "mtime": 1792228805,
   "size": 254
  },
  "artifacts/om-madure-portfolio/src/context/ThemeContext.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "684753f813676d2b",
   "mtime": 1792228805,
   "size": 937
  },
  "artifacts/om-madure-portfolio/src/context/UIContext.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d07dc4c00d5cbef8",
   "mtime": 1792228805,
   "size": 1063
  },
  "artifacts/om-madure-portfolio/src/data/certifications.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "be295ec8ccc3ffeb",
   "mtime": 1792228805,
   "size": 304
  },
  "artifacts/om-madure-portfolio/src/data/education.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "27f1b81f975dc339",
   "mtime": 1792228805,
   "size": 288
  },
  "artifacts/om-madure-portfolio/src/data/experience.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "8b07a9d4dee4092c",
   "mtime": 1792228805,
   "size": 1823
  },
  "artifacts/om-madure-portfolio/src/data/profile.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "d45d8043d1d03a56",
   "mtime": 1792228805,
   "size": 1389
  },
  "artifacts/om-madure-portfolio/src/data/projects.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "bc2f9ca6c73c20bb",
   "mtime": 1792228805,
   "size": 3707
  },
  "artifacts/om-madure-portfolio/src/data/skills.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2106eccdc36332e4",
   "mtime": 1792228805,
   "size": 1154
  },
  "artifacts/om-madure-portfolio/src/hooks/use-mobile.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "82bff42ff087bd5d",
   "mtime": 1792228805,
   "size": 585
  },
  "artifacts/om-madure-portfolio/src/hooks/use-toast.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4179c5a1bad69426",
   "mtime": 1792228805,
   "size": 3706
  },
  "artifacts/om-madure-portfolio/src/hooks/useInView.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "be8c7769d51d4009",
   "mtime": 1792228805,
   "size": 523
  },
  "artifacts/om-madure-portfolio/src/hooks/useMediaQuery.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a7c24f8f5fdec47a",
   "mtime": 1792228805,
   "size": 466
  },
  "artifacts/om-madure-portfolio/src/hooks/useMotionPreference.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9031fc3b842e515b",
   "mtime": 1792228805,
   "size": 751
  },
  "artifacts/om-madure-portfolio/src/hooks/useReducedData.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "6ee44ed51dc941e7",
   "mtime": 1792228805,
   "size": 704
  },
  "artifacts/om-madure-portfolio/src/hooks/useScrollSpy.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "8a3456ca32e6316f",
   "mtime": 1792228805,
   "size": 521
  },
  "artifacts/om-madure-portfolio/src/hooks/useTheme.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4d6cb7c5a894de64",
   "mtime": 1792228805,
   "size": 147
  },
  "artifacts/om-madure-portfolio/src/index.css": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7ab5f464fe159bd9",
   "mtime": 1792228805,
   "size": 41854
  },
  "artifacts/om-madure-portfolio/src/lib/utils.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "afc0e1dc0e142d6b",
   "mtime": 1792228805,
   "size": 170
  },
  "artifacts/om-madure-portfolio/src/main.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a45a9b897e64012a",
   "mtime": 1792228805,
   "size": 264
  },
  "artifacts/om-madure-portfolio/src/pages/Home.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c99a8009c946ba57",
   "mtime": 1792228805,
   "size": 534
  },
  "artifacts/om-madure-portfolio/src/pages/NotFound.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "3ebc7563522bfaca",
   "mtime": 1792228805,
   "size": 770
  },
  "artifacts/om-madure-portfolio/src/pages/ProjectDetail.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "50ca09eb211ab124",
   "mtime": 1792228805,
   "size": 3549
  },
  "artifacts/om-madure-portfolio/src/pages/not-found.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "6aaea7a712502444",
   "mtime": 1792228805,
   "size": 739
  },
  "artifacts/om-madure-portfolio/src/router.tsx": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "aaaac0f9c03a9863",
   "mtime": 1792228805,
   "size": 99
  },
  "artifacts/om-madure-portfolio/src/services/contact.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "3a91d8725a55ee78",
   "mtime": 1792228805,
   "size": 250
  },
  "artifacts/om-madure-portfolio/src/types/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "701d1d2baf3d2f51",
   "mtime": 1792228805,
   "size": 951
  },
  "artifacts/om-madure-portfolio/src/utils/canRenderThree.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "232f901f67a319a7",
   "mtime": 1792228805,
   "size": 427
  },
  "artifacts/om-madure-portfolio/src/utils/cn.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "1e5aa0f186025c0d",
   "mtime": 1792228805,
   "size": 107
  },
  "artifacts/om-madure-portfolio/src/utils/format.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e88f40c6f07ac405",
   "mtime": 1792228805,
   "size": 250
  },
  "artifacts/om-madure-portfolio/src/utils/scheduleIdle.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "30745ee0455fa75b",
   "mtime": 1792228805,
   "size": 669
  },
  "artifacts/om-madure-portfolio/src/utils/url.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e0275c92018a3235",
   "mtime": 1792228805,
   "size": 73
  },
  "artifacts/om-madure-portfolio/tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e0a2fd8a7f3bfc86",
   "mtime": 1792228805,
   "size": 520
  },
  "artifacts/om-madure-portfolio/vite.config.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "c67bc70e8c6d6dbe",
   "mtime": 1792228805,
   "size": 2663
  },
  "attached_assets/Pasted--PROJECT-BRIEF-Interactive-Developer-Portfolio-for-Om-M_1792226534233.txt": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7cf8a7ba90d363f8",
   "mtime": 1792228805,
   "size": 30364
  },
  "lib/api-client-react/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ae70f97a12d1f7e7",
   "mtime": 1792228805,
   "size": 265
  },
  "lib/api-client-react/src/custom-fetch.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "3a5605ea89571cca",
   "mtime": 1792228805,
   "size": 11377
  },
  "lib/api-client-react/src/generated/api.schemas.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "a52ae133825c10e0",
   "mtime": 1792228805,
   "size": 178
  },
  "lib/api-client-react/src/generated/api.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9d7cf1d5de5bdaac",
   "mtime": 1792228805,
   "size": 2544
  },
  "lib/api-client-react/src/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7974b36e3973a8d0",
   "mtime": 1792228805,
   "size": 194
  },
  "lib/api-client-react/tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7e9d09ae244912d5",
   "mtime": 1792228805,
   "size": 251
  },
  "lib/api-spec/openapi.yaml": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "f9ab7c42c1b0ac5c",
   "mtime": 1792228805,
   "size": 778
  },
  "lib/api-spec/orval.config.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "17bbe15ed439c69c",
   "mtime": 1792228805,
   "size": 2051
  },
  "lib/api-spec/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2c0f6e86a51350d2",
   "mtime": 1792228805,
   "size": 228
  },
  "lib/api-zod/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "07009861b2ba8dec",
   "mtime": 1792228805,
   "size": 189
  },
  "lib/api-zod/src/generated/api.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "4696b75da77dd165",
   "mtime": 1792228805,
   "size": 296
  },
  "lib/api-zod/src/generated/types/healthStatus.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "ca592aaa48679661",
   "mtime": 1792228805,
   "size": 179
  },
  "lib/api-zod/src/generated/types/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "7cbe6a236b9ffe48",
   "mtime": 1792228805,
   "size": 159
  },
  "lib/api-zod/src/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "effb7d33b5df9900",
   "mtime": 1792228805,
   "size": 68
  },
  "lib/api-zod/tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "bb52c0e8b13e6585",
   "mtime": 1792228805,
   "size": 221
  },
  "lib/db/drizzle.config.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "57862221556f24a1",
   "mtime": 1792228805,
   "size": 352
  },
  "lib/db/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9c4e93f8f9f9fa57",
   "mtime": 1792228805,
   "size": 578
  },
  "lib/db/src/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "fc285bc83108137b",
   "mtime": 1792228805,
   "size": 416
  },
  "lib/db/src/schema/index.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "459c09e0be1c1e28",
   "mtime": 1792228805,
   "size": 743
  },
  "lib/db/tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "69c976d11de35f0a",
   "mtime": 1792228805,
   "size": 244
  },
  "package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "0eee75b762d97c72",
   "mtime": 1792228805,
   "size": 649
  },
  "pnpm-workspace.yaml": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "eca3f132f1e94e10",
   "mtime": 1792228805,
   "size": 6674
  },
  "replit.md": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "21a531207c7ccc9e",
   "mtime": 1792228805,
   "size": 1521
  },
  "scripts/package.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "e321044da26540ad",
   "mtime": 1792228805,
   "size": 281
  },
  "scripts/post-merge.sh": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "b9e43e43dcbacd4b",
   "mtime": 1792228805,
   "size": 72
  },
  "scripts/src/hello.ts": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "9a865c3de9900891",
   "mtime": 1792228805,
   "size": 46
  },
  "scripts/tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "636dea76ed898c62",
   "mtime": 1792228805,
   "size": 157
  },
  "tsconfig.base.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "2dfaa6f6168f618e",
   "mtime": 1792228805,
   "size": 692
  },
  "tsconfig.json": {
   "analyzed_at": "2026-10-17T10:25:54Z",
   "hash": "8883c5dbf9e073ef",
   "mtime": 1792228805,
   "size": 236
  }
 },
 "generated_at": "2026-10-17T10:25:54Z",
 "git_commit": "1402b85",
 "manifest_version": 1,
 "root": "/home/ommadure/Desktop/Portfolio/Interactive-Portfolio"
}
```

</details>
<!-- codebase-context:manifest:end -->
