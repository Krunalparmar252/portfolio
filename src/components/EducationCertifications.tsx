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
      gsap.fromTo(
        '.edu-item',
        {
          y: 24,
          scale: 0.95,
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
          stagger: 0.07,
          ease: 'power3.out',
        }
      );
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
          <span className="font-mono text-xs text-royal tracking-widest uppercase">06</span>
          <span className="w-8 h-[1px] bg-royal/40" />
          <span className="font-mono text-xs tracking-widest text-muted uppercase">
            Education & Honors
          </span>
        </div>
        <span className="font-mono text-[11px] text-cream/70 uppercase">ACADEMICS // HONORS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Education (5 cols) */}
        <div className="lg:col-span-5 edu-item flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-[#090e24]/90 hairline-royal royal-card-transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-royal-soft uppercase tracking-wider block">Undergraduate</span>
              <h3 className="font-serif text-2xl text-cream font-normal">B.Tech Computer Engineering</h3>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted font-light leading-relaxed">
            <div className="text-cream font-medium">Birla Vishwakarma Mahavidyalaya</div>
            <div>Vallabh Vidyanagar, Gujarat</div>
            <div className="flex items-center gap-4 pt-2 text-xs font-mono">
              <span className="text-royal-soft">2023 — 2027</span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-royal/20 hairline-royal text-cream font-semibold">
                CGPA 7.15 / 10
              </span>
            </div>
          </div>
        </div>

        {/* Certifications & Leadership (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#090e24]/90 hairline-royal royal-card-transition flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-sans text-sm sm:text-base font-medium text-cream">
                  NPTEL: Introduction to Large Language Models
                </h4>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-royal/20 text-cream font-semibold uppercase tracking-wider shrink-0">
                  Elite
                </span>
              </div>
              <p className="text-xs text-muted font-light mt-1">
                Advanced concepts in Transformer architectures, attention mechanisms, fine-tuning, and prompt engineering.
              </p>
            </div>
          </div>

          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#090e24]/90 hairline-royal royal-card-transition flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-sans text-sm sm:text-base font-medium text-cream">
                  NPTEL: Deep Learning — IIT Ropar
                </h4>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-royal/20 text-cream font-semibold uppercase tracking-wider shrink-0">
                  Elite
                </span>
              </div>
              <p className="text-xs text-muted font-light mt-1">
                Neural networks, backpropagation calculus, convolutional and recurrent deep models from Indian Institute of Technology Ropar.
              </p>
            </div>
          </div>

          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#090e24]/90 hairline-royal royal-card-transition flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-sans text-sm sm:text-base font-medium text-cream">
                Deep Learning Summer School
              </h4>
              <p className="text-xs text-muted font-light mt-1">
                Certificate of completion for intensive practical immersion into state-of-the-art vision and generative architectures.
              </p>
            </div>
          </div>

          <div className="edu-item p-5 sm:p-6 rounded-xl bg-[#090e24]/90 hairline-royal royal-card-transition flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-royal/15 hairline-royal flex items-center justify-center text-royal-soft shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-sans text-sm sm:text-base font-medium text-cream">
                  IEEE BVM Student Branch Volunteer
                </h4>
                <span className="font-mono text-[10px] text-royal-soft">Aug 2024 – 2025</span>
              </div>
              <p className="text-xs text-muted font-light mt-1">
                Organized and promoted student technical events, hackathons, and research symposiums.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
