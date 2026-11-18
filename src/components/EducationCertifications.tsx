import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const EducationCertifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.edu-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-8 max-w-content mx-auto hairline-t"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16 sm:mb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold tracking-widest uppercase">06</span>
          <span className="w-8 h-[1px] bg-gold/30" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">
            Education & Honors
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted uppercase">ACADEMICS // HONORS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Education (5 cols) */}
        <div className="lg:col-span-5 edu-item flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-[#0c0a18] hairline">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3b2a8c]/25 hairline-gold flex items-center justify-center text-gold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-gold uppercase tracking-wider block">Undergraduate</span>
              <h3 className="font-serif text-2xl text-ivory font-normal">B.Tech Computer Engineering</h3>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted font-light leading-relaxed">
            <div className="text-ivory font-medium">Birla Vishwakarma Mahavidyalaya</div>
            <div>Vallabh Vidyanagar, Anand, Gujarat</div>
            <div className="flex items-center gap-4 pt-2 text-xs font-mono">
              <span className="text-gold-soft">2023 — 2027</span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded bg-[#181330] hairline-gold text-gold">
                CGPA 7.10 / 10
              </span>
            </div>
          </div>
        </div>

        {/* Certifications & Leadership (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#0c0a18] hairline flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[#3b2a8c]/20 hairline-gold flex items-center justify-center text-gold shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-sans text-sm sm:text-base font-medium text-ivory">
                  NPTEL: Introduction to Large Language Models
                </h4>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-gold/15 text-gold font-semibold uppercase tracking-wider shrink-0">
                  Elite
                </span>
              </div>
              <p className="text-xs text-muted font-light mt-1">
                Advanced concepts in Transformer architectures, attention mechanisms, fine-tuning, and prompt engineering.
              </p>
            </div>
          </div>

          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#0c0a18] hairline flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[#3b2a8c]/20 hairline-gold flex items-center justify-center text-gold shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-sans text-sm sm:text-base font-medium text-ivory">
                  NPTEL: Deep Learning — IIT Ropar
                </h4>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-gold/15 text-gold font-semibold uppercase tracking-wider shrink-0">
                  Elite
                </span>
              </div>
              <p className="text-xs text-muted font-light mt-1">
                Neural networks, backpropagation calculus, convolutional and recurrent deep models from Indian Institute of Technology Ropar.
              </p>
            </div>
          </div>

          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#0c0a18] hairline flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[#3b2a8c]/20 hairline-gold flex items-center justify-center text-gold shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-sans text-sm sm:text-base font-medium text-ivory">
                Deep Learning Summer School
              </h4>
              <p className="text-xs text-muted font-light mt-1">
                Certificate of completion for intensive practical immersion into state-of-the-art vision and generative architectures.
              </p>
            </div>
          </div>

          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#0c0a18] hairline flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[#3b2a8c]/20 hairline-gold flex items-center justify-center text-gold shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-sans text-sm sm:text-base font-medium text-ivory">
                  IEEE BVM Student Branch Volunteer
                </h4>
                <span className="font-mono text-[10px] text-gold-soft">Aug 2024 – 2025</span>
              </div>
              <p className="text-xs text-muted font-light mt-1">
                Organized and promoted technical initiatives, workshops, and engineering symposiums across the university branch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
