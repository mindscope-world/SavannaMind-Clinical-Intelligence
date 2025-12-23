
export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface ProductHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
}
