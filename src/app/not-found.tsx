"use client"

import Link from "next/link"
import { Home, ArrowLeft, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Logo */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>

        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-primary/20">404</div>
          <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        {/* Actions */}
        <EnhancedCard>
          <EnhancedCardContent className="p-6 space-y-4">
            <div className="grid gap-3">
              <Link href="/">
                <Button className="w-full" size="lg">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
              </Link>

              <Button variant="ghost" className="w-full" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        {/* Help Links */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Need help? Try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
            <Link href="/help" className="text-primary hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
