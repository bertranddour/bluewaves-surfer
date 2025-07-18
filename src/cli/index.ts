#!/usr/bin/env node
import { program } from 'commander'
import chalk from 'chalk'
import { createCommand } from './commands/create.js'
import { initCommand } from './commands/init.js'
import { addCommand } from './commands/add.js'
import { listCommand } from './commands/list.js'
import { updateCommand } from './commands/update.js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packageJson = require('../../package.json')

console.log()
console.log(chalk.blue.bold('🌊 Welcome to Bluewaves'))
console.log(chalk.gray('The unified CLI for Next.js + Surfer design system + shadcn/ui'))
console.log()

program
  .name('bluewaves')
  .description('🌊 Unified CLI for Bluewaves ecosystem')
  .version(packageJson.version)

// Add all commands
program.addCommand(createCommand)
program.addCommand(initCommand)
program.addCommand(addCommand)
program.addCommand(listCommand)
program.addCommand(updateCommand)

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
} else {
  program.parse()
}