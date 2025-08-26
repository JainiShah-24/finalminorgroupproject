export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  userType: 'farmer' | 'worker';
  profilePicture?: string;
  phone?: string;
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
  workType: string;
  duration: string;
  payRate: string;
  requirements: string[];
  workersNeeded: number;
  applicants: string[];
  status: 'open' | 'closed' | 'in_progress';
  createdAt: Date;
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