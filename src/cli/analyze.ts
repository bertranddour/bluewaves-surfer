import { Command } from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { glob } from 'glob'

export interface AnalyzeOptions {
  bundleSize?: boolean
  accessibility?: boolean
  performance?: boolean
  usage?: boolean
  verbose?: boolean
  format?: 'json' | 'table'
}

export async function analyzeSurfer(options: AnalyzeOptions = {}) {
  try {
    console.log(chalk.blue.bold('🏄‍♂️ Surfer Analyze'))
    console.log(chalk.gray('Analyzing your Surfer implementation\n'))

    const cwd = process.cwd()
    const spinner = ora('Analyzing project...').start()

    const results = {
      project: await analyzeProject(cwd),
      components: await analyzeComponents(cwd),
      usage: options.usage ? await analyzeUsage(cwd) : null,
      bundle: options.bundleSize ? await analyzeBundleSize(cwd) : null,
      accessibility: options.accessibility ? await analyzeAccessibility(cwd) : null,
      performance: options.performance ? await analyzePerformance(cwd) : null
    }

    spinner.succeed('✅ Analysis complete!')

    if (options.format === 'json') {
      console.log(JSON.stringify(results, null, 2))
    } else {
      displayTableResults(results, options.verbose)
    }

  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

async function analyzeProject(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json')
  
  if (!await fs.pathExists(packageJsonPath)) {
    throw new Error('No package.json found. Please run in a valid project directory.')
  }

  const packageJson = await fs.readJson(packageJsonPath)
  const hasNext = packageJson.dependencies?.next || packageJson.devDependencies?.next
  const hasTailwind = packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss
  const hasSurfer = packageJson.dependencies?.['@bluewaves/surfer']

  return {
    name: packageJson.name || 'Unknown',
    version: packageJson.version || '0.0.0',
    hasNext: !!hasNext,
    hasTailwind: !!hasTailwind,
    hasSurfer: !!hasSurfer,
    surferVersion: hasSurfer || 'Not installed'
  }
}

async function analyzeComponents(cwd: string) {
  const files = await glob('src/components/**/*.{ts,tsx,js,jsx}', { cwd })
  
  const components = {
    total: files.length,
    ui: files.filter((f: string) => f.includes('/ui/')).length,
    custom: files.filter((f: string) => !f.includes('/ui/')).length,
    files: files.map((f: string) => ({ path: f, size: 0 })) // Would calculate actual sizes
  }

  return components
}

async function analyzeUsage(cwd: string) {
  // Analyze component usage across the project
  const files = await glob('src/**/*.{ts,tsx,js,jsx}', { cwd })
  
  const usageMap = new Map<string, number>()
  
  for (const file of files) {
    const content = await fs.readFile(path.join(cwd, file), 'utf-8')
    // Simple regex to find component imports (would be more sophisticated)
    const imports = content.match(/import.*from.*@\/components\/ui\/(\w+)/g) || []
    
    imports.forEach(imp => {
      const match = imp.match(/\/ui\/(\w+)/)
      if (match) {
        const component = match[1]
        usageMap.set(component, (usageMap.get(component) || 0) + 1)
      }
    })
  }

  return Object.fromEntries(usageMap)
}

async function analyzeBundleSize(cwd: string) {
  // Placeholder for bundle size analysis
  return {
    total: 'Unknown',
    surfer: 'Unknown',
    recommendation: 'Run a proper bundle analyzer for detailed results'
  }
}

async function analyzeAccessibility(cwd: string) {
  // Placeholder for accessibility analysis
  return {
    score: 'Unknown',
    issues: [],
    recommendation: 'Use axe-core or similar tools for detailed accessibility analysis'
  }
}

async function analyzePerformance(cwd: string) {
  // Placeholder for performance analysis
  return {
    lighthouse: 'Not analyzed',
    coreWebVitals: 'Unknown',
    recommendation: 'Use Lighthouse or Web Vitals tools for performance analysis'
  }
}

function displayTableResults(results: any, verbose?: boolean) {
  console.log(chalk.blue('\n📊 Analysis Results\n'))
  
  // Project info
  console.log(chalk.bold('Project Information:'))
  console.log(`  Name: ${results.project.name}`)
  console.log(`  Next.js: ${results.project.hasNext ? '✅' : '❌'}`)
  console.log(`  Tailwind: ${results.project.hasTailwind ? '✅' : '❌'}`)
  console.log(`  Surfer: ${results.project.hasSurfer ? '✅' : '❌'} ${results.project.surferVersion}`)
  
  // Components
  console.log(chalk.bold('\nComponents:'))
  console.log(`  Total: ${results.components.total}`)
  console.log(`  UI Components: ${results.components.ui}`)
  console.log(`  Custom Components: ${results.components.custom}`)
  
  if (verbose && results.components.files.length > 0) {
    console.log(chalk.bold('\nComponent Files:'))
    results.components.files.forEach((file: any) => {
      console.log(`  - ${file.path}`)
    })
  }
  
  if (results.usage) {
    console.log(chalk.bold('\nComponent Usage:'))
    Object.entries(results.usage).forEach(([component, count]) => {
      console.log(`  ${component}: ${count} times`)
    })
  }
  
  console.log(chalk.green('\n🎉 Analysis complete!'))
}

// CLI setup for when this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const program = new Command()
  
  program
    .name('surfer analyze')
    .description('Analyze your project for design system usage')
    .option('--bundle-size', 'analyze bundle size impact')
    .option('--accessibility', 'check accessibility compliance')
    .option('--performance', 'run Core Web Vitals analysis')
    .option('--usage', 'analyze component usage')
    .option('-v, --verbose', 'verbose output')
    .option('-f, --format <format>', 'output format (json, table)', 'table')
    .action(analyzeSurfer)
  
  program.parse()
}