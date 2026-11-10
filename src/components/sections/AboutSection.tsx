import React from 'react';
import { Section } from '@/components/common';
import { portfolioData } from '@/data/portfolio.data';

/**
 * About
 * Bio on the left; education and the tools Fakhri works with on the right.
 */
export const AboutSection: React.FC = () => {
  const { personalInfo, skills, education } = portfolioData;

  const toolGroups = [
    { title: 'Programming Languages', items: skills.programmingLanguages },
    { title: 'Version Control', items: skills.versionControl },
    { title: 'Databases', items: skills.databases },
    { title: 'Frameworks & Libraries', items: skills.frameworks },
    ...(skills.llmTooling?.length ? [{ title: 'LLM Tooling', items: skills.llmTooling }] : []),
    ...(skills.testing?.length ? [{ title: 'Testing', items: skills.testing }] : []),
  ];

  return (
    <Section id="about" title="About Me" subtitle="Get to know me better">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          {personalInfo.bio.split('\n\n').map((para) => (
            <p key={para} className="mb-5 text-lg leading-relaxed text-secondary">
              {para}
            </p>
          ))}

          <h3 className="mt-10 text-xl font-bold">Education</h3>
          <ul className="mt-4 space-y-4">
            {education.map((edu) => (
              <li key={edu.degree}>
                <p className="font-semibold text-primary">{edu.degree}</p>
                <p className="text-base text-secondary">
                  {edu.institution} · {edu.duration}
                  {edu.gpa && edu.gpa !== '-' ? ` · Latest GPA ${edu.gpa}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="text-xl font-bold">Technical Skills</h3>
          <dl className="mt-4 space-y-6">
            {toolGroups.map((group) => (
              <div key={group.title}>
                <dt className="text-sm font-semibold text-text-light">{group.title}</dt>
                <dd className="mt-1.5 text-base leading-relaxed text-primary">
                  {group.items.join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
};
