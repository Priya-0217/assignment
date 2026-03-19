import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OutroSection() {
  const outroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (outroRef.current) {
      const els = outroRef.current.querySelectorAll('[data-reveal]');
      gsap.timeline({
        scrollTrigger: {
          trigger: outroRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }).to(els, {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power3.out', stagger: 0.12,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={outroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-6 md:px-8">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,.08) 0%, transparent 70%)' }} />
      <div className="text-center max-w-2xl relative z-10">
        <p data-reveal className="font-mono text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-gold mb-6 md:mb-8"
          style={{ opacity: 0, transform: 'translateY(20px)' }}>
          Est. 2024
        </p>
        <h2 data-reveal className="font-display text-[clamp(2.2rem,7vw,6rem)] tracking-[0.1em] md:tracking-[0.15em] leading-[1.1] md:leading-none text-foreground"
          style={{ opacity: 0, transform: 'translateY(30px)' }}>
          THE LEGEND<br />CONTINUES
        </h2>
        <p data-reveal className="text-[0.8rem] md:text-sm text-foreground/40 leading-loose mt-5 md:mt-6 font-light"
          style={{ opacity: 0, transform: 'translateY(20px)' }}>
          ItzFizz defines the boundary between art and engineering.<br />
          Every detail obsessed over. Every moment engineered to perfection.
        </p>
        <a
          data-reveal
          href="#"
          className="inline-block mt-8 md:mt-10 px-8 md:px-10 py-3 md:py-3.5 border border-gold rounded font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-gold no-underline hover:bg-gold hover:text-primary-foreground transition-colors duration-300"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          Reserve Yours
        </a>
      </div>
    </section>
  );
}
