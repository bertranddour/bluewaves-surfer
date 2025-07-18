# Changelog

All notable changes to Surfer Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Pill-Shaped Component System**: Professional pill buttons and badges with consistent styling
  - Pill buttons with 7 variants: primary, secondary, outline, ghost, destructive, success, warning
  - Pill badges with 8 variants: primary, secondary, success, warning, danger, info, dark, light
  - 5 size system: xs, sm, md, lg, xl with proper height/padding ratios
  - Combination classes: badge groups, button groups, badges with dots/remove buttons
  - Dark mode support and accessibility features
- **Heroicons Integration**: Complete React icon library with all sizes and styles
  - 24x24 outline icons (`@heroicons/react/24/outline`)
  - 24x24 solid icons (`@heroicons/react/24/solid`)
  - 20x20 solid icons (`@heroicons/react/20/solid`)
  - 16x16 solid icons (`@heroicons/react/16/solid`)
- **Enhanced CLI Commands**: All commands now support Heroicons installation
  - `bluewaves create` - Includes Heroicons by default in new projects
  - `bluewaves init` - Interactive prompt to install Heroicons
  - `bluewaves update` - Detects and offers to install Heroicons if missing
- **Package Manager Support**: Dynamic package manager detection for all error messages
- **Documentation Updates**: Comprehensive examples and usage guides for Heroicons and pill components
- Initial release of Surfer Design System
- Core design tokens with OKLCH color system
- Enhanced shadcn/ui components
- CLI for project initialization
- Tailwind CSS v4 preset
- TypeScript support
- Performance optimizations for Next.js

### Components
- Button component with loading states and variants
- Card component with multiple variants
- Enhanced utilities and helpers

### CLI Features
- `surfer init` - Initialize design system in Next.js project
- `surfer add` - Add individual components
- `surfer generate` - Generate new components
- `surfer analyze` - Performance and bundle analysis
- `surfer update` - Update design system

## [1.0.0] - 2024-01-01

### Added
- Initial release 🏄‍♂️
- S-tier design system for Next.js + shadcn/ui
- Complete design token system
- Enhanced component library
- CLI tooling
- Performance optimizations
- TypeScript support
- Comprehensive documentation

### Technical Features
- OKLCH color system for perceptual uniformity
- CSS-in-CSS architecture (zero runtime overhead)
- Tailwind v4 integration
- Next.js 15+ optimization
- Tree-shaking support
- Bundle size optimization
- Core Web Vitals optimization

### Developer Experience
- One-command installation
- Hot reload support
- TypeScript IntelliSense
- Comprehensive documentation
- Example templates
- Performance analytics