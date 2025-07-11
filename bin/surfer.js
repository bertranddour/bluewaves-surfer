#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');

// Determine if we should use ESM or CJS builds
const distPath = path.join(__dirname, '..', 'dist');
const useESM = fs.existsSync(path.join(distPath, 'cli', 'init.js'));

// Dynamic imports for better compatibility
let initSurfer, addComponent, updateSurfer, analyzeSurfer, generateComponent;

if (useESM) {
  // Use dynamic import for ESM
  Promise.all([
    import('../dist/cli/init.js').then(m => ({ initSurfer: m.initSurfer })),
    import('../dist/cli/add.js').then(m => ({ addComponent: m.addComponent })),
    import('../dist/cli/update.js').then(m => ({ updateSurfer: m.updateSurfer })),
    import('../dist/cli/analyze.js').then(m => ({ analyzeSurfer: m.analyzeSurfer })),
    import('../dist/cli/generate.js').then(m => ({ generateComponent: m.generateComponent }))
  ]).then(modules => {
    setupCLI(modules.reduce((acc, mod) => ({ ...acc, ...mod }), {}));
  }).catch(error => {
    console.error('Failed to load CLI modules:', error);
    process.exit(1);
  });
} else {
  // Fallback to CJS
  try {
    const modules = {
      initSurfer: require('../dist/cli/init.cjs').initSurfer,
      addComponent: require('../dist/cli/add.cjs').addComponent,
      updateSurfer: require('../dist/cli/update.cjs').updateSurfer,
      analyzeSurfer: require('../dist/cli/analyze.cjs').analyzeSurfer,
      generateComponent: require('../dist/cli/generate.cjs').generateComponent
    };
    setupCLI(modules);
  } catch (error) {
    console.error('Failed to load CLI modules:', error);
    process.exit(1);
  }
}

function setupCLI(modules) {
  const { initSurfer, addComponent, updateSurfer, analyzeSurfer, generateComponent } = modules;
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
}