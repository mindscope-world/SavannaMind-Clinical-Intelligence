
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Testimonials from './components/Testimonials.tsx';
import ProductsSection from './components/Products.tsx';
import Stats from './components/Stats.tsx';
import CoreTechnology from './components/CoreTechnology.tsx';
import Footer from './components/Footer.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import SolutionsPage from './pages/SolutionsPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import ClinicalEvidencePage from './pages/ClinicalEvidencePage.tsx';
import RegulatoryPage from './pages/RegulatoryPage.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Stats />
            <CoreTechnology />
            <ProductsSection />
            <Testimonials />
          </>
        );
      case 'products':
        return <ProductsPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'clinical':
        return <ClinicalEvidencePage />;
      case 'regulatory':
        return <RegulatoryPage />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
