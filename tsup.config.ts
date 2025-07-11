import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tokens/index': 'src/tokens/index.ts',
    'components/index': 'src/components/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'utils/index': 'src/utils/index.ts',
    'cli/init': 'src/cli/init.ts',
    'cli/add': 'src/cli/add.ts',
    'cli/update': 'src/cli/update.ts',
    'cli/analyze': 'src/cli/analyze.ts',
    'cli/generate': 'src/cli/generate.ts',
    'tailwind.config': 'src/tailwind.config.ts'
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
    'framer-motion'
  ],
  noExternal: [
    'commander',
    'chalk',
    'ora',
    'inquirer',
    'execa',
    'fs-extra',
    'glob'
  ],
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
    console.log('✅ Build completed successfully!')
  }
})