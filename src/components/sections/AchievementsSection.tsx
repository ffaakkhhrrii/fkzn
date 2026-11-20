import React, { useLayoutEffect, useRef, useState } from 'react';
import { Section } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';
import { formatDate } from '@/utils';
import { Achievement } from '@/types';

// "Jun 2024" -> 202405 (parsed by hand: Safari rejects new Date("Jun 2024"))
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const sortKey = (date: string) => {
  const [mon, year] = date.trim().split(/\s+/);
  return Number(year) * 100 + Math.max(0, MONTHS.indexOf(mon.slice(0, 3).toLowerCase()));
};

// Path geometry, in px inside the list.
const EDGE = 10; // node centre from the side
const SWING = 30; // half the height of the S-curve that crosses each gap
const NODE_Y = 12; // node centre below the top of its entry (on the date line)
const READING = 0.6; // the line's tip follows a point 60% down the visible panel

type Geometry = { w: number; h: number; d: string; nodes: { x: number; y: number; len: number }[]; total: number };

type Pt = [number, number];
/** Length of a cubic Bézier, by sampling (plenty for thresholds). */
const cubicLength = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, steps = 32) => {
  let len = 0;
  let prev = p0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const pt: Pt = [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ];
    len += Math.hypot(pt[0] - prev[0], pt[1] - prev[1]);
    prev = pt;
  }
  return len;
};

/** A path that winds between the entries: down one side, a smooth S across the gap,
 *  down the other side. The S stays inside the gap, so it never crosses any text. */
function buildPath(list: HTMLElement): Geometry | null {
  const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-row]'));
  if (!rows.length) return null;
  const w = list.clientWidth;
  const h = list.scrollHeight;
  const xs = (i: number) => (i % 2 === 0 ? EDGE : w - EDGE);
  const nodes = rows.map((row, i) => ({ x: xs(i), y: row.offsetTop + NODE_Y, len: 0 }));

  let d = `M${nodes[0].x} ${nodes[0].y}`;
  let len = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const gap = (rows[i].offsetTop + rows[i].offsetHeight + rows[i + 1].offsetTop) / 2;
    const from: Pt = [a.x, gap - SWING];
    const to: Pt = [b.x, gap + SWING];
    // controls pulled level with the gap's centre: leaves the side heading down, sweeps
    // across, and lands heading down again
    const c1: Pt = [a.x, gap + SWING * 0.2];
    const c2: Pt = [b.x, gap - SWING * 0.2];
    d += `V${from[1]}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${to[0]} ${to[1]}V${b.y}`;
    len += from[1] - a.y + cubicLength(from, c1, c2, to) + (b.y - to[1]);
    b.len = len;
  }
  return { w, h, d, nodes, total: Math.max(len, 1) };
}

/**
 * Achievements
 * Every award, newest first, on one winding line: entries alternate left and right and
 * the line runs down one side, across, and down the other. As the panel scrolls the line
 * draws itself up to the reading point and each award lights when the line reaches it.
 * Reduced motion shows the finished line.
 */
export const AchievementsSection: React.FC = () => {
  const items = [...portfolioData.achievements].sort((a, b) => sortKey(b.date) - sortKey(a.date));
  const list = useRef<HTMLOListElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  // measure the entries and lay the path through them
  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => setGeo(buildPath(el));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // draw it to the reading point as the panel scrolls
  useLayoutEffect(() => {
    const el = list.current;
    if (!el || !geo) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>('[data-row]'));
    const dots = Array.from(el.querySelectorAll<SVGCircleElement>('[data-node]'));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scroller = el.closest<HTMLElement>('.room-panel-body');

    let frame = 0;
    const paint = () => {
      frame = 0;
      let len = geo.total;
      const atEnd = scroller ? scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2 : false;
      if (!still.matches && !atEnd) {
        const view = scroller ? scroller.getBoundingClientRect() : { top: 0, height: window.innerHeight };
        const y = view.top + view.height * READING - el.getBoundingClientRect().top;
        const { nodes } = geo;
        if (y <= nodes[0].y) len = 0;
        else if (y >= nodes[nodes.length - 1].y) len = geo.total;
        else {
          const i = nodes.findIndex((n, k) => y >= n.y && y < nodes[k + 1].y);
          const a = nodes[i];
          const b = nodes[i + 1];
          len = a.len + ((y - a.y) / (b.y - a.y)) * (b.len - a.len);
        }
      }
      el.style.setProperty('--xp', (len / geo.total).toFixed(4));
      geo.nodes.forEach((n, i) => {
        const lit = len >= n.len - 0.5;
        rows[i]?.toggleAttribute('data-lit', lit);
        dots[i]?.toggleAttribute('data-lit', lit);
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    const settle = window.setTimeout(queue, 650); // after the panel has slid in
    const target: HTMLElement | Window = scroller ?? window;
    target.addEventListener('scroll', queue, { passive: true });
    still.addEventListener('change', queue);
    return () => {
      target.removeEventListener('scroll', queue);
      still.removeEventListener('change', queue);
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [geo]);

  return (
    <Section id="achievements" title="Achievements & Awards" subtitle="Recognition for excellence in competitions and projects">
      <ol ref={list} className="aw-path">
        {geo && (
          <svg className="aw-line" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
            <path className="aw-line-base" d={geo.d} />
            <path className="aw-line-draw" d={geo.d} pathLength={1} />
            {geo.nodes.map((n) => (
              <circle key={`${n.x}-${n.y}`} data-node className="aw-node" cx={n.x} cy={n.y} r="6" />
            ))}
          </svg>
        )}
        {items.map((a: Achievement, i) => (
          <li key={a.title} data-row className="aw-row" data-side={i % 2 === 0 ? 'left' : 'right'}>
            <p className="text-sm text-text-light">{formatDate(a.date)}</p>
            <h3 className="mt-1 text-lg font-bold leading-snug">{a.title}</h3>
            <p className="mt-1 text-sm text-secondary">{a.organization}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
};
