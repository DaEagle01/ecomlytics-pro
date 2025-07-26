import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecomlytics Pro - Transform Your E-commerce Data Into Pure Revenue",
  description:
    "Turn your e-commerce data into revenue with AI-powered analytics, predictive insights, and real-time monitoring. Boost conversions by 47% on average. Trusted by 50,000+ businesses worldwide.",
  keywords: [
    "ecommerce analytics",
    "conversion optimization",
    "customer insights",
    "revenue growth",
    "data analytics",
    "AI-powered analytics",
    "predictive analytics",
    "e-commerce intelligence",
  ],
  authors: [{ name: "Ecomlytics Pro" }],
  creator: "Ecomlytics Pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecomlyticspr.com",
    title: "Ecomlytics Pro - Transform Your E-commerce Data Into Pure Revenue",
    description:
      "Turn your e-commerce data into revenue with AI-powered analytics, predictive insights, and real-time monitoring. Boost conversions by 47% on average.",
    siteName: "Ecomlytics Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecomlytics Pro - Transform Your E-commerce Data Into Pure Revenue",
    description:
      "Turn your e-commerce data into revenue with AI-powered analytics, predictive insights, and real-time monitoring. Boost conversions by 47% on average.",
    creator: "@ecomlyticspr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
