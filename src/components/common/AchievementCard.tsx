import React from 'react';
import { GlassCard } from './GlassCard';
import { Achievement } from '@/types';
import { formatDate } from '@/utils';

interface AchievementCardProps {
  achievement: Achievement;
}

/**
 * AchievementCard Component
 * Displays an achievement with title, organization, date, and description
 */
export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <GlassCard hover className="h-full">
      <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
        {achievement.title}
      </h3>

      <p className="text-secondary font-semibold mb-2">
        {achievement.organization}
      </p>

      <p className="text-sm text-text-secondary mb-3 font-normal">
        {formatDate(achievement.date)}
      </p>

      <p className="text-text-secondary leading-relaxed font-normal">
        {achievement.description}
      </p>
    </GlassCard>
  );
};
