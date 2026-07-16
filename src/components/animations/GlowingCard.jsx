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
      className={`relative overflow-hidden rounded-2xl group ${className} ${
        darkMode ? 'bg-white/5' : 'bg-black/5'
      }`}
    >
      {/* Glow Effect Layer */}
      <AnimatePresence mode="wait">
        {showGlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute rounded-full pointer-events-none z-0"
            style={{
              width: '120%',
              height: '120%',
              left: mouseX,
              top: mouseY,
              transform: 'translate(-50%, -50%)',
              background: darkMode ? 'rgba(212, 175, 55, 0.4)' : 'rgba(168, 153, 104, 0.4)',
              filter: 'blur(30px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Hover Spotlight Layer */}
      <AnimatePresence mode="wait">
        {showGlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none z-10"
            style={{
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              background: `radial-gradient(circle 200px at ${mouseX.get()}px ${mouseY.get()}px, ${darkMode ? 'rgba(212, 175, 55, 0.1)' : 'rgba(168, 153, 104, 0.1)'}, transparent 80%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Background Mask Layer (creates the 1px border effect + glassmorphism) */}
      <div className={`absolute top-[1px] left-[1px] right-[1px] bottom-[1px] rounded-[15px] z-0 backdrop-blur-2xl transition-colors duration-500 ${
        darkMode ? 'bg-[#050505]/70' : 'bg-white/70'
      }`} />

      {/* Subtle Top Golden Border on Hover */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 transition-opacity duration-500 z-20 ${showGlow ? 'opacity-70' : ''}`} />

      {/* Content Layer */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
}
