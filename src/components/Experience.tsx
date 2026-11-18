import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Building2, Calendar, CheckCircle2, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: 'Full Stack Development Intern',
    company: 'BrainyBeam Info-Tech Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat',
    period: 'May – Jun 2026 (15-Day Industry Track)',
    tag: 'Full Stack Workflows',
    points: [
      'Practical exposure to full-stack application structure and development workflows through industry-guided work.',
      'Explored backend services integration, modular frontend component design, and automated build pipelines.',
    ],
    skills: ['Full-Stack Systems', 'API Architecture', 'Component Lifecycles', 'Git'],
  },
  {
    role: 'Software Development Intern',
    company: 'Amul (GCMMF)',
    location: 'Anand, Gujarat',
    period: 'Jun 2025 (15-Day Industry Track)',
    tag: 'Enterprise Portal',
    points: [
      'Built a React.js and Firebase customer-care platform for feedback and issue tracking across customers, parlour users and administrators.',
      'Implemented authentication, role-based access control (RBAC), real-time messaging and notifications using Vite and React Context API.',
    ],
    skills: ['React.js', 'Firebase', 'Vite', 'React Context API', 'RBAC', 'Realtime DB'],
  },
];

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.exp-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-8 max-w-content mx-auto hairline-t"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16 sm:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold tracking-widest uppercase">03</span>
          <span className="w-8 h-[1px] bg-gold/30" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">Industry Experience</span>
        </div>
        <span className="font-mono text-[11px] text-muted uppercase">Practicum // Roles</span>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="exp-card relative rounded-2xl p-6 sm:p-8 bg-[#0d0b1a] hairline transition-all duration-300 hover:border-gold/30 hover:bg-[#120f24]"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <span className="font-mono text-[11px] text-gold tracking-wider uppercase block mb-1">
                  {exp.tag}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ivory">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-sans mt-2">
                  <span className="flex items-center gap-1.5 text-ivory/90 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-gold" />
                    {exp.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold/70" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs text-gold-soft px-3 py-1.5 rounded-full bg-[#181330] hairline-gold whitespace-nowrap self-start">
                <Calendar className="w-3 h-3 text-gold" />
                <span>{exp.period}</span>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5 my-5 text-sm text-muted font-light leading-relaxed">
              {exp.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/70 mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2 hairline-t">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded bg-[#17122c] hairline text-[11px] font-mono text-gold-soft"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
