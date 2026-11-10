import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';
import { GlassButton } from './GlassButton';
import { GithubIcon, ExternalLinkIcon } from './Icons';
import { Project } from '@/types';
import { cn } from '@/utils';

interface ProjectCardProps {
  project: Project;
  /** Large two-column layout for the lead project */
  featured?: boolean;
}

const ProjectLinks: React.FC<{ project: Project }> = ({ project }) => (
  <div className="mt-6 flex flex-wrap gap-3">
    {project.links.github && (
      <GlassButton href={project.links.github} external variant="secondary" size="sm">
        <GithubIcon size={16} />
        Source Code
      </GlassButton>
    )}
    {project.links.live && (
      <GlassButton href={project.links.live} external variant="primary" size="sm">
        <ExternalLinkIcon size={16} />
        Live Demo
      </GlassButton>
    )}
  </div>
);

/**
 * ProjectCard
 * Picture, name, what it does, stack, link. No overlay tags on the picture.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  const { image } = project;

  const picture = (
    <div
      className={cn(
        'overflow-hidden rounded-md bg-white',
        featured ? 'aspect-[4/3]' : 'aspect-video border border-border'
      )}
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={featured ? '(min-width: 1024px) 600px, 100vw' : '(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw'}
        width={image.width}
        height={image.height}
        alt={`${project.name} app screens`}
        loading="lazy"
        decoding="async"
        className={cn(
          'h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]',
          featured ? 'object-contain' : 'object-cover'
        )}
      />
    </div>
  );

  const description = (
    <div
      className="mt-3 text-base leading-relaxed text-secondary [&_a]:text-accent [&_a]:font-medium [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-accent"
      dangerouslySetInnerHTML={{ __html: project.description }}
    />
  );

  const stack = (
    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
      {project.technologies.map((tech) => (
        <li key={tech}>
          <Badge>{tech}</Badge>
        </li>
      ))}
    </ul>
  );

  if (featured) {
    return (
      <GlassCard hover className="group grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">{picture}</div>
        <div className="lg:col-span-5">
          {project.highlight && (
            <p className="text-sm font-semibold text-accent">{project.highlight}</p>
          )}
          <h3 className="mt-2 text-3xl font-bold">{project.name}</h3>
          {description}
          {stack}
          <ProjectLinks project={project} />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard hover className="group flex h-full flex-col gap-5 p-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:flex">
      {picture}
      <div className="flex flex-1 flex-col">
        <h3 className="text-2xl font-bold">{project.name}</h3>
        {description}
        <div className="mt-auto">
          {stack}
          <ProjectLinks project={project} />
        </div>
      </div>
    </GlassCard>
  );
};
