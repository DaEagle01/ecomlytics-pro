"use client"

import { useState, useMemo } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  Users,
  UserPlus,
  ShoppingBag,
  UserX,
  Search,
  Filter,
  Download,
  Mail,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react"

// Mock customer data
const mockCustomers = [
  {
    id: "cust_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-08-15",
    lastOrderDate: "2024-01-10",
    ordersCount: 12,
    totalSpent: 2847.5,
    status: "active",
    segment: "loyal",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
  },
  {
    id: "cust_002",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2024-01-05",
    lastOrderDate: "2024-01-12",
    ordersCount: 2,
    totalSpent: 189.99,
    status: "active",
    segment: "new",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
  },
  {
    id: "cust_003",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-05-20",
    lastOrderDate: "2023-11-28",
    ordersCount: 8,
    totalSpent: 1456.75,
    status: "inactive",
    segment: "at-risk",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
  },
  {
    id: "cust_004",
    name: "James Wilson",
    email: "james.wilson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-03-10",
    lastOrderDate: "2024-01-08",
    ordersCount: 15,
    totalSpent: 3892.25,
    status: "active",
    segment: "loyal",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
  },
  {
    id: "cust_005",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2024-01-02",
    lastOrderDate: "2024-01-14",
    ordersCount: 3,
    totalSpent: 567.8,
    status: "active",
    segment: "new",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
  },
  {
    id: "cust_006",
    name: "David Brown",
    email: "david.brown@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-07-12",
    lastOrderDate: "2024-01-11",
    ordersCount: 9,
    totalSpent: 2134.6,
    status: "active",
    segment: "loyal",
    phone: "+1 (555) 678-9012",
    location: "Miami, FL",
  },
  {
    id: "cust_007",
    name: "Jennifer Garcia",
    email: "jennifer.garcia@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-09-05",
    lastOrderDate: "2023-12-15",
    ordersCount: 4,
    totalSpent: 789.4,
    status: "inactive",
    segment: "at-risk",
    phone: "+1 (555) 789-0123",
    location: "Denver, CO",
  },
  {
    id: "cust_008",
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-01-20",
    lastOrderDate: "2024-01-09",
    ordersCount: 22,
    totalSpent: 5647.9,
    status: "active",
    segment: "loyal",
    phone: "+1 (555) 890-1234",
    location: "Boston, MA",
  },
  {
    id: "cust_009",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2024-01-07",
    lastOrderDate: "2024-01-13",
    ordersCount: 1,
    totalSpent: 129.99,
    status: "active",
    segment: "new",
    phone: "+1 (555) 901-2345",
    location: "Los Angeles, CA",
  },
  {
    id: "cust_010",
    name: "Kevin Lee",
    email: "kevin.lee@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-06-18",
    lastOrderDate: "2023-10-22",
    ordersCount: 6,
    totalSpent: 1234.5,
    status: "inactive",
    segment: "at-risk",
    phone: "+1 (555) 012-3456",
    location: "Portland, OR",
  },
  {
    id: "cust_011",
    name: "Amanda White",
    email: "amanda.white@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2023-04-25",
    lastOrderDate: "2024-01-06",
    ordersCount: 11,
    totalSpent: 2789.3,
    status: "active",
    segment: "loyal",
    phone: "+1 (555) 123-4567",
    location: "Phoenix, AZ",
  },
  {
    id: "cust_012",
    name: "Christopher Moore",
    email: "christopher.moore@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    firstOrderDate: "2024-01-01",
    lastOrderDate: "2024-01-15",
    ordersCount: 2,
    totalSpent: 345.75,
    status: "active",
    segment: "new",
    phone: "+1 (555) 234-5678",
    location: "Nashville, TN",
  },
]

// Segment data for charts
const segmentData = [
  { name: "New Customers", value: 4, color: "#3B82F6", percentage: 33.3 },
  { name: "Loyal Customers", value: 5, color: "#10B981", percentage: 41.7 },
  { name: "At Risk", value: 3, color: "#F59E0B", percentage: 25.0 },
]

const segmentBarData = [
  { segment: "New", customers: 4, revenue: 1233.53, avgOrders: 2.0 },
  { segment: "Loyal", customers: 5, revenue: 17311.55, avgOrders: 13.6 },
  { segment: "At Risk", customers: 3, revenue: 3480.4, avgOrders: 6.0 },
]

