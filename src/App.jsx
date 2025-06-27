import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ComprarPage from '@/pages/ComprarPage';
import ArrendasPage from '@/pages/ArrendasPage';
import AgentesPage from '@/pages/AgentesPage';
import LoginPage from '@/pages/LoginPage';
import PublicarPage from '@/pages/PublicarPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comprar" element={<ComprarPage />} />
            <Route path="/arrendar" element={<ArrendasPage />} />
            <Route path="/agentes" element={<AgentesPage />} />
            <Route path="/publicar" element={<PublicarPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;