export interface PricingFeature {
  name: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  isPopular?: boolean;
  features: PricingFeature[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Plan {
  id: string;
  name: string;
  maxApplicationsPerMonth: number;
}

export interface SubInfo {
  customerEmail: string;
  planId: string | undefined;
}
