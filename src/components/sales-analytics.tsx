"use client"

import { useState } from "react"
import { TrendingUp, BarChart3, Calendar, DollarSign, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock data for different time periods
const mockData = {
  "7d": [
    { date: "Mon", revenue: 1200, orders: 24, day: "Monday" },
    { date: "Tue", revenue: 980, orders: 19, day: "Tuesday" },
    { date: "Wed", revenue: 1150, orders: 23, day: "Wednesday" },
    { date: "Thu", revenue: 1420, orders: 28, day: "Thursday" },
    { date: "Fri", revenue: 1680, orders: 34, day: "Friday" },
    { date: "Sat", revenue: 2100, orders: 42, day: "Saturday" },
    { date: "Sun", revenue: 1890, orders: 38, day: "Sunday" },
  ],
  "30d": [
    { date: "Week 1", revenue: 8500, orders: 170, day: "Week 1" },
    { date: "Week 2", revenue: 9200, orders: 184, day: "Week 2" },
    { date: "Week 3", revenue: 7800, orders: 156, day: "Week 3" },
    { date: "Week 4", revenue: 10500, orders: 210, day: "Week 4" },
  ],
  "1y": [
    { date: "Jan", revenue: 45000, orders: 900, day: "January" },
    { date: "Feb", revenue: 52000, orders: 1040, day: "February" },
    { date: "Mar", revenue: 48000, orders: 960, day: "March" },
    { date: "Apr", revenue: 61000, orders: 1220, day: "April" },
    { date: "May", revenue: 55000, orders: 1100, day: "May" },
    { date: "Jun", revenue: 67000, orders: 1340, day: "June" },
    { date: "Jul", revenue: 72000, orders: 1440, day: "July" },
    { date: "Aug", revenue: 69000, orders: 1380, day: "August" },
    { date: "Sep", revenue: 78000, orders: 1560, day: "September" },
    { date: "Oct", revenue: 84000, orders: 1680, day: "October" },
    { date: "Nov", revenue: 91000, orders: 1820, day: "November" },
    { date: "Dec", revenue: 98000, orders: 1960, day: "December" },
  ],
}

const dateRangeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "1y", label: "Last Year" },
]

export function SalesAnalytics() {
  const [selectedRange, setSelectedRange] = useState<"7d" | "30d" | "1y">("7d")

  const currentData = mockData[selectedRange]
  const selectedRangeLabel = dateRangeOptions.find((option) => option.value === selectedRange)?.label

  // Calculate summary stats
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Sales Analytics</h2>
            <p className="text-sm text-muted-foreground">Track your revenue and order performance</p>
          </div>
        </div>

        {/* Date Range Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              {selectedRangeLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {dateRangeOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSelectedRange(option.value as "7d" | "30d" | "1y")}
                className={selectedRange === option.value ? "bg-accent" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg">
                <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                <ShoppingCart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Line Chart */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-md">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Daily Revenue</CardTitle>
                <CardDescription>Revenue trends over {selectedRangeLabel.toLowerCase()}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
                    <XAxis dataKey="date" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
                    <YAxis
                      className="text-xs fill-muted-foreground"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-md">
                              <p className="font-medium">{data.day}</p>
                              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                Revenue: ${payload[0].value?.toLocaleString()}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
                      fill="url(#revenueGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders Bar Chart */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 dark:bg-blue-950/50 rounded-md">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Daily Orders</CardTitle>
                <CardDescription>Order volume over {selectedRangeLabel.toLowerCase()}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ChartContainer
                config={{
                  orders: {
                    label: "Orders",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
                    <XAxis dataKey="date" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
                    <YAxis
                      className="text-xs fill-muted-foreground"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-md">
                              <p className="font-medium">{data.day}</p>
                              <p className="text-sm text-blue-600 dark:text-blue-400">
                                Orders: {payload[0].value?.toLocaleString()}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar
                      dataKey="orders"
                      fill="url(#ordersGradient)"
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Performance Insights</h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-muted-foreground">
                    Peak revenue: ${Math.max(...currentData.map((d) => d.revenue)).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-muted-foreground">
                    Peak orders: {Math.max(...currentData.map((d) => d.orders)).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-muted-foreground">
                    Growth trend: {totalRevenue > 50000 ? "Strong" : "Moderate"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
