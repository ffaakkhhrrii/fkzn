import React, { useEffect, useState } from 'react';
import { cn } from '@/utils';
import { useScrollPosition, useActiveSection } from '@/hooks';
import { MenuIcon, CloseIcon } from '@/components/common';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Communities', href: '#communities' },
  { label: 'Projects', href: '#projects' },
];

const sectionIds = ['home', 'about', 'experience', 'achievements', 'communities', 'projects', 'contact'];

/**
 * Header
 * Sticky bar. Full nav from 1024px; below that a menu button opens a full-width panel.
 */
export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection(sectionIds);
  const isScrolled = scrollY > 8;

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 bg-background/95 backdrop-blur-sm transition-[border-color] duration-200 border-b',
        isScrolled || open ? 'border-border' : 'border-transparent'
      )}
    >
      <nav className="wrap" aria-label="Main">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            onClick={close}
            className="inline-flex min-h-[44px] items-center font-display text-xl font-bold text-primary"
          >
            Fakhri Zain
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative inline-flex min-h-[44px] items-center px-3 text-[15px] font-medium transition-colors',
                    'after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-200',
                    isActive
                      ? 'text-primary after:scale-x-100'
                      : 'text-secondary hover:text-primary after:scale-x-0 hover:after:scale-x-100'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              className="ml-3 inline-flex min-h-[44px] items-center rounded-md bg-accent px-4 text-sm font-semibold text-white transition-[transform,background-color] duration-150 hover:-translate-y-px hover:bg-accent-dark active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Contact
            </a>
          </div>

          {/* Mobile / tablet toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-primary hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="lg:hidden h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background"
      >
        <div className="wrap flex flex-col py-6">
          {[...navItems, { label: 'Contact', href: '#contact' }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className={cn(
                'flex min-h-[56px] items-center border-b border-border font-display text-2xl font-semibold',
                activeSection === item.href.slice(1) ? 'text-accent' : 'text-primary'
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
