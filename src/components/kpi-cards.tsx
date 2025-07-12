"use client"

import type React from "react"
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Heart } from "lucide-react"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { cn } from "@/lib/utils"

interface KPIData {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ElementType
  trend: "up" | "down" | "neutral"
  color: string
  bgColor: string
  description?: string
}

const kpiData: KPIData[] = [
  {
    title: "Total Revenue",
    value: "$847,392",
    change: 12.5,
    changeLabel: "vs last month",
    icon: DollarSign,
    trend: "up",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/50",
    description: "Revenue from all channels",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: -0.4,
    changeLabel: "vs last month",
    icon: Target,
    trend: "down",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    description: "Visitors to customers",
  },
  {
    title: "Customer Acquisition Cost",
    value: "$42.50",
    change: -8.2,
    changeLabel: "vs last month",
    icon: Users,
    trend: "up",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
    description: "Cost per new customer",
  },
  {
    title: "Customer Lifetime Value",
    value: "$1,247",
    change: 15.3,
    changeLabel: "vs last month",
    icon: Heart,
    trend: "up",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/50",
    description: "Average customer value",
  },
]

export function KPICards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} data={kpi} index={index} />
      ))}
    </div>
  )
}

interface KPICardProps {
  data: KPIData
  index: number
}

function KPICard({ data, index }: KPICardProps) {
  const { title, value, change, changeLabel, icon: Icon, trend, color, bgColor, description } = data

  const isPositive = trend === "up"
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <EnhancedCard
      variant="elevated"
      className={cn("group relative overflow-hidden transition-all duration-300 hover:shadow-lg", "animate-fade-in")}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <EnhancedCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <EnhancedCardTitle className="text-sm font-medium text-muted-foreground">{title}</EnhancedCardTitle>
          {description && <p className="text-xs text-muted-foreground/70">{description}</p>}
        </div>
        <div className={cn("rounded-lg p-2.5 transition-all duration-300", bgColor)}>
          <Icon className={cn("h-5 w-5", color)} />
        </div>
      </EnhancedCardHeader>

      <EnhancedCardContent className="space-y-3">
        <div className="text-2xl font-bold tracking-tight">{value}</div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              isPositive
                ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {isPositive ? "+" : ""}
            {change}%
          </div>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </EnhancedCardContent>
    </EnhancedCard>
  )
}
