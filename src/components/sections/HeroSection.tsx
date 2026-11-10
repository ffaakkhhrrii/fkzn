import React from 'react';
import { GlassButton, LinkedinIcon } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Hero
 * Says what Fakhri does, for what kind of work, with facts on the first screen.
 */
export const HeroSection: React.FC = () => {
  const { personalInfo, socialLinks } = portfolioData;

  // Same two lines as the LinkedIn headline: current job and current study
  const facts = [
    { value: '2+ years', label: 'Software Developer at ADW Consulting' },
    { value: 'Computer Science', label: 'Student at Binus Online University' },
  ];

  return (
    <section id="home" className="flex min-h-[100svh] items-center pt-16">
      <div className="wrap py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="animate-enter lg:col-span-7">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <img
                src="/assets/images/opt/profile-480.jpg"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover lg:hidden"
              />
              <p className="text-sm font-medium text-secondary">
                {personalInfo.title} · {personalInfo.location}
              </p>
            </div>

            <h1 className="text-[2.5rem] leading-[1.05] font-extrabold sm:text-6xl xl:text-[4.25rem]">
              Hi, I'm {personalInfo.name}.
            </h1>

            <p className="mt-5 max-w-xl text-lg sm:mt-6 leading-relaxed text-secondary">
              {personalInfo.shortBio}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <GlassButton href="#projects" variant="primary" size="lg">
                See my projects
              </GlassButton>
              <GlassButton href={socialLinks.linkedin} external variant="secondary" size="lg">
                <LinkedinIcon size={20} />
                Connect with me
              </GlassButton>
            </div>

            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 border-t border-border pt-5 sm:mt-10 sm:gap-6 sm:pt-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-display text-xl font-bold text-accent">{f.value}</dt>
                  <dd className="mt-1 text-sm leading-snug text-secondary">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden animate-enter lg:col-span-5 lg:block [animation-delay:120ms]">
            <img
              src={personalInfo.profilePhoto.path}
              srcSet="/assets/images/opt/profile-480.jpg 480w, /assets/images/opt/profile-800.jpg 800w"
              sizes="(min-width: 1024px) 420px, 100vw"
              alt={`Portrait of ${personalInfo.name}`}
              width={800}
              height={800}
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
