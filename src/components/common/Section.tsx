import React from 'react';
import { cn } from '@/utils';
import { SectionProps } from '@/types';
import { useReveal } from '@/hooks';

/**
 * Section
 * One container (.wrap), heading set left. `subtitle` is optional and should
 * carry a fact, not a slogan.
 */
export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  title,
  subtitle,
}) => {
  // Only the heading animates in; the section's content is visible right away.
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="wrap">
        {(title || subtitle) && (
          <div
            ref={ref}
            className={cn('reveal-scope mb-10 md:mb-14 max-w-3xl', revealed && 'is-revealed')}
            style={{ '--reveal-y': '8px' } as React.CSSProperties}
          >
            {title && (
              <h2 className="reveal text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl font-bold">{title}</h2>
            )}
            {subtitle && (
              <p
                className="reveal mt-4 text-base md:text-lg leading-relaxed text-secondary"
                style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
