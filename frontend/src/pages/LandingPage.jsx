import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import ServicesBento from '@/components/landing/ServicesBento';
import AboutSection from '@/components/landing/AboutSection';
import ProjectGallery from '@/components/landing/ProjectGallery';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/landing/Navigation';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesBento />
      <AboutSection />
      <ProjectGallery />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;