"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Target, Zap, Shield, Users, TrendingUp, Brain, Globe, Clock, Sparkles } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights into customer behavior, conversion funnels, and revenue attribution with real-time data processing.",
    gradient: "gradient-bg-primary",
    hoverColor: "hover:text-electric-blue",
  },
  {
    icon: Target,
    title: "Conversion Optimization",
    description:
      "AI-powered recommendations to improve your conversion rates and identify high-impact optimization opportunities.",
    gradient: "gradient-bg-cool",
    hoverColor: "hover:text-cyan-bright",
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description:
      "Machine learning algorithms that predict customer lifetime value, churn risk, and optimal pricing strategies.",
    gradient: "gradient-bg-vibrant",
    hoverColor: "hover:text-purple-magic",
  },
  {
    icon: Users,
    title: "Customer Segmentation",
    description:
      "Automatically segment customers based on behavior, purchase history, and engagement patterns for targeted campaigns.",
    gradient: "from-neon-green to-cyan-bright",
    hoverColor: "hover:text-neon-green",
  },
  {
    icon: TrendingUp,
    title: "Revenue Attribution",
    description:
      "Track every touchpoint in the customer journey and understand which channels drive the most valuable customers.",
    gradient: "from-hot-pink to-orange-burst",
    hoverColor: "hover:text-hot-pink",
  },
  {
    icon: Zap,
    title: "Real-time Alerts",
    description: "Get instant notifications about significant changes in your metrics, anomalies, or opportunities.",
    gradient: "from-orange-burst to-electric-blue",
    hoverColor: "hover:text-orange-burst",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Enterprise-grade security with SOC 2 compliance, data encryption, and privacy controls you can trust.",
    gradient: "from-electric-blue to-purple-magic",
    hoverColor: "hover:text-electric-blue",
  },
  {
    icon: Globe,
    title: "Multi-store Support",
    description:
      "Manage analytics across multiple stores, regions, and currencies with unified reporting and insights.",
    gradient: "from-purple-magic to-hot-pink",
    hoverColor: "hover:text-purple-magic",
  },
  {
    icon: Clock,
    title: "Historical Analysis",
    description:
      "Access years of historical data with trend analysis, seasonal patterns, and year-over-year comparisons.",
    gradient: "from-cyan-bright to-neon-green",
    hoverColor: "hover:text-cyan-bright",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-electric-blue/5">
        <div className="absolute top-20 right-20 w-40 h-40 gradient-bg-vibrant rounded-full blur-3xl opacity-10 animate-float" />
        <div
          className="absolute bottom-32 left-32 w-32 h-32 gradient-bg-cool rounded-full blur-2xl opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <Badge variant="secondary" className="gradient-bg-primary text-white border-0 animate-bounce-in">
            <Sparkles className="w-3 h-3 mr-1" />
            Features
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            Everything you need to <span className="gradient-text">dominate your market</span>
          </h2>
          <p
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Powerful analytics tools designed specifically for e-commerce businesses. Get the insights you need to make
            data-driven decisions and grow exponentially.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 glass-effect hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-pulse-glow`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle
                    className={`text-xl group-hover:scale-105 transition-all duration-300 ${feature.hoverColor}`}
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Highlight */}
        <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <Card className="glass-effect border-2 border-white/20 hover:border-electric-blue/50 transition-all duration-500 hover:scale-105">
            <CardContent className="p-12 text-center">
              <div className="max-w-4xl mx-auto space-y-8">
                <Badge variant="secondary" className="gradient-bg-vibrant text-white border-0 mb-6 animate-bounce-in">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Insights Engine
                </Badge>
                <h3 className="text-3xl lg:text-5xl font-bold gradient-text">Get recommendations that actually work</h3>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Our AI analyzes millions of data points to give you personalized recommendations that can increase
                  your revenue by an average of <span className="text-electric-blue font-bold">47%</span> within the
                  first
                  <span className="text-hot-pink font-bold"> 90 days</span>.
                </p>
                <div className="flex justify-center gap-12 pt-8">
                  <div className="text-center group">
                    <div className="text-4xl lg:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                      47%
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Avg Revenue Increase</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl lg:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                      90
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Days to Results</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl lg:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">AI Monitoring</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
