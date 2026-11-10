import React from 'react';
import { Section, ExperienceCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Experience
 * Work history as a plain list, newest first.
 */
export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="My professional journey and key contributions"
      className="bg-white"
    >
      <div className="space-y-16">
        {experience.map((exp) => (
          <ExperienceCard key={`${exp.position}-${exp.duration}`} experience={exp} />
        ))}
      </div>
    </Section>
  );
};
