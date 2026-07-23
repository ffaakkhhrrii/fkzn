import React, { useState } from 'react';
import { Section, AchievementCard, GlassButton, Badge } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * AchievementsSection Component
 * Complete list of achievements, awards, and recognitions
 */
export const AchievementsSection: React.FC = () => {
  const { achievements } = portfolioData;
  const [showAll, setShowAll] = useState(false);

  const featuredAchievements = achievements.filter((a) => a.featured);
  const otherAchievements = achievements.filter((a) => !a.featured);
  const displayedAchievements = showAll ? achievements : featuredAchievements;

  return (
    <Section
      id="achievements"
      title="Achievements & Awards"
      subtitle="Recognition for excellence in competitions and projects"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in">
        <div className="glass rounded-lg p-6 text-center">
          <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
            {achievements.length}
          </div>
          <div className="text-secondary font-normal">Total Awards</div>
        </div>

        <div className="glass rounded-lg p-6 text-center">
          <div className="text-4xl md:text-5xl font-bold text-accent mb-2">3</div>
          <div className="text-secondary font-normal">1st Place Wins</div>
        </div>

        <div className="glass rounded-lg p-6 text-center">
          <div className="text-4xl md:text-5xl font-bold text-accent mb-2">2</div>
          <div className="text-secondary font-normal">Provincial Level</div>
        </div>

        <div className="glass rounded-lg p-6 text-center">
          <div className="text-4xl md:text-5xl font-bold text-accent mb-2">4</div>
          <div className="text-secondary font-normal">Regional Level</div>
        </div>
      </div>

      {/* Featured Badge */}
      <div className="mb-8 text-center animate-slide-up">
        <Badge variant="accent" className="text-base px-6 py-2">
          {showAll ? 'All Achievements' : 'Featured Achievements'}
        </Badge>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedAchievements.map((achievement, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <AchievementCard achievement={achievement} />
          </div>
        ))}
      </div>

      {/* Show More/Less */}
      {otherAchievements.length > 0 && (
        <div className="text-center">
          <GlassButton
            variant="accent"
            size="lg"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? 'Show Featured Only'
              : `Show All Achievements (${achievements.length})`}
          </GlassButton>
        </div>
      )}
    </Section>
  );
};
