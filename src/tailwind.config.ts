import type { Config } from 'tailwindcss'
import { defaultTokens } from './tokens'

/**
 * 🏄‍♂️ Surfer Tailwind Preset
 * S-tier configuration for Next.js + shadcn/ui
 */
export const surferPreset: Config = {
  content: [],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: defaultTokens.colors.brand.primary,
          foreground: defaultTokens.colors.semantic.foreground
        },
        secondary: {
          DEFAULT: defaultTokens.colors.brand.secondary,
          foreground: defaultTokens.colors.semantic.foreground
        },
        accent: {
          DEFAULT: defaultTokens.colors.brand.accent,
          foreground: defaultTokens.colors.semantic.foreground
        },
        
        // Semantic colors
        background: defaultTokens.colors.semantic.background,
        foreground: defaultTokens.colors.semantic.foreground,
        muted: {
          DEFAULT: defaultTokens.colors.semantic.muted,
          foreground: defaultTokens.colors.semantic['muted-foreground']
        },
        card: {
          DEFAULT: defaultTokens.colors.semantic.card,
          foreground: defaultTokens.colors.semantic['card-foreground']
        },
        popover: {
          DEFAULT: defaultTokens.colors.semantic.card,
          foreground: defaultTokens.colors.semantic['card-foreground']
        },
        border: defaultTokens.colors.semantic.border,
        input: defaultTokens.colors.semantic.input,
        ring: defaultTokens.colors.semantic.ring,
        
        // Status colors
        destructive: {
          DEFAULT: defaultTokens.colors.semantic.destructive,
          foreground: defaultTokens.colors.semantic.foreground
        },
        success: {
          DEFAULT: defaultTokens.colors.semantic.success,
          foreground: defaultTokens.colors.semantic.foreground
        },
        warning: {
          DEFAULT: defaultTokens.colors.semantic.warning,
          foreground: defaultTokens.colors.semantic.foreground
        },
        info: {
          DEFAULT: defaultTokens.colors.semantic.info,
          foreground: defaultTokens.colors.semantic.foreground
        },
        
        // Extended color palette
        red: defaultTokens.colors.extended.red,
        orange: defaultTokens.colors.extended.orange,
        yellow: defaultTokens.colors.extended.yellow,
        green: defaultTokens.colors.extended.green,
        blue: defaultTokens.colors.extended.blue,
        indigo: defaultTokens.colors.extended.indigo,
        purple: defaultTokens.colors.extended.purple,
        pink: defaultTokens.colors.extended.pink,
        teal: defaultTokens.colors.extended.teal,
        cyan: defaultTokens.colors.extended.cyan
      },
      fontFamily: {
        sans: [defaultTokens.typography.fontFamily.sans],
        mono: [defaultTokens.typography.fontFamily.mono],
        heading: [defaultTokens.typography.fontFamily.heading]
      },
      fontSize: defaultTokens.typography.fontSize,
      fontWeight: defaultTokens.typography.fontWeight,
      lineHeight: defaultTokens.typography.lineHeight,
      letterSpacing: defaultTokens.typography.letterSpacing,
      spacing: defaultTokens.spacing,
      borderRadius: defaultTokens.borderRadius,
      boxShadow: defaultTokens.shadows,
      zIndex: defaultTokens.zIndex,
      screens: defaultTokens.breakpoints,
      transitionDuration: defaultTokens.animation.duration,
      transitionTimingFunction: defaultTokens.animation.easing,
      
      // Surfer-specific utilities
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-in',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    }
  },
  plugins: [
    // Add Surfer-specific plugins
    function({ addUtilities, addComponents, theme }) {
      // Surfer utility classes
      addUtilities({
        '.surfer-container': {
          maxWidth: theme('container.screens.2xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6')
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8')
          }
        },
        '.surfer-section': {
          paddingTop: theme('spacing.16'),
          paddingBottom: theme('spacing.16'),
          '@screen lg': {
            paddingTop: theme('spacing.24'),
            paddingBottom: theme('spacing.24')
          }
        },
        '.surfer-prose': {
          maxWidth: 'none',
          color: theme('colors.foreground'),
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: theme('colors.foreground'),
            fontFamily: theme('fontFamily.heading')
          },
          '& a': {
            color: theme('colors.primary.DEFAULT'),
            textDecoration: 'underline',
            textUnderlineOffset: '2px'
          },
          '& code': {
            backgroundColor: theme('colors.muted.DEFAULT'),
            padding: '0.125rem 0.25rem',
            borderRadius: theme('borderRadius.sm'),
            fontSize: '0.875em'
          }
        }
      })
      
      // Surfer component classes
      addComponents({
        '.surfer-card': {
          backgroundColor: theme('colors.card.DEFAULT'),
          color: theme('colors.card.foreground'),
          borderRadius: theme('borderRadius.lg'),
          border: `1px solid ${theme('colors.border')}`,
          boxShadow: theme('boxShadow.sm'),
          padding: theme('spacing.6')
        },
        '.surfer-button': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          borderRadius: theme('borderRadius.md'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 150ms ease',
          cursor: 'pointer',
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.ring')}`,
            outlineOffset: '2px'
          },
          '&:disabled': {
            pointerEvents: 'none',
            opacity: '0.5'
          }
        },
        '.surfer-badge': {
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: theme('borderRadius.full'),
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontWeight.medium'),
          padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
          border: `1px solid ${theme('colors.border')}`
        },
        '.surfer-input': {
          display: 'flex',
          width: '100%',
          borderRadius: theme('borderRadius.md'),
          border: `1px solid ${theme('colors.border')}`,
          backgroundColor: theme('colors.input'),
          padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
          fontSize: theme('fontSize.sm'),
          transition: 'all 150ms ease',
          '&:focus': {
            outline: `2px solid ${theme('colors.ring')}`,
            outlineOffset: '2px'
          },
          '&::placeholder': {
            color: theme('colors.muted.foreground')
          }
        }
      })
    }
  ]
}

export default surferPreset