import React, { useState } from 'react';

export function GlowingCard({ children, className = "", darkMode = false }) {
  const [showGlow, setShowGlow] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl group transition-all duration-300 ${className}`}
      onMouseEnter={() => setShowGlow(true)}
      onMouseLeave={() => setShowGlow(false)}
    >
      {/* Subtle Top Golden Border on Hover */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transition-opacity duration-500 z-0 ${
          showGlow ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
