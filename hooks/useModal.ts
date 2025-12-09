'use client';

import { useEffect, useRef, useState } from 'react';

interface UseModalOptions {
  isOpen: boolean;
  onClose: () => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  preventBodyScroll?: boolean;
  excludeRefs?: React.RefObject<HTMLElement | null>[];
  onOpen?: () => void;
  enableFocusTrap?: boolean;
  autoFocus?: boolean;
}

// Função para encontrar todos os elementos focáveis dentro de um container
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
    (el) => {
      // Verifica se o elemento está visível
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }
  );
}

export function useModal({
  isOpen,
  onClose,
  closeOnClickOutside = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  excludeRefs = [],
  onOpen,
  enableFocusTrap = true,
  autoFocus = true,
}: UseModalOptions) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Verifica se o clique foi dentro do conteúdo
      if (contentRef.current?.contains(target)) {
        return;
      }

      // Verifica se o clique foi em algum elemento excluído (ex: botão trigger)
      const clickedExcluded = excludeRefs.some(
        (ref) => ref.current?.contains(target)
      );

      if (!clickedExcluded) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside, onClose, excludeRefs]);

  // Fechar ao pressionar ESC
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Prevenir scroll do body
  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preventBodyScroll]);

  // Auto-focus no primeiro elemento focável quando abre
  useEffect(() => {
    if (!isOpen || !autoFocus || !contentRef.current) return;

    // Salva o elemento que estava focado antes de abrir o modal
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Encontra o primeiro elemento focável
    const focusableElements = getFocusableElements(contentRef.current);
    const firstElement = focusableElements[0];

    if (firstElement) {
      // Pequeno delay para garantir que o modal está totalmente renderizado
      setTimeout(() => {
        firstElement.focus();
      }, 100);
    }

    // Callback onOpen se fornecido
    if (onOpen) {
      onOpen();
    }
  }, [isOpen, autoFocus, onOpen]);

  // Restaurar foco ao elemento anterior quando fechar
  useEffect(() => {
    if (!isOpen && previousActiveElementRef.current) {
      previousActiveElementRef.current.focus();
      previousActiveElementRef.current = null;
    }
  }, [isOpen]);

  // Focus trap - manter foco dentro do modal
  useEffect(() => {
    if (!isOpen || !enableFocusTrap || !contentRef.current) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(contentRef.current!);
      
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Se Shift + Tab e está no primeiro elemento, vai para o último
      if (event.shiftKey) {
        if (activeElement === firstElement || !focusableElements.includes(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
      } 
      // Se Tab e está no último elemento, vai para o primeiro
      else {
        if (activeElement === lastElement || !focusableElements.includes(activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, enableFocusTrap]);

  return {
    contentRef,
    isClosing,
    setIsClosing,
  };
}

