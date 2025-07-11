import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import { execa } from 'execa';

interface SurferInitOptions {
  template?: string;
  packageManager?: string;
  skipInstall?: boolean;
  skipGit?: boolean;
  withExamples?: boolean;
}

export async function initSurfer(options: SurferInitOptions = {}) {
  console.log(chalk.blue.bold('🏄‍♂️ Surfer Design System'));
  console.log(chalk.gray('S-tier design system for Next.js + shadcn/ui\n'));

  const cwd = process.cwd();
  const projectName = path.basename(cwd);

  // Check if this is a Next.js project
  await validateNextJsProject(cwd);

  // Get configuration
  const config = await promptForConfig(options);
  
  const spinner = ora('Installing Surfer design system...').start();
  
  try {
    // 1. Setup package.json dependencies
    await setupNextJsDependencies(config, spinner);
    
    // 2. Configure Tailwind CSS v4
    await configureTailwind(config, spinner);
    
    // 3. Setup shadcn/ui configuration
    await configureShadcn(config, spinner);
    
    // 4. Install Surfer design tokens
    await installDesignTokens(config, spinner);
    
    // 5. Setup CSS architecture
    await setupCSSArchitecture(config, spinner);
    
    // 6. Install enhanced components
    await installSurferComponents(config, spinner);
    
    // 7. Create template files
    await createTemplateFiles(config, spinner);
    
    // 8. Setup Next.js configuration
    await configureNextJs(config, spinner);
    
    // 9. Install packages
    if (!config.skipInstall) {
      await installPackages(config, spinner);
    }
    
    // 10. Initialize git
    if (!config.skipGit) {
      await initializeGit(config, spinner);
    }
    
    spinner.succeed('🏄‍♂️ Surfer design system installed successfully!');
    
    printSurferSuccessMessage(config);
    
  } catch (error) {
    spinner.fail('Installation failed');
    console.error(chalk.red('Error:'), error);
    process.exit(1);
  }
}

async function validateNextJsProject(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json');
  
  if (!await fs.pathExists(packageJsonPath)) {
    console.log(chalk.red('❌ No package.json found. Please run this command in a Next.js project.'));
    process.exit(1);
  }
  
  const packageJson = await fs.readJson(packageJsonPath);
  
  if (!packageJson.dependencies?.next && !packageJson.devDependencies?.next) {
    console.log(chalk.red('❌ Next.js not found in dependencies. Please run this command in a Next.js project.'));
    process.exit(1);
  }
  
  console.log(chalk.green('✅ Next.js project detected'));
}

async function promptForConfig(options: SurferInitOptions) {
  const questions = [];
  
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Which Surfer template would you like to use?',
      choices: [
        { name: '🚀 Minimal - Clean setup with core components', value: 'minimal' },
        { name: '📊 Dashboard - Admin interface with advanced components', value: 'dashboard' },
        { name: '💼 SaaS - Complete SaaS application template', value: 'saas' },
        { name: '🛍️ E-commerce - Online store with product components', value: 'ecommerce' },
        { name: '🎨 Design System - Full design system showcase', value: 'design-system' }
      ],
      default: 'minimal'
    });
  }
  
  if (!options.packageManager) {
    questions.push({
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager do you want to use?',
      choices: [
        { name: 'pnpm (recommended)', value: 'pnpm' },
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' }
      ],
      default: 'pnpm'
    });
  }
  
  questions.push({
    type: 'confirm',
    name: 'withExamples',
    message: 'Include example components and pages?',
    default: true
  });
  
  const answers = await inquirer.prompt(questions as any);
  return { ...options, ...answers };
}

