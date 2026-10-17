export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  social: { github: string; linkedin: string };
  sourceRepo: string;
  resumePath: string;
  stats: { label: string; value: number; suffix?: string; prefix?: string }[];
}
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  techStack: string[];
  highlights: string[];
  links: { live?: string; github?: string };
  images: string[];
  featured: boolean;
  accentColor: string;
}
export interface SkillGroup { category: string; items: string[] }
export interface ExperienceItem {
  role: string; company: string; location: string; startDate: string; endDate: string; bullets: string[];
}
export interface EducationItem { degree: string; institution: string; location: string; year: string; result: string }
export interface Certification { name: string; issuer: string; year: string }
