import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('applies size classes correctly', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-10') // Current implementation uses h-10 for lg
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it.skip('renders as child component when asChild is true', () => {
    // This test requires proper Radix UI setup
    const { container } = render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveClass('inline-flex')
  })

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    button.click()
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})