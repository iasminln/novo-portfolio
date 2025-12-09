'use client';

import React, { useState, useRef } from 'react';
import { useStyle } from '@/contexts/StyleContext';
import { IconRocket } from '../icons/icon-rocket';
import { IconDefault } from '../icons/icon-default';
import { useModal } from '@/hooks/useModal';

export default function StyleSelector() {
  const { currentStyle, setStyle } = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styles = [
    { 
      id: 'default' as const, 
      name: 'Padrão', 
      icon: <IconDefault color="currentColor" size={20} />  
    },
    { 
      id: 'futuristic' as const, 
      name: 'Futurista', 
      icon: <IconRocket color="currentColor" size={20} /> 
    },
  ];

  const { contentRef } = useModal({
    isOpen,
    onClose: () => setIsOpen(false),
    excludeRefs: [buttonRef],
    preventBodyScroll: false,
  });

  const handleStyleChange = (styleId: typeof styles[number]['id']) => {
    setStyle(styleId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay para fechar ao clicar fora */}
      {isOpen && (
        <div 
          className="style-selector__overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Container flutuante */}
      <div className="style-selector-floating">
        {/* Botão vertical que convida a clicar */}
        <button
          ref={buttonRef}
          className="style-selector-floating__trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir seletor de estilos"
          aria-expanded={isOpen}
        >
          <span className="style-selector-floating__trigger-text">Estilos</span>
        </button>

        {/* Drawer com os botões de tema */}
        <div
          ref={contentRef}
          className={`style-selector-floating__drawer ${isOpen ? 'style-selector-floating__drawer--open' : ''}`}
        >
          <div className="style-selector-floating__drawer-header">
            <span className="style-selector-floating__drawer-title">Estilos</span>
            <button
              className="style-selector-floating__drawer-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar seletor de estilos"
            >
              <span className="style-selector-floating__drawer-close-icon">×</span>
            </button>
          </div>
 
          <div className="style-selector-floating__drawer-content">
            {styles.map((style) => (
              <div
                key={style.id}
                className="style-selector-floating__button-wrapper"
                onMouseEnter={() => setHoveredStyle(style.id)}
                onMouseLeave={() => setHoveredStyle(null)}
              >
                <button
                  className={`style-selector-floating__button ${currentStyle === style.id ? 'style-selector-floating__button--active' : ''}`}
                  onClick={() => handleStyleChange(style.id)}
                  aria-label={`Mudar para tema ${style.name}`}
                  title={style.name}
                >
                  <span className="style-selector-floating__button-icon">{style.icon}</span>
                </button>
                
                {/* Tooltip */}
                {hoveredStyle === style.id && (
                  <div className="style-selector-floating__tooltip">
                    {style.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

