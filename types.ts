export interface Project {
  id: string;
  title: string;
  period: string;
  description: string[];
  technologies: string[];
  link?: string;
  image?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  period: string;
  link?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
