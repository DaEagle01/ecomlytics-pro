"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { KPICards } from "@/components/kpi-cards"
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ArrowRight,
  Clock,
  ShoppingCart,
  UserPlus,
  CreditCard,
  AlertTriangle,
  FileText,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

const quickStats = [
  {
    title: "Today's Revenue",
    value: "$12,847",
    change: "+8.2%",
    href: "/dashboard/sales",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/50",
  },
  {
    title: "Active Customers",
    value: "2,847",
    change: "+12.5%",
    href: "/dashboard/customers",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Products Sold",
    value: "1,247",
    change: "+4.1%",
    href: "/dashboard/products",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    description: "Order #12847 from Sarah Johnson",
    time: "2 minutes ago",
    amount: "$299.99",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/50",
  },
  {
    id: 2,
    type: "customer",
    title: "New customer registered",
    description: "Mike Chen joined from organic search",
    time: "15 minutes ago",
    icon: UserPlus,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment processed",
    description: "Stripe payment for order #12846",
    time: "1 hour ago",
    amount: "$156.50",
    icon: CreditCard,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/50",
  },
  {
    id: 4,
    type: "inventory",
    title: "Low stock alert",
    description: "Wireless headphones running low (5 left)",
    time: "2 hours ago",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/50",
  },
  {
    id: 5,
    type: "report",
    title: "Weekly report generated",
    description: "Sales performance report is ready",
    time: "3 hours ago",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-muted animate-shimmer rounded" />
            <div className="h-4 w-96 bg-muted animate-shimmer rounded" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-shimmer rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0] || "User"}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your business today.</p>
        </div>

        {/* Main KPI Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Key Metrics</h2>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <KPICards />
        </section>

        {/* Today's Highlights */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Today's Highlights</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {quickStats.map((stat, index) => (
              <EnhancedCard key={stat.title} variant="interactive" className="group">
                <EnhancedCardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="text-green-600">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <Link href={stat.href}>
                    <Button variant="ghost" size="sm" className="w-full mt-4 group-hover:bg-accent">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Activity</h2>
            <Link href="/dashboard/notifications">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <EnhancedCard>
            <EnhancedCardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                          {activity.amount && (
                            <div className="text-right">
                              <p className="font-semibold text-green-600">{activity.amount}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/sales">
              <EnhancedCard variant="interactive" className="group h-full">
                <EnhancedCardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">Sales Analytics</h3>
                  <p className="text-sm text-muted-foreground">View revenue trends</p>
                </EnhancedCardContent>
              </EnhancedCard>
            </Link>

            <Link href="/dashboard/products">
              <EnhancedCard variant="interactive" className="group h-full">
                <EnhancedCardContent className="p-6 text-center">
                  <Package className="h-8 w-8 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">Product Performance</h3>
                  <p className="text-sm text-muted-foreground">Analyze inventory</p>
                </EnhancedCardContent>
              </EnhancedCard>
            </Link>

            <Link href="/dashboard/customers">
              <EnhancedCard variant="interactive" className="group h-full">
                <EnhancedCardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-3 text-purple-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">Customer Insights</h3>
                  <p className="text-sm text-muted-foreground">Monitor behavior</p>
                </EnhancedCardContent>
              </EnhancedCard>
            </Link>

            <Link href="/pricing">
              <EnhancedCard variant="interactive" className="group h-full">
                <EnhancedCardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-3 text-orange-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">Upgrade Plan</h3>
                  <p className="text-sm text-muted-foreground">Unlock more features</p>
                </EnhancedCardContent>
              </EnhancedCard>
            </Link>
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
