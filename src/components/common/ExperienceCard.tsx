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
      <div className="text-text-secondary mb-4 leading-relaxed whitespace-pre-line font-normal">
        {experience.description}
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
