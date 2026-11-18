import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { WelcomeScreen } from './components/WelcomeScreen';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingAura } from './components/FloatingAura';
import { NavigationDock } from './components/NavigationDock';
import { CanvasBackground } from './components/CanvasBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { TerminalSection } from './components/TerminalSection';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactFooter } from './components/ContactFooter';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  useEffect(() => {
    // Ensure fresh page visits start at the top welcome greeting
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050714] text-[#f8f7f4] selection:bg-[#3b82f6]/30 selection:text-[#f8f7f4]">
      {/* Top Hairline Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Atmospheric Overlays */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />
      <CanvasBackground />

      {/* Floating Ambient Aura & Spatial Elements (replaces old cursor dot/ring) */}
      <FloatingAura />

      {/* Top Dock Navigation (ThreeUI sable variant) */}
      <NavigationDock />

      {/* Fullscreen Greeting & Scroll Zoom-Through Sequence */}
      <WelcomeScreen />

      {/* Main Portfolio Content Flow */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <TerminalSection />
        <EducationCertifications />
      </main>

      <ContactFooter />
    </div>
  );
};

export default App;
