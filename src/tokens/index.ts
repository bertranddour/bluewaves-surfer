/**
 * 🏄‍♂️ Surfer Design Tokens
 * S-tier design system for Next.js + shadcn/ui
 */

export interface SurferTokens {
  colors: {
    brand: {
      primary: string
      secondary: string
      accent: string
    }
    semantic: {
      background: string
      foreground: string
      muted: string
      'muted-foreground': string
      card: string
      'card-foreground': string
      border: string
      input: string
      ring: string
      destructive: string
      success: string
      warning: string
      info: string
    }
    extended: {
      red: Record<string, string>
      orange: Record<string, string>
      yellow: Record<string, string>
      green: Record<string, string>
      blue: Record<string, string>
      indigo: Record<string, string>
      purple: Record<string, string>
      pink: Record<string, string>
      teal: Record<string, string>
      cyan: Record<string, string>
    }
  }
  typography: {
    fontFamily: {
      sans: string
      mono: string
      heading: string
    }
    fontSize: Record<string, string>
    fontWeight: Record<string, string>
    lineHeight: Record<string, string>
    letterSpacing: Record<string, string>
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
  animation: {
    duration: Record<string, string>
    easing: Record<string, string>
  }
  breakpoints: Record<string, string>
  zIndex: Record<string, string>
}

/**
 * Default Surfer design tokens
 */
export const defaultTokens: SurferTokens = {
  colors: {
    brand: {
      primary: 'oklch(0.7871 0.1341 203.37)',
      secondary: 'oklch(0.6681 0.0742 59.69)',
      accent: 'oklch(0.8076 0.1351 221.84)'
    },
    semantic: {
      background: 'oklch(0.141 0.005 285.823)',
      foreground: 'oklch(0.985 0 0)',
      muted: 'oklch(0.274 0.006 286.033)',
      'muted-foreground': 'oklch(0.705 0.015 286.067)',
      card: 'oklch(0.21 0.006 285.885)',
      'card-foreground': 'oklch(0.985 0 0)',
      border: 'oklch(1 0 0 / 10%)',
      input: 'oklch(1 0 0 / 15%)',
      ring: 'oklch(0.552 0.016 285.938)',
      destructive: 'oklch(0.662 0.2246 25.11)',
      success: 'oklch(0.7449 0.1441 147.72)',
      warning: 'oklch(0.8848 0.1816 94.9)',
      info: 'oklch(0.6515 0.192 251.48)'
    },
    extended: {
      red: {
        '50': 'oklch(0.97 0.013 25.11)',
        '100': 'oklch(0.94 0.042 25.11)',
        '200': 'oklch(0.88 0.085 25.11)',
        '300': 'oklch(0.81 0.135 25.11)',
        '400': 'oklch(0.72 0.190 25.11)',
        '500': 'oklch(0.662 0.2246 25.11)',
        '600': 'oklch(0.59 0.201 25.11)',
        '700': 'oklch(0.49 0.168 25.11)',
        '800': 'oklch(0.41 0.140 25.11)',
        '900': 'oklch(0.35 0.119 25.11)',
        '950': 'oklch(0.20 0.068 25.11)'
      },
      orange: {
        '50': 'oklch(0.97 0.020 57.04)',
        '100': 'oklch(0.94 0.067 57.04)',
        '200': 'oklch(0.88 0.100 57.04)',
        '300': 'oklch(0.82 0.133 57.04)',
        '400': 'oklch(0.79 0.150 57.04)',
        '500': 'oklch(0.7619 0.1669 57.04)',
        '600': 'oklch(0.68 0.150 57.04)',
        '700': 'oklch(0.57 0.125 57.04)',
        '800': 'oklch(0.47 0.104 57.04)',
        '900': 'oklch(0.39 0.088 57.04)',
        '950': 'oklch(0.23 0.050 57.04)'
      },
      yellow: {
        '50': 'oklch(0.97 0.021 94.9)',
        '100': 'oklch(0.94 0.072 94.9)',
        '200': 'oklch(0.91 0.109 94.9)',
        '300': 'oklch(0.90 0.145 94.9)',
        '400': 'oklch(0.89 0.163 94.9)',
        '500': 'oklch(0.8848 0.1816 94.9)',
        '600': 'oklch(0.76 0.164 94.9)',
        '700': 'oklch(0.64 0.136 94.9)',
        '800': 'oklch(0.53 0.113 94.9)',
        '900': 'oklch(0.44 0.096 94.9)',
        '950': 'oklch(0.26 0.055 94.9)'
      },
      green: {
        '50': 'oklch(0.96 0.025 147)',
        '100': 'oklch(0.93 0.083 147)',
        '200': 'oklch(0.87 0.125 147)',
        '300': 'oklch(0.81 0.166 147)',
        '400': 'oklch(0.78 0.187 147)',
        '500': 'oklch(0.7555 0.2082 147)',
        '600': 'oklch(0.67 0.187 147)',
        '700': 'oklch(0.56 0.156 147)',
        '800': 'oklch(0.46 0.130 147)',
        '900': 'oklch(0.38 0.109 147)',
        '950': 'oklch(0.22 0.063 147)'
      },
      blue: {
        '50': 'oklch(0.96 0.023 251.48)',
        '100': 'oklch(0.93 0.077 251.48)',
        '200': 'oklch(0.87 0.115 251.48)',
        '300': 'oklch(0.80 0.154 251.48)',
        '400': 'oklch(0.72 0.173 251.48)',
        '500': 'oklch(0.6515 0.192 251.48)',
        '600': 'oklch(0.57 0.173 251.48)',
        '700': 'oklch(0.47 0.144 251.48)',
        '800': 'oklch(0.39 0.120 251.48)',
        '900': 'oklch(0.33 0.101 251.48)',
        '950': 'oklch(0.19 0.058 251.48)'
      },
      indigo: {
        '50': 'oklch(0.95 0.028 280.45)',
        '100': 'oklch(0.91 0.092 280.45)',
        '200': 'oklch(0.84 0.138 280.45)',
        '300': 'oklch(0.76 0.185 280.45)',
        '400': 'oklch(0.67 0.208 280.45)',
        '500': 'oklch(0.5872 0.231 280.45)',
        '600': 'oklch(0.51 0.208 280.45)',
        '700': 'oklch(0.42 0.173 280.45)',
        '800': 'oklch(0.35 0.144 280.45)',
        '900': 'oklch(0.29 0.122 280.45)',
        '950': 'oklch(0.17 0.070 280.45)'
      },
      purple: {
        '50': 'oklch(0.96 0.033 322.4)',
        '100': 'oklch(0.92 0.111 322.4)',
        '200': 'oklch(0.86 0.167 322.4)',
        '300': 'oklch(0.78 0.223 322.4)',
        '400': 'oklch(0.72 0.251 322.4)',
        '500': 'oklch(0.6579 0.2792 322.4)',
        '600': 'oklch(0.58 0.251 322.4)',
        '700': 'oklch(0.48 0.209 322.4)',
        '800': 'oklch(0.40 0.174 322.4)',
        '900': 'oklch(0.33 0.146 322.4)',
        '950': 'oklch(0.20 0.084 322.4)'
      },
      pink: {
        '50': 'oklch(0.96 0.028 16.01)',
        '100': 'oklch(0.93 0.092 16.01)',
        '200': 'oklch(0.87 0.139 16.01)',
        '300': 'oklch(0.80 0.186 16.01)',
        '400': 'oklch(0.72 0.209 16.01)',
        '500': 'oklch(0.6577 0.2317 16.01)',
        '600': 'oklch(0.58 0.209 16.01)',
        '700': 'oklch(0.48 0.174 16.01)',
        '800': 'oklch(0.40 0.145 16.01)',
        '900': 'oklch(0.33 0.122 16.01)',
        '950': 'oklch(0.20 0.070 16.01)'
      },
      teal: {
        '50': 'oklch(0.97 0.016 203.37)',
        '100': 'oklch(0.94 0.054 203.37)',
        '200': 'oklch(0.88 0.081 203.37)',
        '300': 'oklch(0.83 0.107 203.37)',
        '400': 'oklch(0.80 0.121 203.37)',
        '500': 'oklch(0.7871 0.1341 203.37)',
        '600': 'oklch(0.70 0.121 203.37)',
        '700': 'oklch(0.58 0.101 203.37)',
        '800': 'oklch(0.48 0.084 203.37)',
        '900': 'oklch(0.40 0.070 203.37)',
        '950': 'oklch(0.24 0.040 203.37)'
      },
      cyan: {
        '50': 'oklch(0.97 0.016 221.84)',
        '100': 'oklch(0.94 0.054 221.84)',
        '200': 'oklch(0.89 0.081 221.84)',
        '300': 'oklch(0.84 0.108 221.84)',
        '400': 'oklch(0.82 0.122 221.84)',
        '500': 'oklch(0.8076 0.1351 221.84)',
        '600': 'oklch(0.72 0.122 221.84)',
        '700': 'oklch(0.60 0.101 221.84)',
        '800': 'oklch(0.50 0.084 221.84)',
        '900': 'oklch(0.42 0.071 221.84)',
        '950': 'oklch(0.25 0.041 221.84)'
      }
    }
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'Fira Code, ui-monospace, monospace',
      heading: 'Inter, system-ui, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(255 255 255 / 0.03)',
    DEFAULT: '0 1px 3px 0 rgb(255 255 255 / 0.06), 0 1px 2px -1px rgb(255 255 255 / 0.04)',
    md: '0 4px 6px -1px rgb(255 255 255 / 0.06), 0 2px 4px -2px rgb(255 255 255 / 0.04)',
    lg: '0 10px 15px -3px rgb(255 255 255 / 0.06), 0 4px 6px -4px rgb(255 255 255 / 0.04)',
    xl: '0 20px 25px -5px rgb(255 255 255 / 0.06), 0 8px 10px -6px rgb(255 255 255 / 0.04)',
    '2xl': '0 25px 50px -12px rgb(255 255 255 / 0.08)',
    inner: 'inset 0 2px 4px 0 rgb(255 255 255 / 0.03)',
    none: 'none'
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    'modal-backdrop': '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    toast: '1080'
  }
}

/**
 * Utility functions for working with design tokens
 */

export function getTypographyClass(size: keyof typeof defaultTokens.typography.fontSize) {
  return `text-${size}`
}

export function getSpacingClass(size: keyof typeof defaultTokens.spacing) {
  return `space-${size}`
}

export function getSectionSpacing(size: 'compact' | 'default' | 'large' = 'default') {
  const spacingMap = {
    compact: 'py-12 lg:py-16',
    default: 'py-16 lg:py-20',
    large: 'py-20 lg:py-24'
  }
  return spacingMap[size]
}

export function getCardPadding(size: 'sm' | 'default' | 'lg' = 'default') {
  const paddingMap = {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }
  return paddingMap[size]
}

export function getGapClass(size: 'sm' | 'default' | 'md' | 'lg') {
  const gapMap = {
    sm: 'gap-2',
    default: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }
  return gapMap[size]
}

export function getBorderRadiusClass(size: keyof typeof defaultTokens.borderRadius) {
  return `rounded-${size === 'DEFAULT' ? '' : size}`
}

export function getDesignTokens() {
  return defaultTokens
}

// Export individual token categories
export const colors = defaultTokens.colors
export const typography = defaultTokens.typography
export const spacing = defaultTokens.spacing
export const borderRadius = defaultTokens.borderRadius
export const shadows = defaultTokens.shadows
export const animation = defaultTokens.animation
export const breakpoints = defaultTokens.breakpoints
export const zIndex = defaultTokens.zIndex