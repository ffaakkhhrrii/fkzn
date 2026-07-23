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
 * Displays a project with image, description, technologies, and links
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <GlassCard hover className="h-full flex flex-col">
      {/* Project Image */}
      {project.images && project.images.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.name}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}

      {/* Project Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
          {project.name}
        </h3>

        <p className="text-text-secondary mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Role */}
        <div className="mb-4">
          <span className="text-sm font-medium text-text-secondary">Role: </span>
          <span className="text-sm text-primary">{project.role}</span>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="default">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-auto">
          {project.links.github && (
            <GlassButton
              href={project.links.github}
              external
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </GlassButton>
          )}
          {project.links.live && (
            <GlassButton
              href={project.links.live}
              external
              variant="accent"
              size="sm"
              className="flex items-center gap-2"
            >
              <ExternalLinkIcon size={18} />
              <span>Live Demo</span>
            </GlassButton>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
