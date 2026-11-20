import React, { useRef } from 'react';
import { useDrawOnce } from '@/hooks';
import { Section, ExperienceCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Experience
 * Work history, newest first, on a timeline. When the Work panel opens, the line
 * draws itself once from top to bottom and each role's dot lights as it passes
 * (see useDrawOnce).
 */
export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;
  const line = useRef<HTMLDivElement>(null);
  useDrawOnce(line);

  return (
    <Section id="experience" title="Work Experience" subtitle="My professional journey and key contributions">
      <div ref={line} className="xp-line">
        <svg className="xp-track" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="xp-track-base" d="M1 0V100" />
          <path className="xp-track-draw" d="M1 0V100" pathLength={1} />
        </svg>
        <div className="space-y-14">
          {experience.map((exp) => (
            <div key={`${exp.position}-${exp.duration}`} className="xp-item" data-xp-item>
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
