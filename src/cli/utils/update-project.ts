import chalk from 'chalk'
import inquirer from 'inquirer'
import { execa } from 'execa'
import ora, { type Ora } from 'ora'
import fs from 'fs-extra'
import path from 'path'
import semver from 'semver'

interface UpdateOptions {
  force?: boolean
  skipInstall?: boolean
  verbose?: boolean
}

export async function updateProject(options: UpdateOptions = {}) {
  console.log(chalk.blue.bold('🔄 Updating Bluewaves Project'))
  console.log(chalk.gray('Update to the latest Surfer design system and components\n'))

  await validateProject()

  const updateInfo = await checkForUpdates()
  
  if (!updateInfo.hasUpdates && !options.force) {
    console.log(chalk.green('✅ Your project is already up to date!'))
    console.log(chalk.gray(`Current version: ${updateInfo.current}`))
    console.log(chalk.gray(`Latest version: ${updateInfo.latest}`))
    return
  }

  if (updateInfo.hasUpdates) {
    console.log(chalk.yellow('🆙 Updates available:'))
    console.log(chalk.gray(`  Current: ${updateInfo.current}`))
    console.log(chalk.gray(`  Latest: ${updateInfo.latest}`))
    console.log()
  }

  const { confirmUpdate } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmUpdate',
      message: 'Update your project to the latest version?',
      default: true
    }
  ])

  if (!confirmUpdate) {
    console.log(chalk.gray('Update cancelled.'))
    return
  }

  await performUpdate(updateInfo, options)
}

async function validateProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  
  if (!await fs.pathExists(packageJsonPath)) {
    throw new Error('No package.json found. Please run this command in a project directory.')
  }

  const packageJson = await fs.readJson(packageJsonPath)
  
  if (!packageJson.dependencies?.next && !packageJson.devDependencies?.next) {
    throw new Error('This does not appear to be a Next.js project.')
  }

  if (!packageJson.dependencies?.['bluewaves']) {
    throw new Error('Surfer design system not found. Run "bluewaves init" first.')
  }
}

async function checkForUpdates() {
  const spinner = ora('Checking for updates...').start()
  
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJson = await fs.readJson(packageJsonPath)
    
    const currentVersion = packageJson.dependencies?.['bluewaves'] || '0.0.0'
    const cleanCurrent = semver.coerce(currentVersion)?.version || '0.0.0'
    
    // Get latest version from npm
    const { stdout } = await execa('npm', ['view', 'bluewaves', 'version'])
    const latestVersion = stdout.trim()
    
    spinner.stop()
    
    const hasUpdates = semver.gt(latestVersion, cleanCurrent)
    
    return {
      current: cleanCurrent,
      latest: latestVersion,
      hasUpdates
    }
  } catch (error) {
    spinner.fail('Failed to check for updates')
    throw error
  }
}

async function performUpdate(updateInfo: any, options: UpdateOptions) {
  const spinner = ora('Updating project...').start()
  
  try {
    // 1. Update bluewaves package
    await updateSurferPackage(updateInfo, spinner, options)
    
    // 2. Update configuration files
    await updateConfigFiles(spinner)
    
    // 3. Update CSS imports
    await updateCSSImports(spinner)
    
    // 4. Update components if needed
    await updateComponents(spinner, options)
    
    spinner.succeed('Project updated successfully! 🎉')
    
    console.log('\n' + chalk.green.bold('✅ Update Complete!\n'))
    console.log(chalk.blue('🎨 Your project is now using the latest Surfer design tokens:'))
    console.log(chalk.gray(`  • Updated from ${updateInfo.current} to ${updateInfo.latest}`))
    console.log(chalk.gray('  • Latest OKLCH color system improvements'))
    console.log(chalk.gray('  • Enhanced font loading and performance'))
    console.log(chalk.gray('  • Bug fixes and new features\n'))
    
    console.log(chalk.blue('🔄 You may need to restart your development server:'))
    console.log(chalk.gray('  npm run dev  # or yarn dev, pnpm dev\n'))
    
  } catch (error) {
    spinner.fail('Update failed')
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'))
    process.exit(1)
  }
}

async function updateSurferPackage(updateInfo: any, spinner: Ora, options: UpdateOptions) {
  spinner.text = 'Updating bluewaves package...'
  
  if (!options.skipInstall) {
    const packageManager = await detectPackageManager()
    const updateCmd = packageManager === 'npm' ? 'update' : 'upgrade'
    
    await execa(packageManager, [updateCmd, 'bluewaves'], {
      cwd: process.cwd(),
      stdio: options.verbose ? 'inherit' : 'pipe'
    })
  }
}

async function updateConfigFiles(spinner: Ora) {
  spinner.text = 'Updating configuration files...'
  
  // Check if surfer.config.json exists and update it
  const surferConfigPath = path.join(process.cwd(), 'surfer.config.json')
  if (await fs.pathExists(surferConfigPath)) {
    const config = await fs.readJson(surferConfigPath)
    
    // Update config with latest schema
    const updatedConfig = {
      ...config,
      version: "1.0.0",
      updatedAt: new Date().toISOString()
    }
    
    await fs.writeJson(surferConfigPath, updatedConfig, { spaces: 2 })
  }
}

async function updateCSSImports(spinner: Ora) {
  spinner.text = 'Updating CSS imports...'
  
  const appDir = path.join(process.cwd(), 'app')
  const srcDir = path.join(process.cwd(), 'src')
  
  // Check for globals.css in both locations
  const possiblePaths = [
    path.join(appDir, 'globals.css'),
    path.join(srcDir, 'app', 'globals.css')
  ]
  
  for (const cssPath of possiblePaths) {
    if (await fs.pathExists(cssPath)) {
      const content = await fs.readFile(cssPath, 'utf-8')
      
      // Update import statement if it exists
      if (content.includes('@import "bluewaves/css"')) {
        // Already up to date
        continue
      }
      
      // Add import if not present
      if (!content.includes('bluewaves/css')) {
        const updatedContent = `@import "bluewaves/css";\n\n${content}`
        await fs.writeFile(cssPath, updatedContent)
      }
    }
  }
}

async function updateComponents(spinner: Ora, options: UpdateOptions) {
  spinner.text = 'Checking component updates...'
  
  const componentsJsonPath = path.join(process.cwd(), 'components.json')
  
  if (await fs.pathExists(componentsJsonPath)) {
    // Components are managed by shadcn/ui, they automatically get latest versions
    // when reinstalled, so we just need to ensure compatibility
    spinner.text = 'Components are up to date'
  }
}

async function detectPackageManager(): Promise<string> {
  if (await fs.pathExists('pnpm-lock.yaml')) return 'pnpm'
  if (await fs.pathExists('yarn.lock')) return 'yarn'
  if (await fs.pathExists('bun.lockb')) return 'bun'
  return 'npm'
}