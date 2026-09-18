import React from 'react';
import { Section, GlassCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * CommunitiesSection Component
 * 2-Column Bento Grid showcase for organizations and community contributions
 */
export const CommunitiesSection: React.FC = () => {
  const { communities } = portfolioData;

  if (!communities || communities.length === 0) return null;

  return (
    <Section
      id="communities"
      title="Communities"
      subtitle="From the community, for the community"
      className="bg-gradient-to-b from-transparent to-surface/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-6xl mx-auto">
        {communities.map((item, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <GlassCard hover className="h-full p-6 sm:p-7 border border-border/80 flex flex-col justify-between">
              <div>
                {/* Header with Duration Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs uppercase tracking-wider font-mono text-secondary font-medium">
                    Mentorship & Community
                  </span>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-[4px] bg-primary/10 text-primary border border-primary/20 shrink-0">
                    {item.duration}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-primary tracking-tight mb-1.5">
                  {item.role}
                </h3>

                {/* Organization if exists */}
                {item.organization && (
                  <p className="text-sm font-medium text-secondary mb-4">
                    {item.organization}
                  </p>
                )}

                {/* Contribution Description */}
                <div className="pt-3 border-t border-border/70 flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                  <span className="text-primary font-bold text-xs mt-0.5 select-none shrink-0">
                    ▹
                  </span>
                  <span>{item.description}</span>
                </div>
              </div>

              {/* Card Footer Accent */}
              <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block" />
                  Knowledge Sharing
                </span>
                <span>Active Contribution</span>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </Section>
  );
};
