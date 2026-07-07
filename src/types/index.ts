// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  profilePhoto: {
    path: string;
    alt: string;
  };
}

// Social Links Types
export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
}

// Skills Types
export interface Skills {
  programmingLanguages: string[];
  versionControl: string[];
  databases: string[];
  frameworks: string[];
  other?: string[];
}

// Experience Types
export interface Experience {
  position: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  technologies: string[];
}

// Education Types
export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa?: string;
  relevantCoursework?: string;
}

// Project Types
export interface Project {
  name: string;
  description: string;
  role: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  images: string[];
}

// Achievement Types
export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  featured?: boolean; // For homepage display
}

// SEO Types
export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  openGraphImage: string;
}

// Theme Types
export interface ThemeConfig {
  defaultTheme: 'light' | 'dark';
  enableThemeToggle: boolean;
}

// Complete Data Structure
export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  skills: Skills;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  seo: SEOConfig;
  theme: ThemeConfig;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  external?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  hover?: boolean;
}

export interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon?: React.ReactNode;
}
