'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type StyleTheme = 'default' | 'futuristic';

interface StyleContextType {
  currentStyle: StyleTheme;
  setStyle: (style: StyleTheme) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: ReactNode }) {
  const [currentStyle, setCurrentStyleState] = useState<StyleTheme>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setMounted(true);
    
    const savedStyle = localStorage.getItem('styleTheme') as StyleTheme;
    
    if (savedStyle && (savedStyle === 'default' || savedStyle === 'futuristic')) {
      setCurrentStyleState(savedStyle);
      document.documentElement.setAttribute('data-style', savedStyle);
    } else {
      document.documentElement.setAttribute('data-style', 'default');
    }
  }, []);

  const setStyle = (style: StyleTheme) => {
    setCurrentStyleState(style);
    if (typeof window !== 'undefined') {
      localStorage.setItem('styleTheme', style);
      document.documentElement.setAttribute('data-style', style);
    }
  };

  // Sempre fornece o contexto, mesmo antes do mount
  return (
    <StyleContext.Provider value={{ currentStyle, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
}

