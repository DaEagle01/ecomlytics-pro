"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Home,
  ShoppingCart,
  Package,
  Users,
  Megaphone,
  FileText,
  Settings,
  Bell,
  Wrench,
  Info,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    description: "Overview & insights",
  },
  {
    title: "App Overview",
    url: "/dashboard/overview",
    icon: Info,
    description: "Features & capabilities",
    badge: "New",
    badgeVariant: "secondary" as const,
  },
  {
    title: "Sales",
    url: "/dashboard/sales",
    icon: ShoppingCart,
    description: "Revenue analytics",
    permissions: ["read"],
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
    description: "Inventory & performance",
    permissions: ["read"],
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
    description: "Customer insights",
    permissions: ["read"],
  },
  {
    title: "Ads",
    url: "/dashboard/ads",
    icon: Megaphone,
    description: "Campaign performance",
    permissions: ["read"],
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
    badge: "3",
    badgeVariant: "destructive" as const,
    description: "Alerts & updates",
    permissions: ["read"],
  },
  {
    title: "Tools",
    url: "/dashboard/tools",
    icon: Wrench,
    description: "Utilities & calculators",
    permissions: ["read"],
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
    description: "Export & scheduling",
    permissions: ["export"],
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: CreditCard,
    description: "Plans & payments",
    permissions: ["billing"],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    description: "App configuration",
    permissions: ["manage"],
  },
]

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { hasPermission } = useAuth()
  const pathname = usePathname()

  const filteredItems = navigationItems.filter((item) => {
    if (!item.permissions) return true
    return item.permissions.some((permission) => hasPermission(permission))
  })

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 ease-in-out",
          "md:relative md:top-0 md:h-screen md:z-30",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Collapse Toggle - Desktop Only */}
          <div className="hidden md:flex items-center justify-end p-2 border-b">
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {filteredItems.map((item) => {
                const isActive = pathname === item.url
                const Icon = item.icon

                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => onClose()}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{item.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                        </div>
                        {item.badge && (
                          <Badge variant={item.badgeVariant} className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Upgrade CTA */}
          {!isCollapsed && (
            <div className="p-4 border-t">
              <div className="rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10 p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-sm mb-1">Upgrade to Pro</h3>
                <p className="text-xs text-muted-foreground mb-3">Unlock advanced features and insights</p>
                <Link href="/pricing">
                  <Button size="sm" className="w-full">
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
