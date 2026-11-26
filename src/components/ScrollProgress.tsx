import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setProgress(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] pointer-events-none origin-left bg-gradient-to-r from-royal via-cream to-royal-soft transition-transform duration-75 ease-out"
      style={{
        transform: `scaleX(${progress})`,
        boxShadow: '0 0 10px rgba(232, 223, 208, 0.75), 0 0 4px rgba(246, 239, 226, 0.9)',
      }}
      aria-hidden="true"
    />
  );
};
