import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarSvg from './CarSvg';

export default function CarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carWrapRef = useRef<HTMLDivElement>(null);
  const speedNumRef = useRef<HTMLSpanElement>(null);
  const csLabelRef = useRef<HTMLSpanElement>(null);
  const csTitleRef = useRef<HTMLDivElement>(null);
  const csDescRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const vw = () => window.innerWidth;

    const carTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top', end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    carTl
      .to(carWrapRef.current, { x: () => vw() * 0.2, y: -8, rotation: -0.8, ease: 'power1.out', duration: 3 })
      .to(carWrapRef.current, { x: () => vw() * 0.55, y: 0, rotation: 0, ease: 'none', duration: 3 })
      .to(carWrapRef.current, { x: () => vw() * 1.2, y: -12, rotation: -1.2, ease: 'power1.in', duration: 2 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top', end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const speed = Math.round(Math.sin(self.progress * Math.PI) * 280);
        if (speedNumRef.current) speedNumRef.current.textContent = String(speed).padStart(3, '0');
      },
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top+=20% top', end: 'top+=60% top',
      scrub: 1,
      onEnter: () => {
        gsap.to(csLabelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        gsap.to(csTitleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.15 });
        gsap.to(csDescRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 });
      },
      onLeave: () => {
        gsap.to([csLabelRef.current, csTitleRef.current, csDescRef.current], {
          opacity: 0, y: -20, duration: 0.5, stagger: 0.08,
        });
      },
      onEnterBack: () => {
        gsap.to([csLabelRef.current, csTitleRef.current, csDescRef.current], {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
        });
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center" style={{ willChange: 'transform' }}>
        {/* Road */}
        <div className="absolute bottom-[20%] inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.06) 20%, rgba(255,255,255,.06) 80%, transparent 100%)' }} />
        <div className="absolute inset-x-0 h-16"
          style={{ bottom: 'calc(20% - 30px)', background: 'linear-gradient(to top, rgba(201,168,76,.04), transparent)' }} />

        {/* Speed */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20">
          <span ref={speedNumRef} className="font-display text-[2.8rem] md:text-[5rem] tracking-[0.05em] text-foreground leading-none block">
            000
          </span>
          <span className="font-mono text-[9px] md:text-[11px] tracking-[0.3em] text-gold uppercase">km/h</span>
        </div>

        {/* Copy */}
        <div className="absolute right-6 md:right-16 top-[30%] md:top-1/2 -translate-y-1/2 z-20 text-right pointer-events-none w-[70%] md:w-auto">
          <span ref={csLabelRef} className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-gold block mb-2 md:mb-3"
            style={{ opacity: 0 }}>
            Pure Velocity
          </span>
          <div ref={csTitleRef} className="font-display text-[clamp(1.8rem,5vw,4.5rem)] tracking-[0.1em] leading-tight md:leading-none text-foreground"
            style={{ opacity: 0 }}>
            BUILT<br />FOR SPEED
          </div>
          <p ref={csDescRef} className="text-[0.75rem] md:text-[0.85rem] text-foreground/40 mt-3 md:mt-4 font-light leading-relaxed max-w-[200px] md:max-w-[280px] ml-auto"
            style={{ opacity: 0 }}>
            Every curve engineered.<br />
            Every millisecond measured.<br />
            Zero compromise.
          </p>
        </div>

        {/* Car */}
        <div
          ref={carWrapRef}
          className="absolute z-10 scale-[0.7] md:scale-100 origin-bottom"
          style={{ bottom: '19%', left: '-20%', willChange: 'transform' }}
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 280, height: 35,
              background: 'radial-gradient(ellipse, rgba(201,168,76,.5) 0%, transparent 70%)',
              filter: 'blur(16px)',
              animation: 'glowPulse 1.8s ease-in-out infinite',
            }} />
          <div className="absolute hidden md:block"
            style={{
              right: -180, top: '30%',
              borderLeft: '0px solid transparent',
              borderRight: '160px solid transparent',
              borderBottom: '80px solid rgba(255,240,180,.035)',
              filter: 'blur(3px)',
              transform: 'rotate(-15deg) skewX(-10deg)',
            }} />
          <div className="scale-[0.85] md:scale-100">
            <CarSvg />
          </div>
        </div>
      </div>
    </section>
  );
}
