"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import {
  DollarSign,
  Eye,
  MousePointer,
  Target,
  TrendingUp,
  Download,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Mock campaign data
const campaigns = [
  { id: "summer-blast", name: "Summer Blast", active: true },
  { id: "q2-funnel", name: "Q2 Funnel", active: true },
  { id: "retargeting", name: "Retargeting", active: false },
]

// Mock data for different campaigns
const campaignData = {
  "summer-blast": {
    totalSpend: 15420,
    impressions: 245680,
    clicks: 12284,
    ctr: 5.0,
    roas: 4.2,
    spendVsConversions: [
      { name: "Week 1", spend: 3200, conversions: 45 },
      { name: "Week 2", spend: 4100, conversions: 62 },
      { name: "Week 3", spend: 3800, conversions: 58 },
      { name: "Week 4", spend: 4320, conversions: 71 },
    ],
    platformBreakdown: [
      { name: "Google Ads", value: 8500, color: "#4285F4" },
      { name: "Facebook", value: 4200, color: "#1877F2" },
      { name: "Instagram", value: 2720, color: "#E4405F" },
    ],
  },
  "q2-funnel": {
    totalSpend: 22150,
    impressions: 189340,
    clicks: 8967,
    ctr: 4.7,
    roas: 3.8,
    spendVsConversions: [
      { name: "Week 1", spend: 5200, conversions: 38 },
      { name: "Week 2", spend: 6100, conversions: 52 },
      { name: "Week 3", spend: 5850, conversions: 49 },
      { name: "Week 4", spend: 5000, conversions: 41 },
    ],
    platformBreakdown: [
      { name: "Google Ads", value: 12500, color: "#4285F4" },
      { name: "LinkedIn", value: 6200, color: "#0A66C2" },
      { name: "Facebook", value: 3450, color: "#1877F2" },
    ],
  },
  retargeting: {
    totalSpend: 8750,
    impressions: 156780,
    clicks: 7839,
    ctr: 5.0,
    roas: 5.2,
    spendVsConversions: [
      { name: "Week 1", spend: 2100, conversions: 28 },
      { name: "Week 2", spend: 2300, conversions: 35 },
      { name: "Week 3", spend: 2150, conversions: 31 },
      { name: "Week 4", spend: 2200, conversions: 33 },
    ],
    platformBreakdown: [
      { name: "Facebook", value: 4200, color: "#1877F2" },
      { name: "Google Ads", value: 3100, color: "#4285F4" },
      { name: "Instagram", value: 1450, color: "#E4405F" },
    ],
  },
}

// Campaign summary table data
const campaignSummary = [
  {
    name: "Summer Blast",
    platform: "Multi-platform",
    spend: 15420,
    impressions: 245680,
    ctr: 5.0,
    roas: 4.2,
    status: "active",
  },
  {
    name: "Q2 Funnel",
    platform: "Multi-platform",
    spend: 22150,
    impressions: 189340,
    ctr: 4.7,
    roas: 3.8,
    status: "active",
  },
  {
    name: "Retargeting",
    platform: "Social Media",
    spend: 8750,
    impressions: 156780,
    ctr: 5.0,
    roas: 5.2,
    status: "paused",
  },
]

