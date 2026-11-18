import React, { useState } from 'react';
import gsap from 'gsap';
import { ArrowUp, Check, Copy, Download, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('krunalparmar090306@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <footer id="contact" className="relative pt-28 pb-16 px-4 sm:px-8 max-w-content mx-auto hairline-t">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
        <span className="font-mono text-xs text-gold uppercase tracking-widest mb-4">
          07 // Initiate Dialogue
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight mb-6">
          Let’s Build Something <span className="italic text-gold-soft">Exceptional.</span>
        </h2>

        <p className="text-muted text-base sm:text-lg font-light leading-relaxed mb-10 max-w-xl">
          Whether you are exploring agentic architectures, vulnerability scanners, or full-stack software development, my inbox is always open.
        </p>

        {/* Large Mailto & Copy Email Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="mailto:krunalparmar090306@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gold text-[#07060d] font-sans font-medium text-base hover:bg-gold-soft shadow-[0_0_30px_rgba(201,164,92,0.3)] hover:shadow-[0_0_40px_rgba(201,164,92,0.45)] transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            <span>krunalparmar090306@gmail.com</span>
          </a>

          <button
            onClick={copyEmail}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-surface hairline hover:border-gold/50 text-ivory font-mono text-xs uppercase tracking-wider transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gold" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>

        {/* Social and Resume Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm">
          <a
            href="https://linkedin.com/in/krunal-parmar-7287682b5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4 text-gold" />
            <span>LinkedIn</span>
          </a>

          <span className="text-white/20">•</span>

          <a
            href="https://github.com/Krunalparmar252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors duration-200"
          >
            <Github className="w-4 h-4 text-gold" />
            <span>GitHub</span>
          </a>

          <span className="text-white/20">•</span>

          <a
            href="./Krunal_Resume.pdf"
            download="Krunal_Parmar_Resume.pdf"
            className="inline-flex items-center gap-2 text-gold-soft hover:text-gold transition-colors duration-200"
          >
            <Download className="w-4 h-4 text-gold" />
            <span>Resume (PDF)</span>
          </a>
        </div>
      </div>

      {/* Bottom Hairline Bar */}
      <div className="pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted/70">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Krunal Parmar. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-gold/80">Designed with Quiet Luxury</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-muted hover:text-gold transition-colors"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
