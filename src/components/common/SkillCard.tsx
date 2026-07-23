import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

interface SkillCardProps {
  title: string;
  skills: string[];
}

/**
 * SkillCard Component
 * Displays a category of skills with typography-based hierarchy
 */
export const SkillCard: React.FC<SkillCardProps> = ({ title, skills }) => {
  return (
    <GlassCard hover className="h-full">
      <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="accent">
            {skill}
          </Badge>
        ))}
      </div>
    </GlassCard>
  );
};
