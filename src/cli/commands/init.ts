import { Command } from 'commander'
import { initSurfer } from '../utils/init-surfer.js'

export const initCommand = new Command('init')
  .description('🏄‍♂️ Initialize Surfer design system in existing Next.js project')
  .option('--force', 'Force initialization even if Surfer is already detected')
  .option('--skip-install', 'Skip package installation')
  .option('--verbose', 'Enable verbose logging')
  .action(async (options) => {
    try {
      await initSurfer(options)
    } catch (error) {
      console.error('❌ Failed to initialize Surfer:', error)
      process.exit(1)
    }
  })