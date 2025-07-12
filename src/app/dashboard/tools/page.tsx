"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Wrench,
  Calculator,
  Database,
  DollarSign,
  TrendingUp,
  Users,
  Shuffle,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react"

// Mock exchange rates
const exchangeRates = {
  BDT: 110.25,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 148.5,
}

// Sample product names and categories for mock data
const productNames = [
  "Wireless Bluetooth Headphones",
  "Smart Fitness Watch",
  "Gaming Mechanical Keyboard",
  "4K Webcam HD",
  "Portable Phone Charger",
  "Bluetooth Speaker Mini",
  "Laptop Stand Adjustable",
  "Wireless Mouse Pro",
  "USB-C Hub Multi-port",
  "LED Desk Lamp Smart",
  "Phone Case Premium",
  "Tablet Screen Protector",
  "Car Phone Mount",
  "Power Bank 20000mAh",
  "Earbuds True Wireless",
]

const categories = ["Electronics", "Accessories", "Gaming", "Office", "Mobile"]

const generateMockProduct = () => {
  const name = productNames[Math.floor(Math.random() * productNames.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const price = Math.floor(Math.random() * 500) + 20
  const unitsSold = Math.floor(Math.random() * 1000) + 50
  const conversionRate = (Math.random() * 8 + 1).toFixed(1)
  const stockLeft = Math.floor(Math.random() * 200) + 10

  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    category,
    price,
    unitsSold,
    conversionRate: Number.parseFloat(conversionRate),
    stockLeft,
    revenue: price * unitsSold,
  }
}

export default function ToolsPage() {
  // ROI Calculator state
  const [roiSpend, setRoiSpend] = useState("")
  const [roiRevenue, setRoiRevenue] = useState("")
  const [roiResult, setRoiResult] = useState<number | null>(null)

  // CAC Calculator state
  const [cacAdSpend, setCacAdSpend] = useState("")
  const [cacNewCustomers, setCacNewCustomers] = useState("")
  const [cacResult, setCacResult] = useState<number | null>(null)

  // Currency Converter state
  const [currencyAmount, setCurrencyAmount] = useState("")
  const [targetCurrency, setTargetCurrency] = useState("BDT")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)

  // Mock Data Generator state
  const [mockProducts, setMockProducts] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const calculateROI = () => {
    const spend = Number.parseFloat(roiSpend)
    const revenue = Number.parseFloat(roiRevenue)

    if (spend > 0 && revenue > 0) {
      const roi = ((revenue - spend) / spend) * 100
      setRoiResult(roi)
    }
  }

  const calculateCAC = () => {
    const adSpend = Number.parseFloat(cacAdSpend)
    const newCustomers = Number.parseFloat(cacNewCustomers)

    if (adSpend > 0 && newCustomers > 0) {
      const cac = adSpend / newCustomers
      setCacResult(cac)
    }
  }

  const convertCurrency = () => {
    const amount = Number.parseFloat(currencyAmount)
    if (amount > 0) {
      const rate = exchangeRates[targetCurrency as keyof typeof exchangeRates]
      const converted = amount * rate
      setConvertedAmount(converted)
    }
  }

  const generateSampleData = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const newProducts = Array.from({ length: 5 }, generateMockProduct)
      setMockProducts(newProducts)
      setIsGenerating(false)
    }, 1000)
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 20) return { label: "Low", variant: "destructive" as const }
    if (stock <= 50) return { label: "Medium", variant: "secondary" as const }
    return { label: "Good", variant: "default" as const }
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tools & Utilities</h1>
            <p className="text-muted-foreground">Powerful calculators and utilities to boost your productivity</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Section 1: KPI Calculator Widgets */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">KPI Calculators</h2>
              </div>

              {/* ROI Calculator */}
              <Card className="shadow-sm border-l-4 border-l-emerald-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">ROI Calculator</CardTitle>
                      <CardDescription>Calculate your return on investment percentage</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="roi-spend">Total Spend ($)</Label>
                      <Input
                        id="roi-spend"
                        type="number"
                        placeholder="10000"
                        value={roiSpend}
                        onChange={(e) => setRoiSpend(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roi-revenue">Total Revenue ($)</Label>
                      <Input
                        id="roi-revenue"
                        type="number"
                        placeholder="15000"
                        value={roiRevenue}
                        onChange={(e) => setRoiRevenue(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={calculateROI} className="w-full gap-2" disabled={!roiSpend || !roiRevenue}>
                    <Calculator className="w-4 h-4" />
                    Calculate ROI
                  </Button>

                  {roiResult !== null && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">ROI Result:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                            {roiResult.toFixed(1)}%
                          </span>
                          {roiResult > 0 ? (
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        {roiResult > 0 ? "Positive return on investment" : "Negative return on investment"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* CAC Calculator */}
              <Card className="shadow-sm border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                      <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">CAC Estimator</CardTitle>
                      <CardDescription>Calculate your customer acquisition cost</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cac-spend">Ad Spend ($)</Label>
                      <Input
                        id="cac-spend"
                        type="number"
                        placeholder="5000"
                        value={cacAdSpend}
                        onChange={(e) => setCacAdSpend(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cac-customers">New Customers</Label>
                      <Input
                        id="cac-customers"
                        type="number"
                        placeholder="100"
                        value={cacNewCustomers}
                        onChange={(e) => setCacNewCustomers(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={calculateCAC} className="w-full gap-2" disabled={!cacAdSpend || !cacNewCustomers}>
                    <Users className="w-4 h-4" />
                    Calculate CAC
                  </Button>

                  {cacResult !== null && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">CAC Result:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                            ${cacResult.toFixed(2)}
                          </span>
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Cost to acquire each new customer</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Section 2: Data Mock Generator */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Data Mock Generator</h2>
              </div>

              <Card className="shadow-sm border-l-4 border-l-purple-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                      <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Sample Data Generator</CardTitle>
                      <CardDescription>Generate realistic product data for testing</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={generateSampleData} disabled={isGenerating} className="w-full gap-2" size="lg">
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Shuffle className="w-4 h-4" />
                        Generate Sample Data
                      </>
                    )}
                  </Button>

                  {mockProducts.length > 0 && (
                    <div className="space-y-3">
                      <Separator />
                      <div className="overflow-auto max-h-[400px]">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background">
                            <TableRow>
                              <TableHead className="font-semibold">Product</TableHead>
                              <TableHead className="font-semibold">Category</TableHead>
                              <TableHead className="font-semibold text-right">Price</TableHead>
                              <TableHead className="font-semibold text-right">Units Sold</TableHead>
                              <TableHead className="font-semibold text-center">Stock</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockProducts.map((product) => {
                              const stockStatus = getStockStatus(product.stockLeft)
                              return (
                                <TableRow key={product.id} className="hover:bg-muted/50">
                                  <TableCell>
                                    <div>
                                      <p className="font-medium text-sm">{product.name}</p>
                                      <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{product.category}</Badge>
                                  </TableCell>
                                  <TableCell className="text-right font-medium">${product.price}</TableCell>
                                  <TableCell className="text-right">{product.unitsSold.toLocaleString()}</TableCell>
                                  <TableCell className="text-center">
                                    <div className="space-y-1">
                                      <div className="text-sm font-medium">{product.stockLeft}</div>
                                      <Badge variant={stockStatus.variant} className="text-xs">
                                        {stockStatus.label}
                                      </Badge>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Section 3: Currency Converter */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Currency Converter</h2>
              </div>

              <Card className="shadow-sm border-l-4 border-l-orange-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 dark:bg-orange-950/50 rounded-lg">
                      <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Currency Converter</CardTitle>
                      <CardDescription>Convert USD to other currencies (mock rates)</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency-amount">Amount in USD ($)</Label>
                    <Input
                      id="currency-amount"
                      type="number"
                      placeholder="100"
                      value={currencyAmount}
                      onChange={(e) => setCurrencyAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Convert to</Label>
                    <Select value={targetCurrency} onValueChange={setTargetCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BDT">Bangladeshi Taka (BDT)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                        <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={convertCurrency} className="w-full gap-2" disabled={!currencyAmount}>
                    <ArrowRight className="w-4 h-4" />
                    Convert Currency
                  </Button>

                  {convertedAmount !== null && (
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg border border-orange-200 dark:border-orange-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                          Converted Amount:
                        </span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                            {targetCurrency === "JPY"
                              ? `¥${convertedAmount.toFixed(0)}`
                              : targetCurrency === "BDT"
                                ? `৳${convertedAmount.toFixed(2)}`
                                : targetCurrency === "EUR"
                                  ? `€${convertedAmount.toFixed(2)}`
                                  : `£${convertedAmount.toFixed(2)}`}
                          </div>
                          <div className="text-xs text-orange-600 dark:text-orange-400">
                            Rate: 1 USD = {exchangeRates[targetCurrency as keyof typeof exchangeRates]} {targetCurrency}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-dashed">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <h3 className="font-semibold mb-1">Export Calculator Results</h3>
                <p className="text-sm text-muted-foreground">Save your calculations as PDF or CSV</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-dashed">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <h3 className="font-semibold mb-1">Bulk Data Generation</h3>
                <p className="text-sm text-muted-foreground">Generate larger datasets for testing</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-dashed">
              <CardContent className="p-6 text-center">
                <Calculator className="h-8 w-8 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <h3 className="font-semibold mb-1">Custom Calculators</h3>
                <p className="text-sm text-muted-foreground">Build your own calculation tools</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
