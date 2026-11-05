'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';

interface TechTagsProps {
  tags: string[];
}

// Pílulas em uma única linha; o que não couber vira um botão "+N" que expande a lista
export default function TechTags({ tags }: TechTagsProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [visiveis, setVisiveis] = useState(tags.length);
  const [expandido, setExpandido] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || expandido) return;

    const medir = () => {
      const pilulas = Array.from(container.querySelectorAll<HTMLElement>('[data-tag]'));
      const botao = container.querySelector<HTMLElement>('[data-more]');
      if (!botao) return;

      // Mostra tudo temporariamente para medir a largura real de cada item
      const itens = [...pilulas, botao];
      itens.forEach((el) => (el.style.display = 'inline-flex'));
      const larguras = pilulas.map((el) => el.offsetWidth);
      const larguraBotao = botao.offsetWidth;
      itens.forEach((el) => (el.style.display = ''));

      const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
      const disponivel = container.clientWidth;

      const total = larguras.reduce((soma, l) => soma + l, 0) + gap * (larguras.length - 1);
      if (total <= disponivel) {
        setVisiveis(larguras.length);
        return;
      }

      // Quantas pílulas cabem deixando espaço para o botão "+N"
      let usado = larguraBotao;
      let cabem = 0;
      for (const largura of larguras) {
        if (usado + gap + largura > disponivel) break;
        usado += gap + largura;
        cabem++;
      }
      setVisiveis(cabem);
    };

    medir();
    const observer = new ResizeObserver(medir);
    observer.observe(container);
    // Larguras mudam quando a fonte web termina de carregar
    document.fonts?.ready.then(medir);

    return () => observer.disconnect();
  }, [tags, expandido]);

  const escondidas = tags.length - visiveis;
  const mostrarBotao = expandido || escondidas > 0;

  return (
    <ul
      ref={containerRef}
      className={`tech-tags${expandido ? ' tech-tags--expanded' : ''}`}
      role="list"
    >
      {tags.map((tag, index) => (
        <li
          key={tag}
          data-tag
          className={`tech-tag${!expandido && index >= visiveis ? ' tech-tag--hidden' : ''}`}
        >
          {tag}
        </li>
      ))}
      <li data-more className={`tech-tags__more${mostrarBotao ? '' : ' tech-tag--hidden'}`}>
        <button
          type="button"
          className="tech-tag tech-tag--more"
          aria-expanded={expandido}
          aria-label={expandido ? 'Ocultar tecnologias' : `Mostrar mais ${escondidas} tecnologias`}
          onClick={() => setExpandido((v) => !v)}
        >
          {/* Fechado sem overflow, o "+N" fica com o maior valor possível para medir a largura */}
          {expandido ? '−' : `+${escondidas > 0 ? escondidas : tags.length}`}
        </button>
      </li>
    </ul>
  );
}
