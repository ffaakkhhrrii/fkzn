import React from 'react';
import { GlassCard } from './GlassCard';
import { BookIcon } from './Icons';
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
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="glass rounded-full p-3 text-primary flex-shrink-0">
          <BookIcon size={24} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            {education.degree}
          </h3>

          <p className="text-lg text-secondary font-medium mb-2">
            {education.institution}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-3">
            <span>{education.location}</span>
            <span>•</span>
            <span>{education.duration}</span>
          </div>

          {education.gpa && education.gpa !== '-' && (
            <p className="text-text-secondary mb-2">
              <span className="font-medium">Latest GPA:</span> {education.gpa}
            </p>
          )}

          {education.relevantCoursework && (
            <p className="text-text-secondary">
              <span className="font-medium">Relevant Coursework:</span>{' '}
              {education.relevantCoursework}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
