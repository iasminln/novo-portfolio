'use client';

import { useState } from 'react';
import ThemeToggle from "@/components/ui/theme-toggle";
import HamburgerButton from "@/components/ui/hamburger-button";
import MobileMenu from "@/components/ui/mobile-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header>
        <div className="header__content container">
          <h2 className="header__title">Iasmin<span className="title-dot">.</span></h2>
          <nav>
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#marcas">Marcas</a></li>
              <li><a href="#experiencia">Experiência</a></li>
              <li><a href="#formacao">Formação</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>
          <div className="header__actions">
            <ThemeToggle />
            <HamburgerButton 
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              ariaLabel="Abrir menu"
            />
          </div>
        </div>
      </header>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}
