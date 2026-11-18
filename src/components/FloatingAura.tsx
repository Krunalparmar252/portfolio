import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const FloatingAura: React.FC = () => {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable mouse aura on hover-capable fine pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const aura = auraRef.current;
    if (!aura) return;

    // Physics-based damped smooth follow
    const xTo = gsap.quickTo(aura, 'x', { duration: 0.65, ease: 'power2.out' });
    const yTo = gsap.quickTo(aura, 'y', { duration: 0.65, ease: 'power2.out' });

    let isVisible = false;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(aura, { opacity: 1, duration: 0.4 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handlePointerLeave = () => {
      isVisible = false;
      gsap.to(aura, { opacity: 0, duration: 0.4 });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <>
      {/* Ethereal Floating Ambient Aura behind the mouse */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 w-[460px] h-[460px] -ml-[230px] -mt-[230px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.13)_0%,rgba(96,165,250,0.06)_40%,transparent_70%)] blur-3xl pointer-events-none z-[2] opacity-0 will-change-transform hidden md:block"
        aria-hidden="true"
      />

      {/* Floating Spatial Geometric Ambient Indicators */}
      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden hidden lg:block" aria-hidden="true">
        {/* Floating Node 1 - Top Right */}
        <div className="absolute top-[22%] right-[4%] animate-float-slow opacity-30 hover:opacity-70 transition-opacity">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-royal/20 bg-royal/5 backdrop-blur-sm text-[9px] font-mono tracking-widest text-royal-soft/80">
            <span className="w-1 h-1 rounded-full bg-royal animate-pulse" />
            <span>AST // ACTIVE</span>
          </div>
        </div>

        {/* Floating Node 2 - Mid Left */}
        <div className="absolute top-[58%] left-[3%] animate-float-reverse opacity-25 hover:opacity-60 transition-opacity">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-cream/15 bg-cream/5 backdrop-blur-sm text-[9px] font-mono tracking-widest text-cream/70">
            <span className="w-1 h-1 rounded-full bg-cream-soft" />
            <span>RAG // HYBRID</span>
          </div>
        </div>

        {/* Floating Node 3 - Lower Right */}
        <div className="absolute top-[82%] right-[5%] animate-float opacity-20 hover:opacity-60 transition-opacity">
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-full border border-royal/20 bg-royal/5 backdrop-blur-sm text-[8px] font-mono tracking-widest text-royal-soft/70">
            <span>SYS // 60FPS</span>
          </div>
        </div>
      </div>
    </>
  );
};
