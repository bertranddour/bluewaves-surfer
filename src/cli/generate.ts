import { Command } from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import inquirer from 'inquirer'

export interface GenerateOptions {
  template?: string
  directory?: string
  typescript?: boolean
  withStory?: boolean
  withTest?: boolean
}

type GenerateType = 'component' | 'page' | 'layout' | 'hook'

export async function generateComponent(type: GenerateType, name: string, options: GenerateOptions = {}) {
  try {
    console.log(chalk.blue.bold('🏄‍♂️ Surfer Generate'))
    console.log(chalk.gray(`Generating ${type}: ${name}\n`))

    // Validate inputs
    if (!isValidType(type)) {
      console.log(chalk.red(`❌ Invalid type '${type}'`))
      console.log(chalk.gray('Valid types: component, page, layout, hook'))
      process.exit(1)
    }

    if (!isValidName(name)) {
      console.log(chalk.red(`❌ Invalid name '${name}'`))
      console.log(chalk.gray('Name must be a valid identifier (PascalCase recommended)'))
      process.exit(1)
    }

    const spinner = ora(`Generating ${type}...`).start()
    
    try {
      const outputDir = options.directory || getDefaultDirectory(type)
      const componentName = toPascalCase(name)
      
      // Create the main file
      await generateMainFile(type, componentName, outputDir, options)
      
      // Generate additional files if requested
      if (options.withStory) {
        await generateStoryFile(componentName, outputDir)
      }
      
      if (options.withTest) {
        await generateTestFile(componentName, outputDir)
      }
      
      spinner.succeed(`✅ ${type} '${componentName}' generated successfully!`)
      
      console.log(chalk.green('\n🎉 Generation complete!'))
      console.log(chalk.gray(`Location: ${outputDir}`))
      
      // Show usage example
      if (type === 'component') {
        console.log(chalk.gray('\nUsage:'))
        console.log(chalk.blue(`import { ${componentName} } from './${componentName.toLowerCase()}'`))
      }
      
    } catch (error) {
      spinner.fail('Generation failed')
      throw error
    }
    
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

function isValidType(type: string): type is GenerateType {
  return ['component', 'page', 'layout', 'hook'].includes(type)
}

function isValidName(name: string): boolean {
  return /^[a-zA-Z][a-zA-Z0-9]*$/.test(name)
}

function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getDefaultDirectory(type: GenerateType): string {
  switch (type) {
    case 'component':
      return './src/components'
    case 'page':
      return './src/app'
    case 'layout':
      return './src/app'
    case 'hook':
      return './src/hooks'
    default:
      return './src/components'
  }
}

async function generateMainFile(type: GenerateType, name: string, outputDir: string, options: GenerateOptions) {
  const fileName = getFileName(type, name)
  const filePath = path.join(outputDir, fileName)
  const content = getFileContent(type, name, options)
  
  await fs.ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content)
}

function getFileName(type: GenerateType, name: string): string {
  switch (type) {
    case 'component':
      return `${name.toLowerCase()}.tsx`
    case 'page':
      return `${name.toLowerCase()}/page.tsx`
    case 'layout':
      return `${name.toLowerCase()}/layout.tsx`
    case 'hook':
      return `use-${name.toLowerCase()}.ts`
    default:
      return `${name.toLowerCase()}.tsx`
  }
}

function getFileContent(type: GenerateType, name: string, options: GenerateOptions): string {
  switch (type) {
    case 'component':
      return generateComponentContent(name, options)
    case 'page':
      return generatePageContent(name, options)
    case 'layout':
      return generateLayoutContent(name, options)
    case 'hook':
      return generateHookContent(name, options)
    default:
      return generateComponentContent(name, options)
  }
}

function generateComponentContent(name: string, options: GenerateOptions): string {
  return `import React from 'react'
import { cn } from '@/lib/utils'

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('${name.toLowerCase()}', className)}
        {...props}
      >
        {children || '${name} Component'}
      </div>
    )
  }
)

${name}.displayName = '${name}'
`
}

function generatePageContent(name: string, options: GenerateOptions): string {
  return `import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${name}',
  description: '${name} page description'
}

export default function ${name}Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">${name}</h1>
      <p className="text-muted-foreground mt-2">
        Welcome to the ${name} page.
      </p>
    </div>
  )
}
`
}

function generateLayoutContent(name: string, options: GenerateOptions): string {
  return `import { ReactNode } from 'react'

export interface ${name}LayoutProps {
  children: ReactNode
}

export default function ${name}Layout({ children }: ${name}LayoutProps) {
  return (
    <div className="${name.toLowerCase()}-layout">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-semibold">${name}</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        {children}
      </main>
    </div>
  )
}
`
}

function generateHookContent(name: string, options: GenerateOptions): string {
  const hookName = `use${name.charAt(0).toUpperCase() + name.slice(1)}`
  return `import { useState, useEffect } from 'react'

export interface ${hookName}Options {
  // Add your options here
}

export interface ${hookName}Return {
  // Add your return type here
  value: any
  loading: boolean
  error: Error | null
}

export function ${hookName}(options: ${hookName}Options = {}): ${hookName}Return {
  const [value, setValue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Add your hook logic here
    setLoading(false)
  }, [])

  return {
    value,
    loading,
    error
  }
}
`
}

async function generateStoryFile(name: string, outputDir: string) {
  const content = `import type { Meta, StoryObj } from '@storybook/react'
import { ${name} } from './${name.toLowerCase()}'

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    // Add your argTypes here
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Add your default args here
  }
}

export const Variant: Story = {
  args: {
    // Add variant args here
  }
}
`
  
  const storyPath = path.join(outputDir, `${name.toLowerCase()}.stories.tsx`)
  await fs.writeFile(storyPath, content)
}

async function generateTestFile(name: string, outputDir: string) {
  const content = `import { render, screen } from '@testing-library/react'
import { ${name} } from './${name.toLowerCase()}'

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />)
    expect(screen.getByText('${name} Component')).toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    render(<${name} className="custom-class" />)
    const element = screen.getByText('${name} Component')
    expect(element).toHaveClass('custom-class')
  })
  
  it('renders children when provided', () => {
    render(<${name}>Custom content</${name}>)
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })
})
`
  
  const testPath = path.join(outputDir, `${name.toLowerCase()}.test.tsx`)
  await fs.writeFile(testPath, content)
}

// CLI setup for when this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const program = new Command()
  
  program
    .name('surfer generate')
    .description('Generate new components and templates')
    .argument('<type>', 'type to generate (component, page, layout, hook)')
    .argument('<name>', 'name of the component')
    .option('-t, --template <template>', 'template to use')
    .option('-d, --directory <directory>', 'output directory')
    .option('--with-story', 'generate Storybook story')
    .option('--with-test', 'generate test file')
    .action(generateComponent)
  
  program.parse()
}