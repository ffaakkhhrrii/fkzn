import React from 'react';
import { cn } from '@/utils';
import { ButtonProps } from '@/types';

/**
 * Button
 * primary / accent: solid green (the one main action per screen)
 * secondary: outline
 * ghost: text only
 * Every size is at least 44px tall for touch.
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
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap',
    'transition-[transform,background-color,border-color,color] duration-150 ease-out',
    'hover:-translate-y-px active:translate-y-0 active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
  );

  const solid = 'bg-accent text-white border border-accent hover:bg-accent-dark hover:border-accent-dark';
  const variantClasses = {
    primary: solid,
    accent: solid,
    secondary: 'bg-white text-primary border border-border-dark hover:border-primary',
    ghost: 'bg-transparent text-primary border border-transparent hover:bg-surface',
  };

  const sizeClasses = {
    sm: 'min-h-[44px] px-4 text-sm',
    md: 'min-h-[48px] px-5 text-[15px]',
    lg: 'min-h-[52px] px-6 text-base',
  };

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

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

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};
