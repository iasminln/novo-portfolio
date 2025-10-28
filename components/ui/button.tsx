import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  children, 
  onClick, 
  href, 
  type = 'button', 
  className = '', 
  disabled = false,
  variant = 'primary'
}: ButtonProps) {
  const baseClasses = variant === 'secondary' ? 'button-secondary' : 'button';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses}
        style={{ textDecoration: 'none', display: 'inline-block' }}
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
