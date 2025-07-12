"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  Users,
  Package,
  Megaphone,
  FileText,
  Zap,
  Shield,
  Globe,
  Database,
  Code,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: TrendingUp,
    title: "Sales Analytics",
    description: "Track revenue, conversion rates, and sales performance with real-time insights.",
    href: "/dashboard/sales",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/50",
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Understand customer behavior, segmentation, and lifetime value metrics.",
    href: "/dashboard/customers",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    icon: Package,
    title: "Product Performance",
    description: "Monitor inventory, track best sellers, and optimize product strategies.",
    href: "/dashboard/products",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    icon: Megaphone,
    title: "Ad Campaign Tracking",
    description: "Measure campaign effectiveness, ROI, and audience engagement.",
    href: "/dashboard/ads",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/50",
  },
  {
    icon: FileText,
    title: "Advanced Reporting",
    description: "Generate custom reports, schedule exports, and share insights.",
    href: "/dashboard/reports",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant notifications and live data updates across all metrics.",
    href: "/dashboard/notifications",
    color: "text-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-950/50",
  },
]

const techStack = [
  { name: "Next.js 14", description: "React framework with App Router" },
  { name: "TypeScript", description: "Type-safe development" },
  { name: "Tailwind CSS", description: "Utility-first styling" },
  { name: "shadcn/ui", description: "Modern component library" },
  { name: "Recharts", description: "Data visualization" },
  { name: "Lucide Icons", description: "Beautiful icon system" },
]

const capabilities = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Role-based access control, data encryption, and compliance ready.",
  },
  {
    icon: Globe,
    title: "Multi-platform",
    description: "Works seamlessly across desktop, tablet, and mobile devices.",
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Connect with popular tools like Shopify, Stripe, and Google Analytics.",
  },
  {
    icon: Code,
    title: "API Access",
    description: "Full REST API for custom integrations and data exports.",
  },
]

export default function OverviewPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-teal-500 rounded-3xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight gradient-text">Ecomlytics Pro</h1>
            <p className="text-xl text-muted-foreground mt-2">Professional E-commerce Analytics Platform</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">v2.1.0</Badge>
            <Badge className="bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400">
              Production Ready
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Core Features</h2>
            <p className="text-muted-foreground mt-2">Everything you need to understand and grow your business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <EnhancedCard
                key={feature.title}
                variant="interactive"
                className="group h-full animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EnhancedCardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <EnhancedCardTitle className="text-lg">{feature.title}</EnhancedCardTitle>
                </EnhancedCardHeader>
                <EnhancedCardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Link href={feature.href}>
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-accent">
                      Explore Feature →
                    </Button>
                  </Link>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Platform Capabilities</h2>
            <p className="text-muted-foreground mt-2">Built for scale, security, and performance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <EnhancedCard
                key={capability.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <EnhancedCardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <capability.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{capability.title}</h3>
                      <p className="text-muted-foreground text-sm">{capability.description}</p>
                    </div>
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Technology Stack</h2>
            <p className="text-muted-foreground mt-2">Built with modern, industry-standard technologies</p>
          </div>

          <EnhancedCard>
            <EnhancedCardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="font-semibold text-sm">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{tech.description}</p>
                  </div>
                ))}
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </section>

        {/* CTA Section */}
        <section>
          <EnhancedCard variant="gradient" className="text-center">
            <EnhancedCardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Explore all features with our comprehensive dashboard, or upgrade to unlock advanced capabilities.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Explore Dashboard
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    <Zap className="mr-2 h-4 w-4" />
                    View Pricing
                  </Button>
                </Link>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </section>
      </div>
    </DashboardShell>
  )
}
