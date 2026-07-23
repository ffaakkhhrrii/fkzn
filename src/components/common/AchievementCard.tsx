import React from 'react';
import { GlassCard } from './GlassCard';
import { AwardIcon } from './Icons';
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
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="glass rounded-full p-3 text-primary flex-shrink-0 animate-glow">
          <AwardIcon size={24} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
            {achievement.title}
          </h3>

          <p className="text-secondary font-medium mb-2">
            {achievement.organization}
          </p>

          <p className="text-sm text-text-secondary mb-3">
            {formatDate(achievement.date)}
          </p>

          <p className="text-text-secondary leading-relaxed">
            {achievement.description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
