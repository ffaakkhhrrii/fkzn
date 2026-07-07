import React from 'react';
import {
  PageTransition,
  Section,
  ProjectCard,
  GlassCard,
  GlassButton,
} from '@/components';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Projects Page
 * Showcase of personal projects and work
 */
const Projects: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <PageTransition>
      {/* Page Header */}
      <Section
        id="projects"
        title="My Projects"
        subtitle="A collection of personal projects and applications I've built"
      >
        {/* Projects Grid */}
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
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <GlassCard className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Interested in collaborating?
          </h3>
          <p className="text-lg text-secondary mb-6">
            I'm always open to discussing new projects and creative ideas. Let's build
            something amazing together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton variant="primary" size="lg">
                Check Out My Other Projects
              </GlassButton>
            </a>
          </div>
        </GlassCard>
      </Section>
    </PageTransition>
  );
};

export default Projects;
