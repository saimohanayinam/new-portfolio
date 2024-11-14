export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  title: string;
  bio: string;
  phone: string;
  location: string;
  company: string;
  website: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  languages: string[];
  certifications: Certification[];
  interests: string[];
  availability: 'full-time' | 'part-time' | 'freelance' | 'not-available';
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube: string;
  };
  createdAt?: any;
  updatedAt?: any;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: any;
  createdAt?: any;
  updatedAt?: any;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  status: 'in-progress' | 'completed' | 'archived';
  startDate: string;
  endDate?: string;
  createdAt?: any;
  updatedAt?: any;
}