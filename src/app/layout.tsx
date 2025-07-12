import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ecomlytics Pro - E-commerce Analytics Platform",
  description:
    "Professional analytics dashboard for e-commerce businesses. Track sales, customers, products, and campaigns with real-time insights.",
  keywords: ["analytics", "e-commerce", "dashboard", "metrics", "business intelligence"],
  authors: [{ name: "Ecomlytics Pro Team" }],
  openGraph: {
    title: "Ecomlytics Pro - E-commerce Analytics Platform",
    description: "Professional analytics dashboard for e-commerce businesses",
    type: "website",
  },
    generator: 'Ecomlytics Pro'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
