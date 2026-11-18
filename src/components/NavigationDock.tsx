import React, { useEffect, useRef } from 'react';
import { AnimatedTopDock } from '../shaders/animated-top-dock/AnimatedTopDock';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const SECTION_TARGETS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const NavigationDock: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find all dock links inside AnimatedTopDock
    const nav = container.querySelector('.animated-top-dock__nav');
    if (!nav) return;

    const logoBtn = nav.querySelector<HTMLButtonElement>('.animated-top-dock__logo');
    const links = Array.from(nav.querySelectorAll<HTMLButtonElement>('.animated-top-dock__link'));

    // Update labels in DOM to exact portfolio navigation items: Home, Projects, Experience, Skills, Contact
    links.forEach((link, idx) => {
      if (SECTION_TARGETS[idx]) {
        const textSpan = link.querySelector('span:not(.animated-top-dock__icon)');
        if (textSpan) {
          textSpan.textContent = SECTION_TARGETS[idx].label;
        }
        link.setAttribute('aria-label', SECTION_TARGETS[idx].label);
      }
    });

    let isProgrammaticScroll = false;

    function updateActiveItem(activeIdx: number) {
      if (isProgrammaticScroll) return;
      links.forEach((link, idx) => {
        const isCurrent = idx === activeIdx;
        link.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });
    }

    // Smooth scroll handler using GSAP ScrollToPlugin
    function scrollToTarget(targetId: string) {
      const el = document.getElementById(targetId);
      if (!el) return;

      isProgrammaticScroll = true;
      gsap.to(window, {
        duration: 1.1,
        scrollTo: { y: el, offsetY: 70 },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isProgrammaticScroll = false;
          }, 100);
        },
      });
    }

    // Click handler for logo button (Goes to Home/Hero)
    const handleLogoClick = (e: MouseEvent) => {
      e.preventDefault();
      scrollToTarget('hero');
    };

    if (logoBtn) {
      logoBtn.addEventListener('click', handleLogoClick);
    }

    // Click handler for dock items
    const linkHandlers: { link: HTMLButtonElement; fn: (e: MouseEvent) => void }[] = [];

    links.forEach((link, idx) => {
      const target = SECTION_TARGETS[idx];
      if (!target) return;

      const handler = (e: MouseEvent) => {
        e.preventDefault();
        scrollToTarget(target.id);
      };

      link.addEventListener('click', handler);
      linkHandlers.push({ link, fn: handler });
    });

    // Setup ScrollTrigger for each section to update active highlight in dock
    const triggers: ScrollTrigger[] = [];

    SECTION_TARGETS.forEach((target, idx) => {
      const sectionEl = document.getElementById(target.id);
      if (!sectionEl) return;

      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => updateActiveItem(idx),
        onEnterBack: () => updateActiveItem(idx),
      });
      triggers.push(st);
    });

    return () => {
      if (logoBtn) logoBtn.removeEventListener('click', handleLogoClick);
      linkHandlers.forEach(({ link, fn }) => link.removeEventListener('click', fn));
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center"
      role="banner"
    >
      <div
        ref={containerRef}
        className="portfolio-dock-host relative w-full pointer-events-auto"
      >
        <AnimatedTopDock
          variant="sable"
          proximity={122}
          spring={0.19}
          damping={0.7}
          widthGrowth={17}
          heightGrowth={16}
          drop={3.5}
        />
      </div>
    </header>
  );
};
