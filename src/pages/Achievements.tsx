import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PageTransition,
  Section,
  AchievementCard,
  GlassCard,
  GlassButton,
  Badge,
  TrophyIcon,
  CloudIcon,
  MonitorIcon,
  SearchIcon,
  TargetIcon,
} from '@/components';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Achievements Page
 * Complete list of achievements, awards, and recognitions
 */
const Achievements: React.FC = () => {
  const { achievements } = portfolioData;
  const [showAll, setShowAll] = useState(false);

  const featuredAchievements = achievements.filter((a) => a.featured);
  const otherAchievements = achievements.filter((a) => !a.featured);
  const displayedAchievements = showAll ? achievements : featuredAchievements;

  return (
    <PageTransition>
      {/* Page Header */}
      <Section
        id="achievements"
        title="Achievements & Awards"
        subtitle="Recognition for excellence in competitions and projects"
      >
        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in">
          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
              {achievements.length}
            </div>
            <div className="text-secondary">Total Awards</div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">3</div>
            <div className="text-secondary">1st Place Wins</div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">2</div>
            <div className="text-secondary">Provincial Level</div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">4</div>
            <div className="text-secondary">Regional Level</div>
          </GlassCard>
        </div>

        {/* Featured Badge */}
        <div className="mb-8 text-center animate-slide-up">
          <Badge variant="accent" className="text-base px-6 py-2">
            Featured Achievements
          </Badge>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedAchievements.map((achievement, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AchievementCard achievement={achievement} />
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {otherAchievements.length > 0 && (
          <div className="text-center">
            <GlassButton
              variant="accent"
              size="lg"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? 'Show Featured Only'
                : `Show All Achievements (${achievements.length})`}
            </GlassButton>
          </div>
        )}
      </Section>

      {/* Competition Highlights */}
      <Section
        title="Competition Highlights"
        subtitle="Notable achievements and recognitions"
        className="bg-gradient-to-b from-transparent to-white/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard hover className="glass-strong">
            <div className="flex items-start gap-4">
              <div className="text-accent flex-shrink-0">
                <TrophyIcon size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent mb-2">
                  LKS IT Software Solution
                </h3>
                <p className="text-secondary mb-3">
                  Multiple wins in the prestigious LKS (Lomba Kompetensi Siswa) IT
                  Software Solution competition at both regional and provincial levels.
                </p>
                <div className="space-y-1 text-sm text-secondary">
                  <p>• 3rd Place - DKI Jakarta Province (2024)</p>
                  <p>• 1st Place - East Jakarta Region (2024)</p>
                  <p>• 2nd Place - East Jakarta Region (2023)</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover className="glass-strong">
            <div className="flex items-start gap-4">
              <div className="text-accent flex-shrink-0">
                <TrophyIcon size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent mb-2">
                  Pijar Camp Hackathon
                </h3>
                <p className="text-secondary mb-3">
                  Won 1st place in the Telkom Indonesia Hackathon Competition organized
                  by Pijar Camp with the EDEAF project.
                </p>
                <div className="space-y-1 text-sm text-secondary">
                  <p>• National-level competition</p>
                  <p>• Innovative accessibility solution</p>
                  <p>• Team collaboration and presentation</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover>
            <div className="flex items-start gap-4">
              <div className="text-accent flex-shrink-0">
                <CloudIcon size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Cloud Computing (Web Design Competition)
                </h3>
                <p className="text-secondary mb-3">
                  4th Place in the Cloud Computing Club (Web Design Competition) at DKI Jakarta
                  Province level, demonstrating cloud infrastructure expertise.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover>
            <div className="flex items-start gap-4">
              <div className="text-accent flex-shrink-0">
                <MonitorIcon size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  BINUS Competition
                </h3>
                <p className="text-secondary mb-3">
                  Selected as finalist in the Software Engineering Development and
                  Logical Competition organized by BINUS University.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover>
            <div className="flex items-start gap-4">
              <div className="text-accent flex-shrink-0">
                <SearchIcon size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Fact-Checking Competition
                </h3>
                <p className="text-secondary mb-3">
                  3rd Place in the Fact-Checking Competition for Students organized by
                  Mafindo, showcasing analytical and research skills.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover>
            <div className="flex items-start gap-4">
              <div className="text-accent flex-shrink-0">
                <TargetIcon size={36} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Consistent Performance
                </h3>
                <p className="text-secondary mb-3">
                  Demonstrated consistent excellence across multiple years and
                  competition types, from 2023 to 2024.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Skills Demonstrated */}
      <Section title="Skills Demonstrated" subtitle="Competencies proven through competitions">
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Technical Skills
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• Software Development</li>
                <li>• Mobile App Development</li>
                <li>• Web Application Development</li>
                <li>• Database Management</li>
                <li>• System Architecture</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Soft Skills</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Problem Solving</li>
                <li>• Critical Thinking</li>
                <li>• Team Collaboration</li>
                <li>• Presentation Skills</li>
                <li>• Time Management</li>
                <li>• Adaptability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Competition Experience
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• Regional Competitions</li>
                <li>• Provincial Competitions</li>
                <li>• National Hackathons</li>
                <li>• University Competitions</li>
                <li>• Team Challenges</li>
                <li>• Individual Contests</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <GlassCard className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Let's create something award-winning together
          </h3>
          <p className="text-lg text-secondary mb-6">
            My competition experience has taught me to deliver excellence under pressure
            and work effectively in teams.
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

export default Achievements;
