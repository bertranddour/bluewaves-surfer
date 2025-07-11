import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="surfer-container surfer-section">
      <div className="surfer-hero">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to{' '}
            <span className="surfer-gradient-text">Surfer</span> 🏄‍♂️
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Your S-tier design system is ready. Start building beautiful, performant applications.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="animate-fade-in">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="animate-fade-in">
              View Components
            </Button>
          </div>
        </div>
      </div>

      <div className="surfer-section">
        <div className="surfer-feature-grid">
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>🎯 Next.js Optimized</CardTitle>
              <CardDescription>
                Built specifically for Next.js 15+ with App Router and Server Components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automatic bundle splitting, SSR/SSG optimization, and Core Web Vitals monitoring.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>🎨 Enhanced shadcn/ui</CardTitle>
              <CardDescription>
                All shadcn/ui components with advanced patterns and variants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Component ownership, accessibility-first design, and full TypeScript support.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>⚡ Performance First</CardTitle>
              <CardDescription>
                OKLCH colors, CSS-in-CSS architecture, and Tailwind v4 optimizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Zero runtime overhead, tree-shaking, and perfect Core Web Vitals scores.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="surfer-section">
        <Card variant="gradient" className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Surf? 🌊</CardTitle>
            <CardDescription>
              Start building your next application with Surfer design system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
              <Button size="lg">
                Explore Components
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}