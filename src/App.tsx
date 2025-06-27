import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import BuyPage from '@/pages/BuyPage';
import RentPage from '@/pages/RentPage';
import AgentsPage from '@/pages/AgentsPage';
import LoginPage from '@/pages/LoginPage';
import PublishPage from '@/pages/PublishPage';
import FeaturesPropertiesPage from './pages/FeaturesPropertiesPage';
import ScrollToTop from './ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comprar" element={<BuyPage />} />
            <Route path="/arrendar" element={<RentPage />} />
            <Route path="/agentes" element={<AgentsPage />} />
            <Route path="/publicar" element={<PublishPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/features-properties" element={<FeaturesPropertiesPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;