# Krunal Parmar — Portfolio

A motion-led, premium engineering portfolio designed with quiet luxury, restrained antique-gold typography, deterministic agentic project architectures, and a WebGL-powered top dock.

Live URL: [https://krunalparmar252.github.io/portfolio/](https://krunalparmar252.github.io/portfolio/)

---

## Technical Stack

- **Framework & Bundler:** React 18, TypeScript, Vite
- **3D & Shaders:** Three.js (`0.128.0`), WebGL shader pipeline
- **Top Dock:** ThreeUI `<AnimatedTopDock />` (`sable` variant with spring kinematics and cursor proximity response)
- **Kinetic Typography & Motion:** GSAP 3.12 (ScrollTrigger, ScrollToPlugin), Lenis Smooth Scroll
- **Styling:** Tailwind CSS, PostCSS, custom hairline design system
- **Deployment:** GitHub Pages via GitHub Actions CI/CD (`npm ci && npm run build`)

---

## Features & Structure

1. **Animated Top Dock Navigation:** Centred glass capsule floating header with spring-damped proximity physics, keyboard navigation, smooth section scrolling, and responsive touch adaptation.
2. **Hero:** High-contrast serif headlines (*Cormorant Garamond*), royal ink palette (`#07060d`), ambient WebGL particle field, and instant CV download.
3. **About & Philosophy:** Undergraduate research focus at Birla Vishwakarma Mahavidyalaya (2023–2027), AST validation discipline, and agent graph foundations.
4. **Curated Projects (Exclusively 2):**
   - **Autonomous Cybersecurity Analyst AI:** Agentic AST vulnerability scanner using tree-sitter, LangChain, LangGraph, and FastAPI with an interactive 4-stage pipeline visualizer and code-diff patch panel.
   - **DevBoard AI:** AI-driven developer productivity dashboard with Anime.js activity waveforms, sprint telemetry, and an assistant query copilot.
5. **Industry Experience:**
   - Full Stack Development Intern — *BrainyBeam Info-Tech Pvt. Ltd.* (May–Jun 2026)
   - Software Development Intern — *Amul* (Jun 2025)
6. **Technical Arsenal:** Languages, AI & Data, Backend & Tools, and Frontend stack.
7. **Interactive Royal Terminal Simulator:** High-fidelity shell with built-in commands (`help`, `about`, `projects`, `experience`, `skills`, `education`, `contact`, `clear`) and quick-action chips.
8. **Academics & Honors:** B.Tech Computer Engineering (CGPA 7.10/10), NPTEL LLM (Elite), NPTEL Deep Learning IIT Ropar (Elite), Deep Learning Summer School, and IEEE BVM volunteering.
9. **Contact & Resume:** Direct mailto action, clipboard copy toast, verified social profiles, and downloadable CV (`public/Krunal_Resume.pdf`).

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Krunalparmar252/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/portfolio/` in your browser.

---

## Production Build

```bash
# Typecheck and compile static bundle
npm run build

# Preview production build locally
npm run preview
```

The production output will be generated in the `dist/` directory with `base: '/portfolio/'`.

---

## Continuous Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`:
1. Checks out the code.
2. Installs dependencies using `npm ci`.
3. Compiles the production application via `npm run build`.
4. Deploys the static `dist/` directory directly to GitHub Pages.
