import React from 'react';
import { MainLayout, ScrollToTop } from './components/layout';

/**
 * App Component
 * Single-page application with scroll-based sections
 */
const App: React.FC = () => {
  return (
    <>
      <MainLayout />
      <ScrollToTop />
    </>
  );
};

export default App;
