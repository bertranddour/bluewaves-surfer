#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import { execa } from 'execa';

interface SurferInitOptions {
  packageManager?: string;
  skipInstall?: boolean;
}

export async function initSurfer(options: SurferInitOptions = {}) {
  console.log(chalk.blue.bold('🏄‍♂️ Surfer Design System'));
  console.log(chalk.gray('Token-based design system for Next.js + shadcn/ui\n'));

  const cwd = process.cwd();
  
  // Check if this is a Next.js project
  await validateNextJsProject(cwd);

  // Get configuration
  const config = await promptForConfig(options);
  
  const spinner = ora('Setting up Surfer design tokens...').start();
  
  try {
    // 1. Install Surfer design system
    await installSurferPackage(config, spinner);
    
    // 2. Setup CSS with design tokens
    await setupTokenCSS(config, spinner);
    
    // 3. Configure shadcn/ui (optional)
    await configureShadcnUI(config, spinner);
    
    // 4. Show completion message
    await showCompletionMessage(spinner);
    
  } catch (error) {
    spinner.fail('Failed to setup Surfer design system');
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}

async function validateNextJsProject(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json');
  
  if (!await fs.pathExists(packageJsonPath)) {
    throw new Error('No package.json found. Please run this command in a Next.js project.');
  }
  
  const packageJson = await fs.readJson(packageJsonPath);
  
  if (!packageJson.dependencies?.next && !packageJson.devDependencies?.next) {
    throw new Error('This is not a Next.js project. Please run this command in a Next.js project.');
  }
}

async function promptForConfig(options: SurferInitOptions) {
  const packageManager = options.packageManager || await detectPackageManager();
  
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'setupShadcn',
      message: 'Setup shadcn/ui components? (Recommended)',
      default: true,
    },
    {
      type: 'confirm',
      name: 'setupThemes',
      message: 'Setup dark/light theme support?',
      default: true,
    }
  ]);

  return {
    packageManager,
    skipInstall: options.skipInstall || false,
    ...answers
  };
}

async function detectPackageManager(): Promise<string> {
  if (await fs.pathExists('pnpm-lock.yaml')) return 'pnpm';
  if (await fs.pathExists('yarn.lock')) return 'yarn';
  if (await fs.pathExists('bun.lockb')) return 'bun';
  return 'npm';
}

async function installSurferPackage(config: { packageManager: string; skipInstall: boolean }, spinner: Ora) {
  spinner.text = 'Installing @bluewaves/surfer...';
  
  if (!config.skipInstall) {
    const installCmd = config.packageManager === 'npm' ? 'install' : 'add';
    await execa(config.packageManager, [installCmd, '@bluewaves/surfer'], {
      cwd: process.cwd(),
    });
  }
}

async function setupTokenCSS(config: { packageManager: string; skipInstall: boolean }, spinner: Ora) {
  spinner.text = 'Setting up design tokens CSS...';
  
  const appDir = path.join(process.cwd(), 'app');
  const srcDir = path.join(process.cwd(), 'src');
  
  // Determine if using app/ or src/app/
  let cssPath: string;
  if (await fs.pathExists(path.join(appDir, 'globals.css'))) {
    cssPath = path.join(appDir, 'globals.css');
  } else if (await fs.pathExists(path.join(srcDir, 'app', 'globals.css'))) {
    cssPath = path.join(srcDir, 'app', 'globals.css');
  } else {
    // Create globals.css in app/
    await fs.ensureDir(appDir);
    cssPath = path.join(appDir, 'globals.css');
  }

  const cssContent = `@import "@bluewaves/surfer/css";

/* Your custom styles go below */
/* Note: Surfer uses Tailwind CSS v4.1 @theme inline syntax */
`;

  await fs.writeFile(cssPath, cssContent);
  
  spinner.text = 'Design tokens CSS setup complete';
}

async function configureShadcnUI(config: { setupShadcn: boolean }, spinner: Ora) {
  if (!config.setupShadcn) return;
  
  spinner.text = 'Configuring shadcn/ui...';
  
  try {
    // Check if shadcn/ui is already configured
    const componentsJsonPath = path.join(process.cwd(), 'components.json');
    
    if (!await fs.pathExists(componentsJsonPath)) {
      // Initialize shadcn/ui with recommended config
      await execa('npx', ['shadcn@latest', 'init', '--yes'], {
        cwd: process.cwd(),
        stdio: 'inherit'
      });
    }
    
    spinner.text = 'shadcn/ui configuration complete';
  } catch {
    spinner.warn('shadcn/ui setup skipped - you can run "npx shadcn@latest init" manually');
  }
}

async function showCompletionMessage(spinner: Ora) {
  spinner.succeed('Surfer design system setup complete! 🏄‍♂️');
  
  console.log('\n' + chalk.green.bold('✅ Setup Complete!\n'));
  
  console.log(chalk.blue('🎨 Tailwind v4.1 design tokens are now available:'));
  console.log(chalk.gray('   • OKLCH color system with perceptual uniformity'));
  console.log(chalk.gray('   • Custom fonts: DM Sans, JetBrains Mono, Lato'));
  console.log(chalk.gray('   • All shadcn/ui components automatically inherit Surfer tokens'));
  console.log(chalk.gray('   • Access via CSS: var(--color-teal-500), var(--font-sans)\n'));
  
  console.log(chalk.blue('🧩 Install shadcn/ui components as needed:'));
  console.log(chalk.gray('   npx shadcn@latest add button card input\n'));
  
  console.log(chalk.blue('📚 Next steps:'));
  console.log(chalk.gray('   • Visit: https://surfer.bluewaves.ai'));
  console.log(chalk.gray('   • Check out the token documentation'));
  console.log(chalk.gray('   • All components automatically inherit Surfer design! 🚀\n'));
}

// CLI command setup
if (require.main === module) {
  const program = new Command();
  
  program
    .name('surfer')
    .description('🏄‍♂️ Initialize Surfer design system')
    .version('1.1.0')
    .option('-pm, --package-manager <manager>', 'Package manager to use (npm, yarn, pnpm, bun)')
    .option('--skip-install', 'Skip package installation')
    .action(async (options) => {
      await initSurfer(options);
    });

  program.parse();
}