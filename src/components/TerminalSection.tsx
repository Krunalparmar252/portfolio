import React, { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, RefreshCw, Terminal as TerminalIcon } from 'lucide-react';

type TerminalLine = {
  type: 'input' | 'output' | 'system';
  content: string | React.ReactNode;
};

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: 'system',
      content:
        'Royal Terminal Simulator v2.1 initialized [Theme: Royal Azure]. Type "help" or click a command below to explore system telemetry.',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    let output: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-muted">
            <div className="text-royal-soft font-semibold mb-1">Available System Commands:</div>
            <div>• <span className="text-cream font-mono">about</span> — System overview & engineer biography</div>
            <div>• <span className="text-cream font-mono">projects</span> — Inspect Autonomous Cybersecurity Analyst AI & Domain-Specific AI Research Assistant</div>
            <div>• <span className="text-cream font-mono">experience</span> — Industry internships at BrainyBeam & Amul</div>
            <div>• <span className="text-cream font-mono">skills</span> — Full-stack & AI technical stack breakdown</div>
            <div>• <span className="text-cream font-mono">education</span> — B.Tech Computer Engineering (CGPA 7.15) & honors</div>
            <div>• <span className="text-cream font-mono">contact</span> — Email, phone, LinkedIn, and GitHub channels</div>
            <div>• <span className="text-cream font-mono">clear</span> — Wipe current terminal viewport</div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-muted leading-relaxed">
            <span className="text-cream font-medium">Krunal Parmar</span> (Final-year B.Tech CE, 2027 at Birla Vishwakarma Mahavidyalaya | CGPA: 7.15/10).
            Focused on applied AI, tree-sitter AST vulnerability analyzers, hybrid RAG pipelines, and high-performance interactive web systems.
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="flex flex-col gap-2.5 text-muted">
            <div>
              <span className="text-cream font-semibold">1. Autonomous Cybersecurity Analyst AI:</span>
              <p className="text-xs text-cream/80">
                Agentic code-security engine combining tree-sitter AST parsing with LangGraph/LangChain reasoning.
                Four-stage pipeline: ingest → detect → reason → report with verified patch generation.
              </p>
            </div>
            <div>
              <span className="text-cream font-semibold">2. Domain-Specific AI Research Assistant:</span>
              <p className="text-xs text-cream/80">
                Local RAG pipeline over private scientific research papers using Docling structured parsing,
                FAISS dense + BM25 sparse hybrid retrieval via RRF, HyDE query rewriting, and 4-bit DeepSeek-R1 (8B) via Ollama with RAGAS evaluation.
              </p>
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="flex flex-col gap-2 text-muted">
            <div>
              <span className="text-cream font-semibold">• BrainyBeam Info-Tech Pvt. Ltd. (May-Jun 2026):</span>
              <p className="text-xs">Full Stack Development Intern — practical exposure to full-stack application architecture and workflows.</p>
            </div>
            <div>
              <span className="text-cream font-semibold">• Amul (Jun 2025):</span>
              <p className="text-xs">Software Development Intern — built customer-care platform using React.js, Firebase, Vite, and RBAC.</p>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="flex flex-col gap-1 text-muted text-xs">
            <div><span className="text-royal-soft font-semibold">Languages:</span> Python, C++, Java, C, SQL</div>
            <div><span className="text-royal-soft font-semibold">AI & Data:</span> NumPy, pandas, scikit-learn, LLMs, LangChain, LangGraph, FAISS, BM25, RAGAS</div>
            <div><span className="text-royal-soft font-semibold">Backend:</span> FastAPI, Firebase, tree-sitter/AST analysis, Git, GitHub</div>
            <div><span className="text-royal-soft font-semibold">Frontend:</span> React.js, Next.js, Tailwind CSS, Vite, Anime.js</div>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="text-muted text-xs leading-relaxed">
            <div className="text-cream font-medium">B.Tech in Computer Engineering (2023 - 2027)</div>
            <div>Birla Vishwakarma Mahavidyalaya, Vallabh Vidyanagar, Gujarat | CGPA: 7.15/10</div>
            <div className="mt-1 text-royal-soft">Certifications: NPTEL LLM (Elite), NPTEL Deep Learning IIT Ropar (Elite), Deep Learning Summer School</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-muted text-xs flex flex-col gap-1">
            <div>Phone: <span className="text-cream">+91 87993 01121</span></div>
            <div>Email: <a href="mailto:krunalparmar090306@gmail.com" className="text-royal-soft hover:underline">krunalparmar090306@gmail.com</a></div>
            <div>LinkedIn: <a href="https://linkedin.com/in/krunal-parmar-7287682b5" target="_blank" rel="noreferrer" className="text-royal-soft hover:underline">linkedin.com/in/krunal-parmar-7287682b5</a></div>
            <div>GitHub: <a href="https://github.com/Krunalparmar252" target="_blank" rel="noreferrer" className="text-royal-soft hover:underline">github.com/Krunalparmar252</a></div>
          </div>
        );
        break;

      default:
        output = (
          <span className="text-red-400">
            Command not recognized: "{cmd}". Type <span className="text-royal-soft underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for available commands.
          </span>
        );
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', content: cmd },
      { type: 'output', content: output },
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <section id="terminal" className="relative py-24 px-4 sm:px-8 max-w-content mx-auto hairline-t">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 sm:mb-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-royal tracking-widest uppercase">05</span>
          <span className="w-8 h-[1px] bg-royal/40" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">Interactive Shell</span>
        </div>
        <span className="font-mono text-[11px] text-cream/70 uppercase">Terminal Simulator</span>
      </div>

      <div className="rounded-2xl bg-[#0e0d0b] hairline-royal shadow-[0_20px_50px_rgba(2,4,14,0.7)] overflow-hidden max-w-4xl mx-auto font-mono text-xs">
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-[#181613] hairline-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
            <span className="ml-3 text-[11px] text-cream tracking-wider font-semibold">krunal@portfolio:~$</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCommand('clear')}
              className="p-1 rounded text-muted hover:text-cream transition-colors"
              title="Clear Terminal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Action Command Chips */}
        <div className="px-4 py-2.5 bg-[#141310] hairline-b flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-muted/60 uppercase text-[10px] shrink-0">Quick run:</span>
          {['help', 'about', 'projects', 'experience', 'skills', 'contact'].map((c) => (
            <button
              key={c}
              onClick={() => handleCommand(c)}
              className="px-2.5 py-0.5 rounded bg-[#1c1a16] hairline-royal hover:border-royal text-royal-soft hover:text-white transition-all whitespace-nowrap"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto flex flex-col gap-3 cursor-text bg-[#0c0b0a]"
        >
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'input' && (
                <div className="flex items-center gap-2 text-ivory">
                  <span className="text-royal font-bold">❯</span>
                  <span>{line.content}</span>
                </div>
              )}
              {line.type === 'output' && (
                <div className="pl-4 border-l border-royal/30 py-1">{line.content}</div>
              )}
              {line.type === 'system' && (
                <div className="text-muted/70 italic text-[11px] pb-1">{line.content}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={onSubmit}
          className="px-4 py-3 bg-[#141310] hairline-t flex items-center gap-2 text-sm"
        >
          <span className="text-royal font-bold font-mono">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command ('help', 'projects', 'skills')..."
            className="flex-1 bg-transparent text-cream focus:outline-none font-mono text-xs placeholder:text-muted/40"
          />
          <button type="submit" className="p-1 rounded text-royal hover:text-royal-soft" aria-label="Run command">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
};
