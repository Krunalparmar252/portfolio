import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Code, Database, Layout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: 'Languages',
    icon: Code,
    skills: ['Python', 'C++', 'Java', 'C', 'SQL'],
    description: 'Core systems programming, data structures, and relational database engineering.',
  },
  {
    category: 'AI & Data',
    icon: Bot,
    skills: ['NumPy', 'pandas', 'scikit-learn', 'LLM applications', 'LangChain', 'LangGraph'],
    description: 'Dense/sparse retrieval, agentic graphs, FAISS/BM25 indexing, and model evaluation.',
  },
  {
    category: 'Backend & Tools',
    icon: Database,
    skills: ['FastAPI', 'Firebase', 'tree-sitter/AST analysis', 'Git', 'GitHub'],
    description: 'High-throughput APIs, AST grammar parsing engines, and modern version control.',
  },
  {
    category: 'Frontend',
    icon: Layout,
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Vite', 'Anime.js'],
    description: 'Modular component lifecycles, kinetic choreography, and responsive luxury UI.',
  },
];

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-card',
        {
          y: 24,
          scale: 0.93,
          borderRadius: '28px',
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
          borderRadius: '16px',
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-8 max-w-content mx-auto hairline-t"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16 sm:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-royal tracking-widest uppercase">04</span>
          <span className="w-8 h-[1px] bg-royal/40" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">Technical Arsenal</span>
        </div>
        <span className="font-mono text-[11px] text-cream/70 uppercase">CAPABILITIES // STACK</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SKILL_GROUPS.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div
              key={idx}
              className="skill-card p-6 sm:p-8 rounded-2xl bg-[#090e24]/90 hairline-royal royal-card-transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft group-hover:scale-105 group-hover:bg-royal/25 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-cream">{group.category}</h3>
                  </div>
                  <span className="font-mono text-[10px] text-muted/60 uppercase">0{idx + 1}</span>
                </div>

                <p className="text-sm text-muted font-light leading-relaxed mb-6">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 hairline-t">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-[#0e163a] hairline-royal text-xs font-mono text-cream transition-colors duration-200 group-hover:border-royal/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
