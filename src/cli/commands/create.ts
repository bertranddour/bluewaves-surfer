import { Command } from 'commander'
import { createBluewavesApp } from '../utils/create-app.js'

export const createCommand = new Command('create')
  .description('🚀 Create a new Bluewaves app with Next.js + Surfer design system')
  .argument('[project-name]', 'Name of your project')
  .option(
    '-t, --template <template>',
    'Template to use (minimal, dashboard, saas, ecommerce, landing)',
    'minimal'
  )
  .option('-p, --package-manager <pm>', 'Package manager to use (npm, pnpm, yarn)')
  .option('--skip-install', 'Skip package installation')
  .option('--skip-git', 'Skip git repository initialization')
  .option('--use-npm', 'Use npm (shorthand for --package-manager npm)')
  .option('--use-pnpm', 'Use pnpm (shorthand for --package-manager pnpm)')
  .option('--use-yarn', 'Use yarn (shorthand for --package-manager yarn)')
  .option('--verbose', 'Enable verbose logging')
  .action(async (projectName, options) => {
    try {
      await createBluewavesApp(projectName, options)
    } catch (error) {
      console.error('❌ Failed to create Bluewaves app:', error)
      process.exit(1)
    }
  })