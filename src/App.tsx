import React, { useState, useEffect } from 'react';
import { ThreeBackground } from './components/3d/ThreeBackground';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { CustomCursor } from './components/cursor/CustomCursor';
import { CinematicLoader } from './components/loader/CinematicLoader';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { CategorySection } from './components/categories/CategorySection';
import { EditsGallery } from './components/gallery/EditsGallery';
import { SocialSection } from './components/socials/SocialSection';
import { AboutSection } from './components/about/AboutSection';
import { ToolsSection } from './components/tools/ToolsSection';
import { ContactSection } from './components/contact/ContactSection';
import { ContactModal } from './components/contact/ContactModal';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // ScrollSpy for Active Navigation Tab
  useEffect(() => {
    const sections = ['home', 'categories', 'gallery', 'socials', 'about', 'tools', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreWork = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background text-on-surface selection:bg-primary selection:text-white font-inter">
      {/* Initial High-Tech Cinematic Loader */}
      {loading && <CinematicLoader onComplete={() => setLoading(false)} />}

      {/* Interactive WebGL Shader Background */}
      <ThreeBackground />

      {/* Film Grain Texture */}
      <NoiseOverlay />

      {/* Custom Cinematic Cursor */}
      <CustomCursor />

      {/* Floating Glass Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenHireModal={() => setHireModalOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 w-full">
        {/* 1. Hero Section */}
        <Hero
          onExploreWork={handleExploreWork}
          onContactClick={handleContactClick}
        />

        {/* 2. Explore Work & Specialized Niches */}
        <CategorySection onContactClick={handleContactClick} />

        {/* 3. Live Edits Gallery (3D Curved Film Reel Showcase) */}
        <EditsGallery />

        {/* 4. Official Social Channels, Live Portals & QR Archive */}
        <SocialSection />

        {/* 5. The Editor Behind The Frame (About & Specialties) */}
        <AboutSection onContactClick={handleContactClick} />

        {/* 6. Production Tools (3D Magnetic Arsenal) */}
        <ToolsSection />

        {/* 7. Grand Finale & Contact Section */}
        <ContactSection />
      </main>

      {/* Quick Hire Me Modal */}
      <ContactModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />
    </div>
  );
};
