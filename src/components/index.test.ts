import { describe, it, expect } from 'vitest'
import { cn } from './index'

describe('Components index', () => {
  it('should export utilities', () => {
    expect(cn).toBeDefined()
    expect(typeof cn).toBe('function')
  })

  it('should handle class name merging', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})