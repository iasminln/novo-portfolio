import { HomePageProps } from '@/types';
import React from 'react';
import { IconCheck } from '../icons/icon-check';
import { renderRichText } from '@/utils/richText';
import { useModal } from '@/hooks/useModal';

type CuriosidadesModalProps = {
  data: HomePageProps["footer"];
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};

export default function CuriosidadesModal({ data, isOpen, isClosing, onClose }: CuriosidadesModalProps) {
  const { contentRef } = useModal({
    isOpen,
    onClose,
    closeOnClickOutside: false,
  });

  if (!isOpen) return null;

  return (
    <div
      className="secret-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="curiosidades-title"
      id="curiosidades-modal"
    >
      <div
        className={`secret-modal__backdrop ${isClosing ? 'secret-modal__backdrop--closing' : ''}`}
        onClick={onClose}
      />
      <div
        ref={contentRef}
        className={`secret-modal__dialog ${isClosing ? 'secret-modal__dialog--closing' : ''}`}
        role="document"
      >
        <div className="secret-modal__header">
          <h5 id="curiosidades-title" className="secret-modal__title">Curiosidades ✨</h5>
          <button
            type="button"
            className="secret-modal__close"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="secret-modal__content">
          <ul className="secret-modal__list">
            {data.curiosidades.map((curiosidade) => (
              <li key={curiosidade}>
                <span className="highlight-icon"><IconCheck color="var(--main-color-stronger)" size={20} /></span>
                {renderRichText(curiosidade, { as: 'span' })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


