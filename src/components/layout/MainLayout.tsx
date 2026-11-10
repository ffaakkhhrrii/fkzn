import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  AchievementsSection,
  CommunitiesSection,
  ProjectsSection,
  ContactSection,
} from '@/components/sections';

/**
 * MainLayout
 * Order: the person first, then experience and proof, then the work, then contact.
 */
export const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />

      <main id="main" className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <AchievementsSection />
        <CommunitiesSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};
