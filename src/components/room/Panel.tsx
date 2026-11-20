import React, { useEffect, useRef, useState } from 'react';
import {
  AboutSection,
  AchievementsSection,
  CommunitiesSection,
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  WritingSection,
} from '@/components/sections';
import { ROUTES, RouteId, inert } from './routes';

const CONTENT: Record<RouteId, React.FC[]> = {
  work: [ExperienceSection, ProjectsSection],
  writing: [WritingSection],
  about: [AboutSection, CommunitiesSection],
  awards: [AchievementsSection],
  contact: [ContactSection],
};

// Matches the panel's exit transition in room.css.
const EXIT_MS = 420;

interface PanelProps {
  route: RouteId | null;
  onClose: () => void;
  onGo: (route: RouteId) => void;
}

/**
 * Panel
 * Paper laid beside the desk: on wide screens it takes the right side and the desk
 * stays visible on the left; on phones it is a sheet under the zoomed object.
 * It keeps showing the last part while it slides away.
 */
export const Panel: React.FC<PanelProps> = ({ route, onClose, onGo }) => {
  const [shown, setShown] = useState<RouteId | null>(route);
  const scroller = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (route) {
      setShown(route);
      return;
    }
    const t = window.setTimeout(() => setShown(null), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [route]);

  // A new part starts at its top, and focus moves into the panel.
  useEffect(() => {
    if (!route) return;
    scroller.current?.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
  }, [route]);

  if (!shown) return null;
  const current = ROUTES.find((r) => r.id === shown)!;
  const Sections = CONTENT[shown];

  return (
    <aside className="room-panel" data-state={route ? 'open' : 'closed'} {...inert(!route)} aria-labelledby="room-panel-title" data-lenis-prevent>
      <div className="room-panel-bar">
        <button type="button" onClick={onClose} className="room-back">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10 3.5 5.5 8l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="room-back-label">Back to the desk</span>
        </button>
        <h2 id="room-panel-title" ref={heading} tabIndex={-1} className="sr-only">
          {current.label}
        </h2>
        <nav aria-label="Other parts of the desk">
          <ul className="room-tabs">
            {ROUTES.map((r) => (
              <li key={r.id}>
                <a
                  href={`#${r.id}`}
                  aria-current={shown === r.id ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onGo(r.id);
                  }}
                >
                  <span className="room-tab-label">{r.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="room-panel-body" ref={scroller} data-route={shown}>
        {Sections.map((S, i) => (
          <S key={`${shown}-${i}`} />
        ))}
      </div>
    </aside>
  );
};
