import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, FileText, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

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
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -70, duration: 1.1 });
    } else {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
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
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e1635]/80 hairline-royal text-royal-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-royal animate-pulse" />
            AI/ML & Software Engineering
          </span>
          <span className="text-white/20">/</span>
          <span className="flex items-center gap-1.5 text-cream/90">
            <MapPin className="w-3.5 h-3.5 text-royal-soft" />
            Nadiad, Gujarat
          </span>
          <span className="text-white/20">/</span>
          <span className="text-cream-soft/90 font-mono">B.Tech CE · 2027</span>
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
              <span className="hero-line block bg-gradient-to-r from-cream via-royal-soft to-royal bg-clip-text text-transparent italic">
                Intelligence & Systems.
              </span>
            </div>
          </h1>
        </div>

        {/* Identity & Subtitle Description */}
        <div ref={metaRef} className="max-w-2xl flex flex-col gap-5">
          <p className="text-base sm:text-lg md:text-xl text-muted font-light leading-relaxed">
            I am <span className="text-cream font-medium">Krunal Parmar</span>. A computer engineering
            undergraduate architecting agentic AI pipelines, tree-sitter AST vulnerability analyzers, and
            local RAG scientific research assistants with production-grade craft.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
            <a
              href="https://github.com/Krunalparmar252"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-royal-soft transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 text-royal" />
              <span className="font-mono text-xs">github.com/Krunalparmar252</span>
            </a>
            <span className="text-white/10 hidden sm:inline">•</span>
            <a
              href="https://linkedin.com/in/krunal-parmar-7287682b5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-royal-soft transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-royal" />
              <span className="font-mono text-xs">LinkedIn</span>
            </a>
            <span className="text-white/10 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-muted font-mono">
              <Phone className="w-3.5 h-3.5 text-royal/80" />
              +91 87993 01121
            </span>
          </div>
        </div>

        {/* Actions / CTA */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-royal text-white font-sans font-medium text-sm transition-all duration-300 hover:bg-royal-deep shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)]"
          >
            <span>Explore Works</span>
            <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <a
            href="./Krunal_Resume.pdf"
            download="Krunal_Parmar_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-surface hairline-cream hover:border-royal text-cream font-sans text-sm font-normal transition-all duration-300 hover:bg-[#121c40]"
          >
            <FileText className="w-4 h-4 text-royal-soft" />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-transparent hover:bg-white/[0.04] text-muted hover:text-cream font-mono text-xs uppercase tracking-wider transition-all duration-200"
          >
            <Mail className="w-3.5 h-3.5 text-royal-soft" />
            <span>Get in Touch</span>
          </button>
        </div>
      </div>

      {/* Decorative vertical rhythm divider */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[9px] tracking-widest uppercase text-muted">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-royal via-royal/40 to-transparent" />
      </div>
    </section>
  );
};
