import { describe, it, expect } from 'vitest'
import { validateProjectName, validateTemplate } from './validation'

describe('Validation utilities', () => {
  describe('validateProjectName', () => {
    it('should accept valid project names', () => {
      expect(() => validateProjectName('my-app')).not.toThrow()
      expect(() => validateProjectName('myapp123')).not.toThrow()
      expect(() => validateProjectName('my-great-app')).not.toThrow()
    })

    it('should reject invalid project names', () => {
      expect(() => validateProjectName('')).toThrow()
      expect(() => validateProjectName('my app')).toThrow() // spaces not allowed
      expect(() => validateProjectName('My-App')).toThrow() // uppercase not allowed
      expect(() => validateProjectName('.myapp')).toThrow() // leading dot not allowed
    })

    it('should reject names with invalid characters', () => {
      expect(() => validateProjectName('my..app')).toThrow()
      expect(() => validateProjectName('my/app')).toThrow()
      expect(() => validateProjectName('my\\app')).toThrow()
    })

    it('should reject very long names', () => {
      const longName = 'a'.repeat(215)
      expect(() => validateProjectName(longName)).toThrow()
    })
  })

  describe('validateTemplate', () => {
    it('should accept valid templates', () => {
      expect(() => validateTemplate('minimal')).not.toThrow()
      expect(() => validateTemplate('dashboard')).not.toThrow()
      expect(() => validateTemplate('saas')).not.toThrow()
      expect(() => validateTemplate('ecommerce')).not.toThrow()
      expect(() => validateTemplate('landing')).not.toThrow()
    })

    it('should reject invalid templates', () => {
      expect(() => validateTemplate('invalid')).toThrow()
      expect(() => validateTemplate('blog')).toThrow()
      expect(() => validateTemplate('')).toThrow()
      expect(() => validateTemplate('MINIMAL')).toThrow()
    })
  })
})