import React from 'react';
import { Badge } from './Badge';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

/**
 * ExperienceCard
 * One row: period on the left, role and results on the right.
 * Bullets written "Label – text" get the label in bold.
 */
export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const lines = experience.description.split('\n').filter(Boolean);
  const intro = lines.filter((line) => !line.startsWith('•'));
  const bullets = lines
    .filter((line) => line.startsWith('•'))
    .map((line) => line.replace(/^•\s*/, ''))
    .map((line) => {
      const m = line.match(/^(.{2,30}?)\s+[–-]\s+(.*)$/);
      return m ? { label: m[1], text: m[2] } : { label: '', text: line };
    });

  return (
    <article className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <p className="text-sm font-semibold text-primary">{experience.duration}</p>
        <p className="mt-1 text-sm text-text-light">{experience.location}</p>
      </div>

      <div className="md:col-span-9">
        <h3 className="text-2xl font-bold">{experience.position}</h3>
        <p className="mt-1 font-medium text-accent">{experience.company}</p>

        {intro.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-base leading-relaxed text-secondary">
            {paragraph}
          </p>
        ))}

        {bullets.length > 0 && (
          <ul className="mt-4 space-y-3">
            {bullets.map((b) => (
              <li key={b.text} className="relative pl-5 text-base leading-relaxed text-secondary">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent" />
                {b.label && <strong className="font-semibold text-primary">{b.label} – </strong>}
                {b.text}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {experience.technologies.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
