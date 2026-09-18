import React from 'react';
import {
  Section,
  GlassCard,
  SkillCard,
  EducationCard,
  CodeIcon,
  SparklesIcon,
  LightbulbIcon,
} from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * AboutSection Component
 * Bento Showcase for Bio & Capabilities, Technical Skills, and Education Timeline
 */
export const AboutSection: React.FC = () => {
  const { personalInfo, skills, education } = portfolioData;

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: skills.programmingLanguages,
    },
    {
      title: 'Version Control',
      skills: skills.versionControl,
    },
    {
      title: 'Databases',
      skills: skills.databases,
    },
    {
      title: 'Frameworks & Libraries',
      skills: skills.frameworks,
    },
    ...(skills.llmTooling && skills.llmTooling.length > 0
      ? [{ title: 'LLM Tooling', skills: skills.llmTooling }]
      : []),
  ];

  const whatIDo = [
    {
      title: 'Application Development',
      description:
        'Building robust mobile and web applications using modern frameworks and best practices. Experienced in both frontend and backend development.',
      icon: CodeIcon,
    },
    {
      title: 'LLM Integration',
      description:
        'Integrating Large Language Model (LLM) capabilities into applications using LangChain and other AI frameworks to enhance functionality and user experience.',
      icon: SparklesIcon,
    },
    {
      title: 'Problem Solving',
      description:
        'Analyzing complex problems, debugging issues, and implementing innovative solutions that meet business requirements.',
      icon: LightbulbIcon,
    },
  ];

  return (
    <>
      {/* About Me & Capabilities Bento Showcase */}
      <Section
        id="about"
        title="About Me"
        subtitle="Get to know me better"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Bio Bento Card (Spans 7 cols) */}
          <div className="lg:col-span-7 flex flex-col animate-slide-up">
            <GlassCard className="h-full flex flex-col justify-between p-6 sm:p-8 border border-border/80">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="text-xs uppercase tracking-wider font-mono text-secondary font-medium">
                    Software Developer
                  </span>
                  <span className="glass px-2.5 py-1 rounded-[4px] text-xs font-mono text-primary border border-border">
                    {personalInfo.location}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-1">
                  {personalInfo.name}
                </h3>
                <p className="text-base sm:text-lg text-secondary font-medium mb-6">
                  {personalInfo.title}
                </p>

                <p className="text-base text-text-secondary leading-relaxed whitespace-pre-line font-normal">
                  {personalInfo.bio}
                </p>
              </div>

              {/* Status footer bar inside Bio */}
              <div className="mt-8 pt-5 border-t border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-secondary">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary/70 inline-block" />
                  Engineering & Problem Solving
                </span>
                <span className="text-primary font-medium">{personalInfo.email}</span>
              </div>
            </GlassCard>
          </div>

          {/* Capabilities Bento Column (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 animate-slide-up">
            <div className="px-1">
              <span className="text-xs uppercase tracking-wider font-mono text-secondary font-semibold">
                What I Do & Core Focus
              </span>
            </div>

            {whatIDo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <GlassCard
                  key={index}
                  hover
                  className="flex-1 p-5 border border-border/80 flex gap-4 items-start"
                >
                  <div className="p-2.5 rounded-[6px] bg-primary/5 border border-primary/15 text-primary shrink-0 mt-0.5">
                    <IconComponent size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-base mb-1.5 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-secondary leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Technical Skills (Maintained format) */}
      <Section
        id="skills"
        title="Technical Skills"
        subtitle="Technologies I use at work and am currently exploring"
        className="bg-gradient-to-b from-transparent to-surface/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SkillCard title={category.title} skills={category.skills} />
            </div>
          ))}
        </div>
      </Section>

      {/* Education (Vertical Timeline Spine) */}
      <Section
        id="education"
        title="Education"
        subtitle="My academic background"
      >
        <div className="max-w-4xl mx-auto relative timeline-container">
          {/* Subtle vertical spine */}
          <div className="timeline-spine" style={{ left: '9px' }} />

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EducationCard education={edu} />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};
