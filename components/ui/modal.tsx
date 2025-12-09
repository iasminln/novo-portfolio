'use client';

import React, { ReactNode } from 'react';
import { useModal } from '@/hooks/useModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  closeButton?: boolean;
  closeButtonLabel?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  preventBodyScroll?: boolean;
  excludeRefs?: React.RefObject<HTMLElement>[];
  role?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  onOpen?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName = '',
  contentClassName = '',
  closeButton = true,
  closeButtonLabel = 'Fechar',
  closeOnClickOutside = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  excludeRefs = [],
  role = 'dialog',
  ariaLabelledby,
  ariaDescribedby,
  onOpen,
}: ModalProps) {
  const { contentRef } = useModal({
    isOpen,
    onClose,
    closeOnClickOutside,
    closeOnEscape,
    preventBodyScroll,
    excludeRefs,
    onOpen,
  });

  if (!isOpen) return null;

  return (
    <div
      className={overlayClassName}
      onClick={closeOnClickOutside ? onClose : undefined}
      aria-hidden="true"
    >
      <div
        ref={contentRef}
        className={contentClassName}
        role={role}
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        onClick={(e) => e.stopPropagation()}
      >
        {closeButton && (
          <button
            className="modal__close"
            onClick={onClose}
            aria-label={closeButtonLabel}
          >
            <span className="modal__close-icon">×</span>
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

