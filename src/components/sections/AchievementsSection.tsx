import React from 'react';
import { Section, AchievementCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Achievements
 * Every award, newest first.
 */
export const AchievementsSection: React.FC = () => {
  // "Jun 2024" -> 202405 (parsed by hand: Safari rejects new Date("Jun 2024"))
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const sortKey = (date: string) => {
    const [mon, year] = date.trim().split(/\s+/);
    return Number(year) * 100 + Math.max(0, months.indexOf(mon.slice(0, 3).toLowerCase()));
  };
  const achievements = [...portfolioData.achievements].sort((a, b) => sortKey(b.date) - sortKey(a.date));

  return (
    <Section
      id="achievements"
      title="Achievements & Awards"
      subtitle="Recognition for excellence in competitions and projects"
    >
      <ul className="divide-y divide-border border-y border-border">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.title} achievement={achievement} />
        ))}
      </ul>
    </Section>
  );
};
