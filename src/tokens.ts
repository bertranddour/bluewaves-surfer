/**
 * Surfer Design Tokens
 * Only custom tokens - Tailwind 4.1 and shadcn/ui provide standard tokens
 * 
 * This file only exports what's custom from STYLES.md:
 * - Custom OKLCH colors
 * - Custom fonts (DM Sans, Lato)
 */

export const customTokens = {
  // Custom fonts from STYLES.md
  fonts: {
    sans: '"DM Sans", sans-serif',
    mono: '"JetBrains Mono", monospace',
    heading: '"Lato", sans-serif',
  },

  // Custom OKLCH colors from STYLES.md - only what's not in Tailwind defaults
  colors: {
    red: {
      50: 'oklch(0.97 0.013 25.11)',
      100: 'oklch(0.94 0.042 25.11)',
      200: 'oklch(0.88 0.085 25.11)',
      300: 'oklch(0.81 0.135 25.11)',
      400: 'oklch(0.72 0.190 25.11)',
      500: 'oklch(0.662 0.2246 25.11)',
      600: 'oklch(0.59 0.201 25.11)',
      700: 'oklch(0.49 0.168 25.11)',
      800: 'oklch(0.41 0.140 25.11)',
      900: 'oklch(0.35 0.119 25.11)',
      950: 'oklch(0.20 0.068 25.11)',
    },
    orange: {
      50: 'oklch(0.97 0.020 57.04)',
      100: 'oklch(0.94 0.067 57.04)',
      200: 'oklch(0.88 0.100 57.04)',
      300: 'oklch(0.82 0.133 57.04)',
      400: 'oklch(0.79 0.150 57.04)',
      500: 'oklch(0.7619 0.1669 57.04)',
      600: 'oklch(0.68 0.150 57.04)',
      700: 'oklch(0.57 0.125 57.04)',
      800: 'oklch(0.47 0.104 57.04)',
      900: 'oklch(0.39 0.088 57.04)',
      950: 'oklch(0.23 0.050 57.04)',
    },
    yellow: {
      50: 'oklch(0.97 0.021 94.9)',
      100: 'oklch(0.94 0.072 94.9)',
      200: 'oklch(0.91 0.109 94.9)',
      300: 'oklch(0.90 0.145 94.9)',
      400: 'oklch(0.89 0.163 94.9)',
      500: 'oklch(0.8848 0.1816 94.9)',
      600: 'oklch(0.76 0.164 94.9)',
      700: 'oklch(0.64 0.136 94.9)',
      800: 'oklch(0.53 0.113 94.9)',
      900: 'oklch(0.44 0.096 94.9)',
      950: 'oklch(0.26 0.055 94.9)',
    },
    green: {
      50: 'oklch(0.96 0.025 147)',
      100: 'oklch(0.93 0.083 147)',
      200: 'oklch(0.87 0.125 147)',
      300: 'oklch(0.81 0.166 147)',
      400: 'oklch(0.78 0.187 147)',
      500: 'oklch(0.7555 0.2082 147)',
      600: 'oklch(0.67 0.187 147)',
      700: 'oklch(0.56 0.156 147)',
      800: 'oklch(0.46 0.130 147)',
      900: 'oklch(0.38 0.109 147)',
      950: 'oklch(0.22 0.063 147)',
    },
    mint: {
      50: 'oklch(0.97 0.017 181.68)',
      100: 'oklch(0.94 0.057 181.68)',
      200: 'oklch(0.88 0.086 181.68)',
      300: 'oklch(0.83 0.115 181.68)',
      400: 'oklch(0.80 0.129 181.68)',
      500: 'oklch(0.7969 0.1431 181.68)',
      600: 'oklch(0.71 0.129 181.68)',
      700: 'oklch(0.59 0.107 181.68)',
      800: 'oklch(0.49 0.089 181.68)',
      900: 'oklch(0.41 0.075 181.68)',
      950: 'oklch(0.24 0.043 181.68)',
    },
    teal: {
      50: 'oklch(0.97 0.016 203.37)',
      100: 'oklch(0.94 0.054 203.37)',
      200: 'oklch(0.88 0.081 203.37)',
      300: 'oklch(0.83 0.107 203.37)',
      400: 'oklch(0.80 0.121 203.37)',
      500: 'oklch(0.7871 0.1341 203.37)',
      600: 'oklch(0.70 0.121 203.37)',
      700: 'oklch(0.58 0.101 203.37)',
      800: 'oklch(0.48 0.084 203.37)',
      900: 'oklch(0.40 0.070 203.37)',
      950: 'oklch(0.24 0.040 203.37)',
    },
    cyan: {
      50: 'oklch(0.97 0.016 221.84)',
      100: 'oklch(0.94 0.054 221.84)',
      200: 'oklch(0.89 0.081 221.84)',
      300: 'oklch(0.84 0.108 221.84)',
      400: 'oklch(0.82 0.122 221.84)',
      500: 'oklch(0.8076 0.1351 221.84)',
      600: 'oklch(0.72 0.122 221.84)',
      700: 'oklch(0.60 0.101 221.84)',
      800: 'oklch(0.50 0.084 221.84)',
      900: 'oklch(0.42 0.071 221.84)',
      950: 'oklch(0.25 0.041 221.84)',
    },
    blue: {
      50: 'oklch(0.96 0.023 251.48)',
      100: 'oklch(0.93 0.077 251.48)',
      200: 'oklch(0.87 0.115 251.48)',
      300: 'oklch(0.80 0.154 251.48)',
      400: 'oklch(0.72 0.173 251.48)',
      500: 'oklch(0.6515 0.192 251.48)',
      600: 'oklch(0.57 0.173 251.48)',
      700: 'oklch(0.47 0.144 251.48)',
      800: 'oklch(0.39 0.120 251.48)',
      900: 'oklch(0.33 0.101 251.48)',
      950: 'oklch(0.19 0.058 251.48)',
    },
    indigo: {
      50: 'oklch(0.95 0.028 280.45)',
      100: 'oklch(0.91 0.092 280.45)',
      200: 'oklch(0.84 0.138 280.45)',
      300: 'oklch(0.76 0.185 280.45)',
      400: 'oklch(0.67 0.208 280.45)',
      500: 'oklch(0.5872 0.231 280.45)',
      600: 'oklch(0.51 0.208 280.45)',
      700: 'oklch(0.42 0.173 280.45)',
      800: 'oklch(0.35 0.144 280.45)',
      900: 'oklch(0.29 0.122 280.45)',
      950: 'oklch(0.17 0.070 280.45)',
    },
    purple: {
      50: 'oklch(0.96 0.033 322.4)',
      100: 'oklch(0.92 0.111 322.4)',
      200: 'oklch(0.86 0.167 322.4)',
      300: 'oklch(0.78 0.223 322.4)',
      400: 'oklch(0.72 0.251 322.4)',
      500: 'oklch(0.6579 0.2792 322.4)',
      600: 'oklch(0.58 0.251 322.4)',
      700: 'oklch(0.48 0.209 322.4)',
      800: 'oklch(0.40 0.174 322.4)',
      900: 'oklch(0.33 0.146 322.4)',
      950: 'oklch(0.20 0.084 322.4)',
    },
    pink: {
      50: 'oklch(0.96 0.028 16.01)',
      100: 'oklch(0.93 0.092 16.01)',
      200: 'oklch(0.87 0.139 16.01)',
      300: 'oklch(0.80 0.186 16.01)',
      400: 'oklch(0.72 0.209 16.01)',
      500: 'oklch(0.6577 0.2317 16.01)',
      600: 'oklch(0.58 0.209 16.01)',
      700: 'oklch(0.48 0.174 16.01)',
      800: 'oklch(0.40 0.145 16.01)',
      900: 'oklch(0.33 0.122 16.01)',
      950: 'oklch(0.20 0.070 16.01)',
    },
    brown: {
      50: 'oklch(0.96 0.009 59.69)',
      100: 'oklch(0.93 0.030 59.69)',
      200: 'oklch(0.87 0.044 59.69)',
      300: 'oklch(0.80 0.059 59.69)',
      400: 'oklch(0.74 0.066 59.69)',
      500: 'oklch(0.6681 0.0742 59.69)',
      600: 'oklch(0.59 0.066 59.69)',
      700: 'oklch(0.49 0.055 59.69)',
      800: 'oklch(0.41 0.046 59.69)',
      900: 'oklch(0.34 0.039 59.69)',
      950: 'oklch(0.20 0.022 59.69)',
    },
  },
} as const

// For backward compatibility, export as defaultTokens
export const defaultTokens = customTokens

/**
 * Utility to get custom color value
 */
export const getCustomColor = (color: string, shade: string | number): string => {
  const colorTokens = (customTokens.colors as Record<string, Record<string | number, string>>)[color]
  return colorTokens?.[shade] || ''
}

/**
 * Design system metadata
 */
export const DESIGN_PHILOSOPHY = {
  approach: "Minimal Custom Tokens",
  description: "Only adds what Tailwind 4.1 and shadcn/ui don't provide",
  custom: [
    "OKLCH color palette from STYLES.md",
    "DM Sans, JetBrains Mono, and Lato fonts",
    "Gradient utilities"
  ],
  leverages: [
    "Tailwind 4.1 default spacing, typography, shadows",
    "shadcn/ui neutral color system", 
    "Standard Tailwind breakpoints and utilities"
  ]
} as const