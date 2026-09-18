import React from 'react';
import { GlassButton } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * HeroSection Component
 * Modern editorial hero section with punchy typography and refined layout
 */
export const HeroSection: React.FC = () => {
  const { personalInfo } = portfolioData;

  return (
    <section id="home" className="section-container min-h-[calc(100vh-5rem)] flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1 lg:col-span-7 animate-slide-up">
          <div className="mb-4">
            <span className="glass px-3.5 py-1.5 rounded-md text-xs tracking-wide uppercase font-semibold text-secondary inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight mb-4">
            Hi, I'm{' '}
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed max-w-2xl font-normal">
            {personalInfo.shortBio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <GlassButton href="#projects" variant="accent" size="lg">
              View My Work
            </GlassButton>
            <GlassButton href="#about" variant="ghost" size="lg">
              About Me →
            </GlassButton>
          </div>
        </div>

        {/* Profile Image */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/10 to-transparent rounded-2xl blur-2xl opacity-60 pointer-events-none" />

            {/* Profile Image Container with Crisp Micro-radius Frame */}
            <div className="relative z-10 p-2 glass rounded-lg border border-border/80 shadow-lg">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-md overflow-hidden bg-surface relative">
                <img
                  src={personalInfo.profilePhoto.path}
                  alt={personalInfo.profilePhoto.alt}
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* Status Badge */}
            <div className="absolute -bottom-3 -right-3 z-20 glass-strong rounded-md px-4 py-2.5 border border-border shadow-md">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <div className="text-xs font-semibold text-primary leading-none">
                    Available
                  </div>
                  <div className="text-[11px] text-secondary font-normal mt-0.5 leading-none">
                    for opportunities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
