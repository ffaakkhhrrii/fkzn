import React from 'react';
import { Section, GlassCard, SkillCard, EducationCard } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * AboutSection Component
 * Bio, what I do, technical skills, and education
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
    ...(skills.other && skills.other.length > 0
      ? [{ title: 'Other', skills: skills.other }]
      : []),
  ];

  const whatIDo = [
    {
      title: 'Application Development',
      description:
        'Building robust mobile and web applications using modern frameworks and best practices. Experienced in both frontend and backend development.',
    },
    {
      title: 'LLM Integration',
      description:
        'Integrating Large Language Model (LLM) capabilities into applications using LangChain and other AI frameworks to enhance functionality and user experience.',
    },
    {
      title: 'Problem Solving',
      description:
        'Analyzing complex problems, debugging issues, and implementing innovative solutions that meet business requirements.',
    },
  ];

  return (
    <>
      <Section
        id="about"
        title="About Me"
        subtitle="Get to know me better"
      >
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6 animate-slide-up">
            <GlassCard>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {personalInfo.name}
              </h3>
              <p className="text-xl text-accent font-semibold mb-4">
                {personalInfo.title}
              </p>
              <p className="text-lg text-secondary leading-relaxed whitespace-pre-line font-normal">
                {personalInfo.bio}
              </p>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                What I Do
              </h3>
              <div className="space-y-6 text-secondary">
                {whatIDo.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-primary text-lg mb-2">
                      {item.title}
                    </h4>
                    <p className="font-normal">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <Section
        id="skills"
        title="Technical Skills"
        subtitle="Technologies and tools I'm proficient in"
        className="bg-gradient-to-b from-transparent to-white/5"
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

      <Section
        id="education"
        title="Education"
        subtitle="My academic background"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </Section>
    </>
  );
};
