/**
 * 🏄‍♂️ Surfer Design System
 * S-tier design system for Next.js + shadcn/ui
 * 
 * @author Bluewaves
 * @version 1.0.0
 */

// Design Tokens
export * from "./tokens"

// Design Tokens & Utilities (no styled components - pure token approach)

// Utilities
export * from "./lib/utils"

// Note: Tailwind CSS v4.1 uses CSS-based configuration instead of JS config

// Version
export const VERSION = "1.1.0"

// Surfer brand
export const SURFER = {
  name: "Surfer",
  tagline: "S-tier design system for Next.js + shadcn/ui",
  emoji: "🏄‍♂️",
  version: VERSION,
  author: "Bluewaves",
  website: "https://surfer.bluewaves.ai",
  repository: "https://github.com/bluewaves/surfer"
} as const