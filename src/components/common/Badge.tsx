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
    default: 'glass bg-surface/80 text-primary border-border hover:border-primary/30',
    accent: 'glass bg-primary/10 text-primary border-primary/25 hover:border-primary/50',
    secondary: 'glass bg-secondary/10 text-secondary border-secondary/25 hover:border-secondary/50',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-[4px] text-xs md:text-sm font-medium',
        'transition-all duration-200',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
