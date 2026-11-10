import React, { useState } from 'react';
import { GithubIcon, LinkedinIcon } from '@/components/common';
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
    <section id="contact" className="bg-primary py-24 text-white md:py-32">
      <div className="wrap">
        <h2 className="max-w-4xl text-[2.25rem] leading-[1.08] font-bold text-white sm:text-5xl lg:text-6xl">
          Have a role or project in mind? Let's talk.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
          Email me with what you're working on. I'm based in {personalInfo.location}.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-white px-6 font-semibold text-primary transition-[transform,background-color] duration-150 hover:-translate-y-px hover:bg-accent-light active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {personalInfo.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition-[transform,border-color] duration-150 hover:-translate-y-px hover:border-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span aria-live="polite">{copied ? 'Copied' : 'Copy email address'}</span>
          </button>
        </div>

        <ul className="mt-6 flex flex-col gap-1 sm:flex-row sm:gap-8">
          {[
            { label: 'Connect on LinkedIn', href: socialLinks.linkedin, Icon: LinkedinIcon },
            { label: 'See my GitHub', href: socialLinks.github, Icon: GithubIcon },
          ].map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Icon size={20} />
                <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white">
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
