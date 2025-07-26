"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles, TrendingUp } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO",
    company: "StyleHub",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Ecomlytics Pro completely transformed how we understand our customers. The AI recommendations helped us increase our conversion rate by 34% in just 2 months. It's like having a data scientist on our team 24/7!",
    rating: 5,
    metric: "+34% conversion rate",
    metricColor: "text-neon-green",
    bgGradient: "gradient-bg-cool",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Growth Marketing Manager",
    company: "TechGear Pro",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The predictive analytics are mind-blowing! We identified our most valuable customer segments and our customer lifetime value increased by 52%. The ROI has been incredible - best investment we've made.",
    rating: 5,
    metric: "+52% customer LTV",
    metricColor: "text-hot-pink",
    bgGradient: "gradient-bg-vibrant",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Founder",
    company: "EcoLiving",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Finally, an analytics platform that actually helps us make better decisions! The real-time alerts saved us from a major inventory issue that could have cost us $50K. The platform pays for itself.",
    rating: 5,
    metric: "Prevented $50K loss",
    metricColor: "text-orange-burst",
    bgGradient: "gradient-bg-primary",
  },
  {
    id: 4,
    name: "David Kim",
    role: "E-commerce Director",
    company: "FashionForward",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The multi-store dashboard gives us a unified view across all our brands. We've optimized our marketing spend and increased ROAS by 43%. The insights are actionable and the interface is beautiful.",
    rating: 5,
    metric: "+43% ROAS",
    metricColor: "text-purple-magic",
    bgGradient: "from-purple-magic to-electric-blue",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "CMO",
    company: "HomeDecor Plus",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The customer segmentation is incredibly accurate. We've personalized our campaigns and seen a 67% increase in email engagement. Our customers love the personalized experience we can now provide.",
    rating: 5,
    metric: "+67% email engagement",
    metricColor: "text-cyan-bright",
    bgGradient: "from-cyan-bright to-neon-green",
  },
  {
    id: 6,
    name: "Alex Johnson",
    role: "VP of Analytics",
    company: "SportsTech",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The historical analysis features helped us identify seasonal trends we never noticed before. Our inventory planning is now 89% more accurate, and we've eliminated stockouts during peak seasons.",
    rating: 5,
    metric: "+89% inventory accuracy",
    metricColor: "text-electric-blue",
    bgGradient: "from-electric-blue to-hot-pink",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const testimonialsPerPage = 3

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + testimonialsPerPage >= testimonials.length ? 0 : prev + testimonialsPerPage))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonialsPerPage])

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + testimonialsPerPage >= testimonials.length ? 0 : prev + testimonialsPerPage))
    setIsAutoPlaying(false)
  }

  const prevTestimonials = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - testimonialsPerPage) : prev - testimonialsPerPage,
    )
    setIsAutoPlaying(false)
  }

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + testimonialsPerPage)

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-hot-pink/5 to-purple-magic/5">
        <div className="absolute top-32 left-20 w-36 h-36 gradient-bg-cool rounded-full blur-3xl opacity-10 animate-float" />
        <div
          className="absolute bottom-20 right-32 w-28 h-28 gradient-bg-vibrant rounded-full blur-2xl opacity-15 animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <Badge variant="secondary" className="gradient-bg-vibrant text-white border-0 animate-bounce-in">
            <Sparkles className="w-3 h-3 mr-1" />
            Testimonials
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            Trusted by <span className="gradient-text">50,000+ businesses</span> worldwide
          </h2>
          <p
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            See how leading e-commerce brands use Ecomlytics Pro to drive explosive growth and make smarter decisions.
          </p>
        </div>

        {/* Animated Stats Bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-center group">
            <div className="text-4xl lg:text-5xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
              50K+
            </div>
            <div className="text-sm text-muted-foreground mt-2">Active Users</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl lg:text-5xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
              47%
            </div>
            <div className="text-sm text-muted-foreground mt-2">Avg Revenue Increase</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl lg:text-5xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
              4.9/5
            </div>
            <div className="text-sm text-muted-foreground mt-2">Customer Rating</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl lg:text-5xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
              99.9%
            </div>
            <div className="text-sm text-muted-foreground mt-2">Uptime</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {currentTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 glass-effect border-2 border-white/20 hover:border-electric-blue/30 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Quote Icon with Gradient */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.bgGradient} flex items-center justify-center animate-pulse-glow`}
                    >
                      <Quote className="w-6 h-6 text-white" />
                    </div>

                    {/* Animated Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-orange-burst text-orange-burst animate-bounce-in"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground transition-colors duration-300">
                      "{testimonial.content}"
                    </p>

                    {/* Animated Metric Badge */}
                    <Badge
                      variant="secondary"
                      className={`w-fit glass-effect border-0 ${testimonial.metricColor} font-semibold animate-shimmer`}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {testimonial.metric}
                    </Badge>

                    {/* Author with Enhanced Avatar */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <Avatar className="w-14 h-14 ring-2 ring-electric-blue/20 group-hover:ring-electric-blue/50 transition-all duration-300">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="gradient-bg-primary text-white font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-lg group-hover:text-electric-blue transition-colors duration-300">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role} at <span className="font-medium">{testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Navigation */}
          <div className="flex justify-center gap-6 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonials}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full glass-effect border-2 border-white/20 hover:border-electric-blue hover:scale-110 transition-all duration-300 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonials}
              disabled={currentIndex + testimonialsPerPage >= testimonials.length}
              className="w-12 h-12 rounded-full glass-effect border-2 border-white/20 hover:border-hot-pink hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerPage) }).map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / testimonialsPerPage) === i
                    ? "bg-electric-blue scale-125 shadow-lg shadow-electric-blue/50"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:scale-110"
                }`}
                onClick={() => {
                  setCurrentIndex(i * testimonialsPerPage)
                  setIsAutoPlaying(false)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
