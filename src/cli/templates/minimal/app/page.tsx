import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="surfer-container surfer-section">
      <div className="surfer-hero">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="surfer-gradient-text">Minimal</span> App 🏄‍♂️
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Clean, simple, and ready to build upon. Powered by Surfer design system.
          </p>
          <div className="mt-10">
            <Button size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your minimal app</CardTitle>
            <CardDescription>
              Start building your next project with this clean foundation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This minimal template includes just the essentials: Surfer design system,
              Next.js 15, and a clean starting point for your ideas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}