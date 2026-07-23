import React from 'react';
import { cn } from '@/utils';
import { SectionProps } from '@/types';

/**
 * Section Component
 * A reusable section wrapper with optional title and subtitle
 */
export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  title,
  subtitle,
}) => {
  return (
    <section id={id} className={cn('section-container', className)}>
      {(title || subtitle) && (
        <div className="text-center mb-12 animate-fade-in">
          {title && (
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};
