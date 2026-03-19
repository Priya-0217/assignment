import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = ['Performance', 'Design', 'Legacy', 'Reserve'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-[900] flex justify-between items-center px-6 md:px-12 py-5 md:py-7"
      style={{ background: 'linear-gradient(to bottom, rgba(8,8,16,.9), transparent)' }}
    >
      <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">ItzFizz</span>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10 list-none">
        {NAV_LINKS.map(link => (
          <li key={link}>
            <a
              href="#"
              className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 no-underline hover:text-gold transition-colors duration-300"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-gold"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-background/95 backdrop-blur-lg z-[-1] transition-transform duration-500 md:hidden
        ${isOpen ? 'translate-y-0' : '-translate-y-full'}
      `}>
        <ul className="flex flex-col items-center justify-center h-full gap-8 list-none">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-lg tracking-[0.2em] uppercase text-foreground/60 no-underline hover:text-gold transition-colors duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
