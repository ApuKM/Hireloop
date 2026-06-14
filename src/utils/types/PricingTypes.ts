

export interface PricingFeature {
  name: string;
}

export interface PricingPlan {
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