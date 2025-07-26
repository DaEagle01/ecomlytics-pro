"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Sparkles, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

const benefits = ["14-day free trial", "No credit card required", "Setup in under 2 minutes", "Cancel anytime"]

const trustLogos = ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Stripe", "PayPal"]

export function CTASection() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-background to-hot-pink/10">
        <div className="absolute top-20 left-20 w-40 h-40 gradient-bg-vibrant rounded-full blur-3xl opacity-15 animate-float" />
        <div
          className="absolute bottom-32 right-32 w-32 h-32 gradient-bg-cool rounded-full blur-2xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-electric-blue rounded-full animate-rotate-slow" />
      </div>

      <div className="container px-4 relative z-10">
        <Card className="max-w-5xl mx-auto glass-effect border-2 border-white/20 shadow-2xl hover:shadow-electric-blue/20 transition-all duration-500 animate-fade-in">
          <CardContent className="pt-8 md:p-12 lg:p-16 text-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="gradient-bg-vibrant text-white border-0 text-lg px-6 py-2 animate-bounce-in"
                >
                  <Sparkles className="md:w-4 md:h-4 mr-1 md:mr-2" />
                  Ready to dominate your market?
                </Badge>

                <h2 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight animate-slide-up">
                  Start growing your business
                  <span className="gradient-text block"> exponentially today</span>
                </h2>

                <p
                  className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  Join thousands of e-commerce businesses already using Ecomlytics Pro to make smarter decisions, boost
                  conversions, and drive explosive revenue growth.
                </p>
              </div>

              {/* Animated Benefits Grid */}
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up"
                style={{ animationDelay: "0.5s" }}
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-sm group animate-bounce-in"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:text-neon-green transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up"
                style={{ animationDelay: "0.7s" }}
              >
                <Button
                  size="lg"
                  className="group gradient-bg-primary hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-electric-blue/30 text-xl px-12 py-8 animate-pulse-glow"
                  asChild
                >
                  <Link href="/signup">
                    <Star className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Start Free Trial
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group glass-effect hover:scale-110 transition-all duration-300 text-xl px-12 py-8 border-2 hover:border-hot-pink bg-transparent"
                  asChild
                >
                  <Link href="/demo">
                    <TrendingUp className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Schedule Demo
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators with Animation */}
              <div className="pt-1 md:pt-12 border-t border-white/10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                <p className="text-sm text-muted-foreground mb-6">Trusted by leading e-commerce brands worldwide</p>
                <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
                  {trustLogos.map((logo, index) => (
                    <div
                      key={logo}
                      className="text-lg font-semibold hover:text-electric-blue transition-all duration-300 hover:scale-110 animate-slide-in"
                      style={{ animationDelay: `${1000 + index * 100}ms` }}
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 animate-slide-up" style={{ animationDelay: "1.2s" }}>
                <div className="text-center group">
                  <div className="text-xl md:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                    2 min
                  </div>
                  <div className="text-sm text-muted-foreground">Setup Time</div>
                </div>
                <div className="text-center group">
                  <div className="text-xl md:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                    47%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Growth</div>
                </div>
                <div className="text-center group">
                  <div className="text-xl md:text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
