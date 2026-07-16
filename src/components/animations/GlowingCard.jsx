import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export function GlowingCard({ children, className = "" }) {
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
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Glow Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-0"
        style={{ opacity: showGlow ? 1 : 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#a89968]/30 to-[#d4af37]/30 blur-2xl rounded-full"
          style={{
            width: "300px",
            height: "300px",
            left: mouseX,
            top: mouseY,
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
