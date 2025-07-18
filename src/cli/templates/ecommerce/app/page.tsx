import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="surfer-hero">
        <div className="surfer-container">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Modern <span className="surfer-gradient-text">E-commerce</span> 🛒
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Full-featured online store with cart, checkout, inventory management, 
              and admin dashboard.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">
                Browse Products
              </Button>
              <Button variant="outline" size="lg">
                Seller Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="surfer-container surfer-section">
        <h2 className="text-2xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="surfer-floating">
            <CardHeader>
              <div className="aspect-square bg-muted rounded-md mb-4"></div>
              <CardTitle>Premium Headphones</CardTitle>
              <CardDescription>$199.99</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Add to Cart</Button>
            </CardContent>
          </Card>

          <Card className="surfer-floating">
            <CardHeader>
              <div className="aspect-square bg-muted rounded-md mb-4"></div>
              <CardTitle>Wireless Speaker</CardTitle>
              <CardDescription>$89.99</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Add to Cart</Button>
            </CardContent>
          </Card>

          <Card className="surfer-floating">
            <CardHeader>
              <div className="aspect-square bg-muted rounded-md mb-4"></div>
              <CardTitle>Smart Watch</CardTitle>
              <CardDescription>$299.99</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Add to Cart</Button>
            </CardContent>
          </Card>

          <Card className="surfer-floating">
            <CardHeader>
              <div className="aspect-square bg-muted rounded-md mb-4"></div>
              <CardTitle>Phone Case</CardTitle>
              <CardDescription>$24.99</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Add to Cart</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}