export default function AdsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<keyof typeof campaignData>("summer-blast")

  const currentData = campaignData[selectedCampaign]
  const selectedCampaignName = campaigns.find((c) => c.id === selectedCampaign)?.name || "Summer Blast"

  // Calculate metrics
  const totalConversions = currentData.spendVsConversions.reduce((sum, week) => sum + week.conversions, 0)
  const conversionRate = (totalConversions / currentData.clicks) * 100
  const costPerClick = currentData.totalSpend / currentData.clicks
  const costPerConversion = currentData.totalSpend / totalConversions

  const metrics = [
    {
      title: "Total Ad Spend",
      value: `$${currentData.totalSpend.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      title: "Impressions",
      value: currentData.impressions.toLocaleString(),
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Clicks",
      value: currentData.clicks.toLocaleString(),
      change: "+15.7%",
      trend: "up",
      icon: MousePointer,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      title: "CTR (%)",
      value: `${currentData.ctr}%`,
      change: "+0.3%",
      trend: "up",
      icon: Target,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
    },
    {
      title: "ROAS",
      value: `${currentData.roas}x`,
      change: currentData.roas >= 4 ? "+0.2x" : "-0.1x",
      trend: currentData.roas >= 4 ? "up" : "down",
      icon: TrendingUp,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
    },
  ]

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Megaphone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Ad Campaign Performance</h1>
              <p className="text-muted-foreground">Monitor your advertising campaigns, ROI, and conversion metrics.</p>
            </div>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Campaign Selector */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Campaign:</label>
          <Select
            value={selectedCampaign}
            onValueChange={(value) => setSelectedCampaign(value as keyof typeof campaignData)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${campaign.active ? "bg-emerald-500" : "bg-gray-400"}`} />
                    {campaign.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Metric Cards */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Campaign Metrics - {selectedCampaignName}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {metrics.map((metric) => (
              <Card key={metric.title} className="border-l-4 border-l-primary/20 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`w-4 h-4 ${metric.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground truncate">{metric.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xl font-bold">{metric.value}</p>
                        <div className="flex items-center gap-1">
                          {metric.trend === "up" ? (
                            <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-red-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Spend vs Conversions Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Spend vs Conversions
              </CardTitle>
              <CardDescription>Weekly performance comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px]">
                <ChartContainer
                  config={{
                    spend: {
                      label: "Spend ($)",
                      color: "hsl(var(--chart-1))",
                    },
                    conversions: {
                      label: "Conversions",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={currentData.spendVsConversions}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
                      <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-3 shadow-md">
                                <p className="font-medium">{label}</p>
                                <p className="text-sm text-emerald-600">
                                  Spend: ${payload[0]?.value?.toLocaleString()}
                                </p>
                                <p className="text-sm text-blue-600">Conversions: {payload[1]?.value}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="spend" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="conversions" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platform Breakdown Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Spend by Platform
              </CardTitle>
              <CardDescription>Budget allocation across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px]">
                <ChartContainer
                  config={{
                    platform: {
                      label: "Platform Spend",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentData.platformBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {currentData.platformBreakdown.map((entry, index) => (
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
                                <p className="text-sm">Spend: ${data.value.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">
                                  {((data.value / currentData.totalSpend) * 100).toFixed(1)}% of total
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

              {/* Platform Legend */}
              <div className="flex flex-wrap gap-4 mt-4">
                {currentData.platformBreakdown.map((platform) => (
                  <div key={platform.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                    <span className="text-sm font-medium">{platform.name}</span>
                    <span className="text-sm text-muted-foreground">${platform.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Conversion Rate</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                  {conversionRate.toFixed(2)}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Cost per Click</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">${costPerClick.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Cost per Conversion</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  ${costPerConversion.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Total Conversions</p>
                <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">{totalConversions}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Summary Table */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">All Campaigns Summary</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="font-semibold">Campaign Name</TableHead>
                      <TableHead className="font-semibold">Platform</TableHead>
                      <TableHead className="font-semibold text-right">Spend</TableHead>
                      <TableHead className="font-semibold text-right">Impressions</TableHead>
                      <TableHead className="font-semibold text-center">CTR</TableHead>
                      <TableHead className="font-semibold text-center">ROAS</TableHead>
                      <TableHead className="font-semibold text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignSummary.map((campaign) => (
                      <TableRow key={campaign.name} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{campaign.platform}</span>
                        </TableCell>
                        <TableCell className="text-right font-medium">${campaign.spend.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="font-medium">
                            {campaign.ctr}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={campaign.roas >= 4 ? "default" : campaign.roas >= 3 ? "secondary" : "destructive"}
                            className="font-medium"
                          >
                            {campaign.roas}x
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={campaign.status === "active" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Performance Insights */}
        <Card className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Campaign Performance Insights</h3>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-muted-foreground">
                      Best performing:{" "}
                      {campaignSummary.reduce((best, campaign) => (campaign.roas > best.roas ? campaign : best)).name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-muted-foreground">
                      Total budget: $
                      {campaignSummary.reduce((sum, campaign) => sum + campaign.spend, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-muted-foreground">
                      Avg ROAS:{" "}
                      {(
                        campaignSummary.reduce((sum, campaign) => sum + campaign.roas, 0) / campaignSummary.length
                      ).toFixed(1)}
                      x
                    </span>
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
