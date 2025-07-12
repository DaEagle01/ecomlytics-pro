"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "manager" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateRole: (role: UserRole) => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const rolePermissions = {
  admin: ["read", "write", "delete", "export", "manage", "billing"],
  manager: ["read", "write", "export"],
  viewer: ["read"],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("ecomlytics_pro_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser: User = {
      id: "1",
      name: "Alex Thompson",
      email: email,
      role: "admin",
      avatar: "/placeholder.svg?height=32&width=32",
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("ecomlytics_pro_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("ecomlytics_pro_user")
  }

  const updateRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem("ecomlytics_pro_user", JSON.stringify(updatedUser))
    }
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    return rolePermissions[user.role].includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
