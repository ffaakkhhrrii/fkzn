import React, { useState, useEffect } from 'react';
import { cn } from '@/utils';
import { useScrollPosition } from '@/hooks';
import { ChevronDownIcon } from '@/components/common';

/**
 * ScrollToTop Component
 * Floating button that appears when user scrolls down
 * Smoothly scrolls back to top when clicked
 */
export const ScrollToTop: React.FC = () => {
  const scrollY = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when user scrolls down 300px
    setIsVisible(scrollY > 300);
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50',
        'glass-strong rounded-full p-4',
        'text-primary hover:text-secondary',
        'transition-all duration-300 hover-glow',
        'transform rotate-180',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-10 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ChevronDownIcon size={24} />
    </button>
  );
};
