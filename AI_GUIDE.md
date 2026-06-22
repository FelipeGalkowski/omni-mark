# Omni-Mark AI Onboarding Guide

Welcome. This file is the entry point for any AI assistant working on Omni-Mark. It covers what this project is, how to work with it, and how to use the skills system to get better results.

---

## Project Snapshot

Omni-Mark is a Vite + React 19 + TypeScript SPA that serves as a Mercado Livre seller dashboard.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server, opens browser automatically |
| `npm run build` | `tsc -b && vite build` (typecheck + bundle) |
| `npm run typecheck` | `tsc --noEmit` only |
| `npm run lint` | ESLint flat config |
| `npm run format` | Prettier; sorts Tailwind classes |
| `npm run preview` | Serve the production build |
| `npm run deploy` | Build then push to `gh-pages -d dist` |

> **There is no test script.** Verify your changes with `npm run lint`, `npm run typecheck`, and `npm run build` before assuming they're correct.

---

## Code Conventions

These are enforced by tooling. Breaking them will cause CI failures.

- **ESLint + Prettier**: no semicolons, double quotes, 2 spaces, LF line endings, trailing comma `es5`
- **TypeScript strict** mode — `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` are on
  - For type-only imports: `import type { Foo } from './foo'`
- **React 19** — one component per file for HMR to work correctly
- **Path alias**: `@/*` maps to `src/*` (declared in `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`)
- **Tailwind v4** via `@tailwindcss/vite`; use `cn(...)` from `@/lib/utils` for class composition
- **shadcn/ui**: style `radix-maia`, base color `neutral`, icon library `hugeicons`; add primitives with `npx shadcn@latest add <name>`

### Provider Order

`main.tsx` mounts providers in this order: `AuthProvider` → `ThemeProvider` → `QueryClientProvider` → page. Don't reorder.

### Auth Flow

The OAuth callback lands at `/?auth=success&token=...` (or `/?auth=error&error=...`). The `AuthContext` stores the token under `sessionStorage["omnimark:accessToken"]` and strips the query string. Don't alter this contract.

### Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_MELI_API_URL` | Backend base URL (axios `baseURL`) |
| `VITE_MELI_SELLER_ID` | Fallback seller ID (currently unused; seller ID is parsed from the access token in `OrdersService.getSellerId`) |

### Deployment

Vite `base` is set to `"/omni-mark"`. The app is served at `https://felipegalkowski.github.io/omni-mark/`. Deploy hard-codes pnpm — use `npm run deploy` or run `pnpm run build && gh-pages -d dist` directly.

---

## The Skills System

Skills are specialized instruction bundles that the AI loads on demand to handle specific kinds of work better. Think of them as plug-ins that give the AI deeper knowledge of a domain (React performance, browser automation, UI design, etc.).

### How to Invoke a Skill

Just ask for what you want in plain language. The AI checks its trigger table and loads the right skill(s) automatically. You don't need to say "load the accessibility skill" — things like "WCAG audit" or "improve keyboard navigation" will naturally trigger it.

If you want to be explicit: "use the playwright skill to test the login flow" works fine.

### Skill Bundles Are Untracked

Directories `.claude/`, `.cursor/`, `.opencode/`, and `.windsurf/` contain personal agent config and skill bundles. They are gitignored. Don't commit them.

---

## Skills Catalog

Use this table to figure out what to ask for and what gets loaded.

