import React from 'react';
import { Section, ProjectCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Projects
 * The lead project large, the rest in one row.
 */
export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const lead = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== lead);

  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="A collection of personal projects and applications I've built"
    >
      <ProjectCard project={lead} featured />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {rest.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <a
        href="https://github.com/stars/ffaakkhhrrii/lists/personal-project"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link mt-10 inline-flex min-h-[44px] items-center gap-1"
      >
        Explore More Projects on GitHub <span aria-hidden="true">→</span>
      </a>
    </Section>
  );
};
