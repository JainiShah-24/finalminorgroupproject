export interface User {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  userType: 'farmer' | 'worker';
  profilePicture?: string;
  city?: string;
  state?: string;
  // Worker specific fields
  experience?: string;
  skills?: string[];
  jobExpertise?: string[];
  skillLevel?: string;
  workCapacity?: string;
  accommodationNeeded?: boolean;
  timeAvailability?: string;
  requiredSalary?: string;
  additionalBenefits?: string[];
  jobExpertise?: string[];
  skillLevel?: string;
  workCapacity?: string;
  accommodationNeeded?: boolean;
  timeAvailability?: string;
  requiredSalary?: string;
  additionalBenefits?: string[];
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
  requests: JobRequest[];
  status: 'open' | 'closed' | 'in_progress';
  createdAt: Date;
  farmerName: string;
  farmerPhone: string;
  farmerEmail?: string;
  images?: string[];
  urgencyLevel: string;
  workingHours: string;
  accommodationType: string;
  transportationProvided: boolean;
  skillLevel: string;
  physicalDemands: string;
  customJobType?: string;
}

export interface JobRequest {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerEmail?: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
  message?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'job_application' | 'request_accepted' | 'request_rejected' | 'new_job';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
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