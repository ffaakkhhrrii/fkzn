import React from 'react';
import { cn } from '@/utils';

interface ArrowLinkProps {
  children: React.ReactNode;
  /** External URL (opens in a new tab) or an in-page "#anchor" */
  href: string;
  className?: string;
}

/**
 * ArrowLink
 * Text link with a trailing arrow that nudges 3px on hover/focus.
 */
export const ArrowLink: React.FC<ArrowLinkProps> = ({ children, href, className = '' }) => {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn('group text-link inline-flex min-h-[44px] items-center gap-1', className)}
    >
      {children}{' '}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-[160ms] ease-[var(--ease-out)] group-focus-visible:translate-x-[3px] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-[3px]"
      >
        →
      </span>
    </a>
  );
};
