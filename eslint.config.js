import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      // Disable some strict rules for flexibility
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // Best practices
      'prefer-const': 'error',
      'no-console': 'off', // Allow console in CLI tools
      'no-debugger': 'error',
      
      // Disable import rules for now
      'no-undef': 'off' // TypeScript handles this
    }
  },
  {
    files: ['src/cli/**/*.ts'],
    rules: {
      // Allow console in CLI files
      'no-console': 'off',
      // CLI files may need process.exit
      'no-process-exit': 'off'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      // Test files can be more relaxed
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.next/',
      'coverage/',
      '*.config.js',
      '*.config.ts',
      'bin/',
      'templates/'
    ]
  }
]