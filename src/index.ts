/**
 * 🏄‍♂️ Surfer Design System
 * S-tier design system for Next.js + shadcn/ui
 * 
 * @author Bluewaves
 * @version 1.0.0
 */

// Design Tokens
export * from "./tokens"

// Components
export * from "./components/ui/button"
export * from "./components/ui/card"

// Utilities
export * from "./lib/utils"

// Configuration
export { default as surferPreset } from "./tailwind.config"

// Version
export const VERSION = "1.0.0"

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