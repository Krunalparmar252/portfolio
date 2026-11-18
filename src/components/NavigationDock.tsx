import React, { useEffect, useRef } from 'react';
import { AnimatedTopDock } from '../shaders/animated-top-dock/AnimatedTopDock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Declare window extension for Lenis
declare global {
  interface Window {
    __lenis?: any;
  }
}

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

    const nav = container.querySelector<HTMLElement>('.animated-top-dock__nav');
    if (!nav) return;

    const applyLabels = () => {
      const links = Array.from(nav.querySelectorAll<HTMLButtonElement>('.animated-top-dock__link'));
      links.forEach((link, idx) => {
        if (SECTION_TARGETS[idx]) {
          const textSpan = link.querySelector('span:not(.animated-top-dock__icon)');
          if (textSpan && textSpan.textContent !== SECTION_TARGETS[idx].label) {
            textSpan.textContent = SECTION_TARGETS[idx].label;
          }
          link.setAttribute('aria-label', SECTION_TARGETS[idx].label);
        }
      });
    };

    applyLabels();

    // Use MutationObserver to ensure labels stay consistent even on internal ThreeUI state transitions
    const observer = new MutationObserver(() => {
      applyLabels();
    });
    observer.observe(nav, { childList: true, subtree: true, characterData: true });

    let isProgrammaticScroll = false;
    let scrollTimeout = 0;

    const updateActiveItem = (activeIdx: number) => {
      const links = Array.from(nav.querySelectorAll<HTMLButtonElement>('.animated-top-dock__link'));
      links.forEach((link, idx) => {
        const isCurrent = idx === activeIdx;
        link.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });
    };

    const scrollToTarget = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;

      isProgrammaticScroll = true;
      clearTimeout(scrollTimeout);

      // If Lenis smooth scroll engine is available, use its native smooth scroll
      if (window.__lenis) {
        window.__lenis.scrollTo(el, {
          offset: -70,
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      scrollTimeout = window.setTimeout(() => {
        isProgrammaticScroll = false;
      }, 1200);
    };

    // Event delegation on nav container ensures 100% reliable clicks on every child element
    const handleNavClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-dock-item]');
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();

      // Home logo click
      if (target.classList.contains('animated-top-dock__logo')) {
        updateActiveItem(0);
        scrollToTarget('hero');
        return;
      }

      // Link clicks
      const links = Array.from(nav.querySelectorAll<HTMLButtonElement>('.animated-top-dock__link'));
      const idx = links.indexOf(target);
      if (idx !== -1 && SECTION_TARGETS[idx]) {
        updateActiveItem(idx);
        scrollToTarget(SECTION_TARGETS[idx].id);
      }
    };

    nav.addEventListener('click', handleNavClick, { capture: true });

    // ScrollTrigger to highlight active item as user scrolls down the page
    const triggers: ScrollTrigger[] = [];
    SECTION_TARGETS.forEach((target, idx) => {
      const sectionEl = document.getElementById(target.id);
      if (!sectionEl) return;

      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          if (!isProgrammaticScroll) updateActiveItem(idx);
        },
        onEnterBack: () => {
          if (!isProgrammaticScroll) updateActiveItem(idx);
        },
      });
      triggers.push(st);
    });

    return () => {
      observer.disconnect();
      nav.removeEventListener('click', handleNavClick, { capture: true });
      triggers.forEach((t) => t.kill());
      clearTimeout(scrollTimeout);
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
