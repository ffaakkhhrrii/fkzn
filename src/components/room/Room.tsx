import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio.data';
import { useTheme } from '@/hooks';
import { SunIcon, MoonIcon } from '@/components/common';
import { ROUTES, RouteId, inert, routeFromHash } from './routes';
import { Panel } from './Panel';
import './room.css';

// The drawing ships in its own chunk, so the name paints without waiting for it.
const DeskDiorama = lazy(() => import('@/components/hero/desk/DeskDiorama'));

// Matches DESK_META in desk/art.generated.ts; reserves the space so nothing jumps.
const DESK_RATIO = 1000 / 917;

// Pictures for the wall frame, in order; opening About shows the next one.
const FRAME_IMAGES = [
  '/assets/images/frame/cafe.png',
  '/assets/images/frame/bookshelf.png',
  '/assets/images/opt/profile-800.jpg',
  '/assets/images/frame/school.png',
  '/assets/images/frame/library.png',
];

/** Where each object sits, as fractions of the drawing's box (unaffected by the zoom). */
type Box = { x: number; y: number; w: number; h: number };

const WIDE = '(min-width: 1024px)';
const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Room
 * The whole site: Fakhri's desk. Five labelled objects each open a panel
 * (monitor = work, books = writing, trophy = awards, frame = about, mug = say hi).
 * Opening one zooms the desk toward it and lays the panel beside it; Back, Esc or
 * the desk button come back. Every panel is also a plain #link in the index under the desk.
 */
