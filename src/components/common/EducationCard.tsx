import React from 'react';
import { GlassCard } from './GlassCard';
import { Education } from '@/types';

interface EducationCardProps {
  education: Education;
}

/**
 * EducationCard Component
 * Displays education information with degree, institution, and duration
 */
export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  return (
    <GlassCard hover className="h-full">
      <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
        {education.degree}
      </h3>

      <p className="text-lg text-secondary font-semibold mb-2">
        {education.institution}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-3 font-normal">
        <span>{education.location}</span>
        <span aria-hidden="true">•</span>
        <span>{education.duration}</span>
      </div>

      {education.gpa && education.gpa !== '-' && (
        <p className="text-text-secondary mb-2 font-normal">
          <span className="font-semibold">Latest GPA:</span> {education.gpa}
        </p>
      )}

      {education.relevantCoursework && (
        <p className="text-text-secondary font-normal">
          <span className="font-semibold">Relevant Coursework:</span>{' '}
          {education.relevantCoursework}
        </p>
      )}
    </GlassCard>
  );
};
