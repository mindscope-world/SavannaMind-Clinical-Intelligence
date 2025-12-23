
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'Evidence', id: 'clinical' },
    { name: 'Regulatory', id: 'regulatory' },
    { name: 'About', id: 'about' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || currentPage !== 'home' ? 'bg-medical-dark/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handleLinkClick('home')}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
             <div className="absolute inset-0 bg-white/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
             <img 
               src="https://api.dicebear.com/7.x/initials/svg?seed=SM&backgroundColor=d4af37,22d3ee&fontFamily=Inter&fontWeight=800" 
               className="w-10 h-10 rounded-full border border-medical-gold/30 shadow-lg relative z-10" 
               alt="SavannaMind Logo"
             />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Savanna<span className="text-cyan-400">Mind</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                currentPage === link.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('contact')}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/10"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-0 bg-medical-dark z-[60] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white"><X size={32}/></button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-2xl font-black uppercase tracking-widest ${
                currentPage === link.id ? 'text-cyan-400' : 'text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('contact')}
            className="bg-cyan-500 text-black px-12 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
