import React from 'react';
import { GlassButton, GlassCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * HeroSection Component
 * Main hero section with profile and CTA
 */
export const HeroSection: React.FC = () => {
  const { personalInfo } = portfolioData;

  return (
    <section id="home" className="section-container min-h-[calc(100vh-5rem)] flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1 animate-slide-up">
          <div className="mb-6">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-secondary inline-block mb-4">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-4">
            Hi, I'm{' '}
            <span className="text-accent">{personalInfo.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed max-w-2xl font-normal">
            {personalInfo.shortBio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <GlassButton href="#projects" variant="accent" size="lg">
              View My Work
            </GlassButton>
          </div>
        </div>

        {/* Profile Image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 glass-strong rounded-full blur-3xl opacity-50 animate-float" />

            {/* Profile Image Container */}
            <GlassCard className="relative z-10 p-2">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-accent/30">
                <img
                  src={personalInfo.profilePhoto.path}
                  alt={personalInfo.profilePhoto.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </GlassCard>

            {/* Status Badge */}
            <div className="absolute -bottom-4 -right-4 glass-strong rounded-2xl p-4 animate-glow">
              <div className="text-center">
                <div className="text-sm font-semibold text-primary">
                  Available
                </div>
                <div className="text-xs text-secondary font-normal mt-1">
                  for opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
