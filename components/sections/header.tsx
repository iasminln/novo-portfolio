'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from "@/components/ui/theme-toggle";
import HamburgerButton from "@/components/ui/hamburger-button";
import MobileMenu from "@/components/ui/mobile-menu";

// Mesma duração da animação de saída em .mobile-menu--closing
const MOBILE_MENU_CLOSE_DURATION = 300;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
  }, []);

  const openMobileMenu = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    setIsMobileMenuClosing(false);
    setIsMobileMenuOpen(true);
  };

  // Roda a animação de saída antes de desmontar o menu
  const closeMobileMenu = () => {
    if (!isMobileMenuOpen || isMobileMenuClosing) return;
    setIsMobileMenuClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobileMenuClosing(false);
    }, MOBILE_MENU_CLOSE_DURATION);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen && !isMobileMenuClosing) closeMobileMenu();
    else openMobileMenu();
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
        isClosing={isMobileMenuClosing}
        onClose={closeMobileMenu}
      />
    </>
  );
}
