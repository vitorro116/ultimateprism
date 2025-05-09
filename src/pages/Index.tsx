
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SectionBoxes from '@/components/SectionBoxes';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SectionBoxes />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
