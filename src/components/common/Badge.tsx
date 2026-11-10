import React from 'react';
import { cn } from '@/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'secondary';
  className?: string;
}

/**
 * Badge
 * Small flat tag for technologies.
 */
export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-surface text-secondary-dark',
    accent: 'bg-accent-light text-accent-dark',
    secondary: 'bg-white text-secondary border border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-1 text-xs font-medium leading-none',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
