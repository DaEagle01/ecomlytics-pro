"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, Zap, Building, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AppHeader } from "@/components/app-header"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    icon: BarChart3,
    price: { monthly: 0, yearly: 0 },
    features: [
      "Up to 1,000 monthly page views",
      "Basic analytics dashboard",
      "Email support",
      "1 team member",
      "Basic reporting",
    ],
    limitations: ["No advanced analytics", "No custom integrations", "No priority support", "No data export"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "Best for growing businesses",
    icon: Zap,
    price: { monthly: 29, yearly: 290 },
    features: [
      "Up to 50,000 monthly page views",
      "Advanced analytics & insights",
      "Priority email & chat support",
      "Up to 5 team members",
      "Custom reports & exports",
      "API access",
      "Advanced segmentation",
      "Real-time notifications",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    icon: Building,
    price: { monthly: 99, yearly: 990 },
    features: [
      "Unlimited page views",
      "White-label solution",
      "Dedicated account manager",
      "Unlimited team members",
      "Custom integrations",
      "Advanced security & compliance",
      "Custom onboarding",
      "24/7 phone support",
      "SLA guarantee",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial for the Pro plan. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business. Upgrade or downgrade at any time.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Label htmlFor="billing-toggle" className={!isYearly ? "font-medium" : ""}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-toggle" className={isYearly ? "font-medium" : ""}>
              Yearly
            </Label>
            <Badge variant="success" className="ml-2">
              Save 17%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const price = isYearly ? plan.price.yearly : plan.price.monthly
            const savings = plan.price.monthly * 12 - plan.price.yearly

            return (
              <EnhancedCard
                key={plan.name}
                variant={plan.popular ? "gradient" : "default"}
                className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}

                <EnhancedCardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <EnhancedCardTitle className="text-xl">{plan.name}</EnhancedCardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                    </div>
                    {isYearly && savings > 0 && <p className="text-sm text-green-600 mt-1">Save ${savings}/year</p>}
                  </div>
                </EnhancedCardHeader>

                <EnhancedCardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                    {plan.name === "Enterprise" ? (
                      <Link href="/contact">{plan.cta}</Link>
                    ) : (
                      <Link href={plan.name === "Free" ? "/signup" : "/signup"}>{plan.cta}</Link>
                    )}
                  </Button>
                </EnhancedCardContent>
              </EnhancedCard>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <EnhancedCard key={index}>
                <EnhancedCardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <EnhancedCard variant="gradient" className="max-w-2xl mx-auto">
            <EnhancedCardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of businesses already using Ecomlytics Pro to grow their revenue.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        </div>
      </div>
    </div>
  )
}
