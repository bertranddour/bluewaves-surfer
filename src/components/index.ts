/**
 * 🏄‍♂️ Surfer Components
 * Enhanced shadcn/ui components with Surfer design system
 */

// UI Components
export * from "./ui/button"
export * from "./ui/card"

// Component categories
export const COMPONENT_CATEGORIES = {
  UI: "Core UI components",
  FORMS: "Form elements and validation",
  NAVIGATION: "Navigation and routing",
  FEEDBACK: "Alerts, toasts, and notifications",
  DATA: "Tables, charts, and data visualization",
  LAYOUT: "Layout and container components",
  MARKETING: "Marketing and landing page components"
} as const

// Component registry for CLI
export const COMPONENT_REGISTRY = {
  button: {
    name: "Button",
    description: "Enhanced button component with loading states and variants",
    category: "UI",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"]
  },
  card: {
    name: "Card",
    description: "Flexible card component with multiple variants",
    category: "UI",
    dependencies: ["class-variance-authority"]
  }
} as const

export type ComponentName = keyof typeof COMPONENT_REGISTRY