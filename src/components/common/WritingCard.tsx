import React from 'react';
import { Writing } from '@/types';

interface WritingCardProps {
  writing: Writing;
}

const formatPublished = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * WritingCard
 * One journal entry: what was watched on the left, the piece on the right.
 * The whole title links to Medium.
 */
export const WritingCard: React.FC<WritingCardProps> = ({ writing }) => {
  return (
    <li className="group relative grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <p className="text-sm font-semibold text-accent">{writing.kind}</p>
        <p className="mt-1 text-sm font-medium text-primary">{writing.subject}</p>
        <p className="mt-1 text-sm text-text-light">
          <time dateTime={writing.publishedAt}>{formatPublished(writing.publishedAt)}</time>
        </p>
      </div>

      <div className="md:col-span-9">
        <h3 className="text-2xl font-bold leading-snug">
          <a
            href={writing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 after:absolute after:inset-0 after:content-['']"
          >
            {writing.title}
          </a>
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-secondary">{writing.excerpt}</p>
        <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
          Read on Medium
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-[160ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-[3px]"
          >
            ↗
          </span>
        </p>
      </div>
    </li>
  );
};
