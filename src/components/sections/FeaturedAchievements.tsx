import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section, AchievementCard, GlassButton, Modal } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * FeaturedAchievements Component
 * Displays top 3 featured achievements with "See All" modal
 */
export const FeaturedAchievements: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredAchievements = portfolioData.achievements.filter(
    (achievement) => achievement.featured
  );
  const otherAchievements = portfolioData.achievements.filter(
    (achievement) => !achievement.featured
  );

  return (
    <>
      <Section
        id="achievements"
        title="Achievements & Awards"
        subtitle="Recognition for excellence in competitions and projects"
      >
        {/* Featured Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredAchievements.map((achievement, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <AchievementCard achievement={achievement} />
            </div>
          ))}
        </div>

        {/* See All Button */}
        {otherAchievements.length > 0 && (
          <div className="text-center">
            <GlassButton
              variant="accent"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              See All Achievements
            </GlassButton>
          </div>
        )}

        {/* Alternative: Link to dedicated page */}
        <div className="text-center mt-4">
          <Link to="/achievements">
            <GlassButton variant="ghost" size="md">
              View Full Achievements Page
            </GlassButton>
          </Link>
        </div>
      </Section>

      {/* Modal with All Achievements */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Achievements"
        size="xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </Modal>
    </>
  );
};