const segmentOptions = [
  { value: "all", label: "All Segments" },
  { value: "new", label: "New Customers" },
  { value: "loyal", label: "Loyal Customers" },
  { value: "at-risk", label: "At Risk" },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  // Filter customers based on search and segment
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment

      return matchesSearch && matchesSegment
    })
  }, [searchQuery, selectedSegment])

  // Calculate overview stats
  const totalCustomers = mockCustomers.length
  const newCustomers = mockCustomers.filter((c) => c.segment === "new").length
  const returningCustomers = mockCustomers.filter((c) => c.segment === "loyal").length
  const avgOrdersPerCustomer = (mockCustomers.reduce((sum, c) => sum + c.ordersCount, 0) / totalCustomers).toFixed(1)
  const churnRate = ((mockCustomers.filter((c) => c.segment === "at-risk").length / totalCustomers) * 100).toFixed(1)

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        Inactive
      </Badge>
    )
  }

  const getSegmentBadge = (segment: string) => {
    const config = {
      new: {
        label: "New",
        variant: "default" as const,
        className: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
      },
      loyal: {
        label: "Loyal",
        variant: "default" as const,
        className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
      },
      "at-risk": {
        label: "At Risk",
        variant: "destructive" as const,
        className: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
      },
    }

    const segmentConfig = config[segment as keyof typeof config]
    return (
      <Badge variant={segmentConfig.variant} className={segmentConfig.className}>
        {segmentConfig.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customer Insights</h1>
              <p className="text-muted-foreground">Understand your customer behavior, segments, and lifetime value</p>
            </div>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>

        {/* Section 1: Overview Stat Cards */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Customers */}
            <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold">{totalCustomers.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600">+12.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New vs Returning Ratio */}
            <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg">
                    <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">New vs Returning</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold">{((returningCustomers / newCustomers) * 100).toFixed(0)}%</p>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600">+4.1%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {returningCustomers} returning, {newCustomers} new
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Orders per Customer */}
            <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                    <ShoppingBag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Avg Orders per Customer</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold">{avgOrdersPerCustomer}</p>
                      <div className="flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3 text-red-500" />
                        <span className="text-xs font-medium text-red-600">-2.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estimated Churn Rate */}
            <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/50 rounded-lg">
                    <UserX className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Estimated Churn Rate</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold">{churnRate}%</p>
                      <div className="flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600">-1.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: Segment Charts */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Customer Segments</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Segment Distribution</CardTitle>
                <CardDescription>Customer breakdown by segment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px]">
                  <ChartContainer
                    config={{
                      segments: {
                        label: "Customer Segments",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={segmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {segmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="rounded-lg border bg-background p-3 shadow-md">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm">Customers: {data.value}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {data.percentage.toFixed(1)}% of total
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {segmentData.map((segment) => (
                    <div key={segment.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span className="text-sm font-medium">{segment.name}</span>
                      <span className="text-sm text-muted-foreground">({segment.value})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Segment Performance</CardTitle>
                <CardDescription>Revenue and order metrics by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px]">
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue ($)",
                        color: "hsl(var(--chart-1))",
                      },
                      customers: {
                        label: "Customers",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={segmentBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
                        <XAxis dataKey="segment" className="text-xs fill-muted-foreground" />
                        <YAxis className="text-xs fill-muted-foreground" />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="rounded-lg border bg-background p-3 shadow-md">
                                  <p className="font-medium">{label} Customers</p>
                                  <p className="text-sm text-emerald-600">Revenue: ${data.revenue.toLocaleString()}</p>
                                  <p className="text-sm text-blue-600">Count: {data.customers}</p>
                                  <p className="text-xs text-muted-foreground">Avg Orders: {data.avgOrders}</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Filters */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Customer Database</h2>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Customer List</CardTitle>
                  <CardDescription>
                    {filteredCustomers.length} of {mockCustomers.length} customers
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full sm:w-[300px]"
                    />
                  </div>

                  {/* Segment Filter */}
                  <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {segmentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Section 4: Customer Table */}
              <div className="relative overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                    <TableRow className="border-b">
                      <TableHead className="w-[250px]">Customer</TableHead>
                      <TableHead className="w-[120px]">First Order</TableHead>
                      <TableHead className="w-[120px]">Last Order</TableHead>
                      <TableHead className="w-[100px] text-center">Orders</TableHead>
                      <TableHead className="w-[120px] text-right">Total Spent</TableHead>
                      <TableHead className="w-[100px] text-center">Segment</TableHead>
                      <TableHead className="w-[100px] text-center">Status</TableHead>
                      <TableHead className="w-[80px] text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="hover:bg-muted/50 transition-colors cursor-pointer group"
                        onClick={() => setSelectedCustomer(customer.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                              <AvatarFallback className="text-xs">
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="font-medium leading-none group-hover:text-primary transition-colors">
                                {customer.name}
                              </p>
                              <p className="text-xs text-muted-foreground">{customer.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(customer.firstOrderDate)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(customer.lastOrderDate)}</div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-medium">{customer.ordersCount}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-medium">${customer.totalSpent.toLocaleString()}</div>
                        </TableCell>
                        <TableCell className="text-center">{getSegmentBadge(customer.segment)}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(customer.status)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Empty State */}
                {filteredCustomers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No customers found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Insights */}
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
                    <span className="text-muted-foreground">
                      Loyal customers generate {((17311.55 / 22025.48) * 100).toFixed(0)}% of revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-muted-foreground">Average customer lifetime: 8.2 months</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <span className="text-muted-foreground">3 customers need re-engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
