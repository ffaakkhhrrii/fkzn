import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

/**
 * ExperienceCard Component
 * Displays work experience in a modern vertical editorial timeline format
 */
export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const lines = experience.description.split('\n').filter(Boolean);
  const intro = lines.filter((line) => !line.startsWith('•'));
  const bullets = lines
    .filter((line) => line.startsWith('•'))
    .map((line) => line.replace(/^•\s*/, ''));

  return (
    <div className="relative pl-9 sm:pl-12">
      {/* Node status on timeline spine */}
      <div className="absolute left-0 top-3 z-10">
        <div className="w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>

      <GlassCard hover className="p-6 sm:p-7 border border-border/80">
        {/* Header with Title, Company & Duration */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              {experience.position}
            </h3>
            <p className="text-base text-secondary font-medium mt-0.5">
              {experience.company}
            </p>
          </div>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-[4px] bg-primary/10 text-primary border border-primary/20 w-fit shrink-0">
            {experience.duration}
          </span>
        </div>

        {/* Location */}
        <div className="text-xs text-secondary font-mono mb-4">
          {experience.location}
        </div>

        {/* Description & Responsibilities */}
        <div className="text-text-secondary mb-5 leading-relaxed text-sm md:text-base font-normal space-y-2">
          {intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {bullets.length > 0 && (
            <ul className="space-y-2 mt-3 pt-3 border-t border-border/70">
              {bullets.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-secondary">
                  <span className="text-primary font-bold text-xs mt-0.5 select-none">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/70">
          {experience.technologies.map((tech, index) => (
            <Badge key={index} variant="default" className="text-xs font-mono">
              {tech}
            </Badge>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
