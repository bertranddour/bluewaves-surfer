import { Command } from 'commander'
import { listComponents } from '../utils/list-components.js'

export const listCommand = new Command('list')
  .description('📋 List available components and templates')
  .option('--components', 'List available components')
  .option('--templates', 'List available templates')
  .option('--verbose', 'Enable verbose logging')
  .action(async (options) => {
    try {
      await listComponents(options)
    } catch (error) {
      console.error('❌ Failed to list components:', error)
      process.exit(1)
    }
  })