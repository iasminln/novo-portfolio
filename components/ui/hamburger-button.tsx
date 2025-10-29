'use client';

import React from 'react';
import { IconMenu } from '../icons/icon-menu';

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
      <IconMenu color="var(--text-color)" size={36} />
    </button>
  );
}
