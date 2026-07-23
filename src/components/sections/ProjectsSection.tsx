import React from 'react';
import { Section, ProjectCard, GlassButton } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * ProjectsSection Component
 * Showcase of all personal projects
 */
export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="A collection of personal projects and applications I've built"
      className="bg-gradient-to-b from-transparent to-white/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <GlassButton
          href="https://github.com/stars/ffaakkhhrrii/lists/personal-project"
          external
          variant="accent"
          size="lg"
        >
          See more of my personal projects
        </GlassButton>
      </div>
    </Section>
  );
};
