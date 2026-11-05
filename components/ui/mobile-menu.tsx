'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { useModal } from '@/hooks/useModal';
import { IconClose } from '../icons/icon-close';

interface MobileMenuProps {
  isOpen: boolean;
  isClosing?: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, isClosing = false, onClose }: MobileMenuProps) {
  const { contentRef } = useModal({
    isOpen,
    onClose,
  });

  const handleLinkClick = () => {
    onClose();
  };

  const menuItems = [
    { href: '/#sobre', label: 'Sobre' },
    { href: '/#marcas', label: 'Marcas' },
    { href: '/#experiencia', label: 'Experiência' },
    { href: '/#formacao', label: 'Formação' },
    { href: '/#contato', label: 'Contato' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`mobile-menu__overlay${isClosing ? ' mobile-menu__overlay--closing' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        id="mobile-menu"
        className={`mobile-menu${isClosing ? ' mobile-menu--closing' : ''}`}
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
            <IconClose size={24} />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          <ul className="mobile-menu__list" role="list">
            {menuItems.map((item) => (
              <li key={item.href} className="mobile-menu__item">
                <Link
                  href={item.href}
                  className="mobile-menu__link"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
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
