import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on fine pointer devices (desktop) and when reduced motion is not requested
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' });

    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handlePointerMove = (e: PointerEvent) => {
      cursor.style.opacity = '1';
      ring.style.opacity = '1';
      xTo(e.clientX);
      yTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const handlePointerLeave = () => {
      cursor.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // Magnetic interaction on buttons, links, dock items
    const interactiveElements = document.querySelectorAll<HTMLElement>('a, button, [data-dock-item]');
    
    const handleMouseEnter = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'rgba(201, 164, 92, 0.8)', duration: 0.25 });
      gsap.to(cursor, { scale: 0.5, backgroundColor: '#f4efe4', duration: 0.25 });
    };

    const handleMouseLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(201, 164, 92, 0.35)', duration: 0.25 });
      gsap.to(cursor, { scale: 1, backgroundColor: '#c9a45c', duration: 0.25 });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Tiny gold dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#c9a45c] pointer-events-none z-[999] opacity-0 transition-opacity duration-300 hidden md:block"
        aria-hidden="true"
      />
      {/* Outer subtle ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#c9a45c]/35 pointer-events-none z-[998] opacity-0 transition-opacity duration-300 hidden md:block"
        aria-hidden="true"
      />
    </>
  );
};
