# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Surfer Design System** is an S-tier design system built for Next.js + shadcn/ui. It's a npm package that provides enhanced UI components, design tokens, CLI tools, and Next.js optimizations.

### Key Technologies
- **TypeScript** with strict mode enabled
- **tsup** for building and bundling (multi-format: CJS/ESM)
- **Vitest** for testing (`pnpm test`, `pnpm test:ui`)
- **Storybook** for component development (`pnpm storybook`)
- **pnpm** as the package manager
- **Next.js 15+** optimization focus
- **Tailwind CSS v4** with custom preset

## Development Commands

```bash
# Build the package
pnpm build

# Development mode with watch
pnpm dev

# Run tests
pnpm test
pnpm test:watch
pnpm test:ui
pnpm test:coverage

# Type checking
pnpm typecheck

# Linting and formatting
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check

# Storybook development
pnpm storybook
pnpm build-storybook

# Clean and release
pnpm clean
pnpm prepublishOnly
pnpm release
```

## Architecture

### Package Structure
- **CLI Tools**: `src/cli/` - Currently only `init.ts` for project setup (other commands referenced but not implemented)
- **Components**: `src/components/` - Token-based design system exports and philosophy
- **Design Tokens**: `src/tokens.ts` - Custom OKLCH color system and fonts (DM Sans, JetBrains Mono, Lato)
- **Utils**: `src/lib/utils.ts` - Core utilities including `cn()` function
- **Build Exports**: Multiple entry points via tsup configuration

### Design System Architecture
- **Token-based approach**: Provides only custom tokens that extend Tailwind 4.1 and shadcn/ui defaults
- **Custom OKLCH colors**: Extended color palette with perceptual uniformity
- **Custom fonts**: DM Sans, JetBrains Mono, and Lato font families
- **Framework agnostic**: Designed to work with any UI framework through CSS custom properties

### CLI Architecture
The package provides a CLI tool (`surfer`) with limited implementation:
- `init` - **Main command**: Setup Surfer in Next.js projects with token installation
- Other commands (`add`, `update`, `analyze`, `generate`) are referenced in documentation but not currently implemented

### Next.js Integration
- Optimized for **Next.js App Router**
- **Server Components** ready
- Bundle splitting optimizations
- Tailwind CSS v4 preset included
- Performance-first CSS architecture

## Key Files

- `src/cli/init.ts` - Main CLI command for installing Surfer tokens in Next.js projects
- `src/components/index.ts` - Design philosophy exports and usage examples
- `src/index.ts` - Main package entry point with version and branding
- `src/tokens.ts` - Custom design tokens (OKLCH colors and fonts)
- `tsup.config.ts` - Build configuration with multiple entry points and CSS copying
- `package.json` - Defines CLI binary (`surfer`) and export paths

## Design System Principles

- **Minimal Custom Tokens**: Only provides what Tailwind 4.1 and shadcn/ui don't include
- **OKLCH color system** for perceptual uniformity across custom colors
- **CSS-in-CSS** architecture (no runtime overhead)
- **Framework agnostic**: Works with any UI framework through CSS custom properties
- **Token-based approach**: Maximum flexibility and maintainability

## Testing Strategy

Uses **Vitest** for testing:
- Run single test: `pnpm test <test-name>`
- UI mode available: `pnpm test:ui`
- Type checking: `pnpm typecheck`

## Important Architecture Notes

### Current State vs Documentation
- **CLI Implementation**: Only `init` command is implemented; other commands referenced in README/docs are not yet built
- **Component System**: Currently provides design tokens only, not pre-built components
- **Design Philosophy**: Token-based system that works with shadcn/ui rather than replacing it

### CLI Implementation
The CLI (`src/cli/init.ts`) uses:
- **commander.js** for command parsing
- **inquirer** for interactive prompts
- **ora** for loading spinners
- **execa** for running shell commands
- **fs-extra** for file operations

### Build Process
- **tsup** builds multiple entry points: `index`, `components/index`, `hooks/index`, `utils/index`, `cli/init`
- Supports both CJS and ESM formats
- External dependencies: React ecosystem packages
- "use client" banner only for non-CLI components
- CSS files copied from `src/styles/` to `dist/styles/` during build