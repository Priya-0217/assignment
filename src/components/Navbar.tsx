const NAV_LINKS = ['Performance', 'Design', 'Legacy', 'Reserve'];

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-[900] flex justify-between items-center px-6 md:px-12 py-5 md:py-7"
      style={{ background: 'linear-gradient(to bottom, rgba(8,8,16,.9), transparent)' }}
    >
      <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">ItzFizz</span>
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
    </nav>
  );
}
