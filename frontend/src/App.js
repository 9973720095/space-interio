import React from 'react';
import { HelmetProvider } from 'react-helmet-async'; // ← CHANGE 1
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import StatsAndGallery from './Components/StatsAndGallery';
import VideoTestimonials from './Components/VideoTestimonials';
import PriceEstimator from './Components/PriceEstimator';
import ProjectPreviewSection from './Components/ProjectPreviewSection';
import Projects from './Pages/Projects';

import Kitchen from './Pages/Kitchen';
import Bedroom from './Pages/Bedroom';
import LivingRoom from './Pages/LivingRoom';
import LegalPage from './Pages/LegalPage';
import ScrollToTop from './Components/ScrollToTop';
import Blogs from './Pages/Blogs';
import BlogDetail from "./Pages/BlogDetail";

function App() {
  return (
    <HelmetProvider> {/* ← CHANGE 2: Wrap karo */}
      <BrowserRouter>
        <ScrollToTop />
        <main className="main-seo-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <StatsAndGallery />
                <VideoTestimonials />
                <PriceEstimator />
                <ProjectPreviewSection />
              </>
            } />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/bedroom" element={<Bedroom />} />
            <Route path="/living" element={<LivingRoom />} />
            <Route path="/privacy-policy" element={<LegalPage type="Privacy Policy" />} />
            <Route path="/terms-conditions" element={<LegalPage type="Terms & Conditions" />} />
            <Route path="/refund-policy" element={<LegalPage type="Refund Policy" />} />
            <Route path="/disclaimer" element={<LegalPage type="Disclaimer" />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;