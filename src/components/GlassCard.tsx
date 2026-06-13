import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`glass p-6 rounded-xl shadow-lg backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 ${className}`}>
      {children}
    </div>
  );
};
