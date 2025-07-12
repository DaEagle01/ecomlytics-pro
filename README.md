# 📊 Premium E-Commerce Analytics Dashboard

A **fully responsive**, **secure**, **multi-role**, **production-grade** SaaS dashboard built with modern frontend technologies. Designed for **business intelligence**, **data visualization**, and **role-based access control**.

---

## 🎯 What It Does

- Serves as a real-world **admin dashboard** for e-commerce analytics
- Supports **admin, manager, viewer** roles with permission-based access
- Offers **interactive, animated visualizations**
- Contains a professional **landing page**, full **auth system**, and **dashboard sections**
- Prioritizes **UI/UX, mobile responsiveness, and component scalability**

---

## ⚙️ Tech Stack

- **Next.js (App Router)**
- **React** with **TypeScript**
- **Tailwind CSS** (with custom theming)
- **shadcn/ui** for accessible, beautiful components
- **Chart.js / Recharts** for data visualizations
- **LocalStorage**-based Auth simulation
- **Heroicons, Lucide Icons**

---

## 🧠 Features Overview

### ✅ Multi-role Authentication
- Role-based routing and UI access (`admin`, `manager`, `viewer`)
- Auth context with login/logout
- Session persisted with `localStorage`

### ✅ Landing Page
- Fully responsive SaaS marketing page
- Animations, CTA buttons, pricing, testimonials
- Hero + product preview
- Conversion-focused design

### ✅ Dashboard (per role)
- Sales Overview + KPI Cards
- Charts (Bar, Pie, Line, Area)
- Product Performance
- Customers & Sessions
- Orders
- Ad Campaign Analytics
- Team Access (Role Switching)
- Billing History
- Plan Upgrade / Pricing
- Activity Logs

### ✅ Sidebar
- Fixed sidebar on desktop, collapsible
- Icon-only shrink mode
- Tooltips on hover
- Highlights active route with accent

### ✅ Header
- Theme toggle (Light/Dark)
- Profile dropdown
- Notification icon
- Role switcher
- Session info

### ✅ Security UX
- Auth loading state
- Route protection
- Context-aware UI disablement
- Permission boundaries explained (tooltips)

---

## 🗂 Pages Included

| Path | Page | Description |
|------|------|-------------|
| `/` | Landing Page | Public homepage, marketing-focused |
| `/login` | Login | Auth form, mocked user sign-in |
| `/signup` | Signup | Register new mock user |
| `/dashboard` | Dashboard Home | KPIs, charts, product analytics |
| `/dashboard/customers` | Customers | Table, sessions, filtering |
| `/dashboard/orders` | Orders | Recent orders list |
| `/dashboard/ads` | Ad Analytics | Charts for ad engagement |
| `/dashboard/billing` | Billing & Plan | View plans, upgrade, billing history |
| `/dashboard/activity` | Audit Logs | Recent actions by user |
| `/dashboard/team` | Team Roles | Manage/view team, switch roles |

---