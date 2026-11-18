import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CheckCircle2, ChevronRight, Cpu, GitCommit, Layers, Play, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  // Active step in Project 1 pipeline simulation
  const [pipelineStep, setPipelineStep] = useState<number>(2);

  // Active tab in Project 2 mock
  const [activeTab, setActiveTab] = useState<'metrics' | 'assistant'>('metrics');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const setupCursorGlow = (el: HTMLDivElement | null) => {
      if (!el) return;
      const xTo = gsap.quickTo(el, '--glow-x', { duration: 0.2, ease: 'power2' });
      const yTo = gsap.quickTo(el, '--glow-y', { duration: 0.2, ease: 'power2' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };

      el.addEventListener('mousemove', onMouseMove);
      return () => el.removeEventListener('mousemove', onMouseMove);
    };

    const cleanup1 = setupCursorGlow(card1Ref.current);
    const cleanup2 = setupCursorGlow(card2Ref.current);

    // Parallax scroll triggers
    const ctx = gsap.context(() => {
      gsap.from('.project-row-1', {
        scrollTrigger: {
          trigger: card1Ref.current,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.project-row-2', {
        scrollTrigger: {
          trigger: card2Ref.current,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => {
      cleanup1?.();
      cleanup2?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-8 max-w-content mx-auto hairline-t"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-16 sm:mb-24">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold tracking-widest uppercase">02</span>
          <span className="w-8 h-[1px] bg-gold/30" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">Featured Projects</span>
        </div>
        <span className="font-mono text-[11px] text-muted uppercase">Curated Works (02)</span>
      </div>

      <div className="flex flex-col gap-24 lg:gap-32">
        {/* ================================================================ */}
        {/* PROJECT 1: Autonomous Cybersecurity Analyst AI */}
        {/* ================================================================ */}
        <div
          ref={card1Ref}
          className="project-row-1 relative group rounded-2xl p-6 sm:p-10 bg-[#0c0a17]/90 hairline transition-all duration-500 hover:border-gold/40 shadow-2xl overflow-hidden"
          style={
            {
              '--glow-x': '50%',
              '--glow-y': '50%',
            } as React.CSSProperties
          }
        >
          {/* Subtle cursor-following glow border */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(201, 164, 92, 0.15), transparent 40%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Project Narrative */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-2 font-mono text-[11px] text-gold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>01 // Code Intelligence</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight">
                Autonomous Cybersecurity Analyst AI
              </h3>

              <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
                Agentic code-security system combining tree-sitter/AST analysis with LLM reasoning to
                detect complex vulnerabilities and synthesize verified patches.
              </p>

              <div className="flex flex-col gap-2.5 text-xs text-muted/90 font-light">
                <div className="flex items-start gap-2">
                  <span className="text-gold font-mono">•</span>
                  <span>Four-stage pipeline: ingest → detect → reason → report</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gold font-mono">•</span>
                  <span>LangChain and LangGraph orchestration with FastAPI backend</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gold font-mono">•</span>
                  <span>Iterative agent loop that autonomously validates and refines proposed fixes</span>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Python', 'FastAPI', 'LangChain', 'LangGraph', 'tree-sitter', 'LLMs'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-[#161228] hairline text-[11px] font-mono text-gold-soft/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                {/* TODO: Add live GitHub repo / demo URL */}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold/15 hairline-gold text-gold hover:bg-gold hover:text-[#07060d] text-xs font-mono uppercase tracking-wider transition-all duration-300"
                >
                  <span>Repository (TODO)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ivory transition-colors"
                >
                  <span>Demo View (TODO)</span>
                  <ArrowUpRight className="w-3 h-3 text-gold/60" />
                </a>
              </div>
            </div>

            {/* Right: Interactive 4-Stage Pipeline Diagram & Patch Diff */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Pipeline Interactive Stages */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#120f22]/90 hairline flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-gold" />
                    Agentic Pipeline Graph
                  </span>
                  <span className="text-[10px] text-gold px-2 py-0.5 rounded bg-gold/10 hairline-gold">
                    State: Autonomous
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {[
                    { id: 0, label: '01. Ingest', desc: 'AST & Sitter' },
                    { id: 1, label: '02. Detect', desc: 'Rule Taint' },
                    { id: 2, label: '03. Reason', desc: 'Graph Agent' },
                    { id: 3, label: '04. Report', desc: 'Diff & Patch' },
                  ].map((stage) => {
                    const isActive = pipelineStep === stage.id;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setPipelineStep(stage.id)}
                        className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-[#211a3d] border-gold text-ivory shadow-[0_0_15px_rgba(201,164,92,0.2)]'
                            : 'bg-[#141026]/60 border-white/5 text-muted hover:border-white/20'
                        }`}
                      >
                        <div className="font-mono text-[10px] text-gold-soft mb-0.5">{stage.label}</div>
                        <div className="text-xs font-medium">{stage.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code-Diff "Patch Proposed" Visual Panel */}
              <div className="rounded-xl bg-[#090812] hairline overflow-hidden font-mono text-[11px] sm:text-xs">
                <div className="px-4 py-2.5 bg-[#141024] hairline-b flex items-center justify-between text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-gold-soft text-[10px]">app/security/validator.py (AST Diff)</span>
                  </div>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Fix Verified
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-1.5 leading-relaxed overflow-x-auto text-left">
                  <div className="text-muted/60">// AST Pattern: Insecure Deserialization / Injection Flag</div>
                  <div className="bg-red-950/40 text-red-300 px-2 py-1 rounded flex items-center gap-2 line-through opacity-75">
                    <span>-</span>
                    <span>user_query = f"SELECT * FROM items WHERE id = &#123;raw_id&#125;"</span>
                  </div>
                  <div className="bg-green-950/40 text-green-300 px-2 py-1 rounded flex items-center gap-2">
                    <span>+</span>
                    <span>query = select(Item).where(Item.id == bindparam("id", raw_id))</span>
                  </div>
                  <div className="text-gold-soft/80 pt-2 text-[10px]">
                    ✔ LangGraph agent verified AST node rewrite against tree-sitter Python grammar.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* PROJECT 2: DevBoard AI */}
        {/* ================================================================ */}
        <div
          ref={card2Ref}
          className="project-row-2 relative group rounded-2xl p-6 sm:p-10 bg-[#0c0a17]/90 hairline transition-all duration-500 hover:border-gold/40 shadow-2xl overflow-hidden"
          style={
            {
              '--glow-x': '50%',
              '--glow-y': '50%',
            } as React.CSSProperties
          }
        >
          {/* Subtle cursor-following glow border */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(201, 164, 92, 0.15), transparent 40%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Stylised Dashboard Mock (HTML/CSS/SVG) */}
            <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-4">
              <div className="rounded-xl bg-[#090812] hairline overflow-hidden shadow-xl">
                {/* Dashboard Mock Window Bar */}
                <div className="px-4 py-2.5 bg-[#141024] hairline-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span className="font-mono text-[11px] text-ivory font-medium">DevBoard AI Workspace</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#1a1432] p-1 rounded-md text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveTab('metrics')}
                      className={`px-2 py-0.5 rounded ${
                        activeTab === 'metrics' ? 'bg-gold text-[#07060d] font-semibold' : 'text-muted'
                      }`}
                    >
                      Telemetry
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('assistant')}
                      className={`px-2 py-0.5 rounded ${
                        activeTab === 'assistant' ? 'bg-gold text-[#07060d] font-semibold' : 'text-muted'
                      }`}
                    >
                      Assistant
                    </button>
                  </div>
                </div>

                {/* Dashboard Viewport */}
                {activeTab === 'metrics' ? (
                  <div className="p-5 flex flex-col gap-4">
                    {/* Activity Stat Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-[#141126] hairline">
                        <span className="font-mono text-[10px] text-muted block mb-1">Velocity</span>
                        <span className="font-mono text-base font-semibold text-ivory">94.2%</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#141126] hairline">
                        <span className="font-mono text-[10px] text-muted block mb-1">Active Sprints</span>
                        <span className="font-mono text-base font-semibold text-gold">4 Active</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#141126] hairline">
                        <span className="font-mono text-[10px] text-muted block mb-1">AI Copilot</span>
                        <span className="font-mono text-base font-semibold text-green-400">Online</span>
                      </div>
                    </div>

                    {/* SVG Activity Visualization Waveform */}
                    <div className="p-4 rounded-lg bg-[#141126] hairline flex flex-col gap-2">
                      <div className="flex justify-between items-center font-mono text-[10px] text-muted">
                        <span>Sprint Velocity & Commit Density (Anime.js Visualizer)</span>
                        <span className="text-gold">Peak: +42 commits/wk</span>
                      </div>
                      <svg viewBox="0 0 400 90" className="w-full h-20 overflow-visible">
                        <defs>
                          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c9a45c" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#c9a45c" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,70 Q40,30 80,50 T160,20 T240,45 T320,15 T400,35 L400,90 L0,90 Z"
                          fill="url(#goldGrad)"
                        />
                        <path
                          d="M0,70 Q40,30 80,50 T160,20 T240,45 T320,15 T400,35"
                          fill="none"
                          stroke="#c9a45c"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="320" cy="15" r="4" fill="#f4efe4" stroke="#c9a45c" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Active Project Tracking List */}
                    <div className="flex flex-col gap-2">
                      <div className="font-mono text-[10px] text-muted tracking-wider uppercase">
                        Tracked Repositories
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#16122a] hairline text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-3.5 h-3.5 text-gold" />
                          <span className="text-ivory">core-security-engine</span>
                        </div>
                        <span className="text-green-400 text-[10px]">CI Passed</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#16122a] hairline text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-3.5 h-3.5 text-gold" />
                          <span className="text-ivory">agent-dashboard-ui</span>
                        </div>
                        <span className="text-gold text-[10px]">Staging</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Assistant Conversation Panel */
                  <div className="p-5 flex flex-col gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-[#151228] hairline text-muted">
                      <span className="text-gold block mb-1 text-[10px]">Developer Query</span>
                      "Summarize telemetry anomalies in sprint 12 and suggest load balancing adjustments."
                    </div>
                    <div className="p-3 rounded-lg bg-[#1c1638] hairline-gold text-ivory flex flex-col gap-2">
                      <span className="text-gold-soft flex items-center gap-1.5 text-[10px]">
                        <Sparkles className="w-3 h-3 text-gold" /> DevBoard Assistant
                      </span>
                      <p className="text-[11px] leading-relaxed text-muted">
                        Analysis complete: API latency spiked by 18% during peak webhook ingestion.
                        Recommended action: migrate async jobs to FastAPI background tasks or Celery queue.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Project Narrative */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6">
              <div className="flex items-center gap-2 font-mono text-[11px] text-gold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>02 // Developer Productivity</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-normal leading-tight">
                DevBoard AI
              </h3>

              <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
                AI-enabled developer productivity dashboard with automated project tracking, animated activity
                visualizations, and an integrated assistant copilot.
              </p>

              <div className="flex flex-col gap-2.5 text-xs text-muted/90 font-light">
                <div className="flex items-start gap-2">
                  <span className="text-gold font-mono">•</span>
                  <span>Modular component architecture built with Next.js, React, and Tailwind CSS</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gold font-mono">•</span>
                  <span>Kinetic visualizers driven by Anime.js for smooth data render cycles</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gold font-mono">•</span>
                  <span>Interactive assistant panel for query answering and workflow telemetry</span>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Next.js', 'Tailwind CSS', 'Anime.js', 'React'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-[#161228] hairline text-[11px] font-mono text-gold-soft/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                {/* TODO: Add live GitHub repo / demo URL */}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold/15 hairline-gold text-gold hover:bg-gold hover:text-[#07060d] text-xs font-mono uppercase tracking-wider transition-all duration-300"
                >
                  <span>Repository (TODO)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ivory transition-colors"
                >
                  <span>Preview (TODO)</span>
                  <ArrowUpRight className="w-3 h-3 text-gold/60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
