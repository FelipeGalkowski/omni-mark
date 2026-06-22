# Omni-Mark Agent Instructions

Vite + React 19 + TypeScript SPA for the Mercado Livre seller dashboard.

## Scripts
- `npm run dev` — Vite dev server, opens browser automatically.
- `npm run build` — `tsc -b && vite build` (typecheck via project references).
- `npm run typecheck` — `tsc --noEmit` only.
- `npm run lint` — ESLint flat config (`eslint.config.js`).
- `npm run format` — Prettier (no `--check`); sorts Tailwind classes via `prettier-plugin-tailwindcss`.
- `npm run preview` — serve the production build.
- `npm run deploy` — `predeploy` runs `pnpm run build` then `gh-pages -d dist`.

There is **no test script**. Do not invent one; verify with `lint` + `typecheck` + `build`.

## Path aliases
- `@/*` → `src/*` (declared in `tsconfig.json`, `tsconfig.app.json`, and `vite.config.ts`).

## Deployment
- Vite `base: "/omni-mark"` → app served at `https://felipegalkowski.github.io/omni-mark/`.
- Deploy hard-codes pnpm; use `npm run deploy` or run `pnpm run build && gh-pages -d dist` directly.

## Environment
- `VITE_MELI_API_URL` — backend base URL (axios `baseURL` in `src/service/httpClient.ts`).
- `VITE_MELI_SELLER_ID` — fallback seller id (currently unused; seller id parsed from access token in `OrdersService.getSellerId`).
- `.env.local` overrides `.env.production`; both are gitignored (`*.local`).

## Auth flow (Mercado Livre OAuth)
- `src/context/AuthContext.tsx` registers a request interceptor that adds `Authorization: Bearer <token>`.
- Callback contract: backend redirects to `/?auth=success&token=...` (or `/?auth=error&error=...`); the context stores the token under `sessionStorage["omnimark:accessToken"]` and strips the query string.
- `signIn()` fetches the authorize URL via `AuthService.getAuthUrl()` and returns it (caller handles navigation).

## Architecture (`src/`)
- `main.tsx` → `App.tsx` (provider order: `AuthProvider` → `ThemeProvider` → `QueryClientProvider` → page).
- `pages/` — route-level views; only `pages/dashboard/index.tsx` exists today.
- `components/` — feature/composition components (`app-sidebar`, `site-header`, `section-cards`, `chart-area-interactive`, `data-table`, `nav-*`).
- `components/ui/` — shadcn primitives (do not edit by hand beyond `npx shadcn@latest add <name>`).
- `service/` — axios-backed API classes (`AuthService`, `OrdersService`, `httpClient`).
- `hooks/` — query hooks (`useGetOrders`, `useGetOrdersCount`, `useAuth`).
- `lib/` — `queryClient` (TanStack), `utils.cn` (clsx + tailwind-merge).
- `config/` — constants (`storageKeys`).
- `context/` — React contexts (`AuthContext`).

## shadcn / UI
- Style: `radix-maia`, base color `neutral`, icon library `hugeicons` (`components.json`).
- Add a primitive: `npx shadcn@latest add <name>` (lands in `src/components/ui/`).
- Tailwind v4 via `@tailwindcss/vite`; tokens as CSS variables in `src/index.css`.
- Use `cn(...)` from `@/lib/utils` for class composition.

## Conventions
- ESLint flat config + Prettier (no semicolons, double quotes, 2 spaces, LF, 80 cols, trailing comma `es5`).
- TypeScript strict + `noUnusedLocals` + `noUnusedParameters` + `verbatimModuleSyntax` — use `import type` for type-only imports.
- React 19; one component per file for HMR (`react-refresh/only-export-components` warn).

## Provider / instruction files
- This file is the primary agent instruction source.
- Skill selection guide: `.opencode/skills/AGENTS.md` — consult before loading any skill.
- Agent skill bundles under `.claude/`, `.cursor/`, `.opencode/`, `.windsurf/` are untracked — do not commit them.
- No CI / `.github/`; deployment is manual via `npm run deploy`.
