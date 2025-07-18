/**
 * 🏄‍♂️ Surfer Design System
 * S-tier design system for Next.js + shadcn/ui
 * 
 * @author Bluewaves
 * @version 1.0.0
 */

// CSS-first design tokens via @theme inline (no JavaScript tokens needed)

// Utilities
export * from "./lib/utils"

// Note: Tailwind CSS v4.1 uses CSS-based configuration instead of JS config

// Version
export const VERSION = "1.1.2"

// Surfer brand
export const SURFER = {
  name: "Surfer",
  tagline: "S-tier design system for Next.js + shadcn/ui",
  emoji: "🏄‍♂️",
  version: VERSION,
  author: "Bluewaves",
  website: "https://surfer.bluewaves.boutique",
  repository: "https://github.com/bluewaves/surfer"
} as const