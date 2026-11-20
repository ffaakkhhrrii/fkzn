import type React from 'react';

// The five objects on the desk and the part of the site each one opens.
// `anchor` picks the visible part of the object to measure (the group's own box also
// counts clipped code and the hidden fallen mug); `side` is where its label sits.

export type RouteId = 'work' | 'writing' | 'about' | 'awards' | 'contact';
export interface DeskRoute {
  id: RouteId;
  label: string;
  /** What the panel holds, said plainly (used by the index under the desk). */
  holds: string;
  anchor: string;
  /** Where the dot sits on the object, as fractions of its box (0..1 across, 0..1 down). */
  at: [number, number];
  /** Upper bound on the zoom toward this object when its panel is open. */
  zoom: number;
}

export const ROUTES: DeskRoute[] = [
  { id: 'work', label: 'Work', holds: 'Professional works and projects', anchor: '[data-toy="monitor"] .dk-scr-bg', at: [0.5, 0.45], zoom: 1.7 },
  { id: 'writing', label: 'Writing', holds: 'What I watch, read and build', anchor: '[data-toy="books"] .dk-accent-book', at: [0.5, 0.45], zoom: 2.4 },
  { id: 'awards', label: 'Awards', holds: 'Competitions', anchor: '[data-toy="trophy"]', at: [0.5, 0.35], zoom: 2.6 },
  { id: 'about', label: 'About', holds: 'All about me', anchor: '[data-toy="frame"]', at: [0.5, 0.38], zoom: 2.2 },
  { id: 'contact', label: 'Say hi', holds: 'Email and profiles', anchor: '[data-toy="mug"] [data-part="mug-up"]', at: [0.42, 0.3], zoom: 2.6 },
];

export const inert = (on: boolean) => (on ? { inert: '' } : {}) as React.HTMLAttributes<HTMLElement>;

export const ROUTE_IDS = ROUTES.map((r) => r.id);

export const routeFromHash = (hash: string): RouteId | null => {
  const id = hash.replace(/^#/, '') as RouteId;
  return ROUTE_IDS.includes(id) ? id : null;
};
