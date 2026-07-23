import React from 'react';
import { cn } from '@/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'secondary';
  className?: string;
  onClick?: () => void;
}

/**
 * Badge Component
 * A small badge component for tags, skills, etc.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  onClick,
}) => {
  const variantClasses = {
    default: 'glass bg-surface/60 text-primary border-border',
    accent: 'glass bg-primary/20 text-primary border-primary/30',
    secondary: 'glass bg-secondary/20 text-secondary border-secondary/30',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        'transition-all duration-300 hover:scale-105',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
