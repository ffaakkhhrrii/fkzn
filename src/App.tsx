import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout, ScrollToTop } from './components/layout';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Achievements = React.lazy(() => import('./pages/Achievements'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

/**
 * App Component
 * Main application component with routing configuration
 */
const App: React.FC = () => {
  return (
    <>
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="glass-strong rounded-2xl p-8">
              <div className="animate-pulse text-center">
                <div className="text-4xl font-bold text-primary mb-4">@fkhri.zain</div>
                <div className="text-text-secondary">Loading...</div>
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experience />} />
            <Route path="projects" element={<Projects />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>

      <ScrollToTop />
    </>
  );
};

export default App;
