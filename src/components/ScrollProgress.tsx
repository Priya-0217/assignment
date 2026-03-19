import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (fillRef.current) fillRef.current.style.height = `${Math.min(100, pct)}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1.5">
      <div className="w-px h-28 bg-foreground/10 rounded overflow-hidden">
        <div
          ref={fillRef}
          className="w-full h-0 rounded"
          style={{ background: 'linear-gradient(to bottom, hsl(var(--gold)), transparent)', transition: 'height .1s linear' }}
        />
      </div>
      <span className="font-mono text-[9px] text-foreground/40 tracking-widest [writing-mode:vertical-rl]">scroll</span>
    </div>
  );
}
