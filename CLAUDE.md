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
```

No test framework is configured yet.

## Architecture

**Monorepo** managed by pnpm workspaces + Turbo.

```
apps/web/       # Next.js 16 app (App Router, React 19, Turbopack)
packages/
  ui/           # Shared component library (shadcn/ui + Radix UI + CVA)
  eslint-config/    # Shared ESLint flat config
  typescript-config/  # Shared tsconfig base
```

### Key architectural patterns

- **Shared UI package**: Components in `packages/ui/src/components/` are exported from `@workspace/ui` and consumed by `apps/web`. The web app transpiles this package via `next.config.mjs`.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`). Global CSS with oklch design tokens lives in `packages/ui/src/styles/globals.css`. Component variants use `class-variance-authority` (CVA) + `tailwind-merge` + `clsx` (aliased as `cn()`).
- **Theme**: `next-themes` with a client ThemeProvider in `apps/web/components/theme-provider.tsx`. Theme toggled via `d` keyboard shortcut.
- **Validation**: Zod is available but not yet wired up.
- **No tests yet**: Coverage directory referenced in `.gitignore` but no test runner configured.

### Adding shadcn components

Per README: run `npx shadcn@latest add <component>` from `packages/ui/`. Components land in `packages/ui/src/components/`.
