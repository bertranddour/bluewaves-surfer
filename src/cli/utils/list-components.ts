import chalk from 'chalk'

const SHADCN_COMPONENTS = [
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar',
  'badge', 'breadcrumb', 'button', 'calendar', 'card', 'carousel',
  'chart', 'checkbox', 'collapsible', 'combobox', 'command',
  'context-menu', 'data-table', 'date-picker', 'dialog', 'drawer',
  'dropdown-menu', 'form', 'hover-card', 'input', 'input-otp',
  'label', 'menubar', 'navigation-menu', 'pagination', 'popover',
  'progress', 'radio-group', 'resizable', 'scroll-area', 'select',
  'separator', 'sheet', 'skeleton', 'slider', 'sonner', 'switch',
  'table', 'tabs', 'textarea', 'toast', 'toggle', 'toggle-group',
  'tooltip'
]

const TEMPLATES = [
  'minimal', 'dashboard', 'saas', 'ecommerce', 'landing'
]

interface ListOptions {
  components?: boolean
  templates?: boolean
  verbose?: boolean
}

export async function listComponents(options: ListOptions = {}) {
  console.log(chalk.blue.bold('📋 Bluewaves Components & Templates'))
  console.log(chalk.gray('Available components and templates with Surfer design tokens\n'))

  // If no specific option, show both
  if (!options.components && !options.templates) {
    options.components = true
    options.templates = true
  }

  if (options.components) {
    listShadcnComponents()
  }

  if (options.templates) {
    listProjectTemplates()
  }

  showUsageExamples()
}

function listShadcnComponents() {
  console.log(chalk.green.bold('🧩 Available Components'))
  console.log(chalk.gray('All shadcn/ui components with Surfer design tokens:\n'))

  // Group components by category for better readability
  const grouped = groupComponents()
  
  Object.entries(grouped).forEach(([category, components]) => {
    console.log(chalk.blue(`  ${category}:`))
    components.forEach(component => {
      console.log(chalk.gray(`    • ${component}`))
    })
    console.log()
  })

  console.log(chalk.yellow(`Total: ${SHADCN_COMPONENTS.length} components available\n`))
}

function groupComponents() {
  const groups: Record<string, string[]> = {
    'Form & Input': ['button', 'input', 'textarea', 'select', 'checkbox', 'radio-group', 'switch', 'label', 'form'],
    'Navigation': ['navigation-menu', 'breadcrumb', 'menubar', 'pagination', 'tabs'],
    'Display': ['card', 'badge', 'avatar', 'separator', 'table', 'data-table'],
    'Overlay': ['dialog', 'sheet', 'drawer', 'popover', 'tooltip', 'hover-card', 'alert-dialog'],
    'Feedback': ['alert', 'toast', 'sonner', 'progress', 'skeleton'],
    'Layout': ['accordion', 'collapsible', 'resizable', 'scroll-area', 'aspect-ratio'],
    'Interactive': ['command', 'combobox', 'dropdown-menu', 'context-menu', 'toggle', 'toggle-group', 'slider'],
    'Date & Time': ['calendar', 'date-picker'],
    'Specialized': ['carousel', 'chart', 'input-otp']
  }

  // Add any remaining components to "Other"
  const allGrouped = new Set(Object.values(groups).flat())
  const ungrouped = SHADCN_COMPONENTS.filter(comp => !allGrouped.has(comp))
  if (ungrouped.length > 0) {
    groups['Other'] = ungrouped
  }

  return groups
}

function listProjectTemplates() {
  console.log(chalk.green.bold('🏗️ Available Templates'))
  console.log(chalk.gray('Next.js project templates with Surfer design system:\n'))

  const templateDescriptions = {
    'minimal': 'Clean setup with core components and basic styling',
    'dashboard': 'Admin interface with charts, tables, and data visualization',
    'saas': 'Complete SaaS application with authentication and billing',
    'ecommerce': 'Online store with product management and shopping cart',
    'landing': 'Marketing site optimized for conversions and lead generation'
  }

  TEMPLATES.forEach(template => {
    console.log(chalk.blue(`  ${template}`))
    console.log(chalk.gray(`    ${templateDescriptions[template as keyof typeof templateDescriptions]}`))
    console.log()
  })

  console.log(chalk.yellow(`Total: ${TEMPLATES.length} templates available\n`))
}

function showUsageExamples() {
  console.log(chalk.green.bold('💡 Usage Examples'))
  console.log(chalk.gray('How to use these components and templates:\n'))

  console.log(chalk.blue('Create a new project:'))
  console.log(chalk.gray('  bluewaves create my-app --template dashboard'))
  console.log(chalk.gray('  bluewaves create my-store --template ecommerce\n'))

  console.log(chalk.blue('Add components to existing project:'))
  console.log(chalk.gray('  bluewaves add button'))
  console.log(chalk.gray('  bluewaves add data-table'))
  console.log(chalk.gray('  bluewaves add --all  # Install all components\n'))

  console.log(chalk.blue('Initialize design system:'))
  console.log(chalk.gray('  bluewaves init  # Setup Surfer tokens in existing project\n'))

  console.log(chalk.green('🎨 All components automatically inherit Surfer design tokens:'))
  console.log(chalk.gray('  • OKLCH color system with perceptual uniformity'))
  console.log(chalk.gray('  • Custom fonts: DM Sans, JetBrains Mono, Lato'))
  console.log(chalk.gray('  • Consistent spacing and sizing tokens'))
  console.log(chalk.gray('  • Dark/light theme support built-in'))
}