import React from 'react';
import { GlassCard } from './GlassCard';
import { Education } from '@/types';

interface EducationCardProps {
  education: Education;
  isLast?: boolean;
}

/**
 * EducationCard Component
 * Displays education information with an editorial timeline format
 */
export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  return (
    <div className="relative pl-9 sm:pl-11">
      {/* Node marker on spine */}
      <div className="absolute left-0 top-3 z-10">
        <div className="w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>

      <GlassCard hover className="p-5 sm:p-6 border border-border/80">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1.5">
          <h3 className="text-lg md:text-xl font-bold text-primary tracking-tight">
            {education.degree}
          </h3>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-[4px] bg-primary/10 text-primary border border-primary/20 w-fit shrink-0">
            {education.duration}
          </span>
        </div>

        <p className="text-base text-secondary font-medium mb-2.5">
          {education.institution}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mb-3 font-normal">
          <span>{education.location}</span>
          {education.gpa && education.gpa !== '-' && (
            <>
              <span aria-hidden="true">•</span>
              <span className="font-semibold text-primary">Latest GPA: {education.gpa}</span>
            </>
          )}
        </div>

        {education.relevantCoursework && (
          <p className="text-sm text-text-secondary leading-relaxed font-normal pt-2.5 border-t border-border/70">
            <span className="font-semibold text-primary">Relevant Coursework:</span>{' '}
            {education.relevantCoursework}
          </p>
        )}
      </GlassCard>
    </div>
  );
};
