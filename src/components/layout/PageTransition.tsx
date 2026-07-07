import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition Component
 * Wrapper for page content with fade-in animation
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};
