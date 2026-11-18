import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.9,
      })
        .from(
          '.hero-line',
          {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            stagger: 0.14,
            ease: 'power4.out',
          },
          '-=0.6'
        )
        .from(
          metaRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.9,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: el, offsetY: 70 },
      ease: 'power3.inOut',
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 px-4 sm:px-8 max-w-content mx-auto"
    >
      <div className="flex flex-col items-start gap-8 md:gap-10">
        {/* Eyebrow badge */}
        <div className="hero-badge flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141124]/60 hairline-gold text-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            AI/ML & Software Engineering
          </span>
          <span className="text-white/20">/</span>
          <span className="flex items-center gap-1 text-muted">
            <MapPin className="w-3.5 h-3.5 text-gold/80" />
            Nadiad, Gujarat, India
          </span>
          <span className="text-white/20">/</span>
          <span className="text-gold-soft/80">B.Tech CE · 2027</span>
        </div>

        {/* Display Headline */}
        <div className="overflow-hidden">
          <h1
            ref={headlineRef}
            className="font-serif font-normal text-[clamp(2.8rem,7.5vw,7.2rem)] leading-[0.98] tracking-[-0.03em] text-ivory"
          >
            <div className="overflow-hidden">
              <span className="hero-line block text-ivory">Engineering Autonomous</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line block bg-gradient-to-r from-gold-soft via-gold to-[#9e7d3b] bg-clip-text text-transparent italic">
                Intelligence & Systems.
              </span>
            </div>
          </h1>
        </div>

        {/* Identity & Subtitle Description */}
        <div ref={metaRef} className="max-w-2xl flex flex-col gap-5">
          <p className="text-base sm:text-lg md:text-xl text-muted font-light leading-relaxed">
            I am <span className="text-ivory font-medium">Krunal Parmar</span>. A computer engineering
            undergraduate architecting agentic AI pipelines, tree-sitter AST vulnerability analyzers, and
            modular full-stack software with relentless craft.
          </p>

          <div className="flex items-center gap-5 text-sm text-muted">
            <a
              href="https://github.com/Krunalparmar252"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 text-gold" />
              <span className="font-mono text-xs">github.com/Krunalparmar252</span>
            </a>
            <span className="text-white/10">•</span>
            <a
              href="https://linkedin.com/in/krunal-parmar-7287682b5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-gold" />
              <span className="font-mono text-xs">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Actions / CTA */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gold text-[#07060d] font-sans font-medium text-sm transition-all duration-300 hover:bg-gold-soft shadow-[0_0_25px_rgba(201,164,92,0.25)] hover:shadow-[0_0_35px_rgba(201,164,92,0.4)]"
          >
            <span>Explore Works</span>
            <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <a
            href="./Krunal_Resume.pdf"
            download="Krunal_Parmar_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-surface hairline hover:border-gold/50 text-ivory font-sans text-sm font-normal transition-all duration-300 hover:bg-[#1f1a36]"
          >
            <FileText className="w-4 h-4 text-gold" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-transparent hover:bg-white/[0.03] text-muted hover:text-ivory font-mono text-xs uppercase tracking-wider transition-all duration-200"
          >
            <Mail className="w-3.5 h-3.5 text-gold/80" />
            <span>Get in Touch</span>
          </button>
        </div>
      </div>

      {/* Decorative vertical rhythm divider */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[9px] tracking-widest uppercase text-muted">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold via-gold/40 to-transparent" />
      </div>
    </section>
  );
};
