"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Download,
  Calendar,
  Database,
  FileSpreadsheet,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
} from "lucide-react"

// Mock data for recent exports
const recentExports = [
  {
    id: 1,
    fileName: "sales_report_2024_01.pdf",
    type: "Sales",
    format: "PDF",
    dateExported: "2024-01-15",
    size: "2.4 MB",
    status: "completed",
  },
  {
    id: 2,
    fileName: "customer_analytics_december.csv",
    type: "Customers",
    format: "CSV",
    dateExported: "2024-01-14",
    size: "1.8 MB",
    status: "completed",
  },
  {
    id: 3,
    fileName: "product_performance_q4.pdf",
    type: "Products",
    format: "PDF",
    dateExported: "2024-01-12",
    size: "3.1 MB",
    status: "completed",
  },
  {
    id: 4,
    fileName: "ad_campaign_summary.csv",
    type: "Ads",
    format: "CSV",
    dateExported: "2024-01-10",
    size: "956 KB",
    status: "completed",
  },
  {
    id: 5,
    fileName: "weekly_sales_report.pdf",
    type: "Sales",
    format: "PDF",
    dateExported: "2024-01-08",
    size: "1.2 MB",
    status: "processing",
  },
]

const dateRangeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "custom", label: "Custom Range" },
]

const dataTypeOptions = [
  { value: "sales", label: "Sales Analytics", icon: "💰" },
  { value: "products", label: "Product Performance", icon: "📦" },
  { value: "ads", label: "Ad Campaigns", icon: "📢" },
  { value: "customers", label: "Customer Insights", icon: "👥" },
]

const formatOptions = [
  { value: "pdf", label: "PDF", icon: FileText },
  { value: "csv", label: "CSV", icon: FileSpreadsheet },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [dataType, setDataType] = useState("sales")
  const [format, setFormat] = useState("pdf")
  const [emailReports, setEmailReports] = useState(false)
  const [email, setEmail] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      // In a real app, this would trigger the actual export
      console.log("Export completed:", { dateRange, dataType, format })
    }, 2000)
  }

  const handleSaveEmailSettings = () => {
    // In a real app, this would save the email settings
    console.log("Email settings saved:", { emailReports, email })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getFormatIcon = (format: string) => {
    return format.toLowerCase() === "pdf" ? (
      <FileText className="h-4 w-4 text-red-500" />
    ) : (
      <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Export Analytics Reports</h1>
            <p className="text-muted-foreground">
              Generate and download comprehensive analytics reports for your business.
            </p>
          </div>
        </div>

        {/* Section 1: Export Options */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Export Options</h2>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Configure Your Report</CardTitle>
              <CardDescription>Select the data range, type, and format for your export</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Range Picker */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full sm:w-[200px]">
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
              </div>

              <Separator />

              {/* Data Type Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Data Type
                </Label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {dataTypeOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        dataType === option.value ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setDataType(option.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <p className="text-sm font-medium">{option.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Format Toggle */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Export Format</Label>
                <div className="flex gap-3">
                  {formatOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        format === option.value ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setFormat(option.value)}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <option.icon className="h-5 w-5" />
                        <span className="font-medium">{option.label}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Export Button */}
              <div className="pt-4">
                <Button onClick={handleExport} disabled={isExporting} className="w-full sm:w-auto gap-2" size="lg">
                  {isExporting ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Generate & Download Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: Recent Exports */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Recent Exports</h2>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Export History</CardTitle>
              <CardDescription>View and download your previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              {recentExports.length > 0 ? (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">File Name</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Date Exported</TableHead>
                        <TableHead className="font-semibold">Size</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-center">Download</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentExports.map((export_) => (
                        <TableRow key={export_.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getFormatIcon(export_.format)}
                              <span className="font-medium">{export_.fileName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{export_.type}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(export_.dateExported).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{export_.size}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(export_.status)}
                              <span className="capitalize text-sm">{export_.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={export_.status !== "completed"}
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No exports yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate your first report using the export options above
                  </p>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Create First Report
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Auto-Scheduled Reports */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Auto-Scheduled Reports</h2>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Email Automation</CardTitle>
              <CardDescription>Set up automatic weekly reports delivered to your inbox</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Reports Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <Label className="font-medium">Weekly Email Reports</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically receive comprehensive analytics reports every Monday
                  </p>
                </div>
                <Switch checked={emailReports} onCheckedChange={setEmailReports} />
              </div>

              {/* Email Input */}
              {emailReports && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Report Contents</Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {dataTypeOptions.map((option) => (
                        <div key={option.value} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{option.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSaveEmailSettings} className="w-full sm:w-auto gap-2">
                    <Mail className="h-4 w-4" />
                    Save Email Settings
                  </Button>
                </div>
              )}

              {/* Current Schedule Display */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Current Schedule</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {emailReports
                        ? `Weekly reports will be sent to ${email || "your email"} every Monday at 9:00 AM`
                        : "No automatic reports scheduled"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardShell>
  )
}
