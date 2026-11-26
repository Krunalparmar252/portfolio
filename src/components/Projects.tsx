import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  FileSearch,
  Filter,
  Layers,
  Search,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  // Active step in Project 1 pipeline simulation
  const [pipelineStep, setPipelineStep] = useState<number>(2);

  // Active step in Project 2 RAG pipeline simulation
  const [ragStep, setRagStep] = useState<'hybrid' | 'llm' | 'eval'>('hybrid');

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

    const isMobile = window.innerWidth < 768;
    const toggle = isMobile ? 'play none none none' : 'play reverse play reverse';

    // GPU-only parallax/morph triggers (no borderRadius paint thrashing)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-row-1',
        {
          y: isMobile ? 16 : 24,
          scale: isMobile ? 0.98 : 0.95,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: toggle,
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: isMobile ? 0.35 : 0.48,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.project-row-2',
        {
          y: isMobile ? 16 : 24,
          scale: isMobile ? 0.98 : 0.95,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: toggle,
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: isMobile ? 0.35 : 0.48,
          ease: 'power3.out',
        }
      );
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
          <span className="font-mono text-xs text-royal tracking-widest uppercase">02</span>
          <span className="w-8 h-[1px] bg-royal/40" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">Selected Projects</span>
        </div>
        <span className="font-mono text-[11px] text-cream/70 uppercase">Curated Works (02)</span>
      </div>

      <div className="flex flex-col gap-24 lg:gap-32">
        {/* ================================================================ */}
        {/* PROJECT 1: Autonomous Cybersecurity Analyst AI */}
        {/* ================================================================ */}
        <div
          ref={card1Ref}
          className="project-row-1 relative group rounded-2xl p-6 sm:p-10 bg-[#11100e]/90 hairline-royal royal-card-transition shadow-2xl overflow-hidden"
          style={
            {
              '--glow-x': '50%',
              '--glow-y': '50%',
            } as React.CSSProperties
          }
        >
          {/* Subtle cursor-following glow border in Royal Blue */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(216, 206, 184, 0.2), transparent 45%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Project Narrative */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-royal-soft tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-royal animate-pulse" />
                  <span>01 // Code Security & AST Intelligence</span>
                </div>
                {/* Live AST Radar Indicator */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-royal/30 bg-royal/10 text-[9px] font-mono text-royal-soft">
                  <div className="relative w-2.5 h-2.5 rounded-full border border-royal/50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_280deg,rgba(232, 223, 208,0.9)_360deg)] animate-radar rounded-full" />
                    <div className="w-0.5 h-0.5 rounded-full bg-cream" />
                  </div>
                  <span>SCANNER LIVE</span>
                </div>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-cream font-normal leading-tight">
                Autonomous Cybersecurity Analyst AI
              </h3>

              <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
                Agentic code-security system combining tree-sitter/AST analysis with LLM reasoning to
                detect complex vulnerabilities and synthesize verified patches.
              </p>

              <div className="flex flex-col gap-2.5 text-xs text-muted/90 font-light">
                <div className="flex items-start gap-2">
                  <span className="text-royal font-mono font-bold">•</span>
                  <span>Four-stage pipeline: ingest → detect → reason → report</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-royal font-mono font-bold">•</span>
                  <span>LangChain and LangGraph orchestration with FastAPI backend</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-royal font-mono font-bold">•</span>
                  <span>Iterative agent loop that autonomously validates and refines proposed fixes</span>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Python', 'FastAPI', 'LangChain', 'LangGraph', 'tree-sitter', 'LLMs'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#191714] hairline-royal text-[11px] font-mono text-royal-soft"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-royal/15 hairline-royal text-royal-soft hover:bg-royal hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-300"
                >
                  <span>Repository (TODO)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cream/70 hover:text-cream transition-colors"
                >
                  <span>Demo View (TODO)</span>
                  <ArrowUpRight className="w-3 h-3 text-royal/60" />
                </a>
              </div>
            </div>

            {/* Right: Interactive 4-Stage Pipeline Diagram & Patch Diff */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Pipeline Interactive Stages */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#141310]/90 hairline-royal flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cream uppercase tracking-wider flex items-center gap-2 font-medium">
                    <Layers className="w-3.5 h-3.5 text-royal-soft" />
                    Agentic Pipeline Graph
                  </span>
                  <span className="text-[10px] text-royal-soft px-2.5 py-0.5 rounded-full bg-royal/20 hairline-royal">
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
                        className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-[#3c3830]/50 border-royal text-cream shadow-[0_0_15px_rgba(216, 206, 184,0.35)]'
                            : 'bg-[#1c1a16]/60 border-white/5 text-muted hover:border-royal/30'
                        }`}
                      >
                        <div className="font-mono text-[10px] text-royal-soft mb-0.5">{stage.label}</div>
                        <div className="text-xs font-medium">{stage.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code-Diff "Patch Proposed" Visual Panel */}
              <div className="rounded-xl bg-[#0c0b0a] hairline-royal overflow-hidden font-mono text-[11px] sm:text-xs">
                <div className="px-4 py-2.5 bg-[#181613] hairline-b flex items-center justify-between text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-cream text-[10px]">app/security/validator.py (AST Diff)</span>
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
                  <div className="bg-emerald-950/40 text-emerald-300 px-2 py-1 rounded flex items-center gap-2">
                    <span>+</span>
                    <span>query = select(Item).where(Item.id == bindparam("id", raw_id))</span>
                  </div>
                  <div className="text-royal-soft/90 pt-2 text-[10px]">
                    ✔ LangGraph agent verified AST node rewrite against tree-sitter Python grammar.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* PROJECT 2: Domain-Specific AI Research Assistant */}
        {/* ================================================================ */}
        <div
          ref={card2Ref}
          className="project-row-2 relative group rounded-2xl p-6 sm:p-10 bg-[#11100e]/90 hairline-royal royal-card-transition shadow-2xl overflow-hidden"
          style={
            {
              '--glow-x': '50%',
              '--glow-y': '50%',
            } as React.CSSProperties
          }
        >
          {/* Subtle cursor-following glow border in Royal Blue */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(216, 206, 184, 0.2), transparent 45%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Interactive RAG Telemetry & Local Architecture Visual */}
            <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-4">
              <div className="rounded-xl bg-[#0c0b0a] hairline-royal overflow-hidden shadow-xl">
                {/* Visual Header */}
                <div className="px-4 py-2.5 bg-[#181613] hairline-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-royal animate-ping" />
                    <span className="font-mono text-[11px] text-cream font-medium">
                      Local RAG Pipeline Telemetry
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#1f1d19] p-1 rounded-lg text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setRagStep('hybrid')}
                      className={`px-2.5 py-0.5 rounded ${
                        ragStep === 'hybrid'
                          ? 'bg-royal text-[#080807] font-semibold'
                          : 'text-muted hover:text-cream'
                      }`}
                    >
                      Hybrid Search
                    </button>
                    <button
                      type="button"
                      onClick={() => setRagStep('llm')}
                      className={`px-2.5 py-0.5 rounded ${
                        ragStep === 'llm'
                          ? 'bg-royal text-[#080807] font-semibold'
                          : 'text-muted hover:text-cream'
                      }`}
                    >
                      DeepSeek-R1
                    </button>
                    <button
                      type="button"
                      onClick={() => setRagStep('eval')}
                      className={`px-2.5 py-0.5 rounded ${
                        ragStep === 'eval'
                          ? 'bg-royal text-[#080807] font-semibold'
                          : 'text-muted hover:text-cream'
                      }`}
                    >
                      RAGAS Eval
                    </button>
                  </div>
                </div>

                {/* Dynamic Content Panel */}
                {ragStep === 'hybrid' && (
                  <div className="p-5 flex flex-col gap-4 font-mono text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#191714] hairline-royal">
                        <span className="text-[10px] text-royal-soft block mb-1">Dense Retrieval</span>
                        <div className="text-cream font-semibold">FAISS Indexing</div>
                        <span className="text-[10px] text-muted">Cosine Embedding Search</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#191714] hairline-royal">
                        <span className="text-[10px] text-royal-soft block mb-1">Sparse Retrieval</span>
                        <div className="text-cream font-semibold">BM25 Lexical</div>
                        <span className="text-[10px] text-muted">Keyword Token Freq</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#141310] hairline flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-cream font-semibold flex items-center gap-1.5">
                          <Filter className="w-3.5 h-3.5 text-royal-soft" />
                          Reciprocal Rank Fusion (RRF)
                        </span>
                        <span className="text-emerald-400 text-[10px]">Rank Boost: +34%</span>
                      </div>
                      <p className="text-[11px] text-muted font-sans font-light leading-relaxed">
                        Combines top-k dense and sparse scores with HyDE query rewriting and cross-encoder reranking
                        to maximize precision over complex tables and scientific figures parsed via Docling.
                      </p>
                    </div>
                  </div>
                )}

                {ragStep === 'llm' && (
                  <div className="p-5 flex flex-col gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-[#191714] hairline-royal flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-royal-soft" />
                        <span className="text-cream font-medium">DeepSeek-R1 (8B) Local</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-royal/20 text-royal-soft text-[10px]">
                        Ollama 4-bit Quantized
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#141310] hairline text-muted leading-relaxed text-[11px]">
                      <span className="text-cream block font-sans font-medium mb-1">
                        Reasoning over Scientific Corpus:
                      </span>
                      "Based on the parsed Docling tables in Section 4.2, the neural attention weights shift dynamically
                      under cross-modal tokenization, reducing sparse query variance by 28.4%."
                    </div>
                  </div>
                )}

                {ragStep === 'eval' && (
                  <div className="p-5 flex flex-col gap-3 font-mono text-xs">
                    <div className="text-[11px] text-cream font-medium flex items-center gap-2 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-royal-soft" />
                      RAGAS-Based Quantitative Evaluation
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#191714] hairline-royal">
                        <span className="text-[10px] text-muted block mb-0.5">Answer Faithfulness</span>
                        <div className="text-xl font-bold text-emerald-400">0.94 / 1.0</div>
                        <span className="text-[9px] text-muted/80">Hallucination Prevention</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#191714] hairline-royal">
                        <span className="text-[10px] text-muted block mb-0.5">Retrieval Relevance</span>
                        <div className="text-xl font-bold text-royal-soft">0.96 / 1.0</div>
                        <span className="text-[9px] text-muted/80">Context Precision</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Project Narrative */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-royal-soft tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-royal animate-pulse" />
                  <span>02 // Local RAG & Scientific NLP</span>
                </div>
                {/* Live Hybrid RRF Indicator */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-royal/30 bg-royal/10 text-[9px] font-mono text-royal-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>RRF 94.2% · OLLAMA LOCAL</span>
                </div>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-cream font-normal leading-tight">
                Domain-Specific AI Research Assistant
              </h3>

              <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
                End-to-end local RAG pipeline enabling conversational querying over private scientific
                research papers using locally deployed, quantized LLMs.
              </p>

              <div className="flex flex-col gap-2.5 text-xs text-muted/90 font-light">
                <div className="flex items-start gap-2">
                  <span className="text-royal font-mono font-bold">•</span>
                  <span>Intelligent PDF ingestion using Docling for structured layout and table parsing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-royal font-mono font-bold">•</span>
                  <span>Hybrid retrieval combining FAISS dense and BM25 sparse search via RRF</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-royal font-mono font-bold">•</span>
                  <span>HyDE query rewriting, cross-encoder reranking, and Ollama 4-bit DeepSeek-R1</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-royal font-mono font-bold">•</span>
                  <span>RAGAS evaluation suite for answer faithfulness and retrieval quality</span>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Python',
                  'Docling',
                  'FAISS',
                  'BM25',
                  'DeepSeek-R1 (8B)',
                  'Ollama',
                  'LangChain',
                  'RAGAS',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#191714] hairline-royal text-[11px] font-mono text-royal-soft"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-royal/15 hairline-royal text-royal-soft hover:bg-royal hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-300"
                >
                  <span>Repository (TODO)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cream/70 hover:text-cream transition-colors"
                >
                  <span>Architecture Docs (TODO)</span>
                  <ArrowUpRight className="w-3 h-3 text-royal/60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
