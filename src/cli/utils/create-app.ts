import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import path, { dirname } from 'path'
import fs from 'fs-extra'
import { execa } from 'execa'
import { fileURLToPath } from 'url'
import { CreateAppError, handleError } from './errors.js'
import {
  validateProjectName,
  validateEnvironment,
  validateProjectPath,
  validateTemplate,
} from './validation.js'
import { getPackageManagerInfo, validatePackageManagerVersion } from './package-manager.js'
import { logger, LogLevel } from './logger.js'
import { detect } from 'detect-package-manager'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface CreateAppOptions {
  template?: string
  packageManager?: string
  skipInstall?: boolean
  skipGit?: boolean
  useNpm?: boolean
  usePnpm?: boolean
  useYarn?: boolean
  verbose?: boolean
}

export async function createBluewavesApp(projectName: string, options: CreateAppOptions) {
  try {
    // Set up logging
    if (options.verbose) {
      logger.setLevel(LogLevel.DEBUG)
    }

    // Validate environment
    await validateEnvironment()

    // Get project name if not provided
    if (!projectName) {
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your project name?',
          default: 'my-bluewaves-app',
          validate: (input: string) => {
            try {
              validateProjectName(input)
              return true
            } catch (error) {
              return error instanceof CreateAppError ? error.message : 'Invalid project name'
            }
          },
        },
      ])
      projectName = name
    }

    // Validate project name
    validateProjectName(projectName)

    // Validate project path
    const projectPath = path.resolve(projectName)
    try {
      await validateProjectPath(projectPath)
    } catch (error) {
      if (error instanceof CreateAppError && error.code === 'DIRECTORY_NOT_EMPTY') {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `Directory ${projectName} already exists. Do you want to overwrite it?`,
            default: false,
          },
        ])

        if (!overwrite) {
          logger.warn('Operation cancelled by user')
          process.exit(0)
        }

        logger.step('Cleaning existing directory...')
        await cleanDirectory(projectPath)
      } else {
        throw error
      }
    }

    // Validate provided options early
    if (options.template) {
      validateTemplate(options.template)
    }

    // Get configuration
    const config = await getProjectConfiguration(options)

    // Validate final configuration
    validateTemplate(config.template)
    const packageManagerInfo = await getPackageManagerInfo(config.packageManager)
    await validatePackageManagerVersion(packageManagerInfo.name)

    console.log()
    console.log(chalk.blue('🏄‍♂️ Creating your Bluewaves app...'))
    console.log(chalk.gray(`Project: ${projectName}`))
    console.log(chalk.gray(`Template: ${config.template}`))
    console.log(chalk.gray(`Package Manager: ${config.packageManager}`))
    console.log()

    const startTime = Date.now()
    const spinner = ora('Setting up project...').start()

    try {
      // Step 1: Create Next.js app
      spinner.text = '🚀 Creating Next.js application...'
      await createNextJsApp(projectName, config, spinner)

      // Step 2: Setup shadcn/ui
      spinner.text = '🎨 Installing shadcn/ui...'
      await setupShadcnUI(projectPath, config, spinner)

      // Step 3: Install Surfer design system
      spinner.text = '🏄‍♂️ Installing Surfer design system...'
      await installSurferDesignSystem(projectPath, config, spinner)

      // Step 4: Setup project template
      spinner.text = `📄 Setting up ${config.template} template...`
      await setupProjectTemplate(projectPath, config, spinner)

      // Step 5: Install dependencies
      if (!config.skipInstall) {
        spinner.text = '📦 Installing dependencies...'
        await installDependencies(projectPath, config, spinner)
      }

      // Step 6: Initialize git
      if (!config.skipGit) {
        spinner.text = '📝 Initializing git repository...'
        await initializeGit(projectPath, config, spinner)
      }

      // Step 7: Final setup
      spinner.text = '✨ Final touches...'
      await finalSetup(projectPath, config, spinner)

      const duration = ((Date.now() - startTime) / 1000).toFixed(1)
      spinner.succeed(`🎉 Created ${projectName} in ${duration}s`)

      // Success message
      printSuccessMessage(projectName, config)
    } catch (error) {
      if (spinner) {
        spinner.fail('Failed to create Bluewaves app')
      }
      throw error
    }
  } catch (error) {
    handleError(error, options.verbose)
    process.exit(1)
  }
}

