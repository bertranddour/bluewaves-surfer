#!/usr/bin/env node

const { program } = require('commander');
const { initSurfer } = require('../dist/cli/init');
const { addComponent } = require('../dist/cli/add');
const { updateSurfer } = require('../dist/cli/update');
const { analyzeSurfer } = require('../dist/cli/analyze');
const { generateComponent } = require('../dist/cli/generate');

const packageJson = require('../package.json');

program
  .name('surfer')
  .description('🏄‍♂️ S-tier design system for Next.js + shadcn/ui')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize Surfer design system in your Next.js project')
  .option('-t, --template <template>', 'Template (minimal, dashboard, saas, ecommerce)', 'minimal')
  .option('-p, --package-manager <pm>', 'Package manager (npm, pnpm, yarn)', 'pnpm')
  .option('--skip-install', 'Skip package installation')
  .option('--skip-git', 'Skip git initialization')
  .option('--with-examples', 'Include example components and pages')
  .action(initSurfer);

program
  .command('add <component>')
  .description('Add a Surfer component to your project')
  .option('-p, --path <path>', 'Installation path', './src/components')
  .option('--overwrite', 'Overwrite existing files')
  .option('--with-examples', 'Include usage examples')
  .action(addComponent);

program
  .command('generate <type> <name>')
  .description('Generate a new component, page, or pattern')
  .option('-t, --template <template>', 'Template to use')
  .option('-p, --path <path>', 'Output path')
  .action(generateComponent);

program
  .command('update')
  .description('Update Surfer design system to latest version')
  .option('--preview', 'Preview changes without applying')
  .option('--components', 'Update components only')
  .option('--tokens', 'Update design tokens only')
  .action(updateSurfer);

program
  .command('analyze')
  .description('Analyze your Surfer implementation')
  .option('--bundle-size', 'Analyze bundle size impact')
  .option('--accessibility', 'Check accessibility compliance')
  .option('--performance', 'Run Core Web Vitals analysis')
  .option('--usage', 'Analyze component usage')
  .action(analyzeSurfer);

program
  .command('dev')
  .description('Start Surfer development mode with live reloading')
  .option('-p, --port <port>', 'Port for development server', '3001')
  .action(() => {
    console.log('🏄‍♂️ Starting Surfer dev mode...');
    // Launch Storybook or component playground
  });

program.parse();