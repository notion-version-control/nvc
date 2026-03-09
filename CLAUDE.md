# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start all dev servers (Next.js with Turbopack)
pnpm build        # Build all packages
pnpm lint         # Run ESLint across workspace
pnpm format       # Format with Prettier
pnpm typecheck    # Run tsc --noEmit across workspace

# Run for specific app/package
pnpm --filter web dev
pnpm --filter @workspace/ui typecheck
pnpm --filter @workspace/api typecheck
```

No test framework is configured yet.

## Architecture

**Monorepo** managed by pnpm workspaces + Turbo.

```
apps/web/       # Next.js 16 app (App Router, React 19, Turbopack)
packages/
  api/          # Backend data layer — Supabase encapsulated here only
  ui/           # Shared component library (shadcn/ui + Radix UI + CVA)
  eslint-config/    # Shared ESLint flat config
  typescript-config/  # Shared tsconfig base
```

### Key architectural patterns

- **API package isolation**: All Supabase logic lives exclusively in `packages/api`. The Supabase client is in `src/lib/supabase.ts` (internal only, never re-exported). Features are organized under `src/features/{feature}/` with `types.ts`, `queries.ts`, `mutations.ts`, and `index.ts`. External consumers import only domain types and functions — no Supabase types leak out. Imports: `import { getPage } from "@workspace/api/pages"`.
- **Shared UI package**: Components in `packages/ui/src/components/` are exported from `@workspace/ui` and consumed by `apps/web`. The web app transpiles this package via `next.config.mjs`.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`). Global CSS with oklch design tokens lives in `packages/ui/src/styles/globals.css`. Component variants use `class-variance-authority` (CVA) + `tailwind-merge` + `clsx` (aliased as `cn()`).
- **Theme**: `next-themes` with a client ThemeProvider in `apps/web/components/theme-provider.tsx`. Theme toggled via `d` keyboard shortcut.
- **Validation**: Zod is available but not yet wired up.
- **No tests yet**: Coverage directory referenced in `.gitignore` but no test runner configured.

### Adding a new API feature

1. Create `packages/api/src/features/{feature}/` with `types.ts`, `queries.ts`, `mutations.ts`, `index.ts`
2. Add the export entry to `packages/api/package.json` exports field: `"./{feature}": "./src/features/{feature}/index.ts"`
3. Never import from `@supabase/supabase-js` outside `packages/api`

### Adding shadcn components

Run `npx shadcn@latest add <component>` from `packages/ui/`. Components land in `packages/ui/src/components/`.
