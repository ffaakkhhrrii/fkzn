import React from 'react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Footer
 * One line: copyright and social links (Instagram lives only here).
 */
export const Footer: React.FC = () => {
  const { personalInfo, socialLinks } = portfolioData;

  const socials = [
    { name: 'GitHub', icon: GithubIcon, href: socialLinks.github },
    { name: 'LinkedIn', icon: LinkedinIcon, href: socialLinks.linkedin },
    { name: 'Instagram', icon: InstagramIcon, href: socialLinks.instagram },
  ];

  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col-reverse gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-light">
          © {new Date().getFullYear()} {personalInfo.name} · {personalInfo.location}
        </p>
        <ul className="-ml-3 flex items-center gap-1 sm:ml-0 sm:-mr-3">
          {socials.map(({ name, icon: Icon, href }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} (opens in a new tab)`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Icon size={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
