import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WelcomeScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const word = wordRef.current;
    const quote = quoteRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const portal = portalRef.current;

    if (!container || !sticky || !word || !quote || !scrollIndicator) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          sticky.style.opacity = String(Math.max(0, 1 - self.progress * 1.5));
          if (self.progress > 0.8) {
            sticky.style.pointerEvents = 'none';
          } else {
            sticky.style.pointerEvents = 'auto';
          }
        },
      });
      return () => st.kill();
    }

    // Scroll-driven letter zoom-through animation with immediate response
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        onUpdate: (self) => {
          // Disable pointer events when zooming past threshold
          if (self.progress > 0.88) {
            sticky.style.pointerEvents = 'none';
          } else {
            sticky.style.pointerEvents = 'auto';
          }
        },
      },
    });

    // 1. Quote and scroll indicator fade out & slide down
    tl.to(
      quote,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
        ease: 'power2.in',
        duration: 0.25,
      },
      0
    );

    tl.to(
      scrollIndicator,
      {
        opacity: 0,
        y: 35,
        ease: 'power2.in',
        duration: 0.2,
      },
      0
    );

    // 2. Letters zoom in towards camera, expand, and blunt/blur as they fly through
    tl.to(
      word,
      {
        scale: 40,
        letterSpacing: '0.85em',
        filter: 'blur(22px)',
        transformOrigin: '51% 50%', // Centered right through the letter 'C' aperture
        ease: 'power3.in',
        duration: 0.9,
      },
      0.05
    );

    // 3. Stargate aperture bloom expanding through the center
    if (portal) {
      tl.to(
        portal,
        {
          scale: 22,
          opacity: 0.85,
          duration: 0.85,
          ease: 'power2.in',
        },
        0.08
      );
    }

    // 4. Fade out entire welcome overlay to reveal the main portfolio beneath
    tl.to(
      sticky,
      {
        opacity: 0,
        duration: 0.28,
        ease: 'power1.out',
      },
      0.72
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleEnterClick = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl && window.__lenis) {
      window.__lenis.scrollTo(heroEl, { offset: -70, duration: 0.85 });
    } else if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="welcome-container"
      className="relative w-full h-[210vh] z-30"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050714] select-none"
      >
        {/* Ambient Stargate / Center Aperture Bloom */}
        <div
          ref={portalRef}
          className="absolute w-52 h-52 rounded-full bg-gradient-to-r from-royal/35 via-royal-soft/20 to-cream/15 blur-2xl pointer-events-none opacity-25 will-change-transform"
          aria-hidden="true"
        />

        {/* Subtle Radial Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Main Content Box */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl">
          {/* Subtle Top Badge */}
          <div className="mb-4 sm:mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-royal/30 bg-royal/10 text-royal-soft font-mono text-[10px] sm:text-[11px] uppercase tracking-widest shadow-[0_0_16px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-3 h-3 text-cream animate-pulse" />
            <span>Krunal Parmar · Applied AI & Software Engineering</span>
          </div>

          {/* Massive Display Word: WELCOME */}
          <div
            ref={wordRef}
            onClick={handleEnterClick}
            className="welcome-word font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f6efe2] to-[#60a5fa] drop-shadow-[0_4px_35px_rgba(59,130,246,0.4)] will-change-transform text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14.5rem] leading-none cursor-pointer"
            style={{ transformOrigin: '51% 50%' }}
            title="Click or scroll to enter"
          >
            WELCOME
          </div>

          {/* Quotes Underneath */}
          <div
            ref={quoteRef}
            className="mt-6 sm:mt-8 flex flex-col items-center max-w-xl will-change-transform transition-all"
          >
            <p className="font-serif italic text-base sm:text-xl md:text-2xl text-cream/95 tracking-wide font-normal">
              "Architecting autonomous intelligence, agentic workflows, and resilient systems."
            </p>
            <span className="mt-2.5 font-mono text-[10px] sm:text-xs tracking-widest uppercase text-royal-soft/80">
              Birla Vishvakarma Mahavidyalaya · Computer Engineering · 2027
            </span>
          </div>
        </div>

        {/* Scroll Indication Alert at Bottom */}
        <button
          ref={scrollIndicatorRef}
          onClick={handleEnterClick}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer p-2 focus:outline-none"
          aria-label="Scroll or click to enter portfolio"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e1635]/90 border border-royal/35 backdrop-blur-md shadow-[0_0_24px_rgba(59,130,246,0.25)] group-hover:border-royal/70 group-hover:shadow-[0_0_32px_rgba(59,130,246,0.4)] transition-all duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-royal animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-cream/90 group-hover:text-white transition-colors">
              Scroll to explore
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-royal-soft animate-bounce" />
          </div>

          <div className="w-4 h-7 rounded-full border border-royal/35 flex items-start justify-center p-1 group-hover:border-royal/70 transition-colors">
            <div className="w-1 h-2 rounded-full bg-royal-soft animate-scroll-pill" />
          </div>
        </button>
      </div>
    </div>
  );
};
