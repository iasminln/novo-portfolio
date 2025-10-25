'use client';

import React, { useEffect, useState } from 'react';

interface ScrollOpacityProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollOpacity({ children, className = '' }: ScrollOpacityProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getMainContent = document.querySelector('.main-content');
    const getFixedContent = document.querySelector('.scroll-opacity-container');
    const getHeightFixedContent = getFixedContent?.clientHeight || 0;

    if (getMainContent) {
      (getMainContent as HTMLElement).style.setProperty('margin-top', `${getHeightFixedContent}px`);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if(scrollY <= getHeightFixedContent) {
        const fadeProgress = (scrollY / getHeightFixedContent) * 1.1;
        setOpacity(Math.max(0, 1 - fadeProgress));
      } else {
        setOpacity(0);
      }
    };

    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{ 
        opacity,
        transition: 'opacity 0.1s ease-out',
        position: 'relative',
        zIndex: 1000
      }}
    >
      <div className={className}>
        {children}
      </div>
    </div>
  );
}