async function getProjectConfiguration(options: CreateAppOptions) {
  const questions = []

  // Template selection
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: [
        { name: '🚀 Minimal - Clean setup with core components', value: 'minimal' },
        { name: '📊 Dashboard - Admin interface with charts and tables', value: 'dashboard' },
        { name: '💼 SaaS - Complete SaaS application template', value: 'saas' },
        { name: '🛍️ E-commerce - Online store with product management', value: 'ecommerce' },
        { name: '🎯 Landing Page - Marketing site with conversion focus', value: 'landing' },
      ],
      default: 'minimal',
    })
  }

  // Package manager selection
  if (!options.packageManager && !options.useNpm && !options.usePnpm && !options.useYarn) {
    const detected = await detect().catch(() => 'pnpm')
    questions.push({
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager would you like to use?',
      choices: [
        { name: 'pnpm (recommended)', value: 'pnpm' },
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
      ],
      default: detected || 'pnpm',
    })
  }

  const answers = questions.length > 0 ? await inquirer.prompt(questions as any) : {}

  return {
    template: options.template || answers.template || 'minimal',
    packageManager:
      options.packageManager ||
      (options.useNpm
        ? 'npm'
        : options.usePnpm
          ? 'pnpm'
          : options.useYarn
            ? 'yarn'
            : answers.packageManager || 'pnpm'),
    skipInstall: options.skipInstall || false,
    skipGit: options.skipGit || false,
    verbose: options.verbose || false,
  }
}

export function getPackageManagerRunner(packageManager: string) {
  switch (packageManager) {
    case 'pnpm':
      return { command: 'pnpm', args: ['dlx'] }
    case 'yarn':
      return { command: 'yarn', args: ['dlx'] }
    case 'bun':
      return { command: 'bunx', args: ['--bun'] }
    case 'npm':
    default:
      return { command: 'npx', args: [] }
  }
}

async function cleanDirectory(dirPath: string) {
  const items = await fs.readdir(dirPath)

  for (const item of items) {
    // Preserve .git directory
    if (item === '.git') {
      continue
    }

    const itemPath = path.join(dirPath, item)
    await fs.remove(itemPath)
  }
}

async function createNextJsApp(projectName: string, config: any, _spinner: any) {
  // Use create-next-app with latest version and optimal settings
  const createNextCommand = [
    'create-next-app@latest',
    projectName,
    '--ts',
    '--tailwind',
    '--eslint',
    '--app',
    '--turbopack',
    '--yes',
  ]

  // Use the appropriate package manager runner
  const runner = getPackageManagerRunner(config.packageManager)
  await execa(runner.command, [...runner.args, ...createNextCommand], {
    stdio: config.verbose ? 'inherit' : 'pipe',
  })
}

async function setupShadcnUI(projectPath: string, config: any, _spinner: any) {
  const cwd = projectPath
  const runner = getPackageManagerRunner(config.packageManager)

  // Initialize shadcn/ui
  await execa(
    runner.command,
    [...runner.args, 'shadcn@latest', 'init', '--yes', '--base-color', 'neutral'],
    {
      cwd,
      stdio: config.verbose ? 'inherit' : 'pipe',
    }
  )

  // Install all shadcn/ui components
  await execa(runner.command, [...runner.args, 'shadcn@latest', 'add', '--all'], {
    cwd,
    stdio: config.verbose ? 'inherit' : 'pipe',
  })
}

