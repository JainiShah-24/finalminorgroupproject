export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'farmer' | 'worker';
  profilePicture?: string;
  location?: string;
  experience?: string;
  skills?: string[];
  verified: boolean;
}

export interface Job {
  id: string;
  farmerId: string;
  title: string;
  description: string;
  location: string;
  state: string;
  district: string;
  workType: string;
  jobTypes: string[];
  landArea: string;
  duration: string;
  payRate: string;
  paymentType: string;
  salaryAmount: string;
  requirements: string[];
  workersNeeded: number;
  additionalBenefits: string[];
  applicants: string[];
  status: 'open' | 'closed' | 'in_progress';
  createdAt: Date;
  farmerName: string;
  farmerPhone: string;
  farmerEmail?: string;
  images?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'subsidy' | 'education' | 'news' | 'technology';
  imageUrl?: string;
  publishedAt: Date;
}

export type Language = 'en' | 'hi' | 'gu';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    gu: string;
  };
}