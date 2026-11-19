import React, { Suspense, lazy } from 'react';
import { portfolioData } from '@/data/portfolio.data';

// The diorama ships in its own chunk, so the heading paints without waiting for it.
const DeskDiorama = lazy(() => import('./desk/DeskDiorama'));

// Matches DESK_META in desk/art.generated.ts; reserves the space so nothing jumps when it loads.
const DESK_RATIO = '1000 / 917';

export interface HeroProps {
  /** Pictures for the wall frame; touching the frame shows the next one, like changing a
   *  wallpaper. Any ratio works (3:2 and 4:3 both fill the mat; each is cropped to cover). */
  frameImages?: string[];
}

/**
 * Hero
 * The heading, then the desk: a small diorama with three toys on it
 * (code that breaks when touched, coffee that spills, a frame that changes picture).
 */
// Pictures for the wall frame, in order; a touch on the frame shows the next one.
// Put the files in public/assets/images/frame/ and list them here as '/assets/images/frame/<name>'.
// Landscape 3:2 or 4:3 fills the frame best (anything else is cropped to fit).
const DEFAULT_FRAME_IMAGES = [
  '/assets/images/frame/cafe.png',
  '/assets/images/frame/bookshelf.png',
  '/assets/images/opt/profile-800.jpg',
  '/assets/images/frame/school.png',
  '/assets/images/frame/library.png',
];

export const Hero: React.FC<HeroProps> = ({ frameImages = DEFAULT_FRAME_IMAGES }) => {
  const { personalInfo } = portfolioData;

  return (
    <section id="home" className="relative flex flex-col overflow-x-clip pt-24 pb-12 lg:min-h-[92svh] [justify-content:safe_center] sm:pt-28">
      <div className="wrap flex flex-col items-center text-center">
        <div className="animate-enter">
          <p className="mb-3 text-sm font-medium text-secondary">
            {personalInfo.title} · {personalInfo.location}
          </p>
          <h1 className="text-[2.5rem] leading-[1.05] font-extrabold sm:text-6xl xl:text-[4.25rem]">
            Hi, I'm {personalInfo.name}.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-secondary">{personalInfo.shortBio}</p>
        </div>

        <div className="hero-desk mt-4 sm:mt-6" style={{ aspectRatio: DESK_RATIO }}>
          <Suspense fallback={null}>
            <DeskDiorama frameImages={frameImages} className="animate-enter [animation-delay:120ms]" />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
