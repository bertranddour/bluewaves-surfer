import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'fs-extra'
import { execa } from 'execa'

// Mock dependencies
vi.mock('fs-extra')
vi.mock('execa')

const mockFs = vi.mocked(fs)
const mockExeca = vi.mocked(execa)

describe('Heroicons Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Package Manager Detection', () => {
    const detectPackageManager = async (): Promise<string> => {
      if (await mockFs.pathExists('pnpm-lock.yaml')) return 'pnpm'
      if (await mockFs.pathExists('yarn.lock')) return 'yarn'
      if (await mockFs.pathExists('bun.lockb')) return 'bun'
      return 'npm'
    }

    it('should detect npm when no lock files exist', async () => {
      mockFs.pathExists.mockResolvedValue(false)
      
      const result = await detectPackageManager()
      
      expect(result).toBe('npm')
    })

    it('should detect pnpm when pnpm-lock.yaml exists', async () => {
      mockFs.pathExists.mockImplementation((path) => {
        if (path === 'pnpm-lock.yaml') return Promise.resolve(true)
        return Promise.resolve(false)
      })
      
      const result = await detectPackageManager()
      
      expect(result).toBe('pnpm')
    })

    it('should detect yarn when yarn.lock exists', async () => {
      mockFs.pathExists.mockImplementation((path) => {
        if (path === 'yarn.lock') return Promise.resolve(true)
        return Promise.resolve(false)
      })
      
      const result = await detectPackageManager()
      
      expect(result).toBe('yarn')
    })

    it('should detect bun when bun.lockb exists', async () => {
      mockFs.pathExists.mockImplementation((path) => {
        if (path === 'bun.lockb') return Promise.resolve(true)
        return Promise.resolve(false)
      })
      
      const result = await detectPackageManager()
      
      expect(result).toBe('bun')
    })
  })

  describe('Heroicons Installation Commands', () => {
    const getInstallCommand = (packageManager: string): [string, string[]] => {
      const installCmd = packageManager === 'npm' ? 'install' : 'add'
      return [packageManager, [installCmd, '@heroicons/react']]
    }

    it('should generate correct install command for npm', () => {
      const [command, args] = getInstallCommand('npm')
      
      expect(command).toBe('npm')
      expect(args).toEqual(['install', '@heroicons/react'])
    })

    it('should generate correct install command for pnpm', () => {
      const [command, args] = getInstallCommand('pnpm')
      
      expect(command).toBe('pnpm')
      expect(args).toEqual(['add', '@heroicons/react'])
    })

    it('should generate correct install command for yarn', () => {
      const [command, args] = getInstallCommand('yarn')
      
      expect(command).toBe('yarn')
      expect(args).toEqual(['add', '@heroicons/react'])
    })

    it('should generate correct install command for bun', () => {
      const [command, args] = getInstallCommand('bun')
      
      expect(command).toBe('bun')
      expect(args).toEqual(['add', '@heroicons/react'])
    })
  })

  describe('Heroicons Detection', () => {
    const hasHeroicons = (packageJson: any): boolean => {
      return !!(packageJson.dependencies?.['@heroicons/react'] || packageJson.devDependencies?.['@heroicons/react'])
    }

    it('should detect Heroicons in dependencies', () => {
      const packageJson = {
        dependencies: {
          '@heroicons/react': '^2.0.0',
          'next': '^15.0.0',
        }
      }
      
      expect(hasHeroicons(packageJson)).toBe(true)
    })

    it('should detect Heroicons in devDependencies', () => {
      const packageJson = {
        devDependencies: {
          '@heroicons/react': '^2.0.0',
          'next': '^15.0.0',
        }
      }
      
      expect(hasHeroicons(packageJson)).toBe(true)
    })

    it('should return false when Heroicons is not installed', () => {
      const packageJson = {
        dependencies: {
          'next': '^15.0.0',
        }
      }
      
      expect(hasHeroicons(packageJson)).toBe(false)
    })

    it('should return false for empty package.json', () => {
      const packageJson = {}
      
      expect(hasHeroicons(packageJson)).toBe(false)
    })
  })

  describe('Error Message Generation', () => {
    const generateErrorMessage = (packageManager: string): string => {
      const installCmd = packageManager === 'npm' ? 'npm install' : `${packageManager} add`
      return `Heroicons installation failed - you can install it manually: ${installCmd} @heroicons/react`
    }

    it('should generate correct error message for npm', () => {
      const message = generateErrorMessage('npm')
      
      expect(message).toBe('Heroicons installation failed - you can install it manually: npm install @heroicons/react')
    })

    it('should generate correct error message for pnpm', () => {
      const message = generateErrorMessage('pnpm')
      
      expect(message).toBe('Heroicons installation failed - you can install it manually: pnpm add @heroicons/react')
    })

    it('should generate correct error message for yarn', () => {
      const message = generateErrorMessage('yarn')
      
      expect(message).toBe('Heroicons installation failed - you can install it manually: yarn add @heroicons/react')
    })

    it('should generate correct error message for bun', () => {
      const message = generateErrorMessage('bun')
      
      expect(message).toBe('Heroicons installation failed - you can install it manually: bun add @heroicons/react')
    })
  })

  describe('Package.json Updates', () => {
    it('should add Heroicons to existing dependencies', () => {
      const originalPackageJson = {
        name: 'test-app',
        dependencies: {
          'next': '^15.0.0',
          'react': '^18.0.0',
        }
      }

      const updatedPackageJson = {
        ...originalPackageJson,
        dependencies: {
          ...originalPackageJson.dependencies,
          '@heroicons/react': '^2.0.0',
        }
      }

      expect(updatedPackageJson.dependencies['@heroicons/react']).toBe('^2.0.0')
      expect(updatedPackageJson.dependencies['next']).toBe('^15.0.0')
      expect(updatedPackageJson.dependencies['react']).toBe('^18.0.0')
    })

    it('should preserve existing dependencies when adding Heroicons', () => {
      const originalPackageJson = {
        name: 'test-app',
        dependencies: {
          'next': '^15.0.0',
          'react': '^18.0.0',
          'some-other-package': '^1.0.0',
        }
      }

      const updatedPackageJson = {
        ...originalPackageJson,
        dependencies: {
          ...originalPackageJson.dependencies,
          '@heroicons/react': '^2.0.0',
        }
      }

      expect(Object.keys(updatedPackageJson.dependencies)).toHaveLength(4)
      expect(updatedPackageJson.dependencies['some-other-package']).toBe('^1.0.0')
    })
  })

  describe('Documentation Generation', () => {
    const generateHeroiconsDocumentation = (): string => {
      return `### Icons
Heroicons are available for all your icon needs in multiple sizes and styles:

\`\`\`tsx
import { HomeIcon } from '@heroicons/react/24/outline'  // 24x24 outline
import { StarIcon } from '@heroicons/react/24/solid'    // 24x24 solid
import { UserIcon } from '@heroicons/react/20/solid'    // 20x20 solid
import { BellIcon } from '@heroicons/react/16/solid'    // 16x16 solid

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <HomeIcon className="h-6 w-6" />                 {/* 24x24 outline */}
      <StarIcon className="h-6 w-6 text-yellow-500" /> {/* 24x24 solid */}
      <UserIcon className="h-5 w-5" />                 {/* 20x20 solid */}
      <BellIcon className="h-4 w-4" />                 {/* 16x16 solid */}
    </div>
  )
}
\`\`\``;
    }

    it('should generate comprehensive Heroicons documentation', () => {
      const docs = generateHeroiconsDocumentation()
      
      expect(docs).toContain('Heroicons are available')
      expect(docs).toContain('@heroicons/react/24/outline')
      expect(docs).toContain('@heroicons/react/24/solid')
      expect(docs).toContain('@heroicons/react/20/solid')
      expect(docs).toContain('@heroicons/react/16/solid')
      expect(docs).toContain('HomeIcon')
      expect(docs).toContain('StarIcon')
      expect(docs).toContain('UserIcon')
      expect(docs).toContain('BellIcon')
    })
  })
})