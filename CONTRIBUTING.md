# Contributing to Surfer Design System 🏄‍♂️

Thank you for your interest in contributing to Surfer! This guide will help you get started.

## 🚀 Quick Start

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/surfer.git
   cd surfer
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run setup script**
   ```bash
   ./scripts/setup.sh
   ```

4. **Start development**
   ```bash
   pnpm dev
   ```

## 📁 Project Structure

```
surfer/
├── src/
│   ├── components/       # React components
│   ├── tokens/          # Design tokens
│   ├── lib/             # Utilities
│   ├── cli/             # CLI commands
│   └── styles/          # CSS files
├── templates/           # Project templates
├── examples/           # Example applications
├── docs/              # Documentation
└── scripts/           # Build scripts
```

## 🎨 Design Principles

### 1. Performance First
- Zero runtime overhead
- Tree-shaking optimization
- Bundle size monitoring
- Core Web Vitals optimization

### 2. Developer Experience
- TypeScript-first
- Excellent IntelliSense
- Clear error messages
- Comprehensive documentation

### 3. Accessibility
- WCAG 2.1 compliance
- Keyboard navigation
- Screen reader support
- Focus management

### 4. Consistency
- Design token driven
- Semantic naming
- Predictable patterns
- Clear conventions

## 🧩 Adding Components

### 1. Create Component
```bash
# Create new component
mkdir src/components/ui/new-component
touch src/components/ui/new-component/index.tsx
```

### 2. Component Template
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const componentVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "default-styles",
        // Add variants
      },
      size: {
        default: "default-size",
        // Add sizes
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Add props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### 3. Export Component
Add to `src/components/index.ts`:
```tsx
export * from "./ui/new-component"
```

### 4. Update Registry
Add to `src/components/index.ts`:
```tsx
export const COMPONENT_REGISTRY = {
  // ... existing components
  "new-component": {
    name: "NewComponent",
    description: "Description of the component",
    category: "UI",
    dependencies: ["dependency1", "dependency2"]
  }
}
```

## 🎨 Design Tokens

### Adding New Tokens
1. Update `src/tokens/index.ts`
2. Add to Tailwind config `src/tailwind.config.ts`
3. Include in CSS variables `src/styles/globals.css`

### Token Structure
```tsx
export const newTokens = {
  category: {
    subcategory: {
      token: "value"
    }
  }
}
```

## 🛠️ CLI Development

### Adding CLI Commands
1. Create command file in `src/cli/`
2. Add to `bin/surfer.js`
3. Export from main entry point

### Command Template
```tsx
import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'

export async function newCommand(options: any) {
  console.log(chalk.blue('🏄‍♂️ Running new command...'))
  
  const spinner = ora('Processing...').start()
  
  try {
    // Command logic
    spinner.succeed('Command completed!')
  } catch (error) {
    spinner.fail('Command failed')
    console.error(chalk.red('Error:'), error)
    process.exit(1)
  }
}
```

## 🧪 Testing

### Running Tests
```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# Specific component
pnpm test button
```

### Writing Tests
```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  
  it('handles loading state', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## 📚 Documentation

### Component Documentation
Each component should include:
- Description and purpose
- Props interface
- Usage examples
- Variants and states
- Accessibility notes

### Storybook Stories
```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
  },
}
```

## 🔍 Code Style

### TypeScript
- Use strict mode
- Prefer interfaces over types
- Export types with components
- Use proper generics

### React
- Use forwardRef for components
- Prefer composition over inheritance
- Use proper prop types
- Handle edge cases

### CSS
- Use Tailwind classes
- Follow design tokens
- Mobile-first approach
- Use CSS custom properties

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(button): add loading state
fix(card): resolve padding issue
docs(readme): update installation guide
style(tokens): format color values
refactor(cli): improve error handling
test(button): add accessibility tests
chore(deps): update dependencies
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🚀 Release Process

1. **Update version** in `package.json`
2. **Update changelog** in `CHANGELOG.md`
3. **Create pull request** with changes
4. **Merge to main** after review
5. **Create release** on GitHub
6. **Publish to npm** automatically via CI/CD

## 🤝 Pull Request Guidelines

### Before Submitting
- [ ] Tests pass (`pnpm test`)
- [ ] Types check (`pnpm typecheck`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation updated
- [ ] Changelog updated

### PR Description
- Clear title following commit convention
- Description of changes
- Screenshots/demos if applicable
- Breaking changes noted
- Related issues linked

## 🆘 Getting Help

- 📖 [Documentation](https://surfer.bluewaves.ai)
- 💬 [GitHub Discussions](https://github.com/bluewaves/surfer/discussions)
- 🐛 [Issue Tracker](https://github.com/bluewaves/surfer/issues)
- 📧 [Email Support](mailto:support@bluewaves.ai)

## 📄 License

By contributing to Surfer, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Surfer! 🏄‍♂️🌊