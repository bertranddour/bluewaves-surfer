import { Command } from 'commander'
import { updateProject } from '../utils/update-project.js'

export const updateCommand = new Command('update')
  .description('🔄 Update existing Bluewaves application')
  .option('--force', 'Force update even if no changes detected')
  .option('--skip-install', 'Skip package installation')
  .option('--verbose', 'Enable verbose logging')
  .action(async (options) => {
    try {
      await updateProject(options)
    } catch (error) {
      console.error('❌ Failed to update project:', error)
      process.exit(1)
    }
  })