async function installSurferDesignSystem(projectPath: string, config: any, _spinner: any) {
  const cwd = projectPath

  // Add Surfer design system to package.json
  const packageJsonPath = path.join(cwd, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)

  packageJson.dependencies = {
    ...packageJson.dependencies,
    'bluewaves': '^1.1.0',
    'framer-motion': '^11.0.0',
    'next-themes': '^0.4.6',
    sonner: '^2.0.6',
    zod: '^4.0.5',
  }

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })

  // Remove any existing Tailwind config file (not needed for v4.1)
  const tailwindConfigPath = path.join(cwd, 'tailwind.config.ts')
  if (await fs.pathExists(tailwindConfigPath)) {
    await fs.remove(tailwindConfigPath)
  }

  // Update globals.css for Tailwind v4.1 + shadcn/ui + Surfer
  const globalsCssPath = path.join(cwd, 'app/globals.css')
  
  // Read existing content from shadcn/ui setup
  let existingContent = ''
  if (await fs.pathExists(globalsCssPath)) {
    existingContent = await fs.readFile(globalsCssPath, 'utf-8')
  }
  
  // Only prepend Surfer import if not already present
  if (!existingContent.includes('@import "bluewaves/css"')) {
    const surferImport = '@import "bluewaves/css";\n\n'
    const newContent = surferImport + existingContent
    await fs.writeFile(globalsCssPath, newContent)
  }

  // Create surfer.config.json
  const surferConfig = {
    version: '1.0.0',
    template: config.template,
    nextjs: {
      version: '15.x',
      appRouter: true,
    },
    customizations: {
      colors: {},
      fonts: {},
      components: {},
    },
  }

  await fs.writeJson(path.join(cwd, 'surfer.config.json'), surferConfig, { spaces: 2 })
}

async function setupProjectTemplate(projectPath: string, config: any, _spinner: any) {
  const templatePath = path.join(__dirname, '..', 'templates', config.template)
  const cwd = projectPath

  // Copy template files selectively to avoid overwriting Next.js + shadcn/ui setup
  if (await fs.pathExists(templatePath)) {
    await copyTemplateSelectively(templatePath, cwd)
  } else {
    // Create basic template page only
    await createBasicTemplate(cwd, config.template)
  }
}

async function copyTemplateSelectively(templatePath: string, targetPath: string) {
  // Only copy the page.tsx from templates, preserve everything else
  const templatePagePath = path.join(templatePath, 'app', 'page.tsx')
  const targetPagePath = path.join(targetPath, 'app', 'page.tsx')
  
  if (await fs.pathExists(templatePagePath)) {
    await fs.copy(templatePagePath, targetPagePath)
  }
}

async function createBasicTemplate(projectPath: string, template: string) {
  const appPath = path.join(projectPath, 'app')

  // Only create enhanced page.tsx based on template, preserve existing layout.tsx
  const pageContent = getTemplatePageContent(template)
  await fs.writeFile(path.join(appPath, 'page.tsx'), pageContent)
}

function getTemplatePageContent(template: string): string {
  const baseContent = `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="surfer-container surfer-section">
      <div className="surfer-hero">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to your{' '}
            <span className="surfer-gradient-text">${template}</span> app 🏄‍♂️
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Built with Next.js, Surfer design system, and shadcn/ui. Ready to ship.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="surfer-section">
        <div className="surfer-feature-grid">
          ${getTemplateCards(template)}
        </div>
      </div>
    </div>
  )
}`

  return baseContent
}

function getTemplateCards(template: string): string {
  const cards = {
    minimal: `
          <Card>
            <CardHeader>
              <CardTitle>🚀 Next.js 15</CardTitle>
              <CardDescription>Latest Next.js with App Router</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Server Components, optimized bundling, and perfect performance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Surfer Design System</CardTitle>
              <CardDescription>S-tier design system ready to use</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                OKLCH colors, enhanced components, and performance-first architecture.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🧩 shadcn/ui</CardTitle>
              <CardDescription>Complete component library installed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                25+ components ready to use with full customization control.
              </p>
            </CardContent>
          </Card>`,

    dashboard: `
          <Card>
            <CardHeader>
              <CardTitle>📊 Dashboard Ready</CardTitle>
              <CardDescription>Admin interface components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tables, charts, forms, and navigation - everything you need.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📈 Data Visualization</CardTitle>
              <CardDescription>Beautiful charts and graphs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Recharts integration with responsive design and dark mode.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔐 Authentication</CardTitle>
              <CardDescription>User management built-in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Login, signup, and protected routes with modern auth patterns.
              </p>
            </CardContent>
          </Card>`,

    saas: `
          <Card>
            <CardHeader>
              <CardTitle>💼 SaaS Ready</CardTitle>
              <CardDescription>Complete SaaS application structure</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Billing, subscriptions, user management, and admin dashboard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💳 Payments</CardTitle>
              <CardDescription>Stripe integration ready</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Subscription management, billing portal, and payment flows.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📧 Email & Notifications</CardTitle>
              <CardDescription>Communication system built-in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Transactional emails, in-app notifications, and user onboarding.
              </p>
            </CardContent>
          </Card>`,
  }

  return cards[template as keyof typeof cards] || cards.minimal
}

