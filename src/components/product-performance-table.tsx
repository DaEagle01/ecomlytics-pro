"use client"

import { useState, useMemo } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Package, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Product {
  id: string
  name: string
  sku: string
  image: string
  category: string
  unitsSold: number
  conversionRate: number
  stockLeft: number
  price: number
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones Pro",
    sku: "WBH-PRO-001",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    unitsSold: 1247,
    conversionRate: 4.2,
    stockLeft: 89,
    price: 149.99,
  },
  {
    id: "2",
    name: "Smart Fitness Watch Series X",
    sku: "SFW-X-002",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    unitsSold: 892,
    conversionRate: 3.8,
    stockLeft: 156,
    price: 299.99,
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    sku: "PCT-BLK-003",
    image: "/placeholder.svg?height=40&width=40",
    category: "Clothing",
    unitsSold: 2156,
    conversionRate: 5.1,
    stockLeft: 234,
    price: 29.99,
  },
  {
    id: "4",
    name: 'Gaming Laptop Ultra 15"',
    sku: "GLU-15-004",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    unitsSold: 456,
    conversionRate: 2.3,
    stockLeft: 12,
    price: 1499.99,
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    sku: "LCB-BRN-005",
    image: "/placeholder.svg?height=40&width=40",
    category: "Accessories",
    unitsSold: 678,
    conversionRate: 3.9,
    stockLeft: 45,
    price: 89.99,
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    sku: "WCP-WHT-006",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    unitsSold: 1834,
    conversionRate: 6.2,
    stockLeft: 178,
    price: 39.99,
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    sku: "DSG-BLK-007",
    image: "/placeholder.svg?height=40&width=40",
    category: "Accessories",
    unitsSold: 543,
    conversionRate: 2.8,
    stockLeft: 67,
    price: 199.99,
  },
  {
    id: "8",
    name: "Organic Cotton Hoodie",
    sku: "OCH-GRY-008",
    image: "/placeholder.svg?height=40&width=40",
    category: "Clothing",
    unitsSold: 987,
    conversionRate: 4.5,
    stockLeft: 123,
    price: 79.99,
  },
  {
    id: "9",
    name: "Bluetooth Speaker Mini",
    sku: "BSM-BLU-009",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    unitsSold: 1456,
    conversionRate: 5.7,
    stockLeft: 89,
    price: 59.99,
  },
  {
    id: "10",
    name: "Stainless Steel Water Bottle",
    sku: "SSW-SLV-010",
    image: "/placeholder.svg?height=40&width=40",
    category: "Accessories",
    unitsSold: 2234,
    conversionRate: 7.1,
    stockLeft: 345,
    price: 24.99,
  },
  {
    id: "11",
    name: "Wireless Mouse Pro",
    sku: "WMP-BLK-011",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    unitsSold: 1123,
    conversionRate: 4.8,
    stockLeft: 156,
    price: 69.99,
  },
  {
    id: "12",
    name: "Denim Jacket Classic",
    sku: "DJC-BLU-012",
    image: "/placeholder.svg?height=40&width=40",
    category: "Clothing",
    unitsSold: 445,
    conversionRate: 3.2,
    stockLeft: 78,
    price: 119.99,
  },
  {
    id: "13",
    name: "Smartphone Case Premium",
    sku: "SCP-CLR-013",
    image: "/placeholder.svg?height=40&width=40",
    category: "Accessories",
    unitsSold: 3456,
    conversionRate: 8.9,
    stockLeft: 567,
    price: 19.99,
  },
  {
    id: "14",
    name: "4K Webcam HD",
    sku: "4KW-HD-014",
    image: "/placeholder.svg?height=40&width=40",
    category: "Electronics",
    unitsSold: 789,
    conversionRate: 3.6,
    stockLeft: 234,
    price: 129.99,
  },
  {
    id: "15",
    name: "Yoga Mat Premium",
    sku: "YMP-PNK-015",
    image: "/placeholder.svg?height=40&width=40",
    category: "Accessories",
    unitsSold: 1567,
    conversionRate: 5.4,
    stockLeft: 189,
    price: 49.99,
  },
]

const categories = ["All Categories", "Electronics", "Clothing", "Accessories"]
const ITEMS_PER_PAGE = 10

export function ProductPerformanceTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  const getStockStatus = (stock: number) => {
    if (stock <= 20) return { label: "Low Stock", variant: "destructive" as const }
    if (stock <= 50) return { label: "Medium", variant: "secondary" as const }
    return { label: "In Stock", variant: "default" as const }
  }

  const getConversionTrend = (rate: number) => {
    if (rate >= 5) return { icon: TrendingUp, color: "text-emerald-500" }
    if (rate >= 3) return { icon: TrendingUp, color: "text-blue-500" }
    return { icon: TrendingDown, color: "text-red-500" }
  }

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Product Performance</h2>
          <p className="text-sm text-muted-foreground">Monitor your product sales and inventory levels</p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle className="text-lg">Products Overview</CardTitle>
              <CardDescription>
                {filteredProducts.length} of {mockProducts.length} products
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products or SKU..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 w-full sm:w-[300px]"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table Container with Horizontal Scroll */}
          <div className="relative overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                <TableRow className="border-b">
                  <TableHead className="w-[80px] text-center">Image</TableHead>
                  <TableHead className="min-w-[200px]">Product Name</TableHead>
                  <TableHead className="w-[120px]">SKU</TableHead>
                  <TableHead className="w-[120px] text-right">Units Sold</TableHead>
                  <TableHead className="w-[140px] text-center">Conversion Rate</TableHead>
                  <TableHead className="w-[120px] text-center">Stock Left</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stockLeft)
                  const conversionTrend = getConversionTrend(product.conversionRate)
                  const TrendIcon = conversionTrend.icon

                  return (
                    <TableRow key={product.id} className="hover:bg-muted/50 transition-colors cursor-pointer group">
                      <TableCell className="text-center">
                        <Avatar className="h-10 w-10 mx-auto">
                          <AvatarImage src={product.image || "/placeholder.svg"} alt={product.name} />
                          <AvatarFallback className="text-xs">
                            {product.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium leading-none group-hover:text-primary transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">${product.price}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{product.sku}</code>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-medium">{product.unitsSold.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">units</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendIcon className={`h-3 w-3 ${conversionTrend.color}`} />
                          <span className="font-medium">{product.conversionRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="font-medium">{product.stockLeft}</div>
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

            {/* Empty State */}
            {currentProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}{" "}
                products
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      </div>
                    ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
