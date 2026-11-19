import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once, the first time it scrolls into view.
 * Elements already scrolled past (e.g. after a reload mid-page) reveal immediately,
 * so nothing stays hidden above the viewport.
 */
export const useReveal = <T extends Element>(rootMargin = '0px 0px -10% 0px') => {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    if (!('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed, rootMargin]);

  return { ref, revealed };
};