async function setupNextJsDependencies(config: any, spinner: Ora) {
  spinner.text = 'Setting up Next.js dependencies...';
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  
  // Surfer dependencies optimized for Next.js
  const dependencies = {
    '@bluewaves/surfer': '^1.0.0',
    'tailwindcss': '^4.1.11',
    '@tailwindcss/postcss': '^4.1.11',
    'class-variance-authority': '^0.7.1',
    'clsx': '^2.1.1',
    'tailwind-merge': '^3.3.1',
    'next-themes': '^0.4.6',
    'framer-motion': '^11.0.0',
    'sonner': '^2.0.6',
    'zod': '^4.0.5'
  };
  
  // shadcn/ui dependencies
  const shadcnDependencies = {
    '@radix-ui/react-accordion': '^1.2.11',
    '@radix-ui/react-alert-dialog': '^1.1.14',
    '@radix-ui/react-avatar': '^1.1.10',
    '@radix-ui/react-checkbox': '^1.3.2',
    '@radix-ui/react-dialog': '^1.1.14',
    '@radix-ui/react-dropdown-menu': '^2.1.15',
    '@radix-ui/react-label': '^2.1.7',
    '@radix-ui/react-navigation-menu': '^1.2.13',
    '@radix-ui/react-popover': '^1.1.14',
    '@radix-ui/react-progress': '^1.1.7',
    '@radix-ui/react-select': '^2.2.5',
    '@radix-ui/react-separator': '^1.1.7',
    '@radix-ui/react-slider': '^1.3.5',
    '@radix-ui/react-slot': '^1.2.3',
    '@radix-ui/react-switch': '^1.2.5',
    '@radix-ui/react-tabs': '^1.1.12',
    '@radix-ui/react-toast': '^1.2.2',
    '@radix-ui/react-tooltip': '^1.2.7',
    'cmdk': '^1.1.1',
    'date-fns': '^4.1.0',
    'embla-carousel-react': '^8.6.0',
    'lucide-react': '^0.525.0',
    'react-hook-form': '^7.60.0',
    'vaul': '^1.1.2'
  };
  
  packageJson.dependencies = { 
    ...packageJson.dependencies, 
    ...dependencies,
    ...shadcnDependencies 
  };
  
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

async function configureTailwind(config: any, spinner: Ora) {
  spinner.text = 'Configuring Tailwind CSS v4...';
  
  // Tailwind config optimized for Next.js + Surfer
  const tailwindConfig = `import type { Config } from 'tailwindcss'
import { surferPreset } from '@bluewaves/surfer/tailwind'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@bluewaves/surfer/**/*.{js,ts,jsx,tsx}'
  ],
  presets: [surferPreset],
  theme: {
    extend: {
      // Add your custom theme extensions here
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        heading: ['var(--font-heading)']
      }
    }
  },
  plugins: []
}

export default config`;
  
  await fs.writeFile(
    path.join(process.cwd(), 'tailwind.config.ts'),
    tailwindConfig
  );
  
  // PostCSS config for Next.js
  const postcssConfig = `module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}`;
  
  await fs.writeFile(
    path.join(process.cwd(), 'postcss.config.js'),
    postcssConfig
  );
}

async function configureShadcn(config: any, spinner: Ora) {
  spinner.text = 'Configuring shadcn/ui...';
  
  // components.json for shadcn/ui
  const componentsConfig = {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": true,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "src/app/globals.css",
      "baseColor": "zinc",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    }
  };
  
  await fs.writeJson(
    path.join(process.cwd(), 'components.json'),
    componentsConfig,
    { spaces: 2 }
  );
}

async function installDesignTokens(config: any, spinner: Ora) {
  spinner.text = 'Installing Surfer design tokens...';
  
  // Create lib directory
  const libDir = path.join(process.cwd(), 'src', 'lib');
  await fs.ensureDir(libDir);
  
  // Surfer design tokens
  const designTokens = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-export Surfer design tokens
export { 
  getDesignTokens,
  getTypographyClass,
  getSectionSpacing,
  getCardPadding,
  getGapClass,
  getBorderRadiusClass 
} from '@bluewaves/surfer/tokens'`;
  
  await fs.writeFile(
    path.join(libDir, 'utils.ts'),
    designTokens
  );
  
  // Surfer config
  const surferConfig = {
    version: '1.0.0',
    template: config.template,
    nextjs: {
      version: '15.x',
      appRouter: true
    },
    customizations: {
      colors: {},
      fonts: {},
      components: {}
    }
  };
  
  await fs.writeJson(
    path.join(process.cwd(), 'surfer.config.json'),
    surferConfig,
    { spaces: 2 }
  );
}

async function setupCSSArchitecture(config: any, spinner: Ora) {
  spinner.text = 'Setting up CSS architecture...';
  
  // Ensure app directory exists
  const appDir = path.join(process.cwd(), 'src', 'app');
  await fs.ensureDir(appDir);
  
  // Enhanced globals.css with Surfer system
  const globalsCss = `@import '@bluewaves/surfer/css';
@import 'tailwindcss';

/* Surfer Design System - Next.js Optimized */

@theme {
  /* Enhanced color system with OKLCH */
  --color-background: oklch(0.141 0.005 285.823);
  --color-foreground: oklch(0.985 0 0);
  --color-primary: oklch(0.7871 0.1341 203.37);
  --color-secondary: oklch(0.6681 0.0742 59.69);
  --color-accent: oklch(0.8076 0.1351 221.84);
  --color-muted: oklch(0.274 0.006 286.033);
  --color-border: oklch(1 0 0 / 10%);
  
  /* Next.js specific optimizations */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  --font-heading: 'Inter', system-ui, sans-serif;
  
  /* Performance optimizations */
  --contain: layout style paint;
  --content-visibility: auto;
}

@layer base {
  * {
    @apply border-border;
    contain: var(--contain);
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
  
  /* Next.js App Router optimizations */
  html {
    scroll-behavior: smooth;
  }
  
  /* Surfer component base styles */
  .surfer-container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }
  
  .surfer-section {
    @apply py-16 lg:py-24;
  }
  
  .surfer-card {
    @apply rounded-lg border bg-card text-card-foreground shadow-sm;
  }
}

@layer components {
  /* Surfer design patterns */
  .surfer-hero {
    @apply relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 px-6 py-24 sm:py-32 lg:px-8;
  }
  
  .surfer-feature-grid {
    @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3;
  }
  
  .surfer-prose {
    @apply prose prose-zinc max-w-none dark:prose-invert;
  }
}

/* Next.js specific performance optimizations */
@layer utilities {
  .gpu-accelerated {
    transform: translateZ(0);
    will-change: transform;
  }
  
  .content-visibility-auto {
    content-visibility: auto;
    contain-intrinsic-size: 200px;
  }
}`;
  
  await fs.writeFile(
    path.join(appDir, 'globals.css'),
    globalsCss
  );
}

async function installSurferComponents(config: any, spinner: Ora) {
  spinner.text = 'Installing Surfer components...';
  
  // Create components directory structure
  const componentsDir = path.join(process.cwd(), 'src', 'components');
  const uiDir = path.join(componentsDir, 'ui');
  const surferDir = path.join(componentsDir, 'surfer');
  
  await fs.ensureDir(uiDir);
  await fs.ensureDir(surferDir);
  
  // Install base shadcn/ui components enhanced with Surfer
  const baseComponents = [
    'button', 'card', 'input', 'label', 'badge', 'avatar', 
    'dropdown-menu', 'navigation-menu', 'sheet', 'toast',
    'dialog', 'select', 'switch', 'tabs', 'tooltip'
  ];
  
  // This would copy enhanced components from Surfer templates
  // For now, we'll create a placeholder
  const buttonComponent = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`;
  
  await fs.writeFile(
    path.join(uiDir, 'button.tsx'),
    buttonComponent
  );
}

