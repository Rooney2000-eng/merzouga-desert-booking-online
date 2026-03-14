export type ServiceId = "camel" | "camp" | "quad" | "combo";

export type PricingModel = "perPerson" | "perNight" | "perHour";

export interface Service {
  id: ServiceId;
  title: string;
  eyebrow: string;
  description: string;
  duration: string;
  badge: string;
  price: number;
  pricingModel: PricingModel;
  unitLabel: string;
  features: string[];
}

export interface AddOn {
  id: string;
  title: string;
  description: string;
  price: number;
  pricing: "group" | "perPerson";
}

export interface Testimonial {
  name: string;
  country: string;
  quote: string;
  rating: number;
  trip: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
