"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { Shield, User, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Role = "admin" | "manager" | "viewer"

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
  hasPermission: (permission: string) => boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("admin")

  const hasPermission = (permission: string) => {
    const permissions = {
      admin: ["read", "write", "delete", "export", "manage"],
      manager: ["read", "write", "export"],
      viewer: ["read"],
    }
    return permissions[role].includes(permission)
  }

  return <RoleContext.Provider value={{ role, setRole, hasPermission }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

const roleConfig = {
  admin: {
    label: "Admin",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/50",
  },
  manager: {
    label: "Manager",
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  viewer: {
    label: "Viewer",
    icon: Eye,
    color: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-950/50",
  },
}

interface RoleSwitcherProps {
  onRoleChange?: (role: Role) => void
}

export function RoleSwitcher({ onRoleChange }: RoleSwitcherProps) {
  const { role, setRole } = useRole()

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole)
    onRoleChange?.(newRole)
  }

  const currentRole = roleConfig[role]
  const Icon = currentRole.icon

  return (
    <Select value={role} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-32">
        <SelectValue>
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            <span className="text-sm">{currentRole.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(roleConfig).map(([key, config]) => {
          const RoleIcon = config.icon
          return (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                <RoleIcon className={`w-4 h-4 ${config.color}`} />
                <span>{config.label}</span>
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

interface PermissionGateProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGate({ permission, children, fallback }: PermissionGateProps) {
  const { hasPermission } = useRole()

  if (!hasPermission(permission)) {
    return fallback || null
  }

  return <>{children}</>
}
