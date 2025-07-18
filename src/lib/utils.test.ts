import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility function', () => {
  it('should combine class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    const condition1 = true
    const condition2 = false
    expect(cn('foo', condition1 && 'bar', condition2 && 'baz')).toBe('foo bar')
  })

  it('should handle undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('should handle empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('should handle arrays', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('should handle objects', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('should handle complex combinations', () => {
    expect(cn(
      'base-class',
      { 'conditional-class': true, 'false-class': false },
      ['array-class-1', 'array-class-2'],
      undefined,
      'final-class'
    )).toBe('base-class conditional-class array-class-1 array-class-2 final-class')
  })

  it('should handle Tailwind merge conflicts', () => {
    // Test that conflicting Tailwind classes are properly merged
    expect(cn('px-2 py-1', 'px-3')).toBe('py-1 px-3')
  })

  it('should handle multiple variants', () => {
    expect(cn('text-sm', 'text-base')).toBe('text-base')
  })
})