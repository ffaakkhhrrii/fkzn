import React from 'react';
import { Achievement } from '@/types';
import { formatDate } from '@/utils';

interface AchievementCardProps {
  achievement: Achievement;
}

/**
 * AchievementCard
 * One row of the awards list: date, title, organiser.
 */
export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <li className="grid grid-cols-1 gap-1 py-5 md:grid-cols-12 md:gap-8">
      <p className="text-sm font-medium text-text-light md:col-span-2 md:pt-0.5">
        {formatDate(achievement.date)}
      </p>
      <h3 className="text-xl font-bold leading-snug md:col-span-6">
        {achievement.title}
      </h3>
      <p className="text-sm text-secondary md:col-span-4 md:pt-0.5">{achievement.organization}</p>
    </li>
  );
};
