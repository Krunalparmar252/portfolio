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
    description: 'Core systems programming, data structures, and relational querying foundations.',
  },
  {
    category: 'AI & Data',
    icon: Bot,
    skills: ['NumPy', 'pandas', 'scikit-learn', 'LLM applications', 'LangChain', 'LangGraph'],
    description: 'Vector pipelines, agent graph orchestration, and machine learning models.',
  },
  {
    category: 'Backend & Tools',
    icon: Database,
    skills: ['FastAPI', 'Firebase', 'tree-sitter/AST analysis', 'Git', 'GitHub'],
    description: 'High-concurrency microservices, AST parsing engines, and modern DevOps.',
  },
  {
    category: 'Frontend',
    icon: Layout,
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Vite', 'Anime.js'],
    description: 'Interactive component lifecycles, kinetic choreography, and responsive interfaces.',
  },
];

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
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
          <span className="font-mono text-xs text-gold tracking-widest uppercase">04</span>
          <span className="w-8 h-[1px] bg-gold/30" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">Technical Arsenal</span>
        </div>
        <span className="font-mono text-[11px] text-muted uppercase">CAPABILITIES // STACK</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SKILL_GROUPS.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div
              key={idx}
              className="skill-card p-6 sm:p-8 rounded-2xl bg-[#0c0a18] hairline transition-all duration-300 hover:border-gold/30 hover:bg-[#120f22] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#3b2a8c]/25 hairline-gold flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-ivory">{group.category}</h3>
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
                    className="px-3 py-1.5 rounded-lg bg-[#151126] hairline text-xs font-mono text-ivory transition-colors duration-200 group-hover:border-gold/20"
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
