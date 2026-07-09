# 💼 hireloop

> A high-velocity job recruitment and career pathway discovery platform built with the absolute latest React 19, Next.js 16, and Tailwind CSS v4 ecosystems. 

**hireloop** streamlines the job search and application lifecycle, providing developers, job seekers, and recruiters with a smooth, interactive dashboard interface powered by atomic component architectures and transactional payment models.

---

## 🚀 Key Features

*   **Advanced Hybrid Authentication:** Secured via `Better Auth` featuring stateless session controls and a persistent native `@better-auth/mongo-adapter` pipeline.
*   **Transactional Subscriptions & Payments:** Integrated enterprise-grade multi-tier premium job listing monetization using the official `Stripe` and `@stripe/stripe-js` payment infrastructures.
*   **Fluid Component Motion:** Smooth micro-interactions, responsive sidebars, and transitions built using the modern `motion` (Framer Motion) animation runtime library.
*   **Type-Safe Forms:** Fully performance-optimized job application and post-submission forms engineered with `react-hook-form` to eliminate unnecessary client-side re-renders.
*   **Modern Declarative UI:** Fully customized layout primitives styled seamlessly using `HeroUI` (`@heroui/react`) paired with the brand-new utility compiler engine of `Tailwind CSS v4`.

---

## 🛠️ Tech Stack & Architecture

### Frontend Layer
*   **Core Framework:** `React 19` & `Next.js 16` (App Router architecture)
*   **Language Structure:** `TypeScript` (Strict Type-Safety)
*   **Styling Engine:** `Tailwind CSS v4` (with native `@tailwindcss/postcss`)
*   **Design System:** `HeroUI`, `@gravity-ui/icons`, and `react-icons`

### Backend & Database Integrations
*   **Database Management:** Native `MongoDB` Client Driver Layer
*   **Authentication Engine:** `Better Auth` 
*   **Payment Gateway Infrastructure:** `Stripe API`

---

## 💻 Getting Started & Installation

Follow these procedural layout guidelines to safely spin up a local development instance of hireloop-client:

### 1. Prerequisite Checklist
Ensure your local system environment matches the following criteria:
*   **Node.js:** v20.x or greater recommended
*   **Package Manager:** `npm` or `yarn`
*   **Database instance:** An active MongoDB connection string (Atlas or Local container)

### 2. Clone and Dependency Installation
Clone this specific workspace instance locally and bootstrap the dependency array:
```bash
git clone [https://github.com/ApuKM/hireloop.git](https://github.com/ApuKM/hireloop.git)
cd hireloop
npm install

# -----------------------------------------------------------------------------
# DATABASE CONFIGURATION
# -----------------------------------------------------------------------------
# Your MongoDB connection string (Atlas Cloud URL or Local Instance URI)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/hireloop

# -----------------------------------------------------------------------------
# BETTER AUTH SETTINGS
# -----------------------------------------------------------------------------
# A unique random secret string used to sign your app tokens and session keys
BETTER_AUTH_SECRET=your_super_secret_jwt_random_string_here
# The base deployment URL of your running web application
BETTER_AUTH_URL=http://localhost:3000

# -----------------------------------------------------------------------------
# STRIPE PAYMENT SUBSCRIPTION SYSTEM
# -----------------------------------------------------------------------------
# Public token used on the frontend client browser layer
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_public_stripe_key_stream
# Private gateway secret key used exclusively on secure server routes
STRIPE_SECRET_KEY=sk_test_your_secret_private_stripe_key
# Optional: Webhook endpoint identifier used to capture asynchronous billing events
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_signing_secret

npm run dev


🌐 Contact & Support
Professional Email: apukumar180@gmail.com
LinkedIn Presence: (https://www.linkedin.com/in/apu-kumar/)
