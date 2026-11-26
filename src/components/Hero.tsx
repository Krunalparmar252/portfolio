import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, FileText, Github, Linkedin, Mail, MapPin, Phone, Radio, Activity } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    // Live real-time clock updating every second
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        opacity: 0,
        y: 15,
        duration: 0.5,
      })
        .from(
          '.hero-line',
          {
            y: '70%',
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.35'
        )
        .from(
          metaRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          '-=0.35'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -70, duration: 0.75 });
    } else {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-20 px-4 sm:px-8 max-w-content mx-auto"
    >
      {/* Floating Decorative Hologram Node in Top Right */}
      <div className="absolute top-24 right-6 sm:right-12 hidden lg:flex items-center gap-3 p-3 rounded-xl bg-[#090f28]/80 hairline-royal backdrop-blur-md animate-float-slow shadow-[0_8px_32px_rgba(5,7,20,0.6)]">
        <div className="relative w-8 h-8 rounded-lg bg-royal/10 border border-royal/30 flex items-center justify-center">
          <Activity className="w-4 h-4 text-royal-soft animate-pulse" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono uppercase text-royal-soft font-semibold">Node Status</span>
          <span className="text-[11px] font-mono text-cream/90">Autonomous · Active</span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-8 md:gap-10">
        {/* Eyebrow badge + Live Telemetry HUD */}
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
          <span className="text-white/20 hidden md:inline">/</span>
          {/* Live Telemetry Pill */}
          <span className="hidden md:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-royal/10 border border-royal/30 text-royal-soft text-[10px]">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>LIVE</span>
            <span className="text-white/30">|</span>
            <span className="text-cream/90">{utcTime || '19:48:00 UTC'}</span>
          </span>
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
            I am <ScrambleText text="Krunal Parmar" className="text-cream font-medium" duration={950} />. A computer engineering
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
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-royal text-white font-sans font-medium text-sm transition-all duration-300 hover:bg-royal-deep shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)] cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <a
            href="/portfolio/Krunal_Resume.pdf"
            download="Krunal_Parmar_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-transparent hairline-royal text-cream font-sans text-sm hover:border-royal hover:bg-royal/10 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <FileText className="w-4 h-4 text-royal-soft" />
            <span>Resume (PDF)</span>
          </a>

          <a
            href="mailto:parmarkrunal252@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-transparent hairline text-muted font-sans text-sm hover:text-cream hover:border-white/30 transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-royal-soft" />
            <span>Initiate Contact</span>
          </a>
        </div>
      </div>
    </section>
  );
};
