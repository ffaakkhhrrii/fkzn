import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { useScrollPosition, useActiveSection, useTheme } from '@/hooks';
import { MenuIcon, CloseIcon, SunIcon, MoonIcon } from '@/components/common';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Communities', href: '#communities' },
  { label: 'Projects', href: '#projects' },
  { label: 'Writing', href: '#writing' },
];

const sectionIds = ['home', 'about', 'experience', 'achievements', 'communities', 'projects', 'writing', 'contact'];

/**
 * Header
 * Sticky bar. Full nav from 1024px; below that a menu button opens a full-width panel.
 */
export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection(sectionIds);
  const isScrolled = scrollY > 8;
  const { theme, toggle: toggleTheme } = useTheme();

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // One underline that slides to the active link. It slides only when moving
  // between links; when it first appears (or on resize) it is placed in position.
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const indicatorShown = useRef(false);

  useLayoutEffect(() => {
    const place = (slide: boolean) => {
      const bar = indicatorRef.current;
      if (!bar) return;
      const link = navRef.current?.querySelector<HTMLAnchorElement>(`a[data-nav][href="#${activeSection}"]`);
      if (!link) {
        bar.style.opacity = '0';
        indicatorShown.current = false;
        return;
      }
      if (link.offsetWidth === 0) return; // desktop nav hidden at this width
      const inset = 12; // matches the links' px-3
      bar.style.transitionProperty = slide && indicatorShown.current ? 'transform, opacity' : 'opacity';
      bar.style.transform = `translateX(${link.offsetLeft + inset}px) scaleX(${link.offsetWidth - inset * 2})`;
      bar.style.opacity = '1';
      indicatorShown.current = true;
    };

    place(true);
    const onResize = () => place(false);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeSection]);

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
            @fkhri.zain
          </a>

          <div className="flex items-center gap-1 lg:gap-3">
            {/* Desktop */}
            <div ref={navRef} className="relative hidden lg:flex items-center gap-1">
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 left-0 h-px w-px origin-left bg-primary opacity-0 transition-[transform,opacity] duration-[250ms] ease-[var(--ease-out)]"
              />
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    data-nav
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex min-h-[44px] items-center px-3 text-[15px] font-medium transition-colors',
                      'after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-200',
                      isActive
                        ? 'text-primary after:scale-x-0'
                        : 'text-secondary hover:text-primary after:scale-x-0 hover:after:scale-x-100'
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
  
            <button
              type="button"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-secondary transition-[color,background-color,transform] duration-150 hover:bg-surface hover:text-primary active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
            >
              {/* key remounts the icon so it turns in on each switch */}
              <span key={theme} className="flex animate-spin-in">
                {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </span>
            </button>
  
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
        </div>
      </nav>

      {/* Mobile / tablet panel */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        hidden={!open}
        className="menu-panel lg:hidden h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background"
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
