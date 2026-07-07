import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageTransition,
  Section,
  GlassCard,
  SkillCard,
  EducationCard,
  GlassButton,
  CodeIcon,
  BriefcaseIcon,
  RocketIcon,
  ChipIcon,
  WrenchIcon,
  CloudIcon,
} from '@/components';
import { portfolioData } from '@/data/portfolio.data';

/**
 * About Page
 * Detailed information about skills, education, and background
 */
const About: React.FC = () => {
  const { personalInfo, skills, education } = portfolioData;

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: skills.programmingLanguages,
      icon: <CodeIcon size={28} />,
    },
    {
      title: 'Version Control',
      skills: skills.versionControl,
      icon: <BriefcaseIcon size={28} />,
    },
    {
      title: 'Databases',
      skills: skills.databases,
      icon: <CloudIcon size={28} />,
    },
    {
      title: 'Frameworks & Libraries',
      skills: skills.frameworks,
      icon: <WrenchIcon size={28} />,
    },
    ...(skills.other && skills.other.length > 0
      ? [{
          title: 'Other',
          skills: skills.other,
          icon: <ChipIcon size={28} />,
        }]
      : []),
  ];

  return (
    <PageTransition>
      {/* About Me Section */}
      <Section
        id="about"
        title="About Me"
        subtitle="Get to know me better"
      >
        <div className="grid grid-cols-1 gap-8">
          {/* Bio Content */}
          <div className="space-y-6 animate-slide-up">
            <GlassCard>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {personalInfo.name}
              </h3>
              <p className="text-xl text-accent font-semibold mb-4">
                {personalInfo.title}
              </p>
              <p className="text-lg text-secondary leading-relaxed whitespace-pre-line">
                {personalInfo.bio}
              </p>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                What I Do
              </h3>
              <div className="space-y-4 text-secondary">
                <div>
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <RocketIcon size={20} className="text-accent" />
                    Application Development
                  </h4>
                  <p>
                    Building robust mobile and web applications using modern frameworks
                    and best practices. Experienced in both frontend and backend development.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <ChipIcon size={20} className="text-accent" />
                    LLM Integration
                  </h4>
                  <p>
                    Integrating Large Language Model (LLM) capabilities into applications
                    using LangChain and other AI frameworks to enhance functionality and
                    user experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <WrenchIcon size={20} className="text-accent" />
                    Problem Solving
                  </h4>
                  <p>
                    Analyzing complex problems, debugging issues, and implementing
                    innovative solutions that meet business requirements.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
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
              <SkillCard
                title={category.title}
                skills={category.skills}
                icon={category.icon}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Education Section */}
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

      {/* CTA Section */}
      <Section className="text-center">
        <GlassCard className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Interested in working together?
          </h3>
          <p className="text-lg text-secondary mb-6">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/projects">
              <GlassButton variant="primary" size="lg">
                View Projects
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      </Section>
    </PageTransition>
  );
};

export default About;
