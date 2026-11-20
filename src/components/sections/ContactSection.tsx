import React, { useState } from 'react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * Contact
 * The closing screen: one line on what to get in touch about, the email, and two profiles.
 */
export const ContactSection: React.FC = () => {
  const { personalInfo, socialLinks } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="wrap">
        <h2 className="max-w-4xl text-[2.25rem] leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
          Want to get in touch? Or just say Hi?
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-secondary">
          I'm always happy to talk, whether it's about something you're building, an opportunity, or a freelance
          project.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-primary px-6 font-semibold text-background transition-[transform,opacity] duration-150 hover:-translate-y-px hover:opacity-90 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {personalInfo.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-border-dark px-5 text-sm font-semibold text-primary transition-[transform,border-color] duration-150 hover:-translate-y-px hover:border-primary active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-w-[11rem]"
          >
            <span aria-live="polite">
              {/* key remounts the label so the new text slides in */}
              <span key={String(copied)} className="inline-block animate-swap">
                {copied ? 'Copied' : 'Copy email address'}
              </span>
            </span>
          </button>
        </div>

        <ul className="mt-6 flex flex-col gap-1 sm:flex-row sm:gap-8">
          {[
            { label: 'Connect on LinkedIn', href: socialLinks.linkedin, Icon: LinkedinIcon },
            { label: 'See my GitHub', href: socialLinks.github, Icon: GithubIcon },
            { label: 'Follow on Instagram', href: socialLinks.instagram, Icon: InstagramIcon },
          ].map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon size={20} />
                <span className="underline decoration-primary/30 underline-offset-4 transition-colors group-hover:decoration-primary">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
