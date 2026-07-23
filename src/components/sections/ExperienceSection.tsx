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
      title: 'Full-Stack Development',
      description:
        'Building and maintaining both mobile and web applications with modern technologies',
    },
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
      <div className="mb-12 animate-fade-in">
        <GlassCard className="glass-strong border-2 border-accent/30">
          <h3 className="text-2xl font-bold text-accent mb-2">
            LLM Application
          </h3>
          <p className="text-lg text-secondary leading-relaxed font-normal">
            Currently working on integrating Large Language Model (LLM) capabilities
            into procurement applications using <strong>LangChain</strong> and{' '}
            <strong>Python</strong>. This involves enhancing application functionality,
            improving user experience through AI-powered features, and implementing
            intelligent automation solutions.
          </p>
        </GlassCard>
      </div>

      {/* Experience Timeline */}
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

      {/* Key Highlights */}
      <div className="mt-16">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 text-center">
          Key Highlights
        </h3>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto text-center mb-8">
          Notable achievements and responsibilities
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <GlassCard key={index} hover className="text-center">
              <h4 className="text-xl font-bold text-primary mb-2">
                {item.title}
              </h4>
              <p className="text-secondary font-normal">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="mt-16">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 text-center">
          Technologies I Work With
        </h3>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto text-center mb-8">
          Tools and frameworks from my professional experience
        </p>
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-primary mb-4">
                Current Tech Stack
              </h4>
              <div className="space-y-2 text-secondary font-normal">
                <p><strong>Languages:</strong> Kotlin, Flutter, Java, JavaScript, PHP, Python</p>
                <p><strong>Frameworks:</strong> CodeIgniter, Laravel, Tailwind</p>
                <p><strong>Databases:</strong> PostgreSQL, MySQL, SQL Server, Firebase</p>
                <p><strong>Version Control:</strong> Bitbucket, GIT</p>
                <p><strong>AI:</strong> LangChain, LLM Integration</p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-primary mb-4">
                Development Practices
              </h4>
              <div className="space-y-2 text-secondary font-normal">
                <p>Agile/Scrum methodology</p>
                <p>Version control with Bitbucket</p>
                <p>Code review and collaboration</p>
                <p>Technical documentation</p>
                <p>Bug tracking and resolution</p>
                <p>Feature development lifecycle</p>
                <p>Team collaboration and communication</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
};
