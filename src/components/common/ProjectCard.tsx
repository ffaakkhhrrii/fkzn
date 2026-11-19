import React from 'react';
import { GlassButton } from './GlassButton';
import { GithubIcon, ExternalLinkIcon } from './Icons';
import { Project } from '@/types';

// Descriptions may carry an inline link (e.g. Faith App -> Faith Web)
const descriptionClass =
  'text-base leading-relaxed text-secondary [&_a]:text-accent [&_a]:font-medium [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-accent';

/** Stack as plain text: "Kotlin / Jetpack Compose / Room" */
const Stack: React.FC<{ technologies: string[]; className?: string }> = ({ technologies, className = '' }) => (
  <p className={`text-sm leading-relaxed text-text-light ${className}`} aria-label="Built with">
    {technologies.map((tech, i) => (
      <React.Fragment key={tech}>
        {i > 0 && (
          <span aria-hidden="true" className="px-1.5 text-border-dark">
            /
          </span>
        )}
        <span className="text-secondary">{tech}</span>
      </React.Fragment>
    ))}
  </p>
);

/** Small text links for list rows: "Source ↗  Live ↗" */
const RowLinks: React.FC<{ project: Project }> = ({ project }) => {
  const links = [
    project.links.live && { label: 'Live', href: project.links.live },
    project.links.github && { label: 'Source', href: project.links.github },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="flex flex-wrap gap-x-5">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} ${l.label.toLowerCase()} (opens in a new tab)`}
          className="group text-link inline-flex min-h-[44px] items-center gap-1 text-sm"
        >
          {l.label}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-[160ms] ease-[var(--ease-out)] group-focus-visible:translate-x-[2px] group-focus-visible:-translate-y-[2px] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-[2px] [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-[2px]"
          >
            ↗
          </span>
        </a>
      ))}
    </div>
  );
};

/**
 * ProjectFeature
 * The lead project: picture on the left, the story on the right. No card around it.
 */
export const ProjectFeature: React.FC<{ project: Project }> = ({ project }) => {
  const { image } = project;

  return (
    <article className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      <div className="overflow-hidden rounded-md border border-border bg-white lg:col-span-7">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 600px, 100vw"
          width={image.width}
          height={image.height}
          alt={`${project.name} app screens`}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] h-full w-full object-contain"
        />
      </div>

      <div className="lg:col-span-5">
        <p className="text-sm font-semibold text-accent">
          {project.highlight ?? project.platform ?? 'Featured'}
        </p>
        <h3 className="mt-2 text-3xl font-bold">{project.name}</h3>
        <div className={`mt-3 ${descriptionClass}`} dangerouslySetInnerHTML={{ __html: project.description }} />
        <Stack technologies={project.technologies} className="mt-5" />

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
      </div>
    </article>
  );
};

/**
 * ProjectRow
 * One line of the project index: name and platform, what it does, stack and links.
 */
export const ProjectRow: React.FC<{ project: Project }> = ({ project }) => (
  <article className="flex gap-4 py-6 sm:gap-6">
    <div className="w-24 flex-none self-start overflow-hidden rounded border border-border bg-white sm:w-32">
      <img
        src={project.image.src}
        srcSet={project.image.srcSet}
        sizes="128px"
        width={project.image.width}
        height={project.image.height}
        alt=""
        loading="lazy"
        decoding="async"
        className="aspect-video w-full object-cover"
      />
    </div>

    <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <h3 className="text-xl font-bold leading-snug">{project.name}</h3>
        {project.platform && <p className="mt-1 text-sm text-text-light">{project.platform}</p>}
      </div>

      <div
        className={`md:col-span-5 ${descriptionClass} !text-[15px]`}
        dangerouslySetInnerHTML={{ __html: project.description }}
      />

      <div className="md:col-span-4">
        <Stack technologies={project.technologies} />
        <RowLinks project={project} />
      </div>
    </div>
  </article>
);
