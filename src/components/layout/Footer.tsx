import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon, InstagramIcon, EmailIcon } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Footer Component
 * Glassmorphism footer with social links and copyright
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { personalInfo, socialLinks } = portfolioData;

  const socialIcons = [
    {
      name: 'GitHub',
      icon: GithubIcon,
      href: socialLinks.github,
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: socialLinks.linkedin,
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      href: socialLinks.instagram,
    },
    {
      name: 'Email',
      icon: EmailIcon,
      href: `mailto:${personalInfo.email}`,
    },
  ];

  return (
    <footer className="glass-strong mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-white hover:text-primary transition-colors duration-300 inline-block mb-4"
            >
              <span className="font-mono">@fkhri.zain</span>
            </Link>
            <p className="text-text-secondary text-sm md:text-base">
              {personalInfo.title} specializing in application development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/experience"
                  className="text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialIcons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-full p-3 text-white hover:text-primary hover:scale-110 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm text-center md:text-left">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-text-secondary text-sm text-center md:text-right">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