| You want… | Ask like… | Skill(s) loaded |
|---|---|---|
| Build a feature end-to-end | "build me X", "implement Y", "design and build this" | `tlc-spec-driven` |
| Quick fix, ≤3 files | "fix this bug", "small refactor" | `coding-guidelines` |
| Formal design doc or RFC before coding | "write a design doc", "create an RFC", "technical spec" | `technical-design-doc-creator` |
| Map the codebase / understand architecture | "how big is each module", "what components exist", "size the monolith" | `component-identification-sizing` |
| Build or redesign a UI | "build a dashboard", "redesign this page", "create a component", or share a mockup/screenshot | `frontend-blueprint` (+ optionally `frontend-design`) |
| Distinctive, high-design-quality UI | "make it look great", "production-grade UI" | `frontend-design` |
| React performance optimization | "optimize this component", "improve bundle size", "reduce re-renders" | `react-best-practices` |
| React component architecture | "refactor this component API", "kill boolean prop proliferation", "design a compound component" | `react-composition-patterns` |
| Security review | "security audit", "check for vulnerabilities", "secure-by-default" | `security-best-practices` |
| Accessibility (WCAG, screen reader, keyboard nav) | "a11y audit", "WCAG compliance", "improve keyboard navigation" | `accessibility` |
| UI/UX visual review | "review my UI", "design audit", "check UX" | `web-design-guidelines` |
| Web performance (bundle size, lazy loading, Core Web Vitals) | "site is slow", "reduce bundle size", "improve page speed" | `perf-web-optimization` |
| Browser debugging, network inspection, profiling | "debug this page", "inspect console errors", "profile performance" | `chrome-devtools` |
| E2E browser testing | "test this flow", "automate the login", "validate this UI" | `playwright-skill` |
| Write or edit documentation | "write a README", "improve this guide", "edit this doc" | `docs-writer` |
| General code quality / best practices | "best practices review", "modernize this code" | `best-practices` |
| Learn something after building it | "teach me how X works", "explain this module" | `learning-opportunities` |

---

## Priority Rules

These govern how skills combine with each other.

1. **`coding-guidelines`** is always loaded alongside any build or implementation task — it's the baseline, not an optional extra.
2. **`tlc-spec-driven`** drives the workflow when loaded. If you're doing end-to-end planning or building, it orchestrates the other skills.
3. **`frontend-blueprint`** runs **before** `frontend-design` for any redesign or new UI. Skip blueprint only for trivial inline components.
4. **`technical-design-doc-creator`** and the Design phase of `tlc-spec-driven` are alternatives — the former for formal RFCs, the latter for lighter architecture discussions.
5. **`accessibility`** and **`web-design-guidelines`** are not substitutes — accessibility is technical WCAG compliance, web-design-guidelines is visual/UX review.
6. **`security-best-practices`** and **`best-practices`** — the former is for explicit security focus, the latter for general code quality.
7. **Do not request `perf-astro`** — this project is Vite + React, not Astro. It will never be relevant here.

---

## What the AI Checks Before Answering

The agent follows a knowledge verification chain for every question:

1. **Codebase** — reads existing code, conventions, and patterns
2. **Project docs** — `README`, `docs/`, inline comments, `AGENTS.md`, this file
3. **Context7 MCP** — resolves the library ID, then queries API patterns and examples
4. **Web search** — official docs and reputable sources
5. **Uncertain?** — says "I don't know" rather than fabricating

---

## Common Pitfalls

- **Don't ask for tests** — there is no test script. Verify with `lint` + `typecheck` + `build`.
- **Only one page exists** — `pages/dashboard/index.tsx`. Don't request features in other pages without first scoping the work.
- **Don't commit skill bundles** — `.claude/`, `.cursor/`, `.opencode/`, `.windsurf/` are gitignored for a reason.
- **Don't use Astro-specific skills** — `perf-astro` is never relevant.
- **Don't invent `npm test`** — it doesn't exist. If you're asked to run tests, report that there is no test script and suggest `lint` + `typecheck` + `build` as the verification path.

---

## Where to Go Next

- **`AGENTS.md`** (project root) — agent-facing behavioral rules and provider setup (more terse than this guide)
- **`.opencode/skills/AGENTS.md`** — full skill selection guide with exact trigger phrases the AI uses
- **`.opencode/skills/<name>/SKILL.md`** — the raw skill instructions for any specific skill (read these to understand exactly what a skill does or to extend it)
