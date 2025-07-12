"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, Download, AlertCircle, CheckCircle } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"

const currentPlan = {
  name: "Pro",
  price: 29,
  billing: "monthly",
  nextBilling: "2024-02-15",
  status: "active",
}

const invoices = [
  {
    id: "INV-001",
    date: "2024-01-15",
    amount: 29.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-002",
    date: "2023-12-15",
    amount: 29.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-003",
    date: "2023-11-15",
    amount: 29.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-004",
    date: "2023-10-15",
    amount: 29.0,
    status: "paid",
    downloadUrl: "#",
  },
]

const paymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
]

export default function BillingPage() {
  const { hasPermission } = useAuth()
  const [loading, setLoading] = useState(false)

  if (!hasPermission("billing")) {
    return (
      <DashboardShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground">Manage your subscription and billing information.</p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to access billing information. Contact your administrator.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardShell>
    )
  }

  const handleCancelSubscription = async () => {
    setLoading(true)
    // Mock cancellation
    setTimeout(() => {
      setLoading(false)
      alert("Subscription cancelled successfully")
    }, 2000)
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and billing information.</p>
        </div>

        {/* Current Plan */}
        <EnhancedCard>
          <EnhancedCardHeader>
            <div className="flex items-center justify-between">
              <div>
                <EnhancedCardTitle>Current Plan</EnhancedCardTitle>
                <p className="text-muted-foreground">You're currently on the {currentPlan.name} plan</p>
              </div>
              <Badge variant={currentPlan.status === "active" ? "default" : "secondary"}>{currentPlan.status}</Badge>
            </div>
          </EnhancedCardHeader>
          <EnhancedCardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h3 className="font-semibold text-lg">{currentPlan.name} Plan</h3>
                <p className="text-muted-foreground">
                  ${currentPlan.price}/{currentPlan.billing}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Next billing date</p>
                <p className="font-medium">{new Date(currentPlan.nextBilling).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/pricing">
                <Button>Upgrade Plan</Button>
              </Link>
              <Button variant="outline" onClick={handleCancelSubscription} loading={loading}>
                Cancel Subscription
              </Button>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        {/* Payment Methods */}
        <EnhancedCard>
          <EnhancedCardHeader>
            <div className="flex items-center justify-between">
              <EnhancedCardTitle>Payment Methods</EnhancedCardTitle>
              <Button variant="outline" size="sm">
                Add Payment Method
              </Button>
            </div>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-6 bg-primary/10 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• {method.last4}</p>
                      <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                    {method.isDefault && <Badge variant="secondary">Default</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        {/* Billing History */}
        <EnhancedCard>
          <EnhancedCardHeader>
            <EnhancedCardTitle>Billing History</EnhancedCardTitle>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-950/50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      <Badge variant="secondary" className="text-green-600">
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        {/* Usage & Limits */}
        <EnhancedCard>
          <EnhancedCardHeader>
            <EnhancedCardTitle>Usage & Limits</EnhancedCardTitle>
          </EnhancedCardHeader>
          <EnhancedCardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Page Views</span>
                  <span>12,847 / 50,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "25.7%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Team Members</span>
                  <span>3 / 5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>API Calls</span>
                  <span>8,234 / 100,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "8.2%" }} />
                </div>
              </div>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>
      </div>
    </DashboardShell>
  )
}
