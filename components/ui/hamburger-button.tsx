'use client';

import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

export default function HamburgerButton({ 
  isOpen, 
  onClick, 
  ariaLabel = "Abrir menu de navegação" 
}: HamburgerButtonProps) {
  return (
    <button
      className={`hamburger ${isOpen ? 'hamburger--open' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
    </button>
  );
}
