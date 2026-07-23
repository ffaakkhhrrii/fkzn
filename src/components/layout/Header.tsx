import React, { useState } from 'react';
import { cn } from '@/utils';
import { useScrollPosition, useIsMobile, useActiveSection } from '@/hooks';
import { MenuIcon, CloseIcon } from '@/components/common';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
];

/**
 * Header Component
 * Glassmorphism navbar with anchor navigation, scroll-based active state, and mobile menu
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isMobile = useIsMobile();

  const sectionIds = navItems.map((item) => item.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds);

  const isScrolled = scrollY > 50;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'glass-strong shadow-lg' : 'glass-subtle'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <a
            href="#home"
            className="text-2xl md:text-3xl font-bold text-primary hover:text-secondary transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            Fakhri Zain
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const itemId = item.href.replace('#', '');
              const isActive = activeSection === itemId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 font-medium transition-all duration-300',
                    'hover:text-secondary',
                    isActive ? 'text-primary' : 'text-text-secondary'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden glass rounded-lg p-2 text-primary hover:text-secondary transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <CloseIcon size={24} />
            ) : (
              <MenuIcon size={24} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <div
            className={cn(
              'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
              isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
            )}
          >
            <div className="flex flex-col space-y-2 pt-2">
              {navItems.map((item) => {
                const itemId = item.href.replace('#', '');
                const isActive = activeSection === itemId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'relative px-4 py-3 font-medium transition-all duration-300',
                      'hover:text-secondary',
                      isActive ? 'text-primary' : 'text-text-secondary'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
