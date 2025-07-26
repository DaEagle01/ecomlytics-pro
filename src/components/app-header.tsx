"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Shield,
  Eye,
  CreditCard,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth, type UserRole } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const roleConfig = {
  admin: { label: "Admin", icon: Shield, color: "text-red-600" },
  manager: { label: "Manager", icon: User, color: "text-blue-600" },
  viewer: { label: "Viewer", icon: Eye, color: "text-gray-600" },
};

const notifications = [
  { id: 1, title: "New order received", time: "2m ago", unread: true },
  { id: 2, title: "Payment processed", time: "5m ago", unread: true },
  { id: 3, title: "Weekly report ready", time: "1h ago", unread: false },
];

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout, updateRole } = useAuth();
  const pathname = usePathname();
  const unreadCount = notifications.filter((n) => n.unread).length;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRoleChange = (role: UserRole) => updateRole(role);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {onMenuClick && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href='/' className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-bg-vibrant rounded-lg flex items-center justify-center animate-pulse-glow">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">Ecomlytics Pro</span>
          </Link>
          <Badge
            variant="secondary"
            className="ml-2 hidden sm:inline-flex gradient-bg-cool text-white border-0"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="nav-link-effect text-sm font-medium">
            Features
          </Link>
          <Link href="#testimonials" className="nav-link-effect text-sm font-medium">
            Testimonials
          </Link>
          <Link href="/pricing" className="nav-link-effect text-sm font-medium">
            Pricing
          </Link>
          <Link href="/docs" className="nav-link-effect text-sm font-medium">
            Docs
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && pathname.startsWith("/dashboard") && (
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9"
              />
            </div>
          )}

          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((n) => (
                    <DropdownMenuItem key={n.id} className="flex flex-col items-start p-3">
                      <div className="flex w-full items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-muted-foreground">{n.time}</p>
                        </div>
                        {n.unread && <div className="h-2 w-2 rounded-full bg-primary" />}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/notifications" className="w-full text-center">
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role</DropdownMenuLabel>
                  {Object.entries(roleConfig).map(([role, config]) => {
                    const Icon = config.icon;
                    const isActive = user?.role === role;
                    return (
                      <DropdownMenuItem
                        key={role}
                        onClick={() => handleRoleChange(role as UserRole)}
                        className={cn("cursor-pointer", isActive && "bg-accent")}
                      >
                        <Icon className={cn("mr-2 h-4 w-4", config.color)} />
                        <span>{config.label}</span>
                        {isActive && (
                          <Badge variant="secondary" className="ml-auto">
                            Active
                          </Badge>
                        )}
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/billing">
                      <CreditCard className="mr-2 h-4 w-4" /> Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="gradient-bg-primary" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t glass-effect animate-slide-up">
          <nav className="container py-4 space-y-4">
            <Link href="#features" className="block text-sm font-medium hover:text-electric-blue">
              Features
            </Link>
            <Link href="#testimonials" className="block text-sm font-medium hover:text-hot-pink">
              Testimonials
            </Link>
            <Link href="/pricing" className="block text-sm font-medium hover:text-purple-magic">
              Pricing
            </Link>
            <Link href="/docs" className="block text-sm font-medium hover:text-neon-green">
              Docs
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="gradient-bg-primary" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
