
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "ФОРУМ", href: "/forum", highlight: location.pathname.startsWith('/forum') },
    { label: "ИВЕНТЫ", href: "/events" },
    { label: "МЕМЫ", href: "/memes" },
    { label: "ЛАБОРАТОРИЯ", href: "/lab" },
    { label: "АРХИВ", href: "/vault" },
    { label: "ПИКСЕЛИ", href: "/pixels" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-prism-dark/80 border-b border-prism-accent/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 mr-2 bg-prism-accent rounded-sm flex items-center justify-center">
              <div className="w-6 h-6 bg-prism-dark rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-prism-accent rounded-sm"></div>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-prism-accent to-prism-accent-2 text-transparent bg-clip-text">
              ULTIMATE PRISM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                className={cn(
                  "text-sm font-medium hover:text-prism-accent transition-colors duration-300 relative overflow-hidden group",
                  item.highlight ? "text-prism-accent-2" : "text-gray-300"
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-prism-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
            
            {/* Профиль или кнопка авторизации */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 hover:bg-prism-accent/10"
                  >
                    <User size={18} className="text-prism-accent-2" />
                    <span className="text-sm">{profile?.username || 'Профиль'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-prism-dark border-prism-muted/30">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Мой профиль</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-400 focus:text-red-400"
                    onClick={handleSignOut}
                  >
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 hover:bg-prism-accent/10"
                >
                  <LogIn size={18} className="text-prism-accent-2" />
                  <span className="text-sm">Войти</span>
                </Button>
              </Link>
            )}
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
                <Link 
                  key={item.label} 
                  to={item.href}
                  className={cn(
                    "text-sm font-medium px-3 py-2 hover:bg-prism-accent/10 rounded-md transition-colors",
                    item.highlight ? "text-prism-accent-2" : "text-gray-300"
                  )}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Мобильный вариант профиля/авторизации */}
              {user ? (
                <>
                  <Link 
                    to="/profile"
                    className="text-sm font-medium px-3 py-2 hover:bg-prism-accent/10 rounded-md transition-colors text-prism-accent-2 flex items-center"
                    onClick={toggleMobileMenu}
                  >
                    <User size={16} className="mr-2" />
                    Мой профиль
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-medium px-3 py-2 hover:bg-red-900/20 rounded-md transition-colors text-red-400 flex items-center w-full text-left"
                  >
                    <LogOut size={16} className="mr-2" />
                    Выйти
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth"
                  className="text-sm font-medium px-3 py-2 hover:bg-prism-accent/10 rounded-md transition-colors text-prism-accent-2 flex items-center"
                  onClick={toggleMobileMenu}
                >
                  <LogIn size={16} className="mr-2" />
                  Войти / Регистрация
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
