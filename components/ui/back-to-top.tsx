'use client';

import React, { useState, useEffect } from 'react';
import { IconArrow } from '../icons/icon-arrow';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.classList.remove('scroll-smooth');
    document.documentElement.classList.add('scroll-auto');

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    setTimeout(() => {
      document.documentElement.classList.remove('scroll-auto');
      document.documentElement.classList.add('scroll-smooth');
    }, 100);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <IconArrow color="var(--background-color)" size={20} direction="up" />
    </button>
  );
}
