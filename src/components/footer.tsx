import Link from "next/link"
import { BarChart3, Twitter, Github, Linkedin, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "API", href: "/api" },
    { name: "Integrations", href: "/integrations" },
    { name: "Changelog", href: "/changelog" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Documentation", href: "/docs" },
    { name: "Contact", href: "/contact" },
    { name: "Status", href: "/status" },
    { name: "Community", href: "/community" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "Cookies", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter, color: "hover:text-electric-blue" },
  { name: "Github", href: "#", icon: Github, color: "hover:text-purple-magic" },
  { name: "LinkedIn", href: "#", icon: Linkedin, color: "hover:text-cyan-bright" },
  { name: "Instagram", href: "#", icon: Instagram, color: "hover:text-hot-pink" },
  { name: "YouTube", href: "#", icon: Youtube, color: "hover:text-orange-burst" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-electric-blue/5">
        <div className="absolute top-20 right-20 w-32 h-32 gradient-bg-cool rounded-full blur-3xl opacity-10 animate-float" />
        <div
          className="absolute bottom-20 left-20 w-24 h-24 gradient-bg-vibrant rounded-full blur-2xl opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container px-4 py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-bg-vibrant rounded-xl flex items-center justify-center animate-pulse-glow">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl gradient-text">Ecomlytics Pro</span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Advanced analytics platform designed for e-commerce businesses to drive exponential growth and make
              data-driven decisions with confidence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 animate-bounce-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Product */}
          <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-semibold mb-6 text-lg gradient-text">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-electric-blue transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="animate-slide-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-semibold mb-6 text-lg gradient-text">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-hot-pink transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="animate-slide-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="font-semibold mb-6 text-lg gradient-text">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-purple-magic transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-slide-in" style={{ animationDelay: "0.5s" }}>
            <h3 className="font-semibold mb-6 text-lg gradient-text">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-cyan-bright transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ecomlytics Pro. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Made with <span className="text-hot-pink animate-pulse">❤️</span> for e-commerce businesses worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
