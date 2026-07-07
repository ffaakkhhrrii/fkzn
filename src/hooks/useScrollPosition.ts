import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * Useful for navbar transparency effects and scroll-based animations
 */
export const useScrollPosition = (): number => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
};
