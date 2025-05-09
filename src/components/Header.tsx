
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: "ФОРУМ", href: "/forum" },
    { label: "ИВЕНТЫ", href: "/events" },
    { label: "МЕМЫ", href: "/memes" },
    { label: "ЛАБОРАТОРИЯ", href: "/lab" },
    { label: "АРХИВ", href: "/vault" },
    { label: "ПИКСЕЛИ", href: "/pixels" },
    { label: "ПРИСОЕДИНИТЬСЯ", href: "/join", highlight: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-prism-dark/80 border-b border-prism-accent/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <div className="w-8 h-8 mr-2 bg-prism-accent rounded-sm flex items-center justify-center">
              <div className="w-6 h-6 bg-prism-dark rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-prism-accent rounded-sm"></div>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-prism-accent to-prism-accent-2 text-transparent bg-clip-text">
              ULTIMATE PRISM
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className={cn(
                  "text-sm font-medium hover:text-prism-accent transition-colors duration-300 relative overflow-hidden group",
                  item.highlight ? "text-prism-accent-2" : "text-gray-300"
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-prism-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-prism-accent focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-prism-dark/90 backdrop-blur-md border-b border-prism-accent/30">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-3">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className={cn(
                    "text-sm font-medium px-3 py-2 hover:bg-prism-accent/10 rounded-md transition-colors",
                    item.highlight ? "text-prism-accent-2" : "text-gray-300"
                  )}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
