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
        className="fixed top-0 left-0 w-[460px] h-[460px] -ml-[230px] -mt-[230px] rounded-full bg-[radial-gradient(circle,rgba(216, 206, 184,0.13)_0%,rgba(232, 223, 208,0.06)_40%,transparent_70%)] blur-3xl pointer-events-none z-[2] opacity-0 will-change-transform hidden md:block"
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

        {/* Right-Side Glassmorphic Circular Ring Strip (inspired by editorial chrome layout) */}
        <div className="hidden xl:flex flex-col items-center gap-5 fixed top-24 right-5 px-3 py-5 rounded-2xl bg-gradient-to-b from-white/[0.07] via-[#141310]/50 to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]">
          <div className="relative w-16 h-16 rounded-full border border-cream/35 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-royal-soft/45 animate-spin-slow" />
            <span className="font-funky text-[9px] font-bold tracking-wider text-cream">KRUNAL</span>
            <span className="font-mono text-[8px] text-royal-soft">2027</span>
          </div>
          <div className="relative w-16 h-16 rounded-full border border-royal/40 flex flex-col items-center justify-center text-center">
            <div
              className="absolute inset-0 rounded-full border border-dotted border-cream/35 animate-spin-slow"
              style={{ animationDirection: 'reverse' }}
            />
            <span className="font-funky text-[9px] font-bold tracking-wider text-ivory">AI · ML</span>
            <span className="font-mono text-[8px] text-muted">#0252</span>
          </div>
        </div>
      </div>
    </>
  );
};
