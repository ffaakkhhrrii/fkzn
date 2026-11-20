import React from 'react';
import { Section, ToolIcon } from '@/components/common';
import { toolName } from '@/utils';
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
    <Section id="about" title="About Me">
      <div className="max-w-2xl">
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

        <h3 className="mt-10 text-xl font-bold">Tools I use</h3>
        <dl className="mt-4 space-y-5">
          {toolGroups.map((group) => (
            <div key={group.title}>
              <dt className="text-sm font-semibold text-text-light">{group.title}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-light py-1.5 pl-2 pr-3 text-sm font-medium text-primary"
                    >
                      <ToolIcon name={item} />
                      {toolName(item)}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
};
