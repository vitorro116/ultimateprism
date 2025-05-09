
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-prism-accent/20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="/" className="flex items-center">
              <div className="w-6 h-6 mr-2 bg-prism-accent rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-prism-dark rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-prism-accent rounded-sm"></div>
                </div>
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-prism-accent to-prism-accent-2 text-transparent bg-clip-text">
                ULTIMATE PRISM
              </span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <p className="text-xs text-gray-500 mb-2 md:mb-0 md:mr-4">
              УНИВЕРСАЛЬНАЯ СРЕДА ВСЕГО © {new Date().getFullYear()}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-prism-accent text-xs transition-colors">Правила</a>
              <a href="#" className="text-gray-400 hover:text-prism-accent text-xs transition-colors">О проекте</a>
              <a href="#" className="text-gray-400 hover:text-prism-accent text-xs transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
