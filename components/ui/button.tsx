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
  variant = 'primary'
}: ButtonProps) {
  const baseClasses = variant === 'secondary' ? 'button button-secondary' : 'button';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses}
        target={target}
        rel={rel}
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
    >
      {children}
    </button>
  );
}
