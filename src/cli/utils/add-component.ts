import chalk from 'chalk'
import inquirer from 'inquirer'
import { execa } from 'execa'
import ora from 'ora'
import fs from 'fs-extra'
import path from 'path'
import { getPackageManagerRunner } from './create-app.js'

async function detectPackageManager(): Promise<string> {
  if (await fs.pathExists('pnpm-lock.yaml')) return 'pnpm'
  if (await fs.pathExists('yarn.lock')) return 'yarn'
  if (await fs.pathExists('bun.lockb')) return 'bun'
  return 'npm'
}

const SHADCN_COMPONENTS = [
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar',
  'badge', 'breadcrumb', 'button', 'calendar', 'card', 'carousel',
  'chart', 'checkbox', 'collapsible', 'combobox', 'command',
  'context-menu', 'data-table', 'date-picker', 'dialog', 'drawer',
  'dropdown-menu', 'form', 'hover-card', 'input', 'input-otp',
  'label', 'menubar', 'navigation-menu', 'pagination', 'popover',
  'progress', 'radio-group', 'resizable', 'scroll-area', 'select',
  'separator', 'sheet', 'skeleton', 'slider', 'sonner', 'switch',
  'table', 'tabs', 'textarea', 'toast', 'toggle', 'toggle-group',
  'tooltip'
]

interface AddComponentOptions {
  all?: boolean
  force?: boolean
  verbose?: boolean
  packageManager?: string
}

export async function addComponent(component?: string, options: AddComponentOptions = {}) {
  console.log(chalk.blue.bold('➕ Adding Surfer Components'))
  console.log(chalk.gray('Install shadcn/ui components with Surfer design tokens\n'))

  await validateProject()
  
  // Detect package manager if not provided
  const packageManager = options.packageManager || await detectPackageManager()
  const runner = getPackageManagerRunner(packageManager)

  if (options.all) {
    return await addAllComponents(options, runner)
  }

  if (!component) {
    component = await promptForComponent()
  }

  if (!SHADCN_COMPONENTS.includes(component)) {
    console.error(chalk.red(`❌ Component "${component}" not found`))
    console.log(chalk.gray('Available components:'))
    console.log(chalk.blue(SHADCN_COMPONENTS.join(', ')))
    process.exit(1)
  }

  await installComponent(component, options, runner)
}

async function validateProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  
  if (!await fs.pathExists(packageJsonPath)) {
    throw new Error('No package.json found. Please run this command in a Next.js project.')
  }

  const componentsJsonPath = path.join(process.cwd(), 'components.json')
  
  if (!await fs.pathExists(componentsJsonPath)) {
    console.log(chalk.yellow('⚠️  shadcn/ui not initialized. Run "bluewaves init" first.'))
    process.exit(1)
  }
}

async function promptForComponent(): Promise<string> {
  const { component } = await inquirer.prompt([
    {
      type: 'list',
      name: 'component',
      message: 'Which component would you like to add?',
      choices: SHADCN_COMPONENTS.sort(),
      pageSize: 15
    }
  ])

  return component
}

async function addAllComponents(options: AddComponentOptions, runner: ReturnType<typeof getPackageManagerRunner>) {
  console.log(chalk.blue('Installing all available components...'))
  
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `This will install ${SHADCN_COMPONENTS.length} components. Continue?`,
      default: false
    }
  ])

  if (!confirm) {
    console.log(chalk.gray('Operation cancelled.'))
    return
  }

  const spinner = ora('Installing all components...').start()
  
  try {
    // Install all components in batches to avoid overwhelming the CLI
    const batchSize = 5
    for (let i = 0; i < SHADCN_COMPONENTS.length; i += batchSize) {
      const batch = SHADCN_COMPONENTS.slice(i, i + batchSize)
      spinner.text = `Installing components: ${batch.join(', ')}...`
      
      await execa(runner.command, [...runner.args, 'shadcn@latest', 'add', ...batch, '--yes'], {
        cwd: process.cwd(),
        stdio: options.verbose ? 'inherit' : 'pipe'
      })
    }
    
    spinner.succeed(`Successfully installed ${SHADCN_COMPONENTS.length} components! 🎉`)
    
    console.log('\n' + chalk.green.bold('✅ All Components Installed!\n'))
    console.log(chalk.blue('🎨 All components now use Surfer design tokens:'))
    console.log(chalk.gray('   • OKLCH color system with perceptual uniformity'))
    console.log(chalk.gray('   • Custom fonts: DM Sans, JetBrains Mono, Lato'))
    console.log(chalk.gray('   • Consistent spacing and sizing tokens'))
    console.log(chalk.gray('   • Dark/light theme support built-in\n'))
    
  } catch (error) {
    spinner.fail('Failed to install components')
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'))
    process.exit(1)
  }
}

async function installComponent(component: string, options: AddComponentOptions, runner: ReturnType<typeof getPackageManagerRunner>) {
  const spinner = ora(`Installing ${component} component...`).start()
  
  try {
    await execa(runner.command, [...runner.args, 'shadcn@latest', 'add', component, '--yes'], {
      cwd: process.cwd(),
      stdio: options.verbose ? 'inherit' : 'pipe'
    })
    
    spinner.succeed(`Successfully installed ${component} component! 🎉`)
    
    console.log('\n' + chalk.green.bold('✅ Component Installed!\n'))
    console.log(chalk.blue(`🎨 The ${component} component now uses Surfer design tokens:`))
    console.log(chalk.gray('   • OKLCH color system with perceptual uniformity'))
    console.log(chalk.gray('   • Custom fonts: DM Sans, JetBrains Mono, Lato'))
    console.log(chalk.gray('   • Consistent spacing and sizing tokens'))
    console.log(chalk.gray('   • Dark/light theme support built-in\n'))
    
  } catch (error) {
    spinner.fail(`Failed to install ${component} component`)
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'))
    process.exit(1)
  }
}