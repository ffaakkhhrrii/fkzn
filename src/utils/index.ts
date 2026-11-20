export { cn } from './cn';
export { formatDate, formatDuration } from './formatDate';

/** A tool's display name without a trailing note in brackets:
 *  "LangChain (LLM application development)" -> "LangChain". */
export const toolName = (name: string) => name.replace(/\s*\(.*\)\s*$/, '').trim();
