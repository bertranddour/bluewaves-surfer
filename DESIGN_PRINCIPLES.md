# 🏄‍♂️ Surfer Design System - Design Principles

> **For Coding Assistants & Developers**: This document defines the core principles and patterns for the Surfer Design System. Follow these guidelines when generating code or making recommendations.

## 🎯 Core Philosophy

### **Minimal Extension, Maximum Impact**
Surfer is an **add-on layer** for shadcn/ui, not a replacement. We only provide what Tailwind and shadcn/ui don't include by default.

### **CSS-First Architecture**
- **Single source of truth**: `@theme inline` in CSS
- **No JavaScript tokens**: Tailwind v4.1 auto-generates utilities from CSS
- **Performance-first**: CSS variables > JavaScript lookups

### **Layered Approach**
```
1. Next.js App Router (base)
2. shadcn/ui (components + base tokens)
3. Surfer (custom fonts + OKLCH colors only)
```

## 📐 What Surfer Provides

### ✅ **Custom Fonts** (not in Tailwind defaults)
- `font-sans` → `'DM Sans', sans-serif`
- `font-mono` → `'JetBrains Mono', monospace`  
- `font-heading` → `'Lato', sans-serif`

### ✅ **Custom OKLCH Colors** (extended palette)
- `mint-*` → `oklch(...)` (11 shades: 50-950)
- `teal-*` → `oklch(...)` (enhanced from Tailwind defaults)
- `brown-*` → `oklch(...)` (not in Tailwind)
- Plus enhanced: `red-*`, `orange-*`, `yellow-*`, `green-*`, `cyan-*`, `blue-*`, `indigo-*`, `purple-*`, `pink-*`

### ✅ **Heroicons Integration**
- Complete React icon library with all sizes and styles
- `@heroicons/react/24/outline` → 24x24 outline icons
- `@heroicons/react/24/solid` → 24x24 solid icons
- `@heroicons/react/20/solid` → 20x20 solid icons
- `@heroicons/react/16/solid` → 16x16 solid icons

### ✅ **Pill Component System**
- **Pill Buttons** → Professional rounded-full buttons with consistent sizing
- **Pill Badges** → Semantic status indicators with proper spacing
- **Size System** → xs, sm, md, lg, xl with proper height/padding ratios
- **Variant System** → Primary, secondary, outline, ghost, destructive, success, warning
- **Combination Classes** → Badge groups, button groups, badges with dots/remove buttons

### ✅ **Minimal Custom Utilities**
- `.surfer-gradient-text` → Teal-to-cyan gradient text

## 🚫 What Surfer Does NOT Provide

### ❌ **No Semantic Tokens**
- No `--color-primary`, `--color-secondary`
- No `--spacing-*` overrides
- No `--typography-*` abstractions

### ❌ **No Component Overrides**
- No custom Button, Card, Input components
- No styled-components or CSS-in-JS
- No layout or grid systems

### ❌ **No JavaScript Tokens**
- No `tokens.ts` or `theme.js` files
- No programmatic token access
- No runtime theme switching utilities

## 🛠️ Usage Patterns

### **Recommended Class Usage**

```tsx
// ✅ Use Surfer colors when you want them
<div className="bg-mint-500 text-teal-600">
  <h1 className="font-heading text-brown-800">Custom styling</h1>
</div>

// ✅ Use Tailwind defaults when appropriate
<div className="bg-gray-100 text-slate-900">
  <p className="font-medium">Standard styling</p>
</div>

// ✅ Use shadcn/ui components as-is
<Button variant="outline" className="font-sans">
  // Automatically inherits Surfer fonts
</Button>

// ✅ Use Heroicons with appropriate sizes
import { HomeIcon, StarIcon, UserIcon } from '@heroicons/react/24/outline'

<div className="flex items-center gap-2">
  <HomeIcon className="h-6 w-6" />              // 24x24 outline
  <StarIcon className="h-5 w-5 text-teal-500" />// 20x20 with Surfer color
  <UserIcon className="h-4 w-4" />              // 16x16 solid
</div>

// ✅ Use Surfer pill components consistently
<div className="surfer-btn-pill-group">
  <button className="surfer-btn-pill surfer-btn-pill-md surfer-btn-pill-primary">
    <StarIcon className="h-4 w-4" />
    Primary Action
  </button>
  <button className="surfer-btn-pill surfer-btn-pill-md surfer-btn-pill-outline">
    Secondary
  </button>
</div>

// ✅ Use pill badges for status indicators
<div className="surfer-badge-group">
  <span className="surfer-badge-pill surfer-badge-pill-sm surfer-badge-pill-success">
    Active
  </span>
  <span className="surfer-badge-pill surfer-badge-pill-sm surfer-badge-pill-warning surfer-badge-pill-dot">
    3 Pending
  </span>
</div>
```

### **Anti-Patterns to Avoid**

