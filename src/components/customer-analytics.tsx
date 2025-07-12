"use client"

import type React from "react"

import { TrendingUp, TrendingDown, Users, RotateCcw, ShoppingBag, UserX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CustomerMetric {
  id: string
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ElementType
  trend: "up" | "down" | "neutral"
  status: "excellent" | "good" | "warning" | "critical"
  description: string
}

const customerMetrics: CustomerMetric[] = [
  {
    id: "total-customers",
    title: "Total Customers",
    value: "24,847",
    change: 8.2,
    changeLabel: "vs last month",
    icon: Users,
    trend: "up",
    status: "good",
    description: "Active customer base",
  },
  {
    id: "returning-customers",
    title: "Returning Customers",
    value: "68.4%",
    change: 4.1,
    changeLabel: "vs last month",
    icon: RotateCcw,
    trend: "up",
    status: "excellent",
    description: "Customer retention rate",
  },
  {
    id: "avg-orders",
    title: "Avg Orders per Customer",
    value: "3.7",
    change: -2.3,
    changeLabel: "vs last month",
    icon: ShoppingBag,
    trend: "down",
    status: "warning",
    description: "Purchase frequency",
  },
  {
    id: "churn-rate",
    title: "Estimated Churn Rate",
    value: "12.8%",
    change: 1.5,
    changeLabel: "vs last month",
    icon: UserX,
    trend: "down", // Higher churn is bad, so we want this trending down
    status: "critical",
    description: "Customer attrition risk",
  },
]

const statusConfig = {
  excellent: {
    borderColor: "border-l-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    glowColor: "group-hover:shadow-emerald-500/10",
  },
  good: {
    borderColor: "border-l-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    glowColor: "group-hover:shadow-blue-500/10",
  },
  warning: {
    borderColor: "border-l-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    glowColor: "group-hover:shadow-amber-500/10",
  },
  critical: {
    borderColor: "border-l-red-500",
    iconBg: "bg-red-50 dark:bg-red-950/50",
    iconColor: "text-red-600 dark:text-red-400",
    glowColor: "group-hover:shadow-red-500/10",
  },
}

export function CustomerAnalytics() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Customer Analytics</h2>
          <p className="text-sm text-muted-foreground">Monitor customer behavior and retention metrics</p>
        </div>
      </div>

      {/* Customer Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {customerMetrics.map((metric) => (
          <CustomerMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Insights Summary */}
      <Card className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Customer Insights</h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-muted-foreground">Strong retention at 68.4%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-muted-foreground">Order frequency needs attention</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-muted-foreground">Customer base growing steadily</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

interface CustomerMetricCardProps {
  metric: CustomerMetric
}

function CustomerMetricCard({ metric }: CustomerMetricCardProps) {
  const { title, value, change, changeLabel, icon: Icon, trend, status, description } = metric
  const config = statusConfig[status]

  // For churn rate, we want to show the trend differently
  const isChurnMetric = metric.id === "churn-rate"
  const displayTrend = isChurnMetric ? (change > 0 ? "up" : "down") : trend
  const isPositiveTrend = isChurnMetric ? change < 0 : change > 0

  const TrendIcon = displayTrend === "up" ? TrendingUp : TrendingDown

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border-l-4",
        "hover:shadow-lg backdrop-blur-sm",
        config.borderColor,
        config.glowColor,
      )}
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground tracking-tight">{title}</CardTitle>
            <p className="text-xs text-muted-foreground/70">{description}</p>
          </div>
          <div className={cn("rounded-lg p-2.5 transition-all duration-300 group-hover:scale-110", config.iconBg)}>
            <Icon className={cn("h-4 w-4 transition-colors duration-300", config.iconColor)} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Main Value */}
          <div className="space-y-2">
            <div className="text-3xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
              {value}
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 text-xs font-medium transition-all duration-300",
                  isPositiveTrend
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                    : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
                )}
              >
                <TrendIcon className="h-3 w-3" />
                {Math.abs(change)}%
              </Badge>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          </div>

          {/* Status Indicator Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Performance</span>
              <span
                className={cn(
                  "font-medium capitalize",
                  status === "excellent" && "text-emerald-600 dark:text-emerald-400",
                  status === "good" && "text-blue-600 dark:text-blue-400",
                  status === "warning" && "text-amber-600 dark:text-amber-400",
                  status === "critical" && "text-red-600 dark:text-red-400",
                )}
              >
                {status}
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-1000 ease-out rounded-full",
                  status === "excellent" && "bg-emerald-500",
                  status === "good" && "bg-blue-500",
                  status === "warning" && "bg-amber-500",
                  status === "critical" && "bg-red-500",
                )}
                style={{
                  width: `${status === "excellent" ? 90 : status === "good" ? 75 : status === "warning" ? 60 : 40}%`,
                  transitionDelay: "300ms",
                }}
              />
            </div>
          </div>

          {/* Additional Context */}
          {metric.id === "churn-rate" && (
            <div className="pt-2 border-t border-muted/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                <span>Industry avg: 15-20%</span>
              </div>
            </div>
          )}

          {metric.id === "returning-customers" && (
            <div className="pt-2 border-t border-muted/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>Target: 65%+</span>
              </div>
            </div>
          )}
        </CardContent>
      </div>

      {/* Hover Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none",
          "bg-gradient-to-r from-transparent via-primary/5 to-transparent",
        )}
      />
    </Card>
  )
}
