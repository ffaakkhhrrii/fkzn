import { RefObject, useEffect } from 'react';

// The line starts once the panel has slid in, then draws itself in one go.
const DELAY_MS = 520;
const DRAW_MS = 900;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * useDrawOnce
 * Drives a one-time "draw the line" moment when a part of the desk opens: sets
 * `--xp` (0..1) on the element for an SVG path's stroke-dashoffset, and marks each
 * `[data-xp-item]` with `data-lit` once the line reaches it. An item's threshold is its
 * `data-at` (0..1) when given, otherwise its vertical position in the element.
 * Reduced motion shows the finished line at once.
 */
export const useDrawOnce = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-xp-item]'));

    const paint = (p: number) => {
      el.style.setProperty('--xp', p.toFixed(4));
      for (const item of items) {
        const at = item.dataset.at ? Number(item.dataset.at) : (item.offsetTop + 8) / el.offsetHeight;
        item.toggleAttribute('data-lit', p >= at - 0.001);
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(1);
      return;
    }

    paint(0);
    let frame = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / DRAW_MS);
      paint(easeOut(t));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
};
