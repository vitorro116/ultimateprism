
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-prism-accent to-prism-accent-2 text-transparent bg-clip-text">404</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-prism-accent/50 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 mb-8">Пространство не найдено</p>
          <div className="relative group w-fit mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-prism-accent to-prism-accent-2 rounded-md blur opacity-30 group-hover:opacity-70 transition-all"></div>
            <a 
              href="/" 
              className="relative block bg-prism-dark px-6 py-3 rounded-md text-white"
            >
              Вернуться на главную
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
