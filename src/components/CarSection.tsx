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
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <span ref={speedNumRef} className="font-display text-[3.5rem] md:text-[5rem] tracking-[0.05em] text-foreground leading-none block">
            000
          </span>
          <span className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">km/h</span>
        </div>

        {/* Copy */}
        <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-20 text-right pointer-events-none">
          <span ref={csLabelRef} className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold block mb-3"
            style={{ opacity: 0 }}>
            Pure Velocity
          </span>
          <div ref={csTitleRef} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] tracking-[0.1em] leading-none text-foreground"
            style={{ opacity: 0 }}>
            BUILT<br />FOR SPEED
          </div>
          <p ref={csDescRef} className="text-[0.85rem] text-foreground/40 mt-4 font-light leading-relaxed max-w-[280px]"
            style={{ opacity: 0 }}>
            Every curve engineered.<br />
            Every millisecond measured.<br />
            Zero compromise.
          </p>
        </div>

        {/* Car */}
        <div
          ref={carWrapRef}
          className="absolute z-10"
          style={{ bottom: '19%', left: '-20%', willChange: 'transform' }}
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 320, height: 40,
              background: 'radial-gradient(ellipse, rgba(201,168,76,.5) 0%, transparent 70%)',
              filter: 'blur(16px)',
              animation: 'glowPulse 1.8s ease-in-out infinite',
            }} />
          <div className="absolute"
            style={{
              right: -180, top: '30%',
              borderLeft: '0px solid transparent',
              borderRight: '160px solid transparent',
              borderBottom: '80px solid rgba(255,240,180,.035)',
              filter: 'blur(3px)',
              transform: 'rotate(-15deg) skewX(-10deg)',
            }} />
          <CarSvg />
        </div>
      </div>
    </section>
  );
}
