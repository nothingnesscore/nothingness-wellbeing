import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * LiquidBackdropBlobs
 * Floating, morphing, fluid color bubbles designed specifically to sit behind
 * Liquid Glass surfaces. As they drift and pulse, the liquid glass layer bends,
 * magnifies, and refracts their vibrant spectrum through its curved lens perimeter.
 */
export function LiquidBackdropBlobs({ 
  count = 4, 
  variant = "local", // "local" (inside a card/modal) or "section"
  className = "" 
}) {
  const { darkMode } = useTheme();

  // Local card/container bubbles
  if (variant === "local") {
    return (
      <div 
        className={`absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] -z-10 ${className}`}
        aria-hidden="true"
      >
        {/* Blob 1: Golden / Amber honey */}
        <motion.div
          animate={{
            x: ['-15%', '25%', '-10%'],
            y: ['-10%', '30%', '-15%'],
            scale: [1, 1.25, 0.95],
            opacity: darkMode ? [0.35, 0.6, 0.35] : [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-2xl"
          style={{
            background: darkMode
              ? 'radial-gradient(circle, rgba(212,175,55,0.7) 0%, rgba(184,134,11,0.2) 70%, transparent 100%)'
              : 'radial-gradient(circle, rgba(217,180,95,0.5) 0%, rgba(235,214,163,0.2) 70%, transparent 100%)',
          }}
        />

        {/* Blob 2: Cyan / Ocean azure or Emerald */}
        <motion.div
          animate={{
            x: ['20%', '-20%', '15%'],
            y: ['25%', '-15%', '20%'],
            scale: [1.1, 0.85, 1.2],
            opacity: darkMode ? [0.3, 0.55, 0.3] : [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="absolute -bottom-16 -right-12 w-56 h-56 rounded-full blur-2xl"
          style={{
            background: darkMode
              ? 'radial-gradient(circle, rgba(56,189,248,0.6) 0%, rgba(129,140,248,0.2) 70%, transparent 100%)'
              : 'radial-gradient(circle, rgba(165,214,210,0.45) 0%, rgba(199,228,223,0.15) 70%, transparent 100%)',
          }}
        />

        {/* Blob 3: Rose Quartz / Amethyst Violet */}
        <motion.div
          animate={{
            x: ['-20%', '10%', '-5%'],
            y: ['30%', '-20%', '15%'],
            scale: [0.9, 1.15, 1],
            opacity: darkMode ? [0.25, 0.45, 0.25] : [0.18, 0.3, 0.18],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full blur-2xl"
          style={{
            background: darkMode
              ? 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(236,72,153,0.15) 70%, transparent 100%)'
              : 'radial-gradient(circle, rgba(238,198,198,0.4) 0%, rgba(247,219,219,0.1) 70%, transparent 100%)',
          }}
        />
      </div>
    );
  }

  // Section wide ambient backdrop bubbles
  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Grand Orb 1: Warm Zen Gold */}
      <motion.div
        animate={{
          x: ['0vw', '6vw', '-4vw', '0vw'],
          y: ['0vh', '-6vh', '4vh', '0vh'],
          scale: [1, 1.12, 0.92, 1],
          opacity: darkMode ? [0.4, 0.7, 0.45, 0.4] : [0.25, 0.45, 0.3, 0.25],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-[15%] w-[42vw] h-[42vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(212,175,55,0.45) 0%, rgba(180,120,20,0.15) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(224,198,138,0.4) 0%, rgba(240,225,188,0.15) 60%, transparent 80%)',
        }}
      />

      {/* Grand Orb 2: Celestial Sage / Azure */}
      <motion.div
        animate={{
          x: ['0vw', '-8vw', '5vw', '0vw'],
          y: ['0vh', '7vh', '-5vh', '0vh'],
          scale: [0.95, 1.15, 0.9, 0.95],
          opacity: darkMode ? [0.35, 0.65, 0.4, 0.35] : [0.2, 0.4, 0.25, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute top-1/3 right-[10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full blur-3xl"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(99,102,241,0.15) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(175,212,204,0.35) 0%, rgba(198,226,220,0.12) 60%, transparent 80%)',
        }}
      />

      {/* Grand Orb 3: Twilight Violet / Coral */}
      <motion.div
        animate={{
          x: ['0vw', '7vw', '-6vw', '0vw'],
          y: ['0vh', '-5vh', '6vh', '0vh'],
          scale: [1.05, 0.9, 1.2, 1.05],
          opacity: darkMode ? [0.3, 0.55, 0.35, 0.3] : [0.18, 0.35, 0.2, 0.18],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
        className="absolute bottom-10 left-[25%] w-[38vw] h-[38vw] max-w-[460px] max-h-[460px] rounded-full blur-3xl"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(244,114,182,0.12) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(235,195,195,0.3) 0%, rgba(246,220,215,0.1) 60%, transparent 80%)',
        }}
      />
    </div>
  );
}
