import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';
import { SkillCategoryProps } from '@/types';

/**
 * SkillCard Component
 * Displays a category of skills with an optional icon
 */
export const SkillCard: React.FC<SkillCategoryProps> = ({
  title,
  skills,
  icon,
}) => {
  return (
    <GlassCard hover className="h-full">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
      </div>
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
