import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorRef.current, { x: mouseX, y: mouseY, duration: 0.1 });
    };
    document.addEventListener('mousemove', onMouseMove);

    let rafId: number;
    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      gsap.set(trailRef.current, { x: trailX, y: trailY });
      rafId = requestAnimationFrame(animateTrail);
    };
    animateTrail();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed z-[9999] w-2.5 h-2.5 rounded-full bg-gold pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={trailRef}
        className="fixed z-[9998] w-9 h-9 rounded-full border border-gold/40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform', transition: 'all .35s cubic-bezier(.25,.1,.25,1)' }}
      />
    </>
  );
}
