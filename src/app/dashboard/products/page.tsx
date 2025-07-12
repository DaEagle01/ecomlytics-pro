"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { ProductPerformanceTable } from "@/components/product-performance-table"

export default function ProductsPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Product Performance</h1>
          <p className="text-muted-foreground">
            Monitor your product sales, inventory levels, and performance metrics.
          </p>
        </div>

        {/* Product Performance Table */}
        <ProductPerformanceTable />
      </div>
    </DashboardShell>
  )
}
