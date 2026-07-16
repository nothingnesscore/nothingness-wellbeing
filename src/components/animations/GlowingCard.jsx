import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

export function GlowingCard({ children, className = "", darkMode = false }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseEnter = () => setShowGlow(true);
    const handleMouseLeave = () => setShowGlow(false);

    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={cardRef}
      className={`relative rounded-2xl group transition-all duration-300 ${className}`}
    >
      {/* Border Glow Mask Layer (only shows the glow on the 1px border) */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 overflow-hidden"
        style={{
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      >
        <AnimatePresence mode="wait">
          {showGlow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute rounded-full"
              style={{
                width: '300px',
                height: '300px',
                left: mouseX,
                top: mouseY,
                transform: 'translate(-50%, -50%)',
                background: darkMode ? 'rgba(212, 175, 55, 0.8)' : 'rgba(168, 153, 104, 0.8)',
                filter: 'blur(20px)',
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Top Golden Border on Hover (Static Accent) */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transition-opacity duration-500 z-0 pointer-events-none ${
          showGlow ? 'opacity-70' : 'opacity-0'
        }`} 
      />

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
