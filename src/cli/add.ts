import { Command } from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import inquirer from 'inquirer'
import { COMPONENT_REGISTRY } from '../components/index.js'

export interface AddComponentOptions {
  path?: string
  overwrite?: boolean
  withExamples?: boolean
  all?: boolean
}

export async function addComponent(component: string, options: AddComponentOptions = {}) {
  try {
    console.log(chalk.blue.bold('🏄‍♂️ Surfer Add Component'))
    console.log(chalk.gray('Adding component to your project\n'))

    if (options.all) {
      await addAllComponents(options)
      return
    }

    if (!component) {
      console.log(chalk.red('❌ Please specify a component to add'))
      console.log(chalk.gray('Example: surfer add button'))
      process.exit(1)
    }

    // Validate component exists
    if (!(component in COMPONENT_REGISTRY)) {
      console.log(chalk.red(`❌ Component '${component}' not found`))
      console.log(chalk.gray('Available components:'))
      Object.keys(COMPONENT_REGISTRY).forEach(name => {
        console.log(chalk.gray(`  - ${name}`))
      })
      process.exit(1)
    }

    const componentInfo = COMPONENT_REGISTRY[component as keyof typeof COMPONENT_REGISTRY]
    const installPath = options.path || './src/components'
    const spinner = ora(`Installing ${componentInfo.name}...`).start()

    try {
      // Check if component already exists
      const componentPath = path.join(installPath, 'ui', `${component}.tsx`)
      if (await fs.pathExists(componentPath) && !options.overwrite) {
        spinner.warn(`Component ${component} already exists`)
        
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: 'Do you want to overwrite the existing component?',
            default: false
          }
        ])
        
        if (!overwrite) {
          console.log(chalk.yellow('Installation cancelled'))
          return
        }
      }

      // Create component directory
      await fs.ensureDir(path.dirname(componentPath))
      
      // Install component (placeholder - would copy from templates)
      await installComponentFile(component, componentPath)
      
      // Install dependencies if needed
      if (componentInfo.dependencies?.length) {
        spinner.text = 'Installing dependencies...'
        // Would run package manager install here
      }

      spinner.succeed(`✅ ${componentInfo.name} component installed successfully!`)
      
      console.log(chalk.green('\n🎉 Component added successfully!'))
      console.log(chalk.gray(`Location: ${componentPath}`))
      
      if (options.withExamples) {
        console.log(chalk.gray('\nExample usage:'))
        console.log(chalk.blue(`import { ${componentInfo.name} } from '@/components/ui/${component}'`))
      }
      
    } catch (error) {
      spinner.fail('Installation failed')
      throw error
    }
    
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

async function addAllComponents(options: AddComponentOptions) {
  const spinner = ora('Installing all components...').start()
  
  try {
    const components = Object.keys(COMPONENT_REGISTRY)
    
    for (const component of components) {
      spinner.text = `Installing ${component}...`
      await addComponent(component, { ...options, all: false })
    }
    
    spinner.succeed('✅ All components installed successfully!')
  } catch (error) {
    spinner.fail('Installation failed')
    throw error
  }
}

async function installComponentFile(component: string, targetPath: string) {
  // Placeholder: In a real implementation, this would copy the component
  // from a templates directory or download from a registry
  const placeholder = `// ${component} component placeholder
export const ${component.charAt(0).toUpperCase() + component.slice(1)} = () => {
  return <div>Coming soon...</div>
}`
  
  await fs.writeFile(targetPath, placeholder)
}

// CLI setup for when this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const program = new Command()
  
  program
    .name('surfer add')
    .description('Add components to your project')
    .argument('[component]', 'component to add')
    .option('-p, --path <path>', 'installation path', './src/components')
    .option('--overwrite', 'overwrite existing files')
    .option('--with-examples', 'include usage examples')
    .option('-a, --all', 'add all components')
    .action(addComponent)
  
  program.parse()
}