import React from 'react';
import { cn } from '@/utils';
import { ButtonProps } from '@/types';

/**
 * GlassButton Component
 * A button component with glassmorphism effect
 * Supports multiple variants and sizes
 */
export const GlassButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  href,
  external = false,
}) => {
  const baseClasses = cn(
    'glass rounded-lg font-medium transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'hover-glow'
  );

  const variantClasses = {
    primary: 'bg-primary/20 text-white hover:bg-primary/30 border-primary/30',
    secondary: 'bg-secondary/20 text-white hover:bg-secondary/30 border-secondary/30',
    accent: 'bg-accent/20 text-white hover:bg-accent/30 border-accent/30',
    ghost: 'bg-transparent text-white hover:bg-white/10 border-transparent',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // If href is provided, render as anchor tag
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // Otherwise, render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};
