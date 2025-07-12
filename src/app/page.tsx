"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart3, TrendingUp, Users, Package, ArrowRight, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "@/components/app-header"
import { useAuth } from "@/lib/auth-context"

const features = [
  {
    icon: TrendingUp,
    title: "Sales Analytics",
    description: "Track revenue trends, conversion rates, and sales performance in real-time.",
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Understand customer behavior, segmentation, and lifetime value.",
  },
  {
    icon: Package,
    title: "Product Performance",
    description: "Monitor inventory levels, track bestsellers, and optimize pricing.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Manager",
    company: "TechStore",
    content: "Ecomlytics Pro transformed how we understand our business. The insights are incredible.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Founder",
    company: "GrowthCo",
    content: "Finally, an analytics platform that's both powerful and easy to use.",
    rating: 5,
  },
]

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                🚀 Now in Production
              </Badge>
              <h1 className="text-5xl font-bold tracking-tight">
                Professional <span className="gradient-text">E-commerce Analytics</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your business data into actionable insights. Track sales, understand customers, and optimize
                performance with our comprehensive analytics platform.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Cancel anytime
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to grow</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive analytics suite provides deep insights into every aspect of your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <EnhancedCard
                key={feature.title}
                variant="elevated"
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <EnhancedCardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <EnhancedCardTitle>{feature.title}</EnhancedCardTitle>
                </EnhancedCardHeader>
                <EnhancedCardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Trusted by growing businesses</h2>
              <p className="text-muted-foreground">Join thousands of companies using Ecomlytics Pro to drive growth</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <EnhancedCard key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <EnhancedCardContent className="p-6">
                    <div className="flex mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <EnhancedCard variant="gradient" className="max-w-4xl mx-auto text-center">
            <EnhancedCardContent className="p-12">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to transform your business?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Start your free trial today and see how Ecomlytics Pro can help you make better decisions with data.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-teal-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Ecomlytics Pro</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Professional e-commerce analytics platform for growing businesses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm">
                <Link href="/pricing" className="block text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
                <Link href="/features" className="block text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link href="/integrations" className="block text-muted-foreground hover:text-foreground">
                  Integrations
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
                <Link href="/careers" className="block text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <Link href="/help" className="block text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link href="/docs" className="block text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
                <Link href="/status" className="block text-muted-foreground hover:text-foreground">
                  Status
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Ecomlytics Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
