"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <EnhancedCard className="w-full max-w-md text-center">
            <EnhancedCardContent className="p-8">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-error-50 dark:bg-error-950/50 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-error-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                <p className="text-muted-foreground mb-6">
                  We encountered an error while loading this page. Please try refreshing or contact support if the
                  problem persists.
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Refresh Page
              </Button>
            </EnhancedCardContent>
          </EnhancedCard>
        </div>
      )
    }

    return this.props.children
  }
}