async function createTemplateFiles(config: any, spinner: Ora) {
  spinner.text = `Creating ${config.template} template files...`;
  
  if (config.withExamples) {
    // Create example pages based on template
    const examplePages = getTemplatePages(config.template);
    
    for (const page of examplePages) {
      const pagePath = path.join(process.cwd(), 'src', 'app', page.path);
      await fs.ensureDir(path.dirname(pagePath));
      await fs.writeFile(pagePath, page.content);
    }
  }
}

function getTemplatePages(template: string) {
  const pages = [];
  
  if (template === 'dashboard') {
    pages.push({
      path: 'dashboard/page.tsx',
      content: `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div className="surfer-container surfer-section">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="surfer-feature-grid">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Surfer! 🏄‍♂️</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your S-tier design system is ready.</p>
            <Button>Get Started</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}`
    });
  }
  
  return pages;
}

async function configureNextJs(config: any, spinner: Ora) {
  spinner.text = 'Configuring Next.js...';
  
  // Update next.config.js for Surfer optimizations
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Surfer optimizations
  experimental: {
    optimizePackageImports: ['@bluewaves/surfer', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },
  // Performance optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000
  },
  // Bundle optimization
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      surfer: {
        name: 'surfer',
        test: /[\\\\/]node_modules[\\\\/]@bluewaves[\\\\/]surfer[\\\\/]/,
        chunks: 'all',
        enforce: true
      }
    }
    return config
  }
}

module.exports = nextConfig`;
  
  await fs.writeFile(
    path.join(process.cwd(), 'next.config.js'),
    nextConfig
  );
}

async function installPackages(config: any, spinner: Ora) {
  spinner.text = 'Installing packages...';
  
  try {
    await execa(config.packageManager, ['install'], {
      cwd: process.cwd(),
      stdio: 'pipe'
    });
  } catch (error) {
    throw new Error(`Failed to install packages with ${config.packageManager}`);
  }
}

async function initializeGit(config: any, spinner: Ora) {
  spinner.text = 'Initializing git...';
  
  try {
    await execa('git', ['add', '.'], { cwd: process.cwd() });
    await execa('git', ['commit', '-m', '🏄‍♂️ Add Surfer design system'], { 
      cwd: process.cwd() 
    });
  } catch (error) {
    spinner.warn('Git commit skipped');
  }
}

function printSurferSuccessMessage(config: any) {
  console.log();
  console.log(chalk.blue.bold('🏄‍♂️ Surfer Design System Ready!'));
  console.log();
  console.log(chalk.green('✅ Installation complete! Your Next.js project is now equipped with S-tier design system.'));
  console.log();
  console.log(chalk.blue('🚀 What\'s next?'));
  console.log();
  console.log(chalk.white('1. Start your development server:'));
  console.log(chalk.gray(`   ${config.packageManager} run dev`));
  console.log();
  console.log(chalk.white('2. Add more components:'));
  console.log(chalk.gray('   npx surfer add badge'));
  console.log(chalk.gray('   npx surfer add data-table'));
  console.log();
  console.log(chalk.white('3. Generate new components:'));
  console.log(chalk.gray('   npx surfer generate component MyComponent'));
  console.log();
  console.log(chalk.white('4. Analyze performance:'));
  console.log(chalk.gray('   npx surfer analyze --performance'));
  console.log();
  console.log(chalk.white('5. View documentation:'));
  console.log(chalk.gray('   https://surfer.bluewaves.ai'));
  console.log();
  console.log(chalk.cyan('Ride the wave! 🌊'));
}