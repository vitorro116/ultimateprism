
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-0"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-prism-accent/5 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-prism-accent-2/5 blur-[120px] animate-pulse-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-prism-accent via-white to-prism-accent-2 text-transparent bg-clip-text">
              ULTIMATE PRISM
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl font-light mb-6 text-gray-400">
            <span className="text-white neon-text-cyan">Универсальная среда всего</span>
          </p>
          
          <div className="flex flex-col items-center justify-center mt-12 mb-16">
            <div className="relative mb-6 group cursor-pointer w-fit mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-prism-accent to-prism-accent-2 rounded-md blur opacity-30 group-hover:opacity-70 transition-opacity"></div>
              <button className="relative bg-prism-dark px-8 py-4 rounded-md text-white text-xl font-bold">
                ЗАХВАТИТЬ МИР
              </button>
            </div>
            
            <a href="/join" className="flex items-center text-prism-accent hover:text-prism-accent-2 transition-colors mt-4">
              <span className="mr-2">Присоединиться к проекту</span>
              <ArrowRight size={16} />
            </a>
          </div>
          
          <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-prism-accent/50 to-transparent my-16"></div>
          
          <div className="text-center text-sm text-gray-400">
            <p className="mb-1">ДОМИНИРОВАНИЕ НАЧИНАЕТСЯ ЗДЕСЬ</p>
            <p className="uppercase">ver 0.1 alpha</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
