"use client"

import type React from "react"

import { Button } from "@/components/ui/enhanced-button"
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <EnhancedCard className="text-center">
      <EnhancedCardContent className="py-12">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>
        {action && (
          <Button onClick={action.onClick} variant="primary">
            {action.label}
          </Button>
        )}
      </EnhancedCardContent>
    </EnhancedCard>
  )
}
