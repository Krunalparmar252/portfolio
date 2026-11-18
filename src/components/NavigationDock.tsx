import React, { useEffect, useRef, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal dock after user scrolls past the initial welcome greeting
    const handleScroll = () => {
      const currentScroll = window.__lenis ? window.__lenis.scroll : window.scrollY;
      setIsVisible(currentScroll > 160);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
    }
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
    };
  }, []);

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
        const item = link.closest<HTMLElement>('.animated-top-dock__item') || link;
        item.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
        if (isCurrent) {
          item.setAttribute('data-dock-near', 'true');
        } else {
          item.removeAttribute('data-dock-near');
        }
      });
    };

    // Fast, reliable event delegation on the root nav element (capture phase)
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest<HTMLButtonElement>('.animated-top-dock__link');
      if (!link) return;

      const links = Array.from(nav.querySelectorAll<HTMLButtonElement>('.animated-top-dock__link'));
      const idx = links.indexOf(link);
      if (idx === -1 || !SECTION_TARGETS[idx]) return;

      e.preventDefault();
      e.stopPropagation();

      const targetId = SECTION_TARGETS[idx].id;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      isProgrammaticScroll = true;
      updateActiveItem(idx);

      // Perform jitter-free Lenis smooth scroll
      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl, {
          offset: -70,
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isProgrammaticScroll = false;
      }, 1200);
    };

    nav.addEventListener('click', handleNavClick, { capture: true });

    // ScrollTrigger to highlight active dock button
    const triggers: ScrollTrigger[] = [];
    SECTION_TARGETS.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top center+=80',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive && !isProgrammaticScroll) {
            updateActiveItem(idx);
          }
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
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
      }`}
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