export const Room: React.FC = () => {
  const { personalInfo } = portfolioData;
  const { theme, toggle: toggleTheme } = useTheme();

  const [route, setRoute] = useState<RouteId | null>(() => routeFromHash(window.location.hash));
  const [boxes, setBoxes] = useState<Partial<Record<RouteId, Box>>>({});
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState('');

  const deskRoot = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<RouteId | null>(null);

  // ── routing: #work etc. Back and forward work; closing drops the hash ──
  const go = useCallback((next: RouteId | null) => {
    if (next) lastTrigger.current = next;
    const url = next ? `#${next}` : window.location.pathname + window.location.search;
    if ((next ? `#${next}` : '') !== window.location.hash) window.history.pushState(null, '', url);
    setRoute(next);
  }, []);

  useEffect(() => {
    const sync = () => setRoute(routeFromHash(window.location.hash));
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  useEffect(() => {
    if (!route) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') go(null);
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('room-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('room-open');
    };
  }, [route, go]);

  // Back on the desk: focus returns to the label that opened the panel.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!route && wasOpen.current && lastTrigger.current) {
      document.querySelector<HTMLElement>(`[data-callout="${lastTrigger.current}"]`)?.focus({ preventScroll: true });
    }
    wasOpen.current = !!route;
  }, [route]);

  // ── measuring the objects ──
  const measure = useCallback(() => {
    const root = deskRoot.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const s = stage.getBoundingClientRect();
    if (!s.width) return;
    const next: Partial<Record<RouteId, Box>> = {};
    for (const r of ROUTES) {
      const el = root.querySelector(r.anchor);
      if (!el) continue;
      const b = el.getBoundingClientRect();
      // ratios survive the stage's own zoom transform, which scales both boxes alike
      next[r.id] = { x: (b.left - s.left) / s.width, y: (b.top - s.top) / s.height, w: b.width / s.width, h: b.height / s.height };
    }
    setBoxes(next);
  }, []);

  const onReady = useCallback(
    (root: HTMLElement) => {
      deskRoot.current = root;
      root.addEventListener('desk:hover', (e) => setHovered((e as CustomEvent<string | null>).detail));
      measure();
      // labels sit on measured boxes: measure again once fonts and layout have settled
      document.fonts?.ready.then(() => requestAnimationFrame(measure));
    },
    [measure],
  );

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Label hover lifts its object; the open object stays marked.
  useEffect(() => {
    const root = deskRoot.current;
    if (!root) return;
    for (const r of ROUTES) {
      const g = root.querySelector(`[data-route="${r.id}"]`);
      g?.toggleAttribute('data-hover', hovered === r.id);
      g?.toggleAttribute('data-active', route === r.id);
    }
  }, [hovered, route, boxes]);

  // ── the zoom: move the open object into the space the panel leaves ──
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const box = route ? boxes[route] : undefined;
    if (!route || !box || !frame || still()) {
      setZoom('');
      return;
    }
    const f = frame.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const wide = window.matchMedia(WIDE).matches;
    const panelW = wide ? Math.min(Math.max(vw * 0.56, 600), 860) : 0;
    // the free area, in viewport pixels: left of the panel, or the strip above the sheet
    const area = wide ? { x: 0, y: 64, w: vw - panelW, h: vh - 64 } : { x: 0, y: 56, w: vw, h: vh * 0.3 - 56 };
    const cfg = ROUTES.find((r) => r.id === route)!;
    const ow = box.w * f.width;
    const oh = box.h * f.height;
    const scale = Math.max(1, Math.min(cfg.zoom, (area.w * 0.55) / ow, (area.h * 0.6) / oh));
    const cx = (box.x + box.w / 2) * f.width;
    const cy = (box.y + box.h / 2) * f.height;
    const tx = area.x + area.w / 2 - f.left - cx * scale;
    const ty = area.y + area.h / 2 - f.top - cy * scale;
    setZoom(`translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`);
  }, [route, boxes]);

  const open = (id: RouteId) => (e: React.MouseEvent) => {
    e.preventDefault();
    go(id);
  };

  return (
    <div className="room" data-open={route ? '' : undefined}>
      <a href="#desk-index" className="skip-link">
        Skip to the list of sections
      </a>

      <header className="room-bar">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            go(null);
          }}
          className="room-brand"
        >
          @fkhri.zain
        </a>
        <button
          type="button"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
          }}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="room-icon-btn"
        >
          {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>
      </header>

      <main className="room-scene" {...inert(!!route)}>
        <div className="room-intro">
          <h1 className="room-title">Hi, I'm {personalInfo.name}.</h1>
          <p className="room-bio">{personalInfo.shortBio}</p>
        </div>

        <div className="room-frame" ref={frameRef} style={{ aspectRatio: String(DESK_RATIO) }}>
          <div className="room-stage" ref={stageRef} style={{ transform: zoom || undefined }}>
            <Suspense fallback={null}>
              <DeskDiorama frameImages={FRAME_IMAGES} onOpen={(id) => go(id as RouteId)} onReady={onReady} className="animate-enter [animation-delay:120ms]" />
            </Suspense>

            <ul className="room-spots" aria-label="On the desk">
              {ROUTES.map((r, i) => {
                const b = boxes[r.id];
                if (!b) return null;
                return (
                  <li
                    key={r.id}
                    className="room-spot"
                    style={{ left: `${(b.x + b.w * r.at[0]) * 100}%`, top: `${(b.y + b.h * r.at[1]) * 100}%`, '--i': i } as React.CSSProperties}
                  >
                    <a
                      href={`#${r.id}`}
                      data-callout={r.id}
                      data-hover={hovered === r.id ? '' : undefined}
                      aria-current={route === r.id ? 'page' : undefined}
                      onClick={open(r.id)}
                      onPointerEnter={() => setHovered(r.id)}
                      onPointerLeave={() => setHovered(null)}
                      onFocus={() => setHovered(r.id)}
                      onBlur={() => setHovered(null)}
                      tabIndex={route ? -1 : undefined}
                    >
                      <span className="room-spot-dot" aria-hidden="true" />
                      <span className="room-spot-label">{r.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <nav id="desk-index" className="room-index" aria-label="Sections">
          <ul>
            {ROUTES.map((r) => (
              <li key={r.id}>
                <a href={`#${r.id}`} onClick={open(r.id)} aria-current={route === r.id ? 'page' : undefined}>
                  <span className="room-index-label">{r.label}</span>
                  <span className="room-index-holds">{r.holds}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <Panel route={route} onClose={() => go(null)} onGo={go} />
    </div>
  );
};
