import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="surfer-hero">
        <div className="surfer-container">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Launch your <span className="surfer-gradient-text">SaaS</span> faster 🚀
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build and ship your SaaS product. Authentication, 
              payments, dashboard, and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">
                Start Building
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="surfer-container surfer-section">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="surfer-floating">
            <CardHeader>
              <CardTitle>🔐 Authentication</CardTitle>
              <CardDescription>
                User signup, login, and session management ready to go.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Secure authentication flow with email verification and password reset.
              </p>
            </CardContent>
          </Card>

          <Card className="surfer-floating">
            <CardHeader>
              <CardTitle>💳 Payments</CardTitle>
              <CardDescription>
                Stripe integration for subscriptions and one-time payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Handle billing, invoices, and subscription management seamlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="surfer-floating">
            <CardHeader>
              <CardTitle>📊 Dashboard</CardTitle>
              <CardDescription>
                Beautiful admin dashboard with charts and analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor your SaaS metrics and manage users from one place.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}