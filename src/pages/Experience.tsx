import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageTransition,
  Section,
  ExperienceCard,
  GlassCard,
  GlassButton,
  ChipIcon,
  RocketIcon,
  WrenchIcon,
  SmartphoneIcon,
  GlobeIcon,
  BookIcon,
} from '@/components';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Experience Page
 * Detailed work experience and professional journey
 */
const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <PageTransition>
      {/* Page Header */}
      <Section
        id="experience"
        title="Work Experience"
        subtitle="My professional journey and key contributions"
      >
        {/* Highlight LLM Integration */}
        <div className="mb-12 animate-fade-in">
          <GlassCard className="glass-strong border-2 border-accent/30">
            <div className="flex items-start gap-4">
              <div className="text-accent flex-shrink-0">
                <ChipIcon size={36} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent mb-2">
                  LLM Application
                </h3>
                <p className="text-lg text-secondary leading-relaxed">
                  Currently working on integrating Large Language Model (LLM) capabilities
                  into procurement applications using <strong>LangChain</strong> and{' '}
                  <strong>Python</strong>. This involves enhancing application functionality,
                  improving user experience through AI-powered features, and implementing
                  intelligent automation solutions.
                </p>
              </div>
            </div>
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
      </Section>

      {/* Key Highlights Section */}
      <Section
        title="Key Highlights"
        subtitle="Notable achievements and responsibilities"
        className="bg-gradient-to-b from-transparent to-white/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard hover className="text-center">
            <div className="flex justify-center text-accent mb-4">
              <RocketIcon size={36} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Full-Stack Development
            </h3>
            <p className="text-secondary">
              Building and maintaining both mobile and web applications with modern
              technologies
            </p>
          </GlassCard>

          <GlassCard hover className="text-center">
            <div className="flex justify-center text-accent mb-4">
              <ChipIcon size={36} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              AI Integration
            </h3>
            <p className="text-secondary">
              Implementing LLM capabilities using LangChain to enhance application
              intelligence
            </p>
          </GlassCard>

          <GlassCard hover className="text-center">
            <div className="flex justify-center text-accent mb-4">
              <WrenchIcon size={36} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Problem Solving
            </h3>
            <p className="text-secondary">
              Analyzing and resolving complex bugs across mobile and web platforms
            </p>
          </GlassCard>

          <GlassCard hover className="text-center">
            <div className="flex justify-center text-accent mb-4">
              <SmartphoneIcon size={36} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Mobile Development
            </h3>
            <p className="text-secondary">
              Creating native Android applications using Kotlin and modern architecture
              patterns
            </p>
          </GlassCard>

          <GlassCard hover className="text-center">
            <div className="flex justify-center text-accent mb-4">
              <GlobeIcon size={36} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Web Development
            </h3>
            <p className="text-secondary">
              Building responsive web applications with PHP, JavaScript, and modern
              frameworks
            </p>
          </GlassCard>

          <GlassCard hover className="text-center">
            <div className="flex justify-center text-accent mb-4">
              <BookIcon size={36} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Documentation
            </h3>
            <p className="text-secondary">
              Creating comprehensive technical documentation for maintainability
            </p>
          </GlassCard>
        </div>
      </Section>

      {/* Technologies Used */}
      <Section
        title="Technologies I Work With"
        subtitle="Tools and frameworks from my professional experience"
      >
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Current Tech Stack
              </h3>
              <div className="space-y-2 text-secondary">
                <p>• <strong>Languages:</strong> Kotlin, Flutter, Java, JavaScript, PHP, Python</p>
                <p>• <strong>Frameworks:</strong> CodeIgniter, Laravel, Tailwind</p>
                <p>• <strong>Databases:</strong> PostgreSQL, MySQL, SQL Server, Firebase</p>
                <p>• <strong>Version Control:</strong> Bitbucket, GIT</p>
                <p>• <strong>AI:</strong> LangChain, LLM Integration</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Development Practices
              </h3>
              <div className="space-y-2 text-secondary">
                <p>• Agile/Scrum methodology</p>
                <p>• Version control with Bitbucket</p>
                <p>• Code review and collaboration</p>
                <p>• Technical documentation</p>
                <p>• Bug tracking and resolution</p>
                <p>• Feature development lifecycle</p>
                <p>• Team collaboration and communication</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <GlassCard className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Want to know more?
          </h3>
          <p className="text-lg text-secondary mb-6">
            Check out my projects or get in touch to discuss opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/projects">
              <GlassButton variant="accent" size="lg">
                View Projects
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      </Section>
    </PageTransition>
  );
};

export default Experience;
