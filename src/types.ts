export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  year: string;
  imageUrl: string;
  description: string;
  keyOutcome: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export interface ExperienceMilestone {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
}

export interface Award {
  year: string;
  title: string;
  institution: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
