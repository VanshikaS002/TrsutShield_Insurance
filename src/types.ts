export interface Insurance {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits?: string[];
  priceRange?: string;
}

export interface Inquiry {
  id?: string;
  userName: string;
  userEmail: string;
  insuranceType: string;
  message?: string;
  createdAt: any; // Timestamp
  status: 'new' | 'contacted' | 'closed';
}

export interface AnalyticsData {
  date: string;
  pageViews: number;
  totalInquiries: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
  idProof?: string;
  address?: string;
  gender?: 'Male' | 'Female' | 'Other';
  height?: number;
  weight?: number;
  age?: number;
  dob?: string;
  qualification?: string;
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  occupationalDetails?: string;
  annualIncome?: number;
  medicalHistory?: string;
  displayName?: string;
}

export interface Policy {
  id?: string;
  name: string;
  category: string;
  description: string;
  benefits: string;
  eligibility: string;
  riskFactors: string;
  keyFeatures: string;
  youtubeLink?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  link?: string;
}
