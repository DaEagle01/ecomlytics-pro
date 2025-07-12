"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import {
  Settings,
  Palette,
  User,
  Bell,
  Upload,
  Save,
  Shield,
  Eye,
  ShieldCheck,
  Globe,
  DollarSign,
  Clock,
  Mail,
  Smartphone,
  MessageSquare,
} from "lucide-react"

// Mock color options
const colorOptions = [
  { name: "Blue", value: "blue", color: "#3B82F6" },
  { name: "Purple", value: "purple", color: "#8B5CF6" },
  { name: "Green", value: "green", color: "#10B981" },
  { name: "Orange", value: "orange", color: "#F59E0B" },
  { name: "Red", value: "red", color: "#EF4444" },
  { name: "Pink", value: "pink", color: "#EC4899" },
]

const currencyOptions = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
]

const timezoneOptions = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Dhaka", label: "Dhaka (BST)" },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Settings state
  const [appName, setAppName] = useState("Analytics Pro")
  const [primaryColor, setPrimaryColor] = useState("blue")
  const [currency, setCurrency] = useState("USD")
  const [timezone, setTimezone] = useState("UTC")
  const [userRole, setUserRole] = useState<"admin" | "viewer">("admin")

  // Notification preferences
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [systemAlerts, setSystemAlerts] = useState(true)
  const [marketingUpdates, setMarketingUpdates] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveSettings = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      console.log("Settings saved:", {
        appName,
        primaryColor,
        theme,
        currency,
        timezone,
        userRole,
        notifications: {
          emailAlerts,
          systemAlerts,
          marketingUpdates,
          pushNotifications,
        },
      })
    }, 1500)
  }

  const handleLogoUpload = () => {
    // Mock logo upload functionality
    console.log("Logo upload triggered")
  }

  if (!mounted) {
    return null
  }

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">App Settings</h1>
              <p className="text-muted-foreground">Customize your dashboard experience and preferences</p>
            </div>
          </div>
          <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Section 1: Branding */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Branding</h2>
              </div>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Brand Identity</CardTitle>
                  <CardDescription>Customize your application's appearance and branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* App Name */}
                  <div className="space-y-2">
                    <Label htmlFor="appName" className="text-sm font-medium">
                      Application Name
                    </Label>
                    <Input
                      id="appName"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      placeholder="Enter application name"
                      className="w-full"
                    />
                  </div>

                  <Separator />

                  {/* Logo Upload */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <Button variant="outline" onClick={handleLogoUpload} className="gap-2 bg-transparent">
                          <Upload className="w-4 h-4" />
                          Upload Logo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">Recommended: 200x200px, PNG or SVG</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Primary Color */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Primary Color</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {colorOptions.map((color) => (
                        <div
                          key={color.value}
                          className={`cursor-pointer p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                            primaryColor === color.value
                              ? "border-primary bg-primary/5"
                              : "border-muted hover:border-muted-foreground/25"
                          }`}
                          onClick={() => setPrimaryColor(color.value)}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.color }} />
                            <span className="text-sm font-medium">{color.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: User Preferences */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">User Preferences</h2>
              </div>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Display & Localization</CardTitle>
                  <CardDescription>Configure your personal dashboard preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <Label className="font-medium">Theme Preference</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Light</span>
                      <Switch
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                      <span className="text-sm text-muted-foreground">Dark</span>
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Default Currency
                    </Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map((curr) => (
                          <SelectItem key={curr.code} value={curr.code}>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm">{curr.symbol}</span>
                              <span>
                                {curr.name} ({curr.code})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Timezone */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Timezone
                    </Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezoneOptions.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Section 3: Role Switcher */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Role Management</h2>
              </div>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">User Role</CardTitle>
                  <CardDescription>Switch between different permission levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Role Toggle */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {userRole === "admin" ? (
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-blue-500" />
                          )}
                          <Label className="font-medium">Current Role</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {userRole === "admin"
                            ? "Full access to all features and settings"
                            : "Read-only access with limited functionality"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Viewer</span>
                        <Switch
                          checked={userRole === "admin"}
                          onCheckedChange={(checked) => setUserRole(checked ? "admin" : "viewer")}
                        />
                        <span className="text-sm text-muted-foreground">Admin</span>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="flex items-center gap-2">
                      <Badge variant={userRole === "admin" ? "default" : "secondary"} className="gap-1">
                        {userRole === "admin" ? <ShieldCheck className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        {userRole === "admin" ? "Administrator" : "Viewer"}
                      </Badge>
                    </div>

                    {/* Role Permissions */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Permissions</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div
                            className={`w-2 h-2 rounded-full ${userRole === "admin" ? "bg-emerald-500" : "bg-gray-400"}`}
                          />
                          <span className={userRole === "admin" ? "text-foreground" : "text-muted-foreground"}>
                            Export reports
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div
                            className={`w-2 h-2 rounded-full ${userRole === "admin" ? "bg-emerald-500" : "bg-gray-400"}`}
                          />
                          <span className={userRole === "admin" ? "text-foreground" : "text-muted-foreground"}>
                            Modify settings
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>View analytics</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Access dashboard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 4: Notification Preferences */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Notification Preferences</h2>
              </div>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Alert Settings</CardTitle>
                  <CardDescription>Configure how you receive notifications and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Alerts */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label className="font-medium">Email Alerts</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Receive important notifications via email</p>
                    </div>
                    <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>

                  {/* System Alerts */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label className="font-medium">System Alerts</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">In-app notifications for system events</p>
                    </div>
                    <Switch checked={systemAlerts} onCheckedChange={setSystemAlerts} />
                  </div>

                  {/* Push Notifications */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <Label className="font-medium">Push Notifications</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Browser push notifications for urgent alerts</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>

                  {/* Marketing Updates */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <Label className="font-medium">Marketing Updates</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Product updates, tips, and promotional content</p>
                    </div>
                    <Switch checked={marketingUpdates} onCheckedChange={setMarketingUpdates} />
                  </div>

                  {/* Notification Summary */}
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Label className="font-medium text-sm">Active Notifications</Label>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      You'll receive notifications via:{" "}
                      {[
                        emailAlerts && "Email",
                        systemAlerts && "System",
                        pushNotifications && "Push",
                        marketingUpdates && "Marketing",
                      ]
                        .filter(Boolean)
                        .join(", ") || "None"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Save Button (Mobile) */}
        <div className="lg:hidden">
          <Button onClick={handleSaveSettings} disabled={isSaving} className="w-full gap-2" size="lg">
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save All Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}
