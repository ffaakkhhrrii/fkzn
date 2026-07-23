import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  AchievementsSection,
} from '@/components/sections';

/**
 * MainLayout Component
 * Single-page layout with all sections rendered inline
 */
export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16 md:pt-20">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
      </main>

      <Footer />
    </div>
  );
};
