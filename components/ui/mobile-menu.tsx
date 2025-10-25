'use client';

import React, { useEffect, useRef } from 'react';
import ThemeToggle from './theme-toggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableRef.current) {
            event.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          if (document.activeElement === lastFocusableRef.current) {
            event.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  const menuItems = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#formacao', label: 'Formação' },
    { href: '#experiencia', label: 'Experiência' },
    { href: '#contato', label: 'Contato' }
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
        ref={menuRef}
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="mobile-menu__header">
          <h2 id="mobile-menu-title" className="mobile-menu__title">Menu</h2>
          <button
            ref={firstFocusableRef}
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <span className="mobile-menu__close-icon">×</span>
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__list">
            {menuItems.map((item) => (
              <li key={item.href} className="mobile-menu__item">
                <a
                  href={item.href}
                  className="mobile-menu__link"
                  onClick={handleLinkClick}
                  tabIndex={0}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <div ref={lastFocusableRef} className="mobile-menu__theme">
            <span className="mobile-menu__theme-label">Tema:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
