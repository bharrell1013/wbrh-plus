import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProjectPage from './pages/ProjectPage';
import AboutMePage from './pages/AboutMePage';
import FilmMinorPage from './pages/FilmMinorPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/film-minor" element={<FilmMinorPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;