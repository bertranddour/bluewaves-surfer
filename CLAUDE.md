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
pnpm test:ui

# Type checking
pnpm typecheck

# Linting and formatting
pnpm lint
pnpm format

# Storybook development
pnpm storybook
pnpm build-storybook
```

## Architecture

### Package Structure
- **CLI Tools**: `src/cli/` - Command-line interface for init, add, update, analyze, generate
- **Components**: `src/components/` - Enhanced shadcn/ui components with Surfer design system
- **Design Tokens**: `src/tokens/` - Color system (OKLCH), typography, spacing
- **Utils**: `src/lib/utils.ts` - Core utilities including `cn()` function
- **Build Exports**: Multiple entry points via tsup configuration

### Component System
- Built on **shadcn/ui** foundation with enhancements
- Uses **Radix UI** primitives
- **class-variance-authority** for variant management
- Component registry system in `src/components/index.ts`
- Categories: UI, Forms, Navigation, Feedback, Data, Layout, Marketing

### CLI Architecture
The package provides a CLI tool (`surfer`) with commands:
- `init` - Setup Surfer in Next.js projects (main entry point)
- `add` - Add individual components
- `update` - Update design system
- `analyze` - Performance analysis
- `generate` - Code generation

### Next.js Integration
- Optimized for **Next.js App Router**
- **Server Components** ready
- Bundle splitting optimizations
- Tailwind CSS v4 preset included
- Performance-first CSS architecture

## Key Files

- `src/cli/init.ts` - Main installation logic for Next.js projects
- `src/components/index.ts` - Component registry and exports
- `src/index.ts` - Main package entry point
- `src/tailwind.config.ts` - Tailwind preset configuration
- `tsup.config.ts` - Build configuration with multiple entry points
- `package.json` - Defines CLI binary and export paths

## Design System Principles

- **OKLCH color system** for perceptual uniformity
- **CSS-in-CSS** architecture (no runtime overhead)
- **Accessibility-first** with WCAG 2.1 compliance
- **Performance optimizations** for Core Web Vitals
- **Component ownership** - users control the code

## Testing Strategy

Uses **Vitest** for testing:
- Run single test: `pnpm test <test-name>`
- UI mode available: `pnpm test:ui`
- Type checking: `pnpm typecheck`

## Common Patterns

### Adding New Components
1. Create component in `src/components/ui/`
2. Export from `src/components/index.ts`
3. Add to `COMPONENT_REGISTRY` with metadata
4. Update CLI add command if needed

### CLI Commands
The CLI uses **commander.js**, **inquirer** for prompts, **ora** for spinners, and **execa** for shell commands.

### Build Process
- **tsup** builds multiple entry points simultaneously
- Supports both CJS and ESM formats
- External dependencies for React ecosystem
- "use client" banner for client components