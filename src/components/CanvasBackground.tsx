import React, { useEffect, useRef } from 'react';

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle count is balanced for lightweight 60fps performance
    const particleCount = Math.min(40, Math.floor(width / 32));
    const particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      period: number;
      isBlue: boolean;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.6,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        baseAlpha: Math.random() * 0.35 + 0.1,
        period: Math.random() * 2000 + 1000,
        isBlue: Math.random() > 0.3,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Ambient radial glow in royal sapphire
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.15,
        20,
        width * 0.5,
        height * 0.3,
        width * 0.65
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.09)');
      gradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.04)');
      gradient.addColorStop(1, 'rgba(5, 7, 20, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render cosmic particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(now / p.period) * 0.15;
        const currentAlpha = Math.max(0.06, Math.min(0.65, p.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isBlue
          ? `rgba(96, 165, 250, ${currentAlpha})`
          : `rgba(246, 239, 226, ${currentAlpha * 0.9})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Ambient background glows in Royal Blue & Deep Indigo */}
      <div className="royal-glow w-[580px] h-[580px] bg-[#2563eb]/15 top-[-10%] left-[20%]" />
      <div className="royal-glow w-[480px] h-[480px] bg-[#3b82f6]/10 top-[35%] right-[-5%]" />
      <div className="royal-glow w-[620px] h-[620px] bg-[#1e3a8a]/20 bottom-[-10%] left-[-10%]" />
    </div>
  );
};
