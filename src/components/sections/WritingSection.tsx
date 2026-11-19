import React from 'react';
import { Section, WritingCard, ArrowLink } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Writing
 * What I wrote after finishing an anime or film, newest first. Posts live on Medium.
 */
export const WritingSection: React.FC = () => {
  const items = [...portfolioData.writing].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  if (items.length === 0) return null;

  return (
    <Section
      id="writing"
      title="Writing"
      subtitle="Thoughts on what I watch, read, and build."
      className="bg-card"
    >
      <ul className="divide-y divide-border border-y border-border">
        {items.map((w) => (
          <WritingCard key={w.url} writing={w} />
        ))}
      </ul>

      <ArrowLink href="https://medium.com/@fkzn" className="mt-10">
        Read more on Medium
      </ArrowLink>
    </Section>
  );
};
