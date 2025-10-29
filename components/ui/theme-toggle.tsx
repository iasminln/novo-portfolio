'use client';

import React, { useState, useEffect } from 'react';
import { IconMoon } from '../icons/icon-moon';
import { IconSun } from '../icons/icon-sun';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    document.documentElement.classList.toggle('dark', newTheme);
  };

  if (!mounted) {
    return (
      <div className="theme-toggle">
        <div className="theme-toggle__track">
          <div className="theme-toggle__thumb"></div>
        </div>
      </div>
    );
  }

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Mudar para ${isDark ? 'modo claro' : 'modo escuro'}`}
    >
      <div className="theme-toggle__track">
        <div className={`theme-toggle__thumb ${isDark ? 'theme-toggle__thumb--dark' : ''}`}>
          {!isDark ? <IconMoon color="var(--background-color)" size={20} /> : <IconSun color="var(--background-color)" size={20} />}
        </div>
      </div>
    </button>
  );
}
