"use client"

import { Bell, Search, Command, Zap, Menu } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/enhanced-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { RoleSwitcher, useRole } from "@/components/role-switcher"
import Link from "next/link"
import { useState } from "react"

const notifications = [
  {
    id: 1,
    title: "New order received",
    description: "Order #1234 from John Doe",
    time: "2 min ago",
    unread: true,
    type: "success",
  },
  {
    id: 2,
    title: "Payment processed",
    description: "$299.00 payment confirmed",
    time: "5 min ago",
    unread: true,
    type: "info",
  },
  {
    id: 3,
    title: "Weekly report ready",
    description: "Your analytics report is available",
    time: "1 hour ago",
    unread: false,
    type: "default",
  },
  {
    id: 4,
    title: "Low inventory alert",
    description: "5 products running low on stock",
    time: "3 hours ago",
    unread: true,
    type: "warning",
  },
  {
    id: 5,
    title: "Campaign performance",
    description: "Summer campaign exceeded targets by 15%",
    time: "1 day ago",
    unread: false,
    type: "success",
  },
]

export function TopNavbar() {
  const { role, setRole } = useRole()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 hover:bg-brand-primary/10 transition-colors" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" className="text-muted-foreground hover:text-brand-primary transition-colors">
                Analytics
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-brand-primary">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-2 px-4">
        {/* Desktop Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[300px] pl-8 bg-background/50 border-border/50 focus:border-brand-primary focus:ring-brand-primary/20 transition-all"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-brand-primary/10"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Quick Action */}
        <Button variant="ghost" size="icon" className="hidden xl:flex hover:bg-brand-primary/10 text-brand-primary">
          <Zap className="h-4 w-4" />
          <span className="sr-only">Quick Actions</span>
        </Button>

        {/* Role Switcher */}
        <div className="hidden sm:block">
          <RoleSwitcher onRoleChange={setRole} />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-brand-primary/10 transition-colors">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  size="sm"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse"
                >
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 bg-background/95 backdrop-blur-md border-border/50 shadow-lg max-h-[400px] overflow-y-auto"
          >
            <DropdownMenuLabel className="flex items-center justify-between">
              <span className="font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="info" size="sm">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start p-3 hover:bg-brand-primary/5 transition-colors cursor-pointer"
                >
                  <div className="flex w-full items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{notification.title}</p>
                        {notification.unread && <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center p-0">
              <Link href="/dashboard/notifications" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full text-sm justify-center hover:bg-brand-primary/10 text-brand-primary"
                >
                  View All Notifications
                </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden hover:bg-brand-primary/10">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RoleSwitcher onRoleChange={setRole} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/overview" className="w-full">
                Overview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/sales" className="w-full">
                Sales Analytics
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/customers" className="w-full">
                Customer Insights
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 lg:hidden animate-fade-in">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-background/50 border-border/50 focus:border-brand-primary focus:ring-brand-primary/20"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}
