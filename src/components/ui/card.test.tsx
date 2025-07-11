import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders without crashing', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Card className="custom-card">Card</Card>)
      const card = screen.getByText('Card')
      expect(card).toHaveClass('custom-card')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Card ref={ref}>Card</Card>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('CardHeader', () => {
    it('renders header content', () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      )
      expect(screen.getByText('Header content')).toBeInTheDocument()
    })
  })

  describe('CardTitle', () => {
    it('renders title with correct heading level', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      )
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Card Title')
    })

    it('applies tracking-tight class', () => {
      render(<CardTitle>Title</CardTitle>)
      const title = screen.getByRole('heading')
      expect(title).toHaveClass('tracking-tight')
    })
  })

  describe('CardDescription', () => {
    it('renders description text', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
        </Card>
      )
      expect(screen.getByText('Card description')).toBeInTheDocument()
    })

    it('applies text-muted-foreground class', () => {
      render(<CardDescription>Description</CardDescription>)
      const description = screen.getByText('Description')
      expect(description).toHaveClass('text-muted-foreground')
    })
  })

  describe('CardContent', () => {
    it('renders content with padding', () => {
      render(
        <Card>
          <CardContent>Content area</CardContent>
        </Card>
      )
      const content = screen.getByText('Content area')
      expect(content).toHaveClass('pt-0')
    })
  })

  describe('CardFooter', () => {
    it('renders footer with flex layout', () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      )
      const footer = screen.getByText('Footer content')
      expect(footer).toHaveClass('flex')
    })
  })

  describe('Complete Card', () => {
    it('renders a complete card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>A test card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Main content goes here</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByRole('heading', { name: 'Test Card' })).toBeInTheDocument()
      expect(screen.getByText('A test card description')).toBeInTheDocument()
      expect(screen.getByText('Main content goes here')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })
  })
})