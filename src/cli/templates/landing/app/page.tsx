import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="surfer-hero">
        <div className="surfer-container">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Beautiful <span className="surfer-gradient-text">Landing Pages</span> ✨
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Convert visitors into customers with stunning landing pages built for performance and conversion.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="surfer-container surfer-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
          <p className="mt-4 text-muted-foreground">Everything you need to succeed online</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="surfer-floating text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Optimized for speed and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with the latest technologies for maximum performance and user experience.
              </p>
            </CardContent>
          </Card>

          <Card className="surfer-floating text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <CardTitle>Beautiful Design</CardTitle>
              <CardDescription>
                Pixel-perfect components and layouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Thoughtfully designed components that work together seamlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="surfer-floating text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Get started in minutes, not hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simple setup process with comprehensive documentation and examples.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <Button size="lg">Start Your Free Trial</Button>
        </div>
      </div>
    </div>
  )
}