import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Domain-warped fluid chiaroscuro silk ribbons in obsidian, warm cream, and royal sapphire
const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.45), sin(0.45), -sin(0.45), cos(0.45));
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 uv = (vUv - 0.5) * aspect * 1.45;
    vec2 mouseOffset = (uMouse - 0.5) * 0.25;
    float t = uTime * 0.11 + uScroll * 1.1;

    // Domain warping for smooth sweeping liquid silk folds
    vec2 q = vec2(
      fbm(uv + vec2(0.0, 0.0) + t * 0.35 + mouseOffset * 0.4),
      fbm(uv + vec2(5.2, 1.3) - t * 0.25)
    );

    vec2 r = vec2(
      fbm(uv + 2.4 * q + vec2(1.7, 9.2) + t * 0.18),
      fbm(uv + 2.4 * q + vec2(8.3, 2.8) - t * 0.14)
    );

    float f = fbm(uv + 2.1 * r);

    // Sculpted chiaroscuro light ribbons (high contrast folds)
    float ribbonCream = smoothstep(0.56, 0.86, f) * 0.42;
    float ribbonBlue  = smoothstep(0.42, 0.78, q.x * 0.65 + r.y * 0.35) * 0.34;
    float sharpCrest  = pow(max(0.0, 1.0 - abs(f - 0.62) * 5.2), 2.5) * 0.22;

    vec3 obsidian   = vec3(0.018, 0.025, 0.065); // Deep midnight obsidian
    vec3 warmCream  = vec3(0.965, 0.937, 0.886); // #f6efe2
    vec3 royalBlue  = vec3(0.231, 0.510, 0.965); // #3b82f6
    vec3 softAzure  = vec3(0.376, 0.647, 0.980); // #60a5fa

    vec3 col = obsidian;
    col = mix(col, royalBlue, ribbonBlue);
    col = mix(col, warmCream, ribbonCream);
    col += mix(softAzure, warmCream, 0.55) * sharpCrest;

    // Subtle edge vignette so text stays ultra-legible
    float vig = 1.0 - smoothstep(0.45, 1.35, length((vUv - 0.5) * aspect));
    col *= (0.58 + 0.42 * vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const CanvasBackground: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX / Math.max(window.innerWidth, 1);
      targetMouseY = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      uniforms.uScroll.value = window.scrollY / maxScroll;
    };

    const handleResize = () => {
      if (!renderer) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        material.dispose();
        renderer?.dispose();
        if (renderer?.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    }

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.x += (targetMouseX - uniforms.uMouse.value.x) * 0.04;
      uniforms.uMouse.value.y += (targetMouseY - uniforms.uMouse.value.y) * 0.04;
      renderer?.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
      if (renderer?.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#050714]"
      aria-hidden="true"
    />
  );
};
