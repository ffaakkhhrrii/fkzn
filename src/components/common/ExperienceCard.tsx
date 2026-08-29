import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

/**
 * ExperienceCard Component
 * Displays work experience with company, role, duration, and technologies
 */
export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const lines = experience.description.split('\n').filter(Boolean);
  const intro = lines.filter((line) => !line.startsWith('•'));
  const bullets = lines
    .filter((line) => line.startsWith('•'))
    .map((line) => line.replace(/^•\s*/, ''));

  return (
    <GlassCard hover className="h-full">
      {/* Position & Company */}
      <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
        {experience.position}
      </h3>
      <p className="text-lg text-secondary font-semibold mb-2">
        {experience.company}
      </p>

      {/* Location & Duration */}
      <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4 font-normal">
        <span>{experience.location}</span>
        <span aria-hidden="true">•</span>
        <span>{experience.duration}</span>
      </div>

      {/* Description */}
      <div className="text-text-secondary mb-4 leading-relaxed font-normal">
        {intro.map((paragraph, index) => (
          <p key={index} className="mb-2 last:mb-0">
            {paragraph}
          </p>
        ))}
        {bullets.length > 0 && (
          <ul className="list-disc pl-5 space-y-1 mt-2">
            {bullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech, index) => (
          <Badge key={index} variant="accent">
            {tech}
          </Badge>
        ))}
      </div>
    </GlassCard>
  );
};
