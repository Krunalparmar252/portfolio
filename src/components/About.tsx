import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BookOpen, Code2, Cpu, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-8 max-w-content mx-auto hairline-t"
    >
      {/* Section mono header */}
      <div className="about-reveal flex items-center justify-between mb-16 sm:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold tracking-widest uppercase">01</span>
          <span className="w-8 h-[1px] bg-gold/30" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">About & Philosophy</span>
        </div>
        <span className="font-mono text-[11px] text-muted hidden sm:inline-block">ARCH // DISCIPLINE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Large Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="about-reveal font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-ivory">
            Bridging algorithmic rigor with <span className="italic text-gold-soft">applied machine intelligence</span> and robust architecture.
          </h2>

          <div className="about-reveal text-muted text-base sm:text-lg font-light leading-relaxed flex flex-col gap-4">
            <p>
              I am a final-year Computer Engineering undergraduate at Birla Vishwakarma Mahavidyalaya,
              focused on the intersection of LLM reasoning, code analysis, and production web systems.
            </p>
            <p>
              Rather than surface-level wrappers, my focus centers on agentic loops with graph-based orchestration,
              AST-aware parsing via Tree-sitter, and performant user interfaces that elevate technical workflows.
            </p>
          </div>

          <div className="about-reveal grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-surface hairline">
              <span className="font-mono text-[10px] text-gold uppercase tracking-wider block mb-1">Focus</span>
              <span className="font-sans text-sm font-medium text-ivory">Applied AI & Systems</span>
            </div>
            <div className="p-4 rounded-lg bg-surface hairline">
              <span className="font-mono text-[10px] text-gold uppercase tracking-wider block mb-1">Institution</span>
              <span className="font-sans text-sm font-medium text-ivory">BVM Engineering</span>
            </div>
            <div className="p-4 rounded-lg bg-surface hairline col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] text-gold uppercase tracking-wider block mb-1">Degree Line</span>
              <span className="font-sans text-sm font-medium text-ivory">B.Tech CE · 2027</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Tenets / Architectural Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="about-reveal p-6 rounded-xl bg-surface hairline hover:border-gold/30 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#3b2a8c]/30 hairline-gold flex items-center justify-center text-gold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-medium text-ivory">Deterministic Verification</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed font-light">
              Coupling non-deterministic LLM generation with deterministic AST validators to prevent hallucinations in mission-critical environments.
            </p>
          </div>

          <div className="about-reveal p-6 rounded-xl bg-surface hairline hover:border-gold/30 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#3b2a8c]/30 hairline-gold flex items-center justify-center text-gold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-medium text-ivory">Agentic Loop Design</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed font-light">
              Iterative, self-correcting agent state graphs using LangGraph and LangChain that reason through complex code vulnerability patches.
            </p>
          </div>

          <div className="about-reveal p-6 rounded-xl bg-surface hairline hover:border-gold/30 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#3b2a8c]/30 hairline-gold flex items-center justify-center text-gold">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-medium text-ivory">Full-Stack Craft</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed font-light">
              From low-level data structures (C++, Python) to high-speed reactive UI layers (React, Next.js, Vite), ensuring end-to-end responsiveness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
