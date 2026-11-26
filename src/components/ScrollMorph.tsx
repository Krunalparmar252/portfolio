import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Four distinct 8-point closed organic/geometric shapes in a 400x400 viewBox
const MORPH_SHAPES: number[][] = [
  // Shape 0: Balanced Royal Circle / Sphere
  [200, 45, 310, 90, 355, 200, 310, 310, 200, 355, 90, 310, 45, 200, 90, 90],
  // Shape 1: Elongated Fluid Crest
  [230, 30, 345, 110, 330, 230, 275, 345, 165, 365, 70, 290, 60, 170, 120, 65],
  // Shape 2: Sharp Geometric Diamond / Shield
  [200, 25, 295, 105, 375, 200, 295, 295, 200, 375, 105, 295, 25, 200, 105, 105],
  // Shape 3: Asymmetric Liquid Wave
  [175, 40, 330, 75, 365, 185, 285, 330, 210, 365, 85, 325, 35, 215, 105, 80],
];

/**
 * Builds a smooth closed cubic/quadratic SVG path from 8 [x, y] pairs.
 */
function buildSmoothPath(pts: number[]): string {
  const count = pts.length / 2;
  const coords: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    coords.push([pts[i * 2], pts[i * 2 + 1]]);
  }

  let d = '';
  for (let i = 0; i < count; i++) {
    const curr = coords[i];
    const next = coords[(i + 1) % count];
    const midX = (curr[0] + next[0]) / 2;
    const midY = (curr[1] + next[1]) / 2;
    if (i === 0) {
      const prev = coords[count - 1];
      const startX = (prev[0] + curr[0]) / 2;
      const startY = (prev[1] + curr[1]) / 2;
      d += `M ${startX.toFixed(1)} ${startY.toFixed(1)} `;
    }
    d += `Q ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)} `;
  }
  return d + 'Z';
}

export const ScrollMorph: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const innerPathRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const pathEl = pathRef.current;
    const innerPathEl = innerPathRef.current;
    const wrapperEl = wrapperRef.current;
    if (!pathEl || !innerPathEl || !wrapperEl) return;

    const currentPts = [...MORPH_SHAPES[0]];

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        const segments = MORPH_SHAPES.length - 1;
        const scaled = p * segments;
        const idx = Math.min(segments - 1, Math.floor(scaled));
        const localT = scaled - idx;

        const from = MORPH_SHAPES[idx];
        const to = MORPH_SHAPES[idx + 1];

        for (let i = 0; i < currentPts.length; i++) {
          currentPts[i] = from[i] + (to[i] - from[i]) * localT;
        }

        const d = buildSmoothPath(currentPts);
        pathEl.setAttribute('d', d);
        innerPathEl.setAttribute('d', d);

        // Smoothly drift, scale, and rotate the morphing geometry as user scrolls
        const translateX = Math.sin(p * Math.PI * 2) * 14;
        const translateY = Math.cos(p * Math.PI * 1.5) * 10;
        const rotation = p * 180;
        const scale = 0.92 + Math.sin(p * Math.PI) * 0.25;

        gsap.set(wrapperEl, {
          xPercent: translateX,
          yPercent: translateY,
          rotation,
          scale,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const initialPath = buildSmoothPath(MORPH_SHAPES[0]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden opacity-45"
      aria-hidden="true"
    >
      <div
        ref={wrapperRef}
        className="w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] will-change-transform"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="royalMorphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.24)" />
              <stop offset="50%" stopColor="rgba(96, 165, 250, 0.10)" />
              <stop offset="100%" stopColor="rgba(246, 239, 226, 0.16)" />
            </linearGradient>
            <linearGradient id="royalMorphStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.35)" />
              <stop offset="100%" stopColor="rgba(246, 239, 226, 0.2)" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={initialPath}
            fill="url(#royalMorphGrad)"
            stroke="url(#royalMorphStroke)"
            strokeWidth="1"
            className="blur-[2px]"
          />
          <path
            ref={innerPathRef}
            d={initialPath}
            fill="none"
            stroke="rgba(96, 165, 250, 0.22)"
            strokeWidth="0.75"
            transform="scale(0.84)"
            style={{ transformOrigin: '200px 200px' }}
          />
        </svg>
      </div>
    </div>
  );
};
