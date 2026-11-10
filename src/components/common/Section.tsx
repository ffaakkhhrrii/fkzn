import React from 'react';
import { cn } from '@/utils';
import { SectionProps } from '@/types';

/**
 * Section
 * One container (.wrap), heading set left. `subtitle` is optional and should
 * carry a fact, not a slogan.
 */
export const Section: React.FC<SectionProps> = ({ children, id, className = '', title, subtitle }) => {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="wrap">
        {(title || subtitle) && (
          <div className="mb-10 md:mb-14 max-w-3xl">
            {title && (
              <h2 className="text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl font-bold">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base md:text-lg leading-relaxed text-secondary">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
