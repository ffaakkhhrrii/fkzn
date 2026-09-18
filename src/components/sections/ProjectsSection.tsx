import React from 'react';
import { Section, ProjectCard, GlassButton } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * ProjectsSection Component
 * Showcase of personal projects
 */
export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="A collection of personal projects and applications I've built"
      className="bg-gradient-to-b from-transparent to-surface/40"
    >
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* External GitHub Projects CTA */}
      <div className="text-center mt-12">
        <GlassButton
          href="https://github.com/stars/ffaakkhhrrii/lists/personal-project"
          external
          variant="accent"
          size="lg"
          className="text-xs sm:text-sm font-mono"
        >
          Explore More Projects on GitHub →
        </GlassButton>
      </div>
    </Section>
  );
};
