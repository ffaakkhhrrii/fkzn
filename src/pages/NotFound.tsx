import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition, Section, GlassCard, GlassButton } from '@/components';

/**
 * NotFound Page (404)
 * Displayed when user navigates to a non-existent route
 */
const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <Section className="min-h-[calc(100vh-20rem)] flex items-center justify-center">
        <GlassCard className="text-center max-w-2xl mx-auto">
          <div className="animate-float mb-8">
            <div className="text-9xl font-bold text-accent mb-4">404</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Page Not Found
          </h1>

          <p className="text-lg md:text-xl text-secondary mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved
            or deleted.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/">
              <GlassButton variant="accent" size="lg">
                Go Home
              </GlassButton>
            </Link>
            <Link to="/projects">
              <GlassButton variant="primary" size="lg">
                View Projects
              </GlassButton>
            </Link>
          </div>

          {/* Fun ASCII Art */}
          <div className="mt-12 text-secondary font-mono text-sm">
            <pre className="inline-block text-left">
              {`
    ¯\\_(ツ)_/¯
    
  Lost in the code?
  Let's get you back!
              `}
            </pre>
          </div>
        </GlassCard>
      </Section>
    </PageTransition>
  );
};

export default NotFound;
