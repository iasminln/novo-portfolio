'use client';

import React from 'react';
import ThemeToggle from './theme-toggle';
import { useModal } from '@/hooks/useModal';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { contentRef } = useModal({
    isOpen,
    onClose,
  });

  const handleLinkClick = () => {
    onClose();
  };

  const menuItems = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#marcas', label: 'Marcas' },
    { href: '#experiencia', label: 'Experiência' },
    { href: '#formacao', label: 'Formação' },
    { href: '#contato', label: 'Contato' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="mobile-menu__overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        id="mobile-menu"
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="mobile-menu__header">
          <h2 id="mobile-menu-title" className="mobile-menu__title">Menu</h2>
          <button
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <span className="mobile-menu__close-icon" aria-hidden="true">×</span>
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          <ul className="mobile-menu__list" role="list">
            {menuItems.map((item) => (
              <li key={item.href} className="mobile-menu__item">
                <a
                  href={item.href}
                  className="mobile-menu__link"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <div className="mobile-menu__theme">
            <span className="mobile-menu__theme-label">Tema:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
