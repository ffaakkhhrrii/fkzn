import React from 'react';
import { cn } from '@/utils';
import { CardProps } from '@/types';

/**
 * Card
 * Flat white panel with a thin border. `hover` adds the 2px lift for cards that
 * hold a link.
 */
export const GlassCard: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-white p-6',
        hover &&
          'transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-dark hover:shadow-[0_12px_24px_-12px_rgba(28,28,26,0.18)]',
        className
      )}
    >
      {children}
    </div>
  );
};
