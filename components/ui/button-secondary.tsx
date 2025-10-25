import React from 'react';

interface ButtonSecondaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export default function ButtonSecondary({ 
  children, 
  onClick, 
  href, 
  type = 'button', 
  className = '', 
  disabled = false 
}: ButtonSecondaryProps) {
  const baseClasses = 'button-secondary';
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
