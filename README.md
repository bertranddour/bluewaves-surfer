# 🏄‍♂️ Surfer Design System

**The S-tier design system for Next.js + shadcn/ui**

Built by Bluewaves for developers who want to ship beautiful, performant applications fast.

[![npm version](https://badge.fury.io/js/%40bluewaves%2Fsurfer.svg)](https://badge.fury.io/js/%40bluewaves%2Fsurfer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 🚀 One-Command Installation

```bash
# New Next.js project
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npx @bluewaves/surfer init

# Existing Next.js project  
npx @bluewaves/surfer init
```

## ✨ What Makes Surfer S-Tier?

### **🎯 Next.js Optimized**
- Built specifically for Next.js 15+ with App Router
- Server Components ready with SSR/SSG optimizations
- Automatic bundle splitting and code optimization
- Core Web Vitals monitoring built-in

### **🎨 Enhanced shadcn/ui**
- All shadcn/ui components + advanced patterns
- Component ownership - you control the code
- Accessibility-first with WCAG 2.1 compliance
- TypeScript native with full type safety

### **⚡ Performance First**
- OKLCH color system for perceptual uniformity
- CSS-in-CSS architecture (no runtime overhead)
- Tailwind v4 with 5x faster builds
- Tree-shaking optimized components

### **🌊 Developer Experience**
- Zero configuration setup
- Hot reload with instant feedback
- Comprehensive documentation
- VS Code extension (coming soon)

## 📦 What's Included

### **Core System**
- **50+ Components** - Enhanced shadcn/ui with advanced patterns
- **Design Tokens** - Colors, typography, spacing, shadows
- **CSS Architecture** - Tailwind v4 + CSS custom properties
- **Layout System** - Responsive grid and utilities

### **Advanced Features**
- **Animation Library** - Framer Motion integration
- **Form System** - React Hook Form + Zod validation
- **Data Components** - Tables, charts, and data viz
- **Marketing Components** - Landing page building blocks

### **Developer Tools**
- **CLI** - Install, update, and manage components
- **Storybook** - Component playground and documentation
- **Performance Analytics** - Bundle analysis and metrics
- **Templates** - Dashboard, SaaS, E-commerce starters

## 🏗️ Quick Start

After installation, your project includes:

```tsx
// app/page.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="surfer-container surfer-section">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Surfer! 🏄‍♂️</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your S-tier design system is ready.</p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 🎨 Design System

### **Colors**
OKLCH color system with perceptual uniformity:
```css
/* Brand colors */
--color-primary: oklch(0.7871 0.1341 203.37);
--color-secondary: oklch(0.6681 0.0742 59.69);
--color-accent: oklch(0.8076 0.1351 221.84);
```

### **Typography**
```css
/* Typography scale */
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'Fira Code', monospace;
--font-heading: 'Inter', system-ui, sans-serif;
```

### **Spacing**
```css
/* Spacing system */
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-4: 1rem;
--spacing-8: 2rem;
```

## 🛠️ CLI Commands

```bash
# Add components
npx surfer add button
npx surfer add data-table
npx surfer add marketing-hero

# Generate new components
npx surfer generate component MyComponent
npx surfer generate page Dashboard

# Update design system
npx surfer update

# Analyze performance
npx surfer analyze --performance --bundle-size

# Development mode
npx surfer dev
```

## 📚 Documentation

- **[Getting Started](https://surfer.bluewaves.ai/docs/getting-started)**
- **[Components](https://surfer.bluewaves.ai/docs/components)**
- **[Design Tokens](https://surfer.bluewaves.ai/docs/tokens)**
- **[Templates](https://surfer.bluewaves.ai/docs/templates)**
- **[Performance](https://surfer.bluewaves.ai/docs/performance)**

## 🏆 Examples

- **[Dashboard](https://surfer.bluewaves.ai/examples/dashboard)** - Admin interface
- **[SaaS](https://surfer.bluewaves.ai/examples/saas)** - Complete SaaS app
- **[E-commerce](https://surfer.bluewaves.ai/examples/ecommerce)** - Online store
- **[Marketing](https://surfer.bluewaves.ai/examples/marketing)** - Landing pages

## 🚀 Performance

Surfer is built for performance:

- **Bundle Size**: < 50KB gzipped for complete system
- **Runtime**: Zero CSS-in-JS overhead
- **Build Time**: 5x faster with Tailwind v4
- **Core Web Vitals**: Optimized for perfect scores

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT License - feel free to use in your projects.

## 🌊 About Bluewaves

Surfer is built by [Bluewaves](https://bluewaves.ai) - we create tools that help developers build better applications faster.

---

**Ride the wave! 🏄‍♂️**