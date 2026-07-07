import React from 'react';
import { cn } from '@/utils';
import { CardProps } from '@/types';

/**
 * GlassCard Component
 * A card component with glassmorphism effect
 * Supports three variants: default, strong, and subtle
 */
export const GlassCard: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
}) => {
  const variantClasses = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'glass-subtle',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-all duration-300',
        variantClasses[variant],
        hover && 'card-hover hover-glow cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};
