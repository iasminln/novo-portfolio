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
      <button
        type="button"
        className="theme-toggle"
        disabled
        aria-label="Alternar tema"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="theme-toggle__track">
          <div className="theme-toggle__thumb"></div>
        </div>
      </button>
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
          {!isDark ? <IconMoon color="var(--background-color)" size={22} /> : <IconSun color="var(--background-color)" size={22} />}
        </div>
      </div>
    </button>
  );
}
