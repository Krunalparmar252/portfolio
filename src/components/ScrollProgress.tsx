import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      bar.style.transform = `scaleX(${progress})`;
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const handleResize = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      update();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    update();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] pointer-events-none origin-left bg-gradient-to-r from-royal via-cream to-royal-soft will-change-transform"
      style={{
        transform: 'scaleX(0)',
        boxShadow: '0 0 10px rgba(232, 223, 208, 0.75), 0 0 4px rgba(246, 239, 226, 0.9)',
      }}
      aria-hidden="true"
    />
  );
};
