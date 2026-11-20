import React from 'react';
import {
  siBitbucket,
  siCodeigniter,
  siDart,
  siFastapi,
  siFirebase,
  siFlutter,
  siGit,
  siGitlab,
  siGraphql,
  siJavascript,
  siJetpackcompose,
  siKotlin,
  siLangchain,
  siLaravel,
  siMysql,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from 'simple-icons';
import { toolName } from '@/utils';

// Logos from Simple Icons (CC0). Tools without one there get a drawn monogram.
const LOGOS: Record<string, { path: string }> = {
  kotlin: siKotlin,
  dart: siDart,
  java: siOpenjdk,
  javascript: siJavascript,
  php: siPhp,
  python: siPython,
  typescript: siTypescript,
  bitbucket: siBitbucket,
  git: siGit,
  gitlab: siGitlab,
  postgresql: siPostgresql,
  mysql: siMysql,
  firebase: siFirebase,
  codeigniter: siCodeigniter,
  laravel: siLaravel,
  'tailwind css': siTailwindcss,
  'jetpack compose': siJetpackcompose,
  flutter: siFlutter,
  react: siReact,
  fastapi: siFastapi,
  graphql: siGraphql,
  langchain: siLangchain,
};

const MONOGRAMS: Record<string, string> = {
  'c#': 'C#',
  'sql server': 'SQL',
  room: 'Rm',
  playwright: 'Pw',
};

/** "LangChain (LLM application development)" -> "langchain" */
const keyOf = (name: string) => name.replace(/\s*\(.*\)\s*$/, '').trim().toLowerCase();


/**
 * ToolIcon
 * A tool's logo in the current text colour (monochrome, like the rest of the ink),
 * or a two-letter monogram in a rounded square when no logo exists.
 */
export const ToolIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 18 }) => {
  const key = keyOf(name);
  const logo = LOGOS[key];
  if (logo) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={logo.path} />
      </svg>
    );
  }
  const text = MONOGRAMS[key] ?? toolName(name).slice(0, 2);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <text
        x="12"
        y="12.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={text.length > 2 ? 7.5 : 9.5}
        fontWeight="700"
        fontFamily="Inter, system-ui, sans-serif"
        fill="currentColor"
      >
        {text}
      </text>
    </svg>
  );
};
