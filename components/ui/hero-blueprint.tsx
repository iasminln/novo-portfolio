'use client';

import React, { useEffect, useRef, useState } from 'react';

interface HeroBlueprintProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const STEP = 100;

// Breakpoints usados no próprio CSS do site
const BREAKPOINTS = [
  { px: 480, label: 'sm' },
  { px: 768, label: 'md' },
  { px: 1024, label: 'lg' },
];

// Camada decorativa da seção inicial: números das réguas, breakpoints e mira que segue o cursor
export default function HeroBlueprint({ sectionRef }: HeroBlueprintProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Tamanho da seção define quantos números cabem em cada régua
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // offsetWidth/Height incluem o padding da seção (contentRect não)
    const observer = new ResizeObserver(() => {
      setSize({ width: section.offsetWidth, height: section.offsetHeight });
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  // Mira + coordenadas: só com mouse e com animações ativas
  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      frame = 0;
      layer.style.setProperty('--cursor-x', `${x}px`);
      layer.style.setProperty('--cursor-y', `${y}px`);
      if (coordsRef.current) coordsRef.current.textContent = `x: ${x} · y: ${y}`;
    };

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      x = Math.round(event.clientX - rect.left);
      y = Math.round(event.clientY - rect.top);
      layer.classList.add('is-tracking');
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onLeave = () => layer.classList.remove('is-tracking');

    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);

    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      if (frame) window.cancelAnimationFrame(frame);
      layer.classList.remove('is-tracking');
    };
  }, [sectionRef]);

  const marcas = (limite: number) =>
    Array.from({ length: Math.max(0, Math.floor((limite - 1) / STEP)) }, (_, i) => (i + 1) * STEP);

  return (
    <div ref={layerRef} className="hero-blueprint" aria-hidden="true">
      <div className="hero-blueprint__ruler hero-blueprint__ruler--x">
        {marcas(size.width).map((n) => (
          <span key={n} className="hero-blueprint__number" style={{ left: n }}>{n}</span>
        ))}
        {BREAKPOINTS.filter((bp) => bp.px < size.width).map((bp) => (
          <span key={bp.px} className="hero-blueprint__breakpoint" style={{ left: bp.px }}>
            {bp.label} · {bp.px}
          </span>
        ))}
      </div>

      <div className="hero-blueprint__ruler hero-blueprint__ruler--y">
        {marcas(size.height).map((n) => (
          <span key={n} className="hero-blueprint__number" style={{ top: n }}>{n}</span>
        ))}
      </div>

      <span className="hero-blueprint__guide hero-blueprint__guide--x" />
      <span className="hero-blueprint__guide hero-blueprint__guide--y" />
      <span className="hero-blueprint__marker hero-blueprint__marker--x" />
      <span className="hero-blueprint__marker hero-blueprint__marker--y" />
      <span ref={coordsRef} className="hero-blueprint__coords" />
    </div>
  );
}
