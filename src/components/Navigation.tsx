import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onScrollTo?: (id: string) => void;
}

export default function Navigation({ onScrollTo }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Functions', id: 'functions' },
    { label: 'Test', id: 'test-result' },
    { label: 'Docs', id: 'how-it-works' },
    { label: 'GitHub', id: 'github' },
  ];

  function handleNavClick(id: string) {
    if (id === 'github') {
      window.open('https://github.com/munc-project', '_blank');
      return;
    }
    onScrollTo?.(id);
    setMobileOpen(false);
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'rgba(5, 5, 5, 0.6)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onScrollTo?.('hero')}
          className="font-pixel text-xl font-bold tracking-widest"
          style={{ color: '#c0fa50', letterSpacing: '0.08em' }}
        >
          mUNC
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-geist font-normal transition-colors duration-300 hover:text-white"
              style={{ color: '#888888' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => handleNavClick('test-result')}
          className="hidden md:block text-sm font-geist font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:bg-white"
          style={{
            backgroundColor: '#c0fa50',
            color: '#050505',
            letterSpacing: '0.04em',
          }}
        >
          Run Test
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: '#ffffff' }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="absolute top-16 left-0 right-0 p-6 md:hidden flex flex-col gap-4"
          style={{
            backgroundColor: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-geist font-normal text-left transition-colors duration-300 hover:text-white"
              style={{ color: '#888888' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('test-result')}
            className="text-sm font-geist font-semibold px-6 py-2 rounded-full mt-2"
            style={{
              backgroundColor: '#c0fa50',
              color: '#050505',
            }}
          >
            Run Test
          </button>
        </div>
      )}
    </nav>
  );
}
