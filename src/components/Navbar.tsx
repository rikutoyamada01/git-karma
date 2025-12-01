"use client";

import React, { useState, useEffect } from 'react';
import { Github, Menu, X } from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useNotImplemented } from '@/hooks/useNotImplemented';
import { NotImplementedDialog } from '@/components/ui/NotImplementedDialog';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, featureName, showNotImplemented, closeNotImplemented } = useNotImplemented();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    if (target.startsWith('#')) {
      if (pathname !== '/') {
        router.push('/' + target);
      } else {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
        router.push(target);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen || pathname !== '/'
          ? 'glass-panel border-brand-border shadow-lg' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <NotImplementedDialog isOpen={isOpen} onClose={closeNotImplemented} featureName={featureName} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => handleNavClick('/')}
          >
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <img src="/icon.png" alt="GitKarma Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Git<span className="text-brand-accent">Karma</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => handleNavClick('#features')} className="text-brand-text hover:text-brand-accent transition-colors text-sm font-medium">機能</button>
              <button onClick={() => handleNavClick('#how-it-works')} className="text-brand-text hover:text-brand-accent transition-colors text-sm font-medium">仕組み</button>
              <button onClick={() => handleNavClick('/docs')} className={`transition-colors text-sm font-medium ${pathname === '/docs' ? 'text-brand-accent' : 'text-brand-text hover:text-brand-accent'}`}>ドキュメント</button>
              <button onClick={() => handleNavClick('/guidelines')} className={`transition-colors text-sm font-medium ${pathname === '/guidelines' ? 'text-brand-accent' : 'text-brand-text hover:text-brand-accent'}`}>ガイドライン</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
             <ThemeToggle />
             <button 
                onClick={() => handleNavClick('/login')}
                className="bg-brand-panel hover:bg-brand-panel/80 text-brand-text px-4 py-2 rounded-md border border-brand-border text-sm font-medium flex items-center gap-2 transition-all hover:border-brand-muted shadow-sm"
             >
              <Github className="w-4 h-4" />
              Sign in with GitHub
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-text hover:text-brand-accent p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-brand-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <button onClick={() => handleNavClick('#features')} className="text-left text-brand-text hover:text-brand-accent block px-3 py-2 rounded-md text-base font-medium">機能</button>
            <button onClick={() => handleNavClick('#how-it-works')} className="text-left text-brand-text hover:text-brand-accent block px-3 py-2 rounded-md text-base font-medium">仕組み</button>
             <button onClick={() => handleNavClick('/docs')} className="text-left text-brand-text hover:text-brand-accent block px-3 py-2 rounded-md text-base font-medium">ドキュメント</button>
             <button onClick={() => handleNavClick('/guidelines')} className="text-left text-brand-text hover:text-brand-accent block px-3 py-2 rounded-md text-base font-medium">ガイドライン</button>
            <div className="px-3 py-2">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-brand-muted">Theme:</span>
                    <ThemeToggle />
                </div>
                <button 
                    onClick={() => handleNavClick('/login')}
                    className="w-full bg-brand-panel hover:bg-brand-panel/80 text-brand-text px-4 py-3 rounded-md border border-brand-border text-sm font-medium flex items-center justify-center gap-2 transition-all"
                >
                <Github className="w-4 h-4" />
                Sign in with GitHub
                </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
