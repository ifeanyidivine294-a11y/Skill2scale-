import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Courses', path: '/courses' },
    { label: 'Internship', path: '/internship' },
    { label: 'Monetization', path: '/monetization' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPath === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-[#071A3D]/80 backdrop-blur-md text-white py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0757D5] rounded-lg group"
            aria-label="Skill2Scale Digital Home"
          >
            <img
              src="/images/logo.jpeg"
              alt="Skill2Scale Digital Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded bg-white p-0.5 shadow-xs transition-transform group-hover:scale-[1.02]"
            />
            <div className="flex flex-col">
              <span className={`font-extrabold text-base sm:text-lg tracking-tight leading-none ${
                isScrolled || !isHome ? 'text-[#071A3D]' : 'text-white'
              }`}>
                SKILL2SCALE
              </span>
              <span className={`text-[10px] sm:text-xs font-semibold tracking-widest uppercase ${
                isScrolled || !isHome ? 'text-[#0757D5]' : 'text-blue-300'
              }`}>
                DIGITAL
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3 py-2 text-sm font-medium transition-colors relative cursor-pointer ${
                    isScrolled || !isHome
                      ? isActive
                        ? 'text-[#0757D5] font-semibold'
                        : 'text-slate-700 hover:text-[#0757D5]'
                      : isActive
                        ? 'text-white font-semibold'
                        : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0757D5] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/register')}
              className="inline-flex items-center justify-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('/register')}
              className="bg-[#0757D5] text-white px-3 py-1.5 rounded-md text-xs font-semibold"
            >
              Register
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled || !isHome
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white text-slate-800 border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0757D5] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-100 mt-2 space-y-2">
              <button
                onClick={() => handleNavClick('/register')}
                className="w-full flex items-center justify-center gap-2 bg-[#0757D5] text-white py-3 rounded-lg text-sm font-semibold shadow-sm"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/2349069710687"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk (+2349069710687)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
