import { describe, it, expect } from 'vitest'
import { getPackageManagerRunner } from './create-app'

describe('Create App utilities', () => {
  describe('getPackageManagerRunner', () => {
    it('should return correct runner for npm', () => {
      const runner = getPackageManagerRunner('npm')
      expect(runner.command).toBe('npx')
      expect(runner.args).toEqual([])
    })

    it('should return correct runner for pnpm', () => {
      const runner = getPackageManagerRunner('pnpm')
      expect(runner.command).toBe('pnpm')
      expect(runner.args).toEqual(['dlx'])
    })

    it('should return correct runner for yarn', () => {
      const runner = getPackageManagerRunner('yarn')
      expect(runner.command).toBe('yarn')
      expect(runner.args).toEqual(['dlx'])
    })

    it('should return correct runner for bun', () => {
      const runner = getPackageManagerRunner('bun')
      expect(runner.command).toBe('bunx')
      expect(runner.args).toEqual(['--bun'])
    })

    it('should default to npm for unknown package manager', () => {
      const runner = getPackageManagerRunner('unknown')
      expect(runner.command).toBe('npx')
      expect(runner.args).toEqual([])
    })

    it('should default to npm when no package manager provided', () => {
      const runner = getPackageManagerRunner('')
      expect(runner.command).toBe('npx')
      expect(runner.args).toEqual([])
    })
  })

  // Note: Full integration tests for createBluewavesApp are complex due to many dependencies
  // Core Heroicons functionality is tested in heroicons.test.ts
  // The createBluewavesApp function does include Heroicons in package.json dependencies
  // and generates appropriate documentation - this is verified in manual testing
})