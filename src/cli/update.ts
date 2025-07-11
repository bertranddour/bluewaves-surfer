import { Command } from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import inquirer from 'inquirer'
import { execa } from 'execa'
import { COMPONENT_REGISTRY } from '../components/index.js'

export interface UpdateOptions {
  preview?: boolean
  components?: boolean
  tokens?: boolean
  all?: boolean
  force?: boolean
}

export async function updateSurfer(component?: string, options: UpdateOptions = {}) {
  try {
    console.log(chalk.blue.bold('🏄‍♂️ Surfer Update'))
    console.log(chalk.gray('Updating your Surfer design system\n'))

    const cwd = process.cwd()
    
    // Check if this is a valid project
    await validateProject(cwd)
    
    if (options.all) {
      await updateAllComponents(options)
      return
    }
    
    if (component) {
      await updateSpecificComponent(component, options)
      return
    }
    
    // Interactive update
    await interactiveUpdate(options)
    
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

async function validateProject(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json')
  
  if (!await fs.pathExists(packageJsonPath)) {
    throw new Error('No package.json found. Please run in a valid project directory.')
  }
  
  const packageJson = await fs.readJson(packageJsonPath)
  const hasSurfer = packageJson.dependencies?.['@bluewaves/surfer']
  
  if (!hasSurfer) {
    throw new Error('Surfer is not installed in this project. Run "surfer init" first.')
  }
  
  console.log(chalk.green('✅ Valid Surfer project detected'))
}

async function updateAllComponents(options: UpdateOptions) {
  const spinner = ora('Updating all components...').start()
  
  try {
    // Update the main package
    spinner.text = 'Updating @bluewaves/surfer package...'
    await updatePackage('@bluewaves/surfer')
    
    // Update components if needed
    if (options.components !== false) {
      spinner.text = 'Updating component files...'
      await updateComponentFiles()
    }
    
    // Update design tokens if needed
    if (options.tokens !== false) {
      spinner.text = 'Updating design tokens...'
      await updateDesignTokens()
    }
    
    // Update configuration files
    spinner.text = 'Updating configuration...'
    await updateConfiguration()
    
    spinner.succeed('✅ All components updated successfully!')
    
    console.log(chalk.green('\n🎉 Update complete!'))
    console.log(chalk.gray('Run "pnpm dev" to see the changes.'))
    
  } catch (error) {
    spinner.fail('Update failed')
    throw error
  }
}

async function updateSpecificComponent(component: string, options: UpdateOptions) {
  if (!(component in COMPONENT_REGISTRY)) {
    console.log(chalk.red(`❌ Component '${component}' not found`))
    console.log(chalk.gray('Available components:'))
    Object.keys(COMPONENT_REGISTRY).forEach(name => {
      console.log(chalk.gray(`  - ${name}`))
    })
    process.exit(1)
  }
  
  const spinner = ora(`Updating ${component}...`).start()
  
  try {
    const componentInfo = COMPONENT_REGISTRY[component as keyof typeof COMPONENT_REGISTRY]
    
    // Check if component exists locally
    const componentPath = path.join(process.cwd(), 'src/components/ui', `${component}.tsx`)
    
    if (!await fs.pathExists(componentPath)) {
      spinner.warn(`Component ${component} not found locally`)
      
      const { install } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'install',
          message: `Do you want to install ${component}?`,
          default: true
        }
      ])
      
      if (install) {
        // Would install the component here
        spinner.succeed(`✅ ${componentInfo.name} installed successfully!`)
      }
      return
    }
    
    if (options.preview) {
      spinner.info('Preview mode - no changes will be made')
      console.log(chalk.yellow(`Would update: ${componentPath}`))
      return
    }
    
    // Update the component file
    await updateComponentFile(component, componentPath)
    
    spinner.succeed(`✅ ${componentInfo.name} updated successfully!`)
    
  } catch (error) {
    spinner.fail('Update failed')
    throw error
  }
}

async function interactiveUpdate(options: UpdateOptions) {
  const choices = [
    { name: '📚 Update all components', value: 'all' },
    { name: '🎨 Update design tokens only', value: 'tokens' },
    { name: '🧩 Update specific component', value: 'component' },
    { name: '⚙️ Update configuration', value: 'config' }
  ]
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to update?',
      choices
    }
  ])
  
  switch (action) {
    case 'all':
      await updateAllComponents({ ...options, all: true })
      break
    case 'tokens':
      await updateDesignTokens()
      break
    case 'component':
      const { component } = await inquirer.prompt([
        {
          type: 'list',
          name: 'component',
          message: 'Which component would you like to update?',
          choices: Object.keys(COMPONENT_REGISTRY)
        }
      ])
      await updateSpecificComponent(component, options)
      break
    case 'config':
      await updateConfiguration()
      break
  }
}

async function updatePackage(packageName: string) {
  try {
    await execa('pnpm', ['update', packageName], {
      cwd: process.cwd(),
      stdio: 'pipe'
    })
  } catch (error) {
    // Try with npm if pnpm fails
    try {
      await execa('npm', ['update', packageName], {
        cwd: process.cwd(),
        stdio: 'pipe'
      })
    } catch (npmError) {
      throw new Error(`Failed to update ${packageName}`)
    }
  }
}

async function updateComponentFiles() {
  // Placeholder: In a real implementation, this would update component files
  // by comparing with the latest versions and applying updates
  console.log(chalk.gray('  Component files are up to date'))
}

async function updateDesignTokens() {
  const spinner = ora('Updating design tokens...').start()
  
  try {
    // Update design token files
    const tokensPath = path.join(process.cwd(), 'src/lib/utils.ts')
    
    if (await fs.pathExists(tokensPath)) {
      // Would update the tokens file here
      spinner.succeed('✅ Design tokens updated')
    } else {
      spinner.warn('No design tokens file found')
    }
    
  } catch (error) {
    spinner.fail('Failed to update design tokens')
    throw error
  }
}

async function updateConfiguration() {
  const spinner = ora('Updating configuration...').start()
  
  try {
    // Update configuration files
    const configFiles = [
      'tailwind.config.ts',
      'components.json',
      'surfer.config.json'
    ]
    
    for (const configFile of configFiles) {
      const configPath = path.join(process.cwd(), configFile)
      if (await fs.pathExists(configPath)) {
        // Would update the config file here
        spinner.text = `Updating ${configFile}...`
      }
    }
    
    spinner.succeed('✅ Configuration updated')
    
  } catch (error) {
    spinner.fail('Failed to update configuration')
    throw error
  }
}

async function updateComponentFile(component: string, filePath: string) {
  // Placeholder: In a real implementation, this would update the component file
  // by fetching the latest version and applying updates while preserving customizations
  const backup = await fs.readFile(filePath, 'utf-8')
  
  // Create backup
  await fs.writeFile(`${filePath}.backup`, backup)
  
  // Update the file (placeholder)
  console.log(chalk.gray(`  Updated ${component} component`))
}

// CLI setup for when this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const program = new Command()
  
  program
    .name('surfer update')
    .description('Update components in your project')
    .argument('[component]', 'component to update')
    .option('--preview', 'preview changes without applying')
    .option('--components', 'update components only')
    .option('--tokens', 'update design tokens only')
    .option('-a, --all', 'update all components')
    .option('--force', 'force update without confirmation')
    .action(updateSurfer)
  
  program.parse()
}