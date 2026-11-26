import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Database, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        {
          y: 26,
          scale: 0.96,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
        }
      );
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
          <span className="font-mono text-xs text-royal tracking-widest uppercase">01</span>
          <span className="w-8 h-[1px] bg-royal/40" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">About & Philosophy</span>
        </div>
        <span className="font-mono text-[11px] text-muted hidden sm:inline-block">ARCH // DISCIPLINE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Large Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="about-reveal font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-ivory">
            Bridging algorithmic rigor with <span className="italic text-royal-soft">applied machine intelligence</span> and robust architecture.
          </h2>

          <div className="about-reveal text-muted text-base sm:text-lg font-light leading-relaxed flex flex-col gap-4">
            <p>
              I am a final-year Computer Engineering undergraduate at Birla Vishwakarma Mahavidyalaya (CGPA: 7.15/10),
              focused on applied AI, agentic systems, and production web systems.
            </p>
            <p>
              I specialize in building deterministic verification loops for LLMs—combining tree-sitter AST parsing with
              LangGraph/LangChain multi-stage agents, and deploying local RAG engines featuring dense/sparse hybrid search
              (FAISS + BM25) and quantized models.
            </p>
          </div>

          <div className="about-reveal grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-surface hairline-cream royal-card-transition">
              <span className="font-mono text-[10px] text-royal uppercase tracking-wider block mb-1">Focus</span>
              <span className="font-sans text-sm font-medium text-cream">Applied AI & Systems</span>
            </div>
            <div className="p-4 rounded-xl bg-surface hairline-cream royal-card-transition">
              <span className="font-mono text-[10px] text-royal uppercase tracking-wider block mb-1">Institution</span>
              <span className="font-sans text-sm font-medium text-cream">BVM Engineering</span>
            </div>
            <div className="p-4 rounded-xl bg-surface hairline-cream royal-card-transition col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] text-royal uppercase tracking-wider block mb-1">Academics</span>
              <span className="font-sans text-sm font-medium text-cream">CGPA 7.15 / 10</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Tenets / Architectural Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="about-reveal p-6 rounded-xl bg-surface hairline-royal royal-card-transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-medium text-cream">Deterministic AST Verification</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed font-light">
              Coupling stochastic LLM reasoning with deterministic Tree-sitter AST validation to reliably detect vulnerabilities and synthesize verified patches.
            </p>
          </div>

          <div className="about-reveal p-6 rounded-xl bg-surface hairline-royal royal-card-transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-medium text-cream">Hybrid RAG & Quantized LLMs</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed font-light">
              Engineering private scientific search engines via FAISS dense + BM25 sparse retrieval, Reciprocal Rank Fusion (RRF), cross-encoders, and quantized local inference.
            </p>
          </div>

          <div className="about-reveal p-6 rounded-xl bg-surface hairline-royal royal-card-transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-medium text-cream">End-to-End System Design</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed font-light">
              From low-level algorithms (C++, Python) to high-speed reactive UI layers (React, Next.js, Vite), ensuring sub-second response times and rock-solid state management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
