import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import { execa } from 'execa';
import { getPackageManagerRunner } from './create-app.js';

interface SurferInitOptions {
  packageManager?: string;
  skipInstall?: boolean;
  force?: boolean;
  verbose?: boolean;
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
    
    // 4. Install Heroicons (optional)
    await installHeroicons(config, spinner);
    
    // 5. Show completion message
    await showCompletionMessage(spinner, config.packageManager);
    
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
  
  // Check for Next.js
  if (!packageJson.dependencies?.next && !packageJson.devDependencies?.next) {
    throw new Error('This is not a Next.js project. Please run this command in a Next.js project.');
  }
  
  // Check for Tailwind CSS
  const hasTailwind = packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss;
  if (!hasTailwind) {
    const packageManager = await detectPackageManager();
    const installCmd = packageManager === 'npm' ? 'npm install -D' : `${packageManager} add -D`;
    throw new Error(`Tailwind CSS is not installed. Surfer requires Tailwind CSS v4.1+. Please install it first:\n\n  ${installCmd} tailwindcss@latest`);
  }
  
  // Check Tailwind version (should be 4.1+)
  const tailwindVersion = packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss;
  if (tailwindVersion && !tailwindVersion.includes('4.') && !tailwindVersion.includes('beta') && !tailwindVersion.includes('alpha')) {
    const packageManager = await detectPackageManager();
    const installCmd = packageManager === 'npm' ? 'npm install -D' : `${packageManager} add -D`;
    console.log(chalk.yellow('⚠️  Warning: Surfer is optimized for Tailwind CSS v4.1+'));
    console.log(chalk.gray('   Current version: ' + tailwindVersion));
    console.log(chalk.gray(`   Consider upgrading: ${installCmd} tailwindcss@latest\n`));
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
    },
    {
      type: 'confirm',
      name: 'installHeroicons',
      message: 'Install Heroicons for React? (Recommended)',
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
  spinner.text = 'Installing bluewaves...';
  
  if (!config.skipInstall) {
    const installCmd = config.packageManager === 'npm' ? 'install' : 'add';
    await execa(config.packageManager, [installCmd, 'bluewaves'], {
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

  // Check if file exists and read existing content
  let existingContent = '';
  if (await fs.pathExists(cssPath)) {
    existingContent = await fs.readFile(cssPath, 'utf-8');
  }

  // Check if import already exists
  if (existingContent.includes('@import "bluewaves/css"')) {
    spinner.text = 'Design tokens CSS already configured';
    return;
  }

  // Prepend import to existing content
  const importStatement = '@import "bluewaves/css";\n\n';
  const newContent = existingContent 
    ? importStatement + existingContent
    : importStatement + '/* Your custom styles go below */\n/* Note: Surfer uses Tailwind CSS v4.1 @theme inline syntax */\n';

  await fs.writeFile(cssPath, newContent);
  
  spinner.text = 'Design tokens CSS setup complete';
}

async function configureShadcnUI(config: { setupShadcn: boolean; packageManager: string }, spinner: Ora) {
  if (!config.setupShadcn) return;
  
  spinner.text = 'Configuring shadcn/ui...';
  
  try {
    // Check if shadcn/ui is already configured
    const componentsJsonPath = path.join(process.cwd(), 'components.json');
    
    if (!await fs.pathExists(componentsJsonPath)) {
      // Initialize shadcn/ui with recommended config for Surfer
      await execa('npx', ['shadcn@latest', 'init', '--yes', '--base-color', 'neutral'], {
        cwd: process.cwd(),
        stdio: 'inherit'
      });
    }
    
    spinner.text = 'shadcn/ui configuration complete';
  } catch {
    const runner = getPackageManagerRunner(config.packageManager);
    const runnerCmd = runner.command === 'bunx' ? 'bunx' : `${runner.command} ${runner.args.join(' ')}`.trim();
    spinner.warn(`shadcn/ui setup skipped - you can run "${runnerCmd} shadcn@latest init" manually`);
  }
}

async function installHeroicons(config: { installHeroicons: boolean; packageManager: string; skipInstall: boolean }, spinner: Ora) {
  if (!config.installHeroicons || config.skipInstall) return;
  
  spinner.text = 'Installing Heroicons for React...';
  
  try {
    const installCmd = config.packageManager === 'npm' ? 'install' : 'add';
    await execa(config.packageManager, [installCmd, '@heroicons/react'], {
      cwd: process.cwd(),
    });
    
    spinner.text = 'Heroicons installation complete';
  } catch {
    const installCmd = config.packageManager === 'npm' ? 'npm install' : `${config.packageManager} add`;
    spinner.warn(`Heroicons installation failed - you can install it manually: ${installCmd} @heroicons/react`);
  }
}

async function showCompletionMessage(spinner: Ora, packageManager: string) {
  spinner.succeed('Surfer design system setup complete! 🏄‍♂️');
  
  console.log('\n' + chalk.green.bold('✅ Setup Complete!\n'));
  
  console.log(chalk.blue('🎨 Tailwind v4.1 design tokens are now available:'));
  console.log(chalk.gray('   • OKLCH color system with perceptual uniformity'));
  console.log(chalk.gray('   • Custom fonts: DM Sans, JetBrains Mono, Lato'));
  console.log(chalk.gray('   • All shadcn/ui components automatically inherit Surfer tokens'));
  console.log(chalk.gray('   • Access via CSS: var(--color-teal-500), var(--font-sans)\n'));
  
  console.log(chalk.blue('🧩 Install shadcn/ui components as needed:'));
  const runner = getPackageManagerRunner(packageManager);
  const runnerCmd = runner.command === 'bunx' ? 'bunx' : `${runner.command} ${runner.args.join(' ')}`.trim();
  console.log(chalk.gray(`   ${runnerCmd} shadcn@latest add button card input\n`));
  
  console.log(chalk.blue('🎨 Use Heroicons in your components:'));
  console.log(chalk.gray('   import { HomeIcon } from "@heroicons/react/24/outline"  // 24x24 outline'));
  console.log(chalk.gray('   import { StarIcon } from "@heroicons/react/24/solid"    // 24x24 solid'));
  console.log(chalk.gray('   import { UserIcon } from "@heroicons/react/20/solid"    // 20x20 solid'));
  console.log(chalk.gray('   import { BellIcon } from "@heroicons/react/16/solid"    // 16x16 solid\n'));
  
  console.log(chalk.blue('📚 Next steps:'));
  console.log(chalk.gray('   • Visit: https://surfer.bluewaves.boutique'));
  console.log(chalk.gray('   • Check out the token documentation'));
  console.log(chalk.gray('   • All components automatically inherit Surfer design! 🚀\n'));
}