```tsx
// ❌ Don't create semantic abstractions
<div className="bg-primary text-secondary"> // primary/secondary don't exist

// ❌ Don't override Tailwind defaults unnecessarily
<div className="bg-blue-500"> // Use Tailwind's blue-500, not custom

// ❌ Don't import JavaScript tokens
import { customTokens } from 'bluewaves' // This no longer exists

// ❌ Don't mix pill and regular button styles
<button className="surfer-btn-pill rounded-md"> // Don't override rounded-full
<button className="rounded-full px-2 py-1"> // Use surfer-btn-pill classes instead

// ❌ Don't create custom badge combinations
<span className="rounded-full px-2 py-1 bg-red-100"> // Use surfer-badge-pill variants
```

## 🎨 Color Strategy

### **When to Use Surfer Colors**
- **Unique branding**: `mint-*`, `teal-*`, `brown-*`
- **Enhanced palette**: When you need more shades than Tailwind provides
- **OKLCH precision**: For perceptually uniform color transitions

### **When to Use Tailwind Colors**
- **Standard grays**: `gray-*`, `slate-*`, `zinc-*`
- **Standard colors**: `red-*`, `blue-*` (unless you need OKLCH precision)
- **Neutral backgrounds**: `white`, `black`, `transparent`

## 🏗️ Component Composition

### **shadcn/ui + Surfer Pattern**
```tsx
// ✅ Let shadcn/ui handle the component logic
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// ✅ Apply Surfer styling via className
<Card className="bg-mint-50 border-teal-200">
  <Button className="bg-teal-500 hover:bg-teal-600 font-sans">
    Surfer-styled button
  </Button>
</Card>
```

### **Never Override Component Internals**
```tsx
// ❌ Don't modify shadcn/ui component files
// ❌ Don't create wrapper components
// ❌ Don't use CSS-in-JS overrides
```

## 📱 Responsive & Theming

### **Responsive Design**
```tsx
// ✅ Use Tailwind responsive prefixes with Surfer colors
<div className="bg-mint-100 md:bg-teal-100 lg:bg-brown-100">
  <h1 className="text-lg md:text-xl lg:text-2xl font-heading">
    Responsive typography
  </h1>
</div>
```

### **Dark Mode Support**
```tsx
// ✅ Use Tailwind's dark mode with Surfer colors
<div className="bg-mint-100 dark:bg-mint-900">
  <p className="text-brown-900 dark:text-brown-100">
    Dark mode content
  </p>
</div>
```

## 🔧 Development Guidelines

### **CSS Structure**
```css
/* ✅ All custom tokens in one place */
@theme inline {
  --font-sans: 'DM Sans', sans-serif;
  --color-mint-500: oklch(0.7969 0.1431 181.68);
  /* ... */
}

/* ✅ Minimal custom utilities */
.surfer-gradient-text {
  background: linear-gradient(to right, var(--color-teal-500), var(--color-cyan-500));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### **Installation Pattern**
```bash
# 1. Create Next.js app
npx create-next-app@latest

# 2. Install shadcn/ui
npx shadcn@latest init

# 3. Install Surfer
npm install bluewaves

# 4. Import CSS
# In your globals.css or layout:
@import "bluewaves/css";
```

## 🎯 Decision Framework

### **When Adding New Features**
Ask these questions:

1. **Does Tailwind already provide this?** → Use Tailwind
2. **Does shadcn/ui already provide this?** → Use shadcn/ui  
3. **Is this truly custom to our brand?** → Consider for Surfer
4. **Can this be achieved with CSS-only?** → Prefer CSS over JS
5. **Does this align with minimal philosophy?** → Only if essential

### **Quality Gates**
- ✅ **CSS-first**: New tokens must be in CSS, not JavaScript
- ✅ **Minimal**: Only add what's absolutely necessary
- ✅ **Compatible**: Must work with existing shadcn/ui components
- ✅ **Performant**: No runtime overhead
- ✅ **Maintainable**: Single source of truth

## 📚 Integration Examples

### **Next.js App Router**
```tsx
// app/layout.tsx
import "bluewaves/css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans"> {/* DM Sans automatically */}
        {children}
      </body>
    </html>
  )
}
```

### **Component Library Usage**
```tsx
// components/marketing/hero.tsx
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-mint-100 to-teal-100">
      <h1 className="font-heading text-brown-900 text-4xl">
        Welcome to Our App
      </h1>
      <Button className="bg-teal-500 hover:bg-teal-600">
        Get Started
      </Button>
    </section>
  )
}
```

## 🚀 Future Considerations

### **What We Might Add**
- Additional OKLCH color variants
- More custom font options
- Enhanced gradient utilities
- Animation presets

### **What We Will Never Add**
- JavaScript-based theming
- Component overrides
- Runtime token switching
- CSS-in-JS solutions
- Semantic token abstractions

---

## 📋 Quick Reference

### **Use Surfer When:**
- Custom fonts needed (`font-sans`, `font-mono`, `font-heading`)
- OKLCH color precision required
- Brand-specific colors (`mint-*`, `teal-*`, `brown-*`)
- Gradient text effects

### **Use Tailwind When:**
- Standard spacing, typography, shadows
- Standard colors (gray, slate, zinc)
- Layout utilities (flexbox, grid)
- Responsive breakpoints

### **Use shadcn/ui When:**
- Interactive components needed
- Accessible patterns required
- Form elements
- Navigation components

---

*This document should be the primary reference for coding assistants when working with the Surfer Design System. Always prefer the minimal, CSS-first approach over complex abstractions.*