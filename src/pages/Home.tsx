import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageTransition,
  HeroSection,
  FeaturedAchievements,
  Section,
  SkillCard,
  ProjectCard,
  GlassButton,
  CodeIcon,
  BriefcaseIcon,
} from '@/components';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Home Page
 * Main landing page with hero, featured skills, projects, and achievements
 */
const Home: React.FC = () => {
  const { skills, projects } = portfolioData;

  // Featured skills for homepage - show all categories
  const featuredSkills = [
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
      icon: <CodeIcon size={28} />,
    },
    {
      title: 'Frameworks & Libraries',
      skills: skills.frameworks,
      icon: <BriefcaseIcon size={28} />,
    },
    ...(skills.other && skills.other.length > 0
      ? [{
          title: 'Other',
          skills: skills.other,
          icon: <BriefcaseIcon size={28} />,
        }]
      : []),
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <HeroSection />

      {/* Skills Section */}
      <Section
        id="skills"
        title="Technical Skills"
        subtitle="Technologies and tools I work with"
        className="bg-gradient-to-b from-transparent to-white/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSkills.map((category, index) => (
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

        <div className="text-center mt-8">
          <Link to="/about">
            <GlassButton variant="ghost" size="md">
              View More
            </GlassButton>
          </Link>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section
        id="projects"
        title="Featured Projects"
        subtitle="Some of my recent work and personal projects"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/projects">
            <GlassButton variant="accent" size="lg">
              View All Projects
            </GlassButton>
          </Link>
        </div>
      </Section>

      {/* Featured Achievements Section */}
      <FeaturedAchievements />
    </PageTransition>
  );
};

export default Home;
