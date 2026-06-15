import { Faq, PricingPlan } from "@/utils/types/PricingTypes";

export const seekerPlans: PricingPlan[] = [
  {
    id: "seeker_free",
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Perfect for getting started with your job search.",
    features: [
      { name: "Browse & save up to 10 jobs" },
      { name: "Apply to up to 3 jobs per month" },
      { name: "Basic profile" },
      { name: "Email alerts" },
    ],
  },
  {
    id: "seeker_pro",
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For active job seekers who want more opportunities.",
    isPopular: true,
    features: [
      { name: "Apply to up to 30 jobs per month" },
      { name: "Unlimited saved jobs" },
      { name: "Application tracking" },
      { name: "Salary insights" },
    ],
  },
  {
    id: "seeker_premium",
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "Maximize your reach and stand out to top employers.",
    features: [
      { name: "Everything in Pro + unlimited applications" },
      { name: "Profile boost to recruiters" },
      { name: "Early access to new jobs" },
      { name: "Priority support" },
    ],
  },
];

export const recruiterPlans: PricingPlan[] = [
  {
    id: "recruiter_free",
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Great for a company's first year of hiring.",
    features: [
      { name: "Up to 3 active job posts" },
      { name: "Basic applicant management" },
      { name: "Standard listing visibility" },
    ],
  },
  {
    id: "recruiter_growth",
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "Scale your hiring process with better tracking.",
    isPopular: true,
    features: [
      { name: "Up to 10 active job posts" },
      { name: "Applicant tracking" },
      { name: "Basic analytics" },
      { name: "Email support" },
    ],
  },
  {
    id: "recruiter_enterprise",
    name: "Enterprise",
    price: "$149",
    period: "/month",
    description: "Advanced tools for high-volume recruitment teams.",
    features: [
      { name: "Up to 50 active job posts" },
      { name: "Advanced analytics dashboard" },
      { name: "Featured job listings" },
      { name: "Team collaboration & custom branding" },
      { name: "Priority support" },
    ],
  },
];

export const faqs: Faq[] = [
  {
    question: "Can I cancel my plan at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing cycle.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee for all paid plans. If you are not satisfied within the first 14 days of your first payment, contact support for a full refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, the prorated difference will be charged immediately. When downgrading, the new rate will apply at the start of your next billing cycle.",
  },
];