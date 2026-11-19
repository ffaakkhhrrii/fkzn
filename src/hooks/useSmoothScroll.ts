import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Smooth wheel scrolling with Lenis. Light setting so it glides without
 * feeling floaty. Touch devices keep native scrolling (Lenis default), and
 * people who ask for reduced motion get native scrolling too.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      autoRaf: true,
      // In-page #links glide too; offset matches scroll-padding-top (5rem) for the fixed header
      anchors: { offset: -80 },
    });

    return () => lenis.destroy();
  }, []);
};
