import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StatCard {
  value: string;
  suffix: string;
  label: string;
}

const STATS: StatCard[] = [
  { value: '98', suffix: '%', label: 'Client Satisfaction' },
  { value: '4.2', suffix: 'K', label: 'Deliveries' },
  { value: '67', suffix: '%', label: 'Faster Output' },
  { value: '12', suffix: 'x', label: 'ROI Average' },
];

const HEADLINE_CHARS = 'WELCOME ITZFIZZ'.split('');

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const chars = headlineRef.current?.querySelectorAll('.char') ?? [];

    gsap.timeline({ delay: 0.3 })
      .to(chars, {
        y: 0, opacity: 1, rotateX: 0,
        duration: 1, ease: 'power4.out',
        stagger: { amount: 0.9, from: 'start', ease: 'power2.out' },
      })
      .to(subRef.current, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      }, '-=0.4')
      .to(statsRef.current?.querySelectorAll('.stat-card') ?? [], {
        y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.12,
      }, '-=0.3')
      .to(scrollHintRef.current, {
        opacity: 1, duration: 0.8, ease: 'power2.out',
      }, '-=0.2');

    // Parallax orbs
    const parallaxOpts = (y: string, x?: string) => ({
      y, x: x ?? '0%', ease: 'none' as const,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top', end: 'bottom top', scrub: 1.5,
      },
    });
    gsap.to(orb1Ref.current, parallaxOpts('-20%', '5%'));
    gsap.to(orb2Ref.current, parallaxOpts('-15%', '-8%'));
    gsap.to(orb3Ref.current, { y: '-30%', ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });

    // Headline fade on scroll
    gsap.to(headlineRef.current, {
      y: -80, opacity: 0, ease: 'power2.in',
      scrollTrigger: { trigger: heroRef.current, start: 'bottom 70%', end: 'bottom 30%', scrub: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 60%, rgba(100,80,200,.08) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 z-[1] opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
      <div className="absolute inset-0 z-[1]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)' }} />

      {/* Orbs */}
      <div ref={orb1Ref} className="absolute rounded-full pointer-events-none will-change-transform z-[1]"
        style={{ width: 600, height: 600, top: -200, left: -150, background: 'radial-gradient(circle, rgba(201,168,76,.14) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div ref={orb2Ref} className="absolute rounded-full pointer-events-none will-change-transform z-[1]"
        style={{ width: 500, height: 500, bottom: -100, right: -100, background: 'radial-gradient(circle, rgba(100,80,220,.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div ref={orb3Ref} className="absolute rounded-full pointer-events-none will-change-transform z-[1]"
        style={{ width: 300, height: 300, top: '40%', left: '60%', background: 'radial-gradient(circle, rgba(30,180,220,.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Headline */}
      <div className="relative z-10 text-center px-4 mt-[-10vh] md:mt-0">
        <div className="overflow-hidden pb-1">
          <h1
            ref={headlineRef}
            aria-label="WELCOME ITZFIZZ"
            className="font-display text-[clamp(2.5rem,10vw,9rem)] tracking-[0.2em] md:tracking-[0.35em] leading-none text-foreground/90 flex flex-wrap justify-center"
          >
            {HEADLINE_CHARS.map((char, i) => (
              <span
                key={i}
                className="char inline-block will-change-transform"
                style={{ transform: 'translateY(120%) rotateX(-90deg)', opacity: 0, transformOrigin: 'top center' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>
        <p
          ref={subRef}
          className="text-[clamp(.55rem,1.3vw,.85rem)] tracking-[0.3em] md:tracking-[0.45em] uppercase text-gold font-light mt-4 md:mt-5"
          style={{ opacity: 0, transform: 'translateY(20px)', willChange: 'transform, opacity' }}
        >
          Performance Beyond Limits
        </p>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3 md:gap-4 flex-wrap justify-center px-4 w-full max-w-4xl">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="stat-card group relative min-w-[120px] md:min-w-[140px] flex-1 md:flex-none text-center rounded-xl px-4 md:px-6 py-4 md:py-5 overflow-hidden
                       transition-[border-color,transform] duration-300
                       hover:-translate-y-1 hover:scale-[1.02]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              opacity: 0, transform: 'translateY(30px)',
              willChange: 'transform, opacity',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(201,168,76,.06), transparent 60%)' }} />
            <span className="font-display text-[1.8rem] md:text-[2.5rem] tracking-[0.05em] text-gold leading-none block">
              {stat.value}<span className="text-[1.1rem] md:text-[1.4rem]">{stat.suffix}</span>
            </span>
            <span className="text-[9px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase text-foreground/40 mt-1 md:mt-2 block font-light">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-6 right-6 md:right-14 z-10 flex items-center gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-foreground/40"
        style={{ opacity: 0 }}
      >
        <div className="hidden md:block w-10 h-px bg-foreground/40" style={{ animation: 'lineBreath 2.5s ease-in-out infinite' }} />
        Scroll
      </div>
    </section>
  );
}
