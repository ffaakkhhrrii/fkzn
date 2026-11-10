import React from 'react';
import { Section } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Communities
 * Mentoring and organisation roles, three columns on desktop.
 */
export const CommunitiesSection: React.FC = () => {
  const { communities } = portfolioData;
  if (!communities || communities.length === 0) return null;

  return (
    <Section
      id="communities"
      title="Communities"
      subtitle="From the community, for the community"
      className="bg-white"
    >
      <ul className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
        {communities.map((item) => (
          <li key={item.role} className="border-t-2 border-accent pt-5">
            <p className="text-sm font-semibold text-text-light">{item.duration}</p>
            <h3 className="mt-2 text-xl font-bold leading-snug">{item.role}</h3>
            {item.organization && <p className="mt-1 text-sm text-secondary">{item.organization}</p>}
            <p className="mt-3 text-base leading-relaxed text-secondary">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};
