// components/ui/card.tsx
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
