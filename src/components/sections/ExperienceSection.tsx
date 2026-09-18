import React from 'react';
import { Section, ExperienceCard, GlassCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * ExperienceSection Component
 * Work experience, key highlights, and technologies
 */
export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;

  const highlights = [
    {
      title: 'AI Integration',
      description:
        'Implementing LLM capabilities using LangChain to enhance application intelligence',
    },
    {
      title: 'Problem Solving',
      description:
        'Analyzing and resolving complex bugs across mobile and web platforms',
    },
    {
      title: 'Mobile Development',
      description:
        'Creating native Android applications using Kotlin and modern architecture patterns',
    },
    {
      title: 'Web Development',
      description:
        'Building responsive web applications with PHP, JavaScript, and modern frameworks',
    },
    {
      title: 'Documentation',
      description:
        'Creating comprehensive technical documentation for maintainability',
    },
  ];

  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="My professional journey and key contributions"
    >
      {/* LLM Integration Highlight */}
      <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
        <GlassCard className="p-6 sm:p-7 border border-primary/25 bg-surface/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary/80 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary">
              AI & Automation Spotlight
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 tracking-tight">
            LLM Application
          </h3>
          <p className="text-base text-secondary leading-relaxed font-normal">
            Currently working and learning on integrating Large Language Model (LLM) capabilities
            into procurement applications using <strong>LangChain</strong> and{' '}
            <strong>Python</strong>. This involves enhancing application functionality,
            improving user experience through AI-powered features, and implementing
            intelligent automation solutions.
          </p>
        </GlassCard>
      </div>

      {/* Experience Timeline with Spine */}
      <div className="max-w-4xl mx-auto relative timeline-container mb-20">
        <div className="timeline-spine" style={{ left: '9px' }} />

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>
      </div>

      {/* Key Highlights */}
      <div className="mt-8 pt-12 border-t border-border/70">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 text-center tracking-tight">
          Key Highlights
        </h3>
        <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto text-center mb-10">
          Core skills and areas of expertise
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item, index) => (
            <GlassCard
              key={index}
              hover
              className="text-left p-5 border border-border/80"
            >
              <div className="text-xs font-mono text-secondary mb-2">0{index + 1}</div>
              <h4 className="text-lg font-bold text-primary mb-2 tracking-tight">
                {item.title}
              </h4>
              <p className="text-sm text-secondary leading-relaxed font-normal">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
};
