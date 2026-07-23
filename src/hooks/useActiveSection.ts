import { useState, useEffect } from 'react';

/**
 * Custom hook to track which section is currently active in the viewport.
 * Uses IntersectionObserver to detect the section closest to the top of the viewport.
 * @param sectionIds - Array of section IDs to observe
 * @returns The ID of the currently active section
 */
export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible / closest to top
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the entry with the smallest intersection ratio threshold met closest to top
          const topMost = visibleEntries.reduce((closest, entry) => {
            return entry.boundingClientRect.top < closest.boundingClientRect.top
              ? entry
              : closest;
          });
          setActiveSection(topMost.target.id);
        }
      },
      {
        // Trigger when section top reaches ~40% from the top of the viewport
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};
