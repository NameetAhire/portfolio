import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'projects', name: 'Projects' },
    { id: 'about', name: 'About' },
    { id: 'contact', name: 'Contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-darker/90 backdrop-blur-md shadow-lg border-b border-slate-800/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => handleNavClick('home')} 
          className="text-2xl font-bold font-mono text-primary tracking-tighter hover:text-white transition-colors"
        >
          NA<span className="text-white">.</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-mono transition-colors relative group ${
                activePage === link.id ? 'text-primary' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-primary mr-1 opacity-50 group-hover:opacity-100">/</span>
              {link.name}
              {activePage === link.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-darker border-b border-slate-800 p-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-2 block text-center font-mono text-lg ${
                   activePage === link.id ? 'text-primary' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;