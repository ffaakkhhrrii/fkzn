// Entry for the standalone hero preview (scripts/desk/preview.mjs). Not used by the site.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Hero } from './Hero';

declare global {
  interface Window {
    __HERO_PHOTOS__?: string[];
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main>
      <Hero frameImages={window.__HERO_PHOTOS__} />
      {['about', 'experience', 'achievements', 'projects', 'writing', 'contact'].map((id) => (
        <section key={id} id={id} className="wrap py-24 text-left">
          <h2 className="text-3xl font-bold capitalize">{id}</h2>
          <p className="mt-2 text-secondary">Placeholder section.</p>
        </section>
      ))}
    </main>
  </React.StrictMode>,
);
