import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * MainLayout Component
 * Main layout wrapper with header, footer, and content area
 * Handles scroll-to-top on route change
 */
export const MainLayout: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main Content - Add padding-top to account for fixed header */}
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};
