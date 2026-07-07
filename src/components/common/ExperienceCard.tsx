import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';
import { BriefcaseIcon } from './Icons';
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
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="glass rounded-full p-3 text-primary flex-shrink-0">
          <BriefcaseIcon size={24} />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Position & Company */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            {experience.position}
          </h3>
          <p className="text-lg text-secondary font-medium mb-2">
            {experience.company}
          </p>

          {/* Location & Duration */}
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4">
            <span>{experience.location}</span>
            <span>•</span>
            <span>{experience.duration}</span>
          </div>

          {/* Description */}
          <div className="text-text-secondary mb-4 leading-relaxed whitespace-pre-line">
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
        </div>
      </div>
    </GlassCard>
  );
};
