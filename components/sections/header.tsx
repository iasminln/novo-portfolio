'use client';

import { useState } from 'react';
import Link from 'next/link';
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
          <p className="header__title">Iasmin<span className="title-dot" aria-hidden="true">.</span></p>
          <nav aria-label="Principal">
            <ul role="list">
              <li><Link href="/#sobre">Sobre</Link></li>
              <li><Link href="/#marcas">Marcas</Link></li>
              <li><Link href="/#experiencia">Experiência</Link></li>
              <li><Link href="/#formacao">Formação</Link></li>
              <li><Link href="/#contato">Contato</Link></li>
            </ul>
          </nav>
          <div className="header__actions">
            <ThemeToggle />
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              ariaLabel={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
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
