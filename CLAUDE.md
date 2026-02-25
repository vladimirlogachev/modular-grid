# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `pnpm dev` (Vite dev server with HMR)
- **Build**: `pnpm build` (runs `tsc -b && vite build`)
- **Preview**: `pnpm preview` (serve production build locally)
- **Package manager**: pnpm

There are no tests, linting, or formatting configured.

## Architecture

This is a React 19 + TypeScript + Vite application implementing a modular grid layout system ported from Elm. The core library lives in `src/modular-grid/` and a demo app lives in `src/example/`.

### Core Library (`src/modular-grid/`)

The grid system uses a modular math formula for precise, step-based sizing:
```
stepWidth = (contentWidth - gutter * (columns - 1)) / columns
result = stepWidth * steps + gutter * (steps - 1)
```

**Key modules:**

- **types.ts** — `WindowSize`, `GridMargin`, `ScreenConfig`, `GridState`, `GridContextValue`
- **context.tsx** — React Context + `useGrid()` hook for accessing grid state
- **calculations.ts** — Pure functions for grid math (`widthOfGridStepsFloat`, `widthOfGridStepsStyle`, `heightOfGridStepsStyle`, `scaleProportionallyFloat`, `scaleProportionallyStyle`)
- **components.tsx** — `GridRow`, `GridColumn`, `GridBox`, `Section` layout components
- **grid-layout-1/2/3.tsx** — Responsive providers for 1, 2, or 3 breakpoints respectively

**Public API** is exported from `index.ts`. Layout providers are namespaced (`GridLayout1`, `GridLayout2`, `GridLayout3`).

### Responsive Provider Pattern

Each `GridLayoutNProvider` listens to window resize and computes grid state for the current breakpoint. They expose two contexts: `ScreenClassContext` (breakpoint label) and `GridContext` (computed grid values). The `useScreenClass()` hook is exported per-layout module (not shared) since screen class types differ.

- **GridLayout1**: mobile only
- **GridLayout2**: mobile + desktop (breakpoint at `desktopScreen.minGridWidth`)
- **GridLayout3**: mobile + tablet + desktop

Desktop breakpoints clamp only `maxGridWidth` (not min), allowing expansion. Mobile/tablet clamp both.

### Component Double-Wrapping

`GridColumn` and `GridBox` use a double-div pattern: outer div for grid sizing constraints (flex, max/min width), inner div for user-provided styles. Width uses `ceil` for maxWidth and float for minWidth to match the Elm implementation.

### Example App (`src/example/`)

Demonstrates a two-breakpoint layout (mobile/desktop) with responsive typography and grid-based content blocks. Entry: `App.tsx` → `GridLayout2Provider` → `SingleSectionLayout` → `HomePage`.
