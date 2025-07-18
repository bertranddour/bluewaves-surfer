import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/index': 'src/components/index.ts',
    'cli/init': 'src/cli/init.ts',
    'cli/index': 'src/cli/index.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    'next',
    'tailwindcss',
    '@next/font',
    'framer-motion',
    'detect-package-manager',
    'semver',
    'validate-npm-package-name',
    'which',
    'commander',
    'chalk',
    'ora',
    'inquirer',
    'execa',
    'fs-extra',
    'glob'
  ],
  noExternal: [],
  banner: (ctx) => {
    // Only add "use client" banner for React components, not CLI tools
    if (ctx.format === 'esm' && ctx.entry && !ctx.entry.includes('cli/')) {
      return {
        js: '"use client"'
      }
    }
    return {}
  },
  esbuildOptions(options) {
    options.jsx = 'automatic'
    options.target = 'node16'
  },
  onSuccess: async () => {
    // Copy CSS files to dist
    const fs = await import('fs-extra')
    await fs.ensureDir('dist/styles')
    await fs.copy('src/styles/globals.css', 'dist/styles/globals.css')
    
    // Copy CLI templates to dist
    const templatesPath = 'src/cli/templates'
    const distTemplatesPath = 'dist/cli/templates'
    if (await fs.pathExists(templatesPath)) {
      await fs.copy(templatesPath, distTemplatesPath)
      console.log('✅ CLI templates copied to dist!')
    }
    
    console.log('✅ Build completed successfully!')
  }
})