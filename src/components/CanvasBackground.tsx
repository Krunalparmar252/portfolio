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

    // Particle count is low for lightweight 60fps performance
    const particleCount = Math.min(36, Math.floor(width / 35));
    const particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      period: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.6,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        alpha: Math.random() * 0.4 + 0.1,
        baseAlpha: Math.random() * 0.35 + 0.1,
        period: Math.random() * 2000 + 1000,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient glow near top center
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.15,
        10,
        width * 0.5,
        height * 0.25,
        width * 0.6
      );
      gradient.addColorStop(0, 'rgba(59, 42, 140, 0.08)');
      gradient.addColorStop(0.5, 'rgba(201, 164, 92, 0.03)');
      gradient.addColorStop(1, 'rgba(7, 6, 13, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render gold particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(now / p.period) * 0.15;
        const currentAlpha = Math.max(0.05, Math.min(0.65, p.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 164, 92, ${currentAlpha})`;
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
      {/* Ambient background glows */}
      <div className="royal-glow w-[550px] h-[550px] bg-[#3b2a8c]/15 top-[-10%] left-[20%]" />
      <div className="royal-glow w-[480px] h-[480px] bg-[#c9a45c]/08 top-[35%] right-[-5%]" />
      <div className="royal-glow w-[600px] h-[600px] bg-[#1a113a]/25 bottom-[-10%] left-[-10%]" />
    </div>
  );
};
