import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';
import { GlassButton } from './GlassButton';
import { GithubIcon, ExternalLinkIcon } from './Icons';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard Component
 * Displays a project with 16:9 aspect preview, role, technologies, and action buttons
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <GlassCard hover className="h-full flex flex-col p-5 sm:p-6 border border-border/80 group">
      {/* 16:9 Project Image Preview */}
      {project.images && project.images.length > 0 && (
        <div className="mb-5 aspect-video rounded-md overflow-hidden bg-surface relative border border-border/60">
          <img
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Subtle overlay corner tag */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="glass px-2.5 py-0.5 rounded-[4px] text-[11px] font-mono font-medium text-primary border border-border/80 shadow-xs">
              {project.role}
            </span>
          </div>
        </div>
      )}

      {/* Project Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold text-primary tracking-tight mb-2 group-hover:text-accent transition-colors">
          {project.name}
        </h3>

        <div
          className="text-sm text-text-secondary mb-4 flex-1 leading-relaxed [&_a]:text-primary [&_a]:underline hover:[&_a]:text-accent"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        {/* Technologies Badges */}
        <div className="mb-5 pt-3 border-t border-border/60">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="default" className="text-xs font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links Actions */}
        <div className="flex items-center gap-3 pt-2 mt-auto">
          {project.links.github && (
            <GlassButton
              href={project.links.github}
              external
              variant="primary"
              size="sm"
              className="flex items-center gap-2 text-xs font-mono"
            >
              <GithubIcon size={16} />
              <span>Source Code</span>
            </GlassButton>
          )}
          {project.links.live && (
            <GlassButton
              href={project.links.live}
              external
              variant="accent"
              size="sm"
              className="flex items-center gap-2 text-xs font-mono"
            >
              <ExternalLinkIcon size={16} />
              <span>Live Demo</span>
            </GlassButton>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
