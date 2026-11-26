import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  triggerOnView?: boolean;
  triggerOnHover?: boolean;
}

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  duration = 950,
  triggerOnView = true,
  triggerOnHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number | null>(null);
  const hasPlayedInitial = useRef(false);

  const runScramble = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
    }

    const startTime = performance.now();
    const length = text.length;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out resolution so final letters snap cleanly
      const easedProgress = 1 - Math.pow(1 - progress, 2.2);
      const resolvedCount = Math.floor(easedProgress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        const char = text[i];
        if (char === ' ') {
          result += ' ';
        } else if (i < resolvedCount) {
          result += char;
        } else {
          // Pick a random alphabet character, matching case feel when close
          const randomIndex = Math.floor(Math.random() * ALPHABETS.length);
          result += ALPHABETS[randomIndex];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        animRef.current = null;
      }
    };

    animRef.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    if (!triggerOnView || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasPlayedInitial.current) {
              hasPlayedInitial.current = true;
              runScramble();
            } else {
              // Replay when scrolling back into view
              runScramble();
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [triggerOnView, runScramble]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={triggerOnHover ? runScramble : undefined}
      className={`inline-block cursor-default ${className}`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};
