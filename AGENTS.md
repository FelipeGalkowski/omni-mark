# Omni-Mark Agent Instructions

## Tech Stack
- Vite + React 19 + TypeScript
- shadcn/ui (radix-maia style, hugeicons)
- Tailwind CSS v4 (@tailwindcss/vite)
- TanStack Query, TanStack Table, Recharts

## Key Commands
```bash
npm run dev      # Start dev server (opens browser)
npm run build    # Typecheck then build
npm run lint     # ESLint
npm run format   # Prettier (includes Tailwind)
npm run typecheck # TypeScript check only
npm run preview  # Preview production build
npm run deploy   # Build + deploy to GitHub Pages (uses pnpm)
```

## Path Aliases
- `@/*` -> `src/*`

## Deployment
- Base path: `/omni-mark` (configured in vite.config.ts)
- Deploy runs: `pnpm run build` then `gh-pages -d dist`

## Component Management
Components are in `src/components/ui/` and added via shadcn CLI:
```bash
npx shadcn@latest add button
```

## Context7 MCP
- Always use Context7 to fetch documentation when the user asks about libraries, frameworks, APIs, code generation, setup or configuration steps
- If unsure which library or version the user means, ask for clarification

## Code Style
- ESLint + Prettier with prettier-plugin-tailwindcss
- React 19 with strict hooks rules