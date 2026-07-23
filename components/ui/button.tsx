import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
  ariaBusy?: boolean;
}

export default function Button({
  children,
  onClick,
  href,
  rel,
  target,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'primary',
  ariaLabel,
  ariaBusy,
}: ButtonProps) {
  const baseClasses = variant === 'secondary' ? 'button button-secondary' : 'button';
  const combinedClasses = `${baseClasses} ${className}`.trim();
  const opensInNewTab = target === '_blank';
  const accessibleLabel =
    ariaLabel ??
    (opensInNewTab && typeof children === 'string'
      ? `${children} (abre em nova aba)`
      : undefined);

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        aria-label={accessibleLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
    >
      {children}
    </button>
  );
}
