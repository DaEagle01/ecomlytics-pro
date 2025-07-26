"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, TrendingUp, Users, Zap, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-electric-blue/5 to-hot-pink/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 gradient-bg-vibrant rounded-full blur-3xl opacity-20 animate-float" />
        <div
          className="absolute top-40 right-32 w-24 h-24 gradient-bg-cool rounded-full blur-2xl opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 gradient-bg-primary rounded-full blur-3xl opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-28 h-28 bg-purple-magic/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Rotating Elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-electric-blue rounded-full animate-rotate-slow" />
        <div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-hot-pink rounded-full animate-rotate-slow"
          style={{ animationDelay: "5s" }}
        />
      </div>

      <div className="container relative z-10 px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit gradient-bg-cool text-white border-0 animate-bounce-in">
                <Sparkles className="w-3 h-3 mr-1" />
                New: AI-Powered Real-time Analytics
              </Badge>

              <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight">
                Transform Your
                <span className="gradient-text block"> E-commerce Data</span>
                Into Pure Revenue
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Unlock the power of advanced analytics with AI-driven insights that boost conversions by
                <span className="text-electric-blue font-semibold"> 47% on average</span> and scale your business with
                confidence.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="flex flex-wrap gap-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 gradient-bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-2xl gradient-text">47%</div>
                  <div className="text-sm text-muted-foreground">Revenue Boost</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div
                  className="w-12 h-12 gradient-bg-cool rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-glow"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-2xl gradient-text">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Users</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div
                  className="w-12 h-12 gradient-bg-vibrant rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-glow"
                  style={{ animationDelay: "1s" }}
                >
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-2xl gradient-text">4.9/5</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <Button
                size="lg"
                className="group gradient-bg-primary hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-electric-blue/25 text-lg px-8 py-6"
                asChild
              >
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group glass-effect hover:scale-105 transition-all duration-300 text-lg px-8 py-6 border-2 hover:border-electric-blue bg-transparent"
                asChild
              >
                <Link href="/demo">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.9s" }}>
              ✨ 14-day free trial • 🚀 No credit card required • ⚡ Setup in 2 minutes
            </p>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 gradient-bg-vibrant rounded-2xl opacity-30 animate-float blur-sm" />
              <div
                className="absolute -bottom-8 -right-8 w-20 h-20 gradient-bg-cool rounded-xl opacity-40 animate-float blur-sm"
                style={{ animationDelay: "1s" }}
              />

              {/* Main Dashboard */}
              <div className="relative glass-effect rounded-3xl shadow-2xl overflow-hidden border-2 border-white/20 hover:scale-105 transition-all duration-500">
                <div className="gradient-bg-primary/10 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    <div
                      className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-4 h-4 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Analytics+Dashboard"
                    alt="Ecomlytics Pro Dashboard"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              {/* Floating Metrics Cards */}
              <div
                className="absolute -left-12 top-1/4 glass-effect rounded-xl shadow-xl p-4 animate-slide-in border border-white/20"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-2xl font-bold text-neon-green">+34.7%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
                <div className="w-full h-1 bg-neon-green/20 rounded-full mt-2">
                  <div className="w-3/4 h-full bg-neon-green rounded-full animate-shimmer" />
                </div>
              </div>

              <div
                className="absolute -right-12 bottom-1/4 glass-effect rounded-xl shadow-xl p-4 animate-slide-in border border-white/20"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="text-2xl font-bold text-hot-pink">$127.5K</div>
                <div className="text-sm text-muted-foreground">Revenue Today</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-hot-pink" />
                  <span className="text-sm text-hot-pink font-medium">+23%</span>
                </div>
              </div>

              <div
                className="absolute -top-6 right-1/4 glass-effect rounded-lg shadow-lg p-3 animate-bounce-in border border-white/20"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-burst" />
                  <span className="text-sm font-medium text-orange-burst">Live Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
