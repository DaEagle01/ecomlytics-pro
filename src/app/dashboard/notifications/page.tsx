"use client"

import { useState, useMemo } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Search,
  CheckCheck,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Package,
  Users,
  TrendingUp,
  Settings,
  Mail,
  DollarSign,
  Clock,
  Filter,
} from "lucide-react"

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: "success",
    category: "system",
    title: "Weekly Report Generated",
    description: "Your analytics report for January 8-14 is ready for download",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "warning",
    category: "inventory",
    title: "Low Stock Alert",
    description: "Wireless Headphones Pro has only 12 units remaining",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    icon: Package,
  },
  {
    id: 3,
    type: "info",
    category: "customers",
    title: "New Customer Registration",
    description: "Sarah Johnson has created an account and made their first purchase",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    icon: Users,
  },
  {
    id: 4,
    type: "success",
    category: "system",
    title: "Payment Processed",
    description: "Order #3210 payment of $299.99 has been successfully processed",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    read: true,
    icon: DollarSign,
  },
  {
    id: 5,
    type: "info",
    category: "marketing",
    title: "Campaign Performance Update",
    description: "Your Summer Blast campaign has reached 10,000 impressions",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    read: true,
    icon: TrendingUp,
  },
  {
    id: 6,
    type: "warning",
    category: "system",
    title: "Server Maintenance Scheduled",
    description: "Planned maintenance window: Tonight 2:00 AM - 4:00 AM EST",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    icon: Settings,
  },
  {
    id: 7,
    type: "error",
    category: "system",
    title: "Failed Export Attempt",
    description: "Customer analytics export failed due to timeout. Please try again.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: false,
    icon: XCircle,
  },
  {
    id: 8,
    type: "info",
    category: "customers",
    title: "Customer Feedback Received",
    description: "New 5-star review from Mike Chen for Wireless Charging Pad",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    icon: Users,
  },
  {
    id: 9,
    type: "success",
    category: "inventory",
    title: "Stock Replenished",
    description: "Gaming Laptop Ultra inventory has been restocked with 50 new units",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    icon: Package,
  },
  {
    id: 10,
    type: "info",
    category: "marketing",
    title: "Email Campaign Sent",
    description: "Weekly newsletter sent to 2,847 subscribers with 24% open rate",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    read: true,
    icon: Mail,
  },
]

const filterOptions = [
  { value: "all", label: "All", icon: Bell },
  { value: "system", label: "System", icon: Settings },
  { value: "marketing", label: "Marketing", icon: TrendingUp },
  { value: "inventory", label: "Inventory", icon: Package },
  { value: "customers", label: "Customers", icon: Users },
]

const getNotificationStyle = (type: string, read: boolean) => {
  const baseStyle = `transition-all duration-200 ${read ? "opacity-75" : ""}`

  switch (type) {
    case "success":
      return {
        containerClass: `${baseStyle} border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20`,
        iconClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50",
      }
    case "warning":
      return {
        containerClass: `${baseStyle} border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20`,
        iconClass: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/50",
      }
    case "error":
      return {
        containerClass: `${baseStyle} border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20`,
        iconClass: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/50",
      }
    default: // info
      return {
        containerClass: `${baseStyle} border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20`,
        iconClass: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/50",
      }
  }
}

const formatTimestamp = (timestamp: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`

  return timestamp.toLocaleDateString()
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter and search notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesFilter = selectedFilter === "all" || notification.category === selectedFilter
      const matchesSearch =
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [notifications, selectedFilter, searchQuery])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 relative">
              <Bell className="w-5 h-5 text-primary" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your latest alerts and system updates
                {unreadCount > 0 && <span className="ml-2 text-primary font-medium">• {unreadCount} unread</span>}
              </p>
            </div>
          </div>

          {/* Mark All as Read Button */}
          <Button
            onClick={handleMarkAllAsRead}
            variant="outline"
            className="gap-2 bg-transparent"
            disabled={unreadCount === 0}
          >
            <CheckCheck className="w-4 h-4" />
            Mark All as Read
          </Button>
        </div>

        {/* Notification Filters */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
          </div>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background"
                  />
                </div>

                <Separator />

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => {
                    const isActive = selectedFilter === filter.value
                    const categoryCount =
                      filter.value === "all"
                        ? notifications.length
                        : notifications.filter((n) => n.category === filter.value).length

                    return (
                      <Button
                        key={filter.value}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilter(filter.value)}
                        className={`gap-2 transition-all ${isActive ? "" : "bg-transparent hover:bg-muted"}`}
                      >
                        <filter.icon className="w-4 h-4" />
                        {filter.label}
                        <Badge variant={isActive ? "secondary" : "outline"} className="ml-1 text-xs px-1.5 py-0.5">
                          {categoryCount}
                        </Badge>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Alerts Feed */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight">Recent Alerts</h2>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredNotifications.length} of {notifications.length} notifications
            </div>
          </div>

          <Card className="shadow-sm">
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredNotifications.map((notification, index) => {
                    const style = getNotificationStyle(notification.type, notification.read)
                    const IconComponent = notification.icon

                    return (
                      <div key={notification.id}>
                        <div
                          className={`p-4 hover:bg-muted/30 cursor-pointer ${style.containerClass}`}
                          onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={`p-2 rounded-lg ${style.iconClass} flex-shrink-0`}>
                              <IconComponent className="w-4 h-4" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3
                                      className={`font-medium text-sm ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                                    >
                                      {notification.title}
                                    </h3>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {notification.description}
                                  </p>
                                </div>

                                {/* Timestamp */}
                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5 capitalize">
                                    {notification.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < filteredNotifications.length - 1 && <Separator />}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try adjusting your search terms or filters"
                      : "You're all caught up! No new notifications at this time."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Quick Stats */}
        <section className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Success</p>
                  <p className="text-lg font-bold text-emerald-800 dark:text-emerald-200">
                    {notifications.filter((n) => n.type === "success").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Warnings</p>
                  <p className="text-lg font-bold text-amber-800 dark:text-amber-200">
                    {notifications.filter((n) => n.type === "warning").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Info</p>
                  <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                    {notifications.filter((n) => n.type === "info").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">Errors</p>
                  <p className="text-lg font-bold text-red-800 dark:text-red-200">
                    {notifications.filter((n) => n.type === "error").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardShell>
  )
}
