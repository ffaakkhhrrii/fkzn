import React from 'react';
import { Section, ProjectFeature, ProjectRow, ArrowLink } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';
import { useReveal } from '@/hooks';
import { cn } from '@/utils';

// Uneven gaps read as natural; later rows cap at the last value
const staggerMs = [0, 60, 110, 150, 180, 200];

/**
 * Projects
 * The lead project with its picture, then the rest as an index: one row each.
 */
export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const lead = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== lead);
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="Side projects and competition builds, on Android, Flutter and the web."
    >
      <div ref={ref} className={cn('reveal-scope', revealed && 'is-revealed')}>
        <div className="reveal">
          <ProjectFeature project={lead} />
        </div>

        <ul className="mt-14 border-t border-primary">
          {rest.map((project, i) => (
            <li
              key={project.name}
              className="reveal border-b border-border"
              style={{ '--reveal-delay': `${staggerMs[Math.min(i + 1, staggerMs.length - 1)]}ms` } as React.CSSProperties}
            >
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      </div>

      <ArrowLink href="https://github.com/stars/ffaakkhhrrii/lists/personal-project" className="mt-10">
        Explore More Projects on GitHub
      </ArrowLink>
    </Section>
  );
};
