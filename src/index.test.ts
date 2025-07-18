import { describe, it, expect } from 'vitest'
import { VERSION, SURFER } from './index'
import { cn } from './lib/utils'

describe('Surfer Design System exports', () => {
  it('should export VERSION constant', () => {
    expect(VERSION).toBeDefined()
    expect(typeof VERSION).toBe('string')
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('should export SURFER brand object', () => {
    expect(SURFER).toBeDefined()
    expect(typeof SURFER).toBe('object')
  })

  it('should have correct SURFER properties', () => {
    expect(SURFER.name).toBe('Surfer')
    expect(SURFER.tagline).toBe('S-tier design system for Next.js + shadcn/ui')
    expect(SURFER.emoji).toBe('🏄‍♂️')
    expect(SURFER.version).toBe(VERSION)
    expect(SURFER.author).toBe('Bluewaves')
    expect(SURFER.website).toBe('https://surfer.bluewaves.boutique')
    expect(SURFER.repository).toBe('https://github.com/bluewaves/surfer')
  })

  it('should export utilities', () => {
    expect(cn).toBeDefined()
    expect(typeof cn).toBe('function')
  })
})