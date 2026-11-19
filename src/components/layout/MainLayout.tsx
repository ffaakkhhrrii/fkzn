import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useSmoothScroll } from '@/hooks';
import { Hero } from '@/components/hero/Hero';
import {
  AboutSection,
  ExperienceSection,
  AchievementsSection,
  CommunitiesSection,
  ProjectsSection,
  WritingSection,
  ContactSection,
} from '@/components/sections';

/**
 * MainLayout
 * Order: the person first, then experience and proof, then the work and writing, then contact.
 */
export const MainLayout: React.FC = () => {
  useSmoothScroll();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <AchievementsSection />
        <CommunitiesSection />
        <ProjectsSection />
        <WritingSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};
