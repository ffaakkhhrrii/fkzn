import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

type Point = { x: number; y: number };

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { light: '#FAFAF8', dark: '#121311' };
const REVEAL_MS = 400;
const REVEAL_EASE = 'cubic-bezier(0.77, 0, 0.175, 1)'; // --ease-in-out

const readSaved = (): Theme | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

/**
 * Apply a theme to <html> with CSS transitions switched off, so every color
 * flips at once instead of some elements fading and others snapping.
 * Returns a function that turns transitions back on.
 */
const apply = (theme: Theme): (() => void) => {
  const root = document.documentElement;
  const freeze = document.createElement('style');
  freeze.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.appendChild(freeze);

  root.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);

  window.getComputedStyle(root).opacity; // force the style flush before transitions come back
  return () => freeze.remove();
};

/** Plain switch: transitions come back on the next frame. */
const applyInstant = (theme: Theme) => {
  const release = apply(theme);
  requestAnimationFrame(release);
};

/**
 * Light/dark theme. Follows the system until the visitor picks one; the pick is
 * remembered. The initial class is set by the inline script in index.html.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  // Keep following the system setting while the visitor hasn't chosen
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (readSaved()) return;
      const next = systemTheme();
      applyInstant(next);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /**
   * Switch theme. With View Transitions the new theme spreads out as a circle
   * from `origin` (the toggle's center, viewport px); with reduced motion it is a
   * short crossfade (see index.css); without support it switches instantly.
   */
  const toggle = useCallback(
    async (origin?: Point) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage blocked: the choice lasts for this visit only */
      }

      const doc = document as ViewTransitionDocument;
      if (!doc.startViewTransition) {
        applyInstant(next);
        setTheme(next);
        return;
      }

      let release = () => {};
      const transition = doc.startViewTransition(() => {
        release = apply(next);
        // Render the new icon now so it is part of the new snapshot
        flushSync(() => setTheme(next));
      });

      try {
        await transition.ready;
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const { x, y } = origin ?? { x: window.innerWidth / 2, y: 0 };
          const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: REVEAL_MS, easing: REVEAL_EASE, pseudoElement: '::view-transition-new(root)' }
          );
        }
        await transition.finished;
      } catch {
        /* transition skipped (e.g. tab hidden): the theme still changed */
      } finally {
        // Turn transitions back on only once nothing is animating
        release();
      }
    },
    [theme]
  );

  return { theme, toggle };
};
