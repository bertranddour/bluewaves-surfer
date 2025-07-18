# 🏄‍♂️ Surfer Migration Guide

This guide helps you move the Surfer design system from the current development location to the `bluewaves-surfer` GitHub repository.

## 📁 Files to Copy

Copy the entire `packages/surfer-design-system/` directory to your new repository. Here's what's included:

### Core Files
```
/
├── package.json                 # Package configuration
├── tsconfig.json               # TypeScript config
├── tsup.config.ts              # Build configuration
├── README.md                   # Main documentation
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # Contribution guide
├── .gitignore                  # Git ignore rules
└── scripts/
    └── setup.sh               # Development setup script
```

### Source Code
```
src/
├── index.ts                    # Main entry point
├── tokens/
│   └── index.ts               # Design tokens
├── components/
│   ├── index.ts               # Component exports
│   └── ui/
│       ├── button.tsx         # Enhanced button component
│       └── card.tsx           # Enhanced card component
├── lib/
│   └── utils.ts               # Utility functions
├── styles/
│   └── globals.css            # Global styles and CSS variables
├── tailwind.config.ts         # Tailwind preset
└── cli/
    ├── init.ts                # CLI initialization
    ├── add.ts                 # Add components
    ├── update.ts              # Update system
    ├── analyze.ts             # Performance analysis
    └── generate.ts            # Generate components
```

### CLI and Templates
```
bin/
└── surfer.js                  # CLI executable

templates/
└── minimal/
    └── page.tsx               # Example page template
```

## 🚀 Repository Setup

### 1. Initialize Repository
```bash
# In your bluewaves-surfer repository
git init
git remote add origin https://github.com/your-username/bluewaves-surfer.git
```

### 2. Copy Files
```bash
# Copy all files from the surfer-design-system directory
cp -r /path/to/bluewaves-core/packages/surfer-design-system/* .
```

### 3. Install Dependencies
```bash
# Install all dependencies
pnpm install
```

### 4. Initial Setup
```bash
# Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 5. First Commit
```bash
git add .
git commit -m "🏄‍♂️ Initial commit: Surfer Design System v1.0.0

feat: S-tier design system for Next.js + shadcn/ui
- OKLCH color system with perceptual uniformity
- Enhanced shadcn/ui components with advanced patterns
- CLI for one-command installation
- Tailwind v4 optimization
- Performance-first architecture
- TypeScript support with strict mode
- Comprehensive documentation

🌊 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

git push -u origin main
```

## 📦 NPM Publishing Setup

### 1. Update Package Name
In `package.json`, ensure the name is correct:
```json
{
  "name": "@bluewaves/surfer",
  "version": "1.0.0"
}
```

### 2. NPM Authentication
```bash
# Login to NPM
npm login

# Verify authentication
npm whoami
```

### 3. Publish Package
```bash
# Build first
pnpm build

# Publish to NPM
npm publish --access public
```

## 🔧 GitHub Configuration

### 1. Repository Settings
- Enable Issues and Discussions
- Set up branch protection for `main`
- Configure automated security updates
- Add repository topics: `design-system`, `nextjs`, `shadcn-ui`, `tailwind`, `typescript`

### 2. GitHub Actions (Optional)
Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test

  publish:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 3. Repository Description
Set the GitHub repository description to:
"🏄‍♂️ S-tier design system for Next.js + shadcn/ui. Zero config, maximum performance."

### 4. README Badges
The README already includes badges that will work once published:
- NPM version badge
- License badge
- TypeScript badge

## 🌍 Domain Setup (Optional)

### 1. Documentation Site
Consider setting up a documentation site at `https://surfer.bluewaves.boutique` using:
- Next.js with App Router
- Deployed on Vercel
- Automatic deployments from main branch

### 2. Example Site
Create example applications at:
- `https://examples.surfer.bluewaves.boutique`
- Showcase different templates (Dashboard, SaaS, E-commerce)

## 📋 Post-Migration Checklist

### Required
- [ ] Repository created and files copied
- [ ] Dependencies installed successfully
- [ ] Build passes (`pnpm build`)
- [ ] Tests pass (`pnpm test`)
- [ ] Package published to NPM
- [ ] Repository configured on GitHub

### Recommended
- [ ] GitHub Actions set up
- [ ] Documentation site created
- [ ] Example applications deployed
- [ ] Community guidelines added
- [ ] Security policy created
- [ ] Issue templates configured

### Nice to Have
- [ ] Storybook deployed
- [ ] Performance monitoring set up
- [ ] Bundle analyzer integrated
- [ ] Discord/Slack community

## 🚀 Launch Strategy

### 1. Soft Launch
- Share with close network
- Gather initial feedback
- Fix critical issues

### 2. Community Launch
- Post on Twitter/X
- Share on Reddit (r/reactjs, r/nextjs)
- Submit to product directories

### 3. Content Marketing
- Write blog posts about the design system
- Create video tutorials
- Showcase example applications

## 🆘 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules dist
pnpm install
pnpm build
```

### Publishing Issues
```bash
# Check NPM authentication
npm whoami

# Verify package name availability
npm view @bluewaves/surfer
```

### TypeScript Issues
```bash
# Check types
pnpm typecheck

# Generate types
pnpm build
```

## 📞 Support

If you need help with the migration:
- 📖 Check the documentation
- 🐛 Create an issue
- 💬 Start a discussion
- 📧 Email support@bluewaves.boutique

---

**Ready to surf? 🏄‍♂️🌊**

The Surfer design system is now ready for the world. Time to share this S-tier creation with the developer community!