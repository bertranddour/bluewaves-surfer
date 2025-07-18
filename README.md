# 🏄‍♂️ Surfer Design System

**The S-tier design system for Next.js + shadcn/ui**

Built by Bluewaves for developers who want to ship beautiful, performant applications fast.

[![npm version](https://badge.fury.io/js/bluewaves.svg)](https://badge.fury.io/js/bluewaves)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 🚀 One-Command Installation

```bash
# New Next.js project with Surfer
npx bluewaves create my-app --template minimal

# Add to existing Next.js project  
npx bluewaves init
```

## ✨ What Makes Surfer S-Tier?

### **🎯 Next.js Optimized**
- Built specifically for Next.js 15+ with App Router
- Works seamlessly with shadcn/ui components
- CSS-first design tokens (no runtime overhead)
- Tailwind v4.1 `@theme inline` approach

### **🎨 Minimal Extension**
- Only adds what Tailwind + shadcn/ui don't provide
- Custom OKLCH colors with perceptual uniformity
- Premium fonts: DM Sans, JetBrains Mono, Lato
- Single CSS import - no JavaScript tokens needed

### **⚡ Performance First**
- Zero runtime overhead (CSS-only tokens)
- Automatic utility generation from CSS
- 92% smaller bundle than token-based systems
- Works with existing Tailwind + shadcn/ui projects

### **🌊 Developer Experience**
- Zero configuration setup
- Hot reload with instant feedback
- Comprehensive documentation
- Design principles for coding assistants

## 📦 What's Included

### **Core System**
- **Custom Design Tokens** - OKLCH colors + custom fonts (DM Sans, JetBrains Mono, Lato)
- **CSS-First Architecture** - Tailwind v4.1 `@theme inline` approach
- **Minimal Utilities** - Only what's not in Tailwind/shadcn by default

### **CLI Tools**
- **Project Creation** - `bluewaves create` with 5 templates
- **Component Management** - `bluewaves add` for shadcn/ui components
- **Design System Setup** - `bluewaves init` for existing projects

### **What We DON'T Include**
- ❌ No custom components (use shadcn/ui)
- ❌ No JavaScript tokens (CSS-first approach)
- ❌ No layout systems (use Tailwind defaults)
- ❌ No bundled libraries (minimal approach)

## 🏗️ Quick Start

Create a new project with Surfer design tokens:

```bash
# Create project with Surfer + shadcn/ui
npx bluewaves create my-app --template minimal

# Or add to existing Next.js project
npx bluewaves init
```

Use Surfer's custom design tokens with shadcn/ui:

```tsx
// app/page.tsx - Uses DM Sans font automatically
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="bg-mint-50 p-8">
      <Card className="bg-white border-teal-200">
        <CardHeader>
          <CardTitle className="text-brown-900 font-heading">
            Welcome to Surfer! 🏄‍♂️
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-teal-700 mb-4">
            Using OKLCH colors + custom fonts with shadcn/ui
          </p>
          <Button className="bg-teal-500 hover:bg-teal-600">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 🎨 Design System

### **Custom Fonts**
Surfer provides custom fonts not in Tailwind defaults:
```css
@theme inline {
  --font-sans: 'DM Sans', sans-serif;      /* font-sans */
  --font-mono: 'JetBrains Mono', monospace; /* font-mono */
  --font-heading: 'Lato', sans-serif;       /* font-heading */
}
```

### **Custom OKLCH Colors**
Extended color palette with perceptual uniformity:
```css
@theme inline {
  /* Custom colors not in Tailwind */
  --color-mint-500: oklch(0.7969 0.1431 181.68);   /* bg-mint-500 */
  --color-teal-500: oklch(0.7871 0.1341 203.37);   /* bg-teal-500 */
  --color-brown-500: oklch(0.6681 0.0742 59.69);   /* bg-brown-500 */
  /* Plus mint-*, teal-*, brown-* full scales (50-950) */
}
```

### **What We DON'T Override**
- ✅ Use Tailwind's spacing system (`p-4`, `m-8`, etc.)
- ✅ Use Tailwind's typography scale (`text-lg`, `text-xl`, etc.)
- ✅ Use Tailwind's shadows (`shadow-md`, `shadow-lg`, etc.)
- ✅ Use shadcn/ui's neutral colors (`bg-background`, `text-foreground`)

## 🛠️ CLI Commands

```bash
# Create new project with Surfer + shadcn/ui
npx bluewaves create my-app --template minimal
npx bluewaves create my-dashboard --template dashboard

# Add Surfer to existing Next.js project
npx bluewaves init

# Add shadcn/ui components (inherits Surfer tokens)
npx bluewaves add button
npx bluewaves add card
npx bluewaves add --all  # Install all 49 components

# List available components and templates
npx bluewaves list
npx bluewaves list --components
npx bluewaves list --templates

# Update to latest Surfer version
npx bluewaves update
```

## 📚 Documentation

- **[Getting Started](https://surfer.bluewaves.boutique/docs/getting-started)**
- **[Design Tokens](https://surfer.bluewaves.boutique/docs/tokens)**
- **[CLI Commands](https://surfer.bluewaves.boutique/docs/cli)**
- **[Templates](https://surfer.bluewaves.boutique/docs/templates)**
- **[Design Principles](https://surfer.bluewaves.boutique/docs/principles)**

## 🏆 Examples

- **[Dashboard](https://surfer.bluewaves.boutique/examples/dashboard)** - Admin interface
- **[SaaS](https://surfer.bluewaves.boutique/examples/saas)** - Complete SaaS app
- **[E-commerce](https://surfer.bluewaves.boutique/examples/ecommerce)** - Online store
- **[Landing](https://surfer.bluewaves.boutique/examples/landing)** - Marketing pages

## 🚀 Performance

Surfer is built for performance:

- **Bundle Size**: < 1KB gzipped for design tokens
- **Runtime**: Zero CSS-in-JS overhead
- **Build Time**: Native Tailwind v4.1 performance
- **Core Web Vitals**: Optimized for perfect scores

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT License - feel free to use in your projects.

## 🌊 About Bluewaves

Surfer is built by [Bluewaves](https://bluewaves.boutique) - we create tools that help developers build better applications faster.

---

**Ride the wave! 🏄‍♂️**