"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardDescription,
  EnhancedCardHeader,
  EnhancedCardTitle,
} from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/enhanced-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts"
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CreditCard,
  RefreshCw,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Smartphone,
  Store,
  Target,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for different time periods
const revenueData = {
  "7d": [
    { date: "Jan 8", revenue: 12847, orders: 89, day: "Monday" },
    { date: "Jan 9", revenue: 15234, orders: 102, day: "Tuesday" },
    { date: "Jan 10", revenue: 18567, orders: 124, day: "Wednesday" },
    { date: "Jan 11", revenue: 16890, orders: 115, day: "Thursday" },
    { date: "Jan 12", revenue: 21456, orders: 143, day: "Friday" },
    { date: "Jan 13", revenue: 24789, orders: 167, day: "Saturday" },
    { date: "Jan 14", revenue: 22134, orders: 151, day: "Sunday" },
  ],
  "30d": [
    { date: "Dec 15", revenue: 45000, orders: 320, day: "Week 1" },
    { date: "Dec 22", revenue: 52000, orders: 380, day: "Week 2" },
    { date: "Dec 29", revenue: 48000, orders: 340, day: "Week 3" },
    { date: "Jan 5", revenue: 61000, orders: 420, day: "Week 4" },
    { date: "Jan 12", revenue: 58000, orders: 395, day: "Week 5" },
  ],
  "90d": [
    { date: "Oct", revenue: 180000, orders: 1200, day: "October" },
    { date: "Nov", revenue: 195000, orders: 1350, day: "November" },
    { date: "Dec", revenue: 220000, orders: 1480, day: "December" },
  ],
}

// Sales by channel data
const channelData = [
  {
    channel: "Website",
    icon: Globe,
    revenue: 847392,
    orders: 2847,
    conversionRate: 3.24,
    growth: 12.5,
    color: "text-info-600 dark:text-info-400",
    bgColor: "bg-info-50 dark:bg-info-950/50",
    borderColor: "border-l-info-500",
  },
  {
    channel: "Mobile App",
    icon: Smartphone,
    revenue: 456789,
    orders: 1523,
    conversionRate: 4.12,
    growth: 18.7,
    color: "text-success-600 dark:text-success-400",
    bgColor: "bg-success-50 dark:bg-success-950/50",
    borderColor: "border-l-success-500",
  },
  {
    channel: "In-Store",
    icon: Store,
    revenue: 234567,
    orders: 892,
    conversionRate: 8.45,
    growth: -5.2,
    color: "text-brand-tertiary dark:text-brand-tertiary",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
    borderColor: "border-l-purple-500",
  },
]

const dateRangeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
]