async function installDependencies(projectPath: string, config: any, _spinner: any) {
  await execa(config.packageManager, ['install'], {
    cwd: projectPath,
    stdio: config.verbose ? 'inherit' : 'pipe',
  })
}

async function initializeGit(projectPath: string, config: any, _spinner: any) {
  try {
    await execa('git', ['init'], { cwd: projectPath })
    await execa('git', ['add', '.'], { cwd: projectPath })
    await execa(
      'git',
      ['commit', '-m', '🌊 Initial commit: Bluewaves app with Surfer design system'],
      {
        cwd: projectPath,
      }
    )
  } catch (error) {
    // Git initialization is optional
    if (config.verbose) {
      console.warn('Git initialization failed:', error)
    }
  }
}

async function finalSetup(projectPath: string, config: any, _spinner: any) {
  // Create a README with next steps
  const readmeContent = `# ${path.basename(projectPath)}

Welcome to your Bluewaves app! 🏄‍♂️

This project was created with \`create-bluewaves-app\` and includes:

- **Next.js 15** with App Router and TypeScript
- **Surfer Design System** - S-tier design system with OKLCH colors
- **shadcn/ui** - Complete component library (25+ components installed)
- **Tailwind CSS v4** - Latest version with performance optimizations
- **Framer Motion** - Smooth animations
- **Next Themes** - Dark mode support

## 🚀 Getting Started

\`\`\`bash
# Start development server
${config.packageManager} dev

# Build for production
${config.packageManager} build

# Start production server
${config.packageManager} start
\`\`\`

## 📚 Documentation

- [Surfer Design System](https://surfer.bluewaves.boutique)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Next.js Documentation](https://nextjs.org/docs)

## 🎨 Customization

### Colors
Edit \`surfer.config.json\` to customize your design tokens.

### Components
All shadcn/ui components are in \`components/ui/\` - customize as needed.

### Styling
Global styles are in \`app/globals.css\` with Surfer design system.

## 🏄‍♂️ Surfer Commands

\`\`\`bash
# Add more components
npx surfer add data-table
npx surfer add marketing-hero

# Generate custom components
npx surfer generate component UserProfile

# Analyze performance
npx surfer analyze --performance
\`\`\`

## 🌊 Happy Surfing!

Built with ❤️ by [Bluewaves](https://bluewaves.boutique)
`

  await fs.writeFile(path.join(projectPath, 'README.md'), readmeContent)
}

function printSuccessMessage(projectName: string, config: any) {
  console.log()
  console.log(chalk.green.bold('🎉 Success! Your Bluewaves app is ready to surf!'))
  console.log()
  console.log(chalk.blue('📁 Project created with:'))
  console.log(chalk.gray(`   ✓ Next.js 15 with App Router`))
  console.log(chalk.gray(`   ✓ Surfer Design System`))
  console.log(chalk.gray(`   ✓ shadcn/ui (25+ components)`))
  console.log(chalk.gray(`   ✓ Tailwind CSS v4`))
  console.log(chalk.gray(`   ✓ TypeScript & ESLint`))
  console.log(chalk.gray(`   ✓ ${config.template} template`))
  console.log()
  console.log(chalk.blue('🚀 Next steps:'))
  console.log()
  console.log(chalk.white(`   cd ${projectName}`))
  console.log(chalk.white(`   ${config.packageManager} dev`))
  console.log()
  console.log(chalk.blue('🏄‍♂️ Surfer commands:'))
  console.log(chalk.gray('   npx surfer add data-table     # Add components'))
  console.log(chalk.gray('   npx surfer generate component # Create components'))
  console.log(chalk.gray('   npx surfer analyze            # Performance analysis'))
  console.log()
  console.log(chalk.blue('📚 Documentation:'))
  console.log(chalk.gray('   https://surfer.bluewaves.boutique'))
  console.log()
  console.log(chalk.cyan('Happy surfing! 🌊'))
}