import { Command } from 'commander'
import { addComponent } from '../utils/add-component.js'

export const addCommand = new Command('add')
  .description('➕ Add Surfer components to your project')
  .argument('[component]', 'Component to add')
  .option('--all', 'Add all available components')
  .option('--force', 'Force add even if component exists')
  .option('--verbose', 'Enable verbose logging')
  .action(async (component, options) => {
    try {
      await addComponent(component, options)
    } catch (error) {
      console.error('❌ Failed to add component:', error)
      process.exit(1)
    }
  })