export default function SalesPage() {
  const [selectedRange, setSelectedRange] = useState<"7d" | "30d" | "90d">("30d")

  const currentData = revenueData[selectedRange]
  const selectedRangeLabel = dateRangeOptions.find((option) => option.value === selectedRange)?.label

  // Calculate metrics from current data
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders
  const refundRate = 2.8 // Mock refund rate

  // Calculate total channel metrics
  const totalChannelRevenue = channelData.reduce((sum, channel) => sum + channel.revenue, 0)
  const totalChannelOrders = channelData.reduce((sum, channel) => sum + channel.orders, 0)

  const metricCards = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: 12.5,
      changeLabel: "vs last period",
      icon: DollarSign,
      color: "text-success-600 dark:text-success-400",
      bgColor: "bg-success-50 dark:bg-success-950/50",
      borderColor: "border-l-success-500",
      trend: "up" as const,
      description: "Total sales revenue",
    },
    {
      title: "Orders Count",
      value: totalOrders.toLocaleString(),
      change: 8.2,
      changeLabel: "vs last period",
      icon: ShoppingCart,
      color: "text-info-600 dark:text-info-400",
      bgColor: "bg-info-50 dark:bg-info-950/50",
      borderColor: "border-l-info-500",
      trend: "up" as const,
      description: "Total number of orders",
    },
    {
      title: "AOV (Average Order Value)",
      value: `$${avgOrderValue.toFixed(2)}`,
      change: 4.1,
      changeLabel: "vs last period",
      icon: CreditCard,
      color: "text-brand-tertiary dark:text-brand-tertiary",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      borderColor: "border-l-purple-500",
      trend: "up" as const,
      description: "Revenue per order",
    },
    {
      title: "Refund Rate",
      value: `${refundRate}%`,
      change: -0.5,
      changeLabel: "vs last period",
      icon: RefreshCw,
      color: "text-warning-600 dark:text-warning-400",
      bgColor: "bg-warning-50 dark:bg-warning-950/50",
      borderColor: "border-l-warning-500",
      trend: "down" as const,
      description: "Percentage of refunded orders",
    },
  ]

  return (
    <DashboardShell>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Sales Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your revenue performance, order trends, and sales channel insights
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Date Range Filter */}
            <Select value={selectedRange} onValueChange={(value) => setSelectedRange(value as "7d" | "30d" | "90d")}>
              <SelectTrigger className="w-[160px] bg-background/50 border-border/50 hover:border-brand-primary transition-colors">
                <Calendar className="w-4 h-4 mr-2 text-brand-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="primary"
              leftIcon={<Download className="w-4 h-4" />}
              className="shadow-lg hover:shadow-xl transition-all"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Section 1: Metric Cards */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              <h2 className="text-2xl font-semibold tracking-tight">Key Performance Metrics</h2>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
              Period: {selectedRangeLabel}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {metricCards.map((metric, index) => (
              <EnhancedCard
                key={index}
                variant="glow"
                className={cn(
                  "group relative overflow-hidden border-l-4 transition-all duration-300",
                  metric.borderColor,
                  "animate-fade-in",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative">
                  <EnhancedCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-xs text-muted-foreground/70">{metric.description}</p>
                        <div className="space-y-1">
                          <p className="text-3xl font-bold tracking-tight transition-colors duration-300 group-hover:text-brand-primary">
                            {metric.value}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {metric.trend === "up" ? (
                                <ArrowUpRight className="w-3 h-3 text-success-500" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3 text-success-500" />
                              )}
                              <span className="text-xs font-medium text-success-600">
                                {metric.change > 0 ? "+" : ""}
                                {metric.change}%
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">{metric.changeLabel}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                          metric.bgColor,
                        )}
                      >
                        <metric.icon className={cn("h-6 w-6 transition-colors duration-300", metric.color)} />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-1">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                          style={{
                            width: `${Math.min(Math.abs(metric.change) * 8, 100)}%`,
                            transitionDelay: `${300 + index * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  </EnhancedCardContent>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-primary/10 via-transparent to-brand-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              </EnhancedCard>
            ))}
          </div>
        </section>

        {/* Section 2: Revenue Line Chart */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Revenue Trends</h2>
          </div>
          <EnhancedCard variant="elevated" className="shadow-lg">
            <EnhancedCardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <EnhancedCardTitle className="text-xl">Revenue Over Time</EnhancedCardTitle>
                    <EnhancedCardDescription>
                      Daily revenue performance for {selectedRangeLabel.toLowerCase()}
                    </EnhancedCardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full" />
                    <span className="text-muted-foreground">Revenue</span>
                  </div>
                  <div className="text-muted-foreground">
                    Peak: ${Math.max(...currentData.map((d) => d.revenue)).toLocaleString()}
                  </div>
                </div>
              </div>
            </EnhancedCardHeader>
            <EnhancedCardContent>
              <div className="w-full h-[400px]">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue ($)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--color-brand-secondary)" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
                      <XAxis
                        dataKey="date"
                        className="text-xs fill-muted-foreground"
                        tick={{ fontSize: 12 }}
                        tickLine={{ stroke: "hsl(var(--muted-foreground))", strokeOpacity: 0.3 }}
                      />
                      <YAxis
                        className="text-xs fill-muted-foreground"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        tickLine={{ stroke: "hsl(var(--muted-foreground))", strokeOpacity: 0.3 }}
                      />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="rounded-lg border bg-background/95 backdrop-blur-md p-4 shadow-lg">
                                <p className="font-semibold text-foreground">{data.day}</p>
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-muted-foreground">Revenue:</span>
                                    <span className="font-medium text-brand-primary">
                                      ${payload[0].value?.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-muted-foreground">Orders:</span>
                                    <span className="font-medium">{data.orders}</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-muted-foreground">AOV:</span>
                                    <span className="font-medium">${(data.revenue / data.orders).toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-brand-primary)"
                        strokeWidth={3}
                        fill="url(#revenueGradient)"
                        dot={{ fill: "var(--color-brand-primary)", strokeWidth: 2, r: 4 }}
                        activeDot={{
                          r: 6,
                          stroke: "var(--color-brand-primary)",
                          strokeWidth: 2,
                          fill: "var(--color-background)",
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </section>

        {/* Section 3: Sales by Channel Table */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-primary" />
              <h2 className="text-2xl font-semibold tracking-tight">Sales by Channel</h2>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
              Total: ${totalChannelRevenue.toLocaleString()} • {totalChannelOrders.toLocaleString()} orders
            </div>
          </div>

          <EnhancedCard variant="elevated" className="shadow-lg">
            <EnhancedCardHeader className="pb-4">
              <EnhancedCardTitle className="text-xl">Channel Performance</EnhancedCardTitle>
              <EnhancedCardDescription>Revenue breakdown across all sales channels</EnhancedCardDescription>
            </EnhancedCardHeader>
            <EnhancedCardContent className="p-0">
              <div className="overflow-auto">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-muted/30 to-muted/10">
                    <TableRow className="border-b">
                      <TableHead className="font-semibold text-foreground">Channel</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">Revenue</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">Orders</TableHead>
                      <TableHead className="font-semibold text-foreground text-center">Conversion Rate</TableHead>
                      <TableHead className="font-semibold text-foreground text-center">Growth</TableHead>
                      <TableHead className="font-semibold text-foreground text-center">Share</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {channelData.map((channel, index) => {
                      const revenueShare = ((channel.revenue / totalChannelRevenue) * 100).toFixed(1)
                      const IconComponent = channel.icon

                      return (
                        <TableRow
                          key={index}
                          className={cn(
                            "hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-secondary/5 transition-all duration-200 group border-l-4 border-l-transparent hover:border-l-brand-primary/50",
                            "animate-fade-in",
                          )}
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                                  channel.bgColor,
                                )}
                              >
                                <IconComponent className={cn("h-5 w-5", channel.color)} />
                              </div>
                              <div>
                                <p className="font-semibold text-foreground group-hover:text-brand-primary transition-colors">
                                  {channel.channel}
                                </p>
                                <p className="text-xs text-muted-foreground">Primary sales channel</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="space-y-1">
                              <p className="font-bold text-lg">${channel.revenue.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">
                                ${(channel.revenue / channel.orders).toFixed(2)} AOV
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="space-y-1">
                              <p className="font-semibold">{channel.orders.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">orders</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <Badge
                                variant="info"
                                size="md"
                                className="bg-brand-primary/10 text-brand-primary font-semibold px-3 py-1"
                              >
                                {channel.conversionRate}%
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              {channel.growth > 0 ? (
                                <ArrowUpRight className="w-3 h-3 text-success-500" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3 text-error-500" />
                              )}
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  channel.growth > 0 ? "text-success-600" : "text-error-600",
                                )}
                              >
                                {channel.growth > 0 ? "+" : ""}
                                {channel.growth}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="space-y-1">
                              <p className="font-semibold">{revenueShare}%</p>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full transition-all duration-1000 ease-out"
                                  style={{
                                    width: `${revenueShare}%`,
                                    transitionDelay: `${index * 200}ms`,
                                  }}
                                />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Channel Summary */}
              <div className="border-t bg-gradient-to-r from-muted/20 to-muted/10 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Best Performing</p>
                    <p className="font-semibold text-brand-primary">
                      {channelData.reduce((best, channel) => (channel.revenue > best.revenue ? channel : best)).channel}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Highest Conversion</p>
                    <p className="font-semibold text-brand-primary">
                      {
                        channelData.reduce((best, channel) =>
                          channel.conversionRate > best.conversionRate ? channel : best,
                        ).channel
                      }
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Fastest Growing</p>
                    <p className="font-semibold text-brand-primary">
                      {channelData.reduce((best, channel) => (channel.growth > best.growth ? channel : best)).channel}
                    </p>
                  </div>
                </div>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </section>

        {/* Performance Insights */}
        <EnhancedCard className="bg-gradient-to-r from-brand-primary/5 via-background to-brand-secondary/5 border-brand-primary/20">
          <EnhancedCardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl">
                <Target className="w-6 h-6 text-brand-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-lg">Sales Performance Insights</h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full" />
                    <span className="text-muted-foreground">Revenue up {metricCards[0].change}% from last period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-info-500 rounded-full" />
                    <span className="text-muted-foreground">Mobile app showing strongest growth at +18.7%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-tertiary rounded-full" />
                    <span className="text-muted-foreground">In-store conversion rate leads at 8.45%</span>
                  </div>
                </div>
              </div>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>
      </div>
    </DashboardShell>
  )
}
