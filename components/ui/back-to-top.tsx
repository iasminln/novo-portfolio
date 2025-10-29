'use client';

import React, { useState, useEffect } from 'react';
import { IconArrowUp } from '../icons/icon-arrow-up';

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
    document.documentElement.classList.remove('scroll-smooth');
    document.documentElement.classList.add('scroll-auto');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
      <IconArrowUp color="var(--background-color)" size={20} />
    </button>
  );
}
