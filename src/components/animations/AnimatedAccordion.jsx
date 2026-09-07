import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LiquidBackdropBlobs } from './LiquidBackdropBlobs';

/**
 * AnimatedAccordion (Liquid Glass Edition)
 * An iOS WWDC25-inspired tactile Liquid Glass capsule.
 * Features:
 * - Fluid optical curvature rim with specular highlight
 * - Under-glass morphing color bubbles refracting through the accordion body
 * - Spring-physics expansion and circular glass icon badge
 * - Chromatic edge and molten gold accents honoring the Nothingness theme
 */
export function AnimatedAccordion({ title, children, darkMode, isOpen, onToggle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
      className={`relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer mb-4 transition-all duration-300 ${
        isOpen ? 'shadow-2xl' : 'hover:-translate-y-0.5'
      }`}
      style={{
        backdropFilter: 'blur(28px) saturate(140%)',
        WebkitBackdropFilter: 'blur(28px) saturate(140%)',
      }}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Underlying Liquid Color Bubbles (morphing behind the glass) */}
      <LiquidBackdropBlobs 
        variant="local" 
        className={isOpen ? 'opacity-80' : isHovered ? 'opacity-50' : 'opacity-25'} 
      />

      {/* 2. Frosted Glass Substrate */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          background: darkMode
            ? isOpen
              ? 'linear-gradient(135deg, rgba(20, 20, 24, 0.6) 0%, rgba(8, 8, 10, 0.75) 100%)'
              : 'linear-gradient(135deg, rgba(14, 14, 16, 0.4) 0%, rgba(5, 5, 6, 0.55) 100%)'
            : isOpen
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 244, 236, 0.55) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(246, 242, 234, 0.35) 100%)',
          boxShadow: darkMode
            ? isOpen
              ? '0 20px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.4)'
              : '0 8px 24px -4px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
            : isOpen
              ? '0 16px 36px -8px rgba(180, 160, 130, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.03)'
              : '0 8px 20px -4px rgba(180, 160, 130, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
        }}
      />

      {/* 3. Optical Curved Glass Perimeter & Chromatic Border */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
        style={{
          padding: '1.5px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: darkMode
              ? isOpen
                ? 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(212,175,55,0.85) 35%, rgba(255,255,255,0.1) 70%, rgba(212,175,55,0.5) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(212,175,55,0.5) 35%, rgba(255,255,255,0.04) 70%, rgba(212,175,55,0.25) 100%)'
              : isOpen
                ? 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(212,175,55,0.7) 40%, rgba(255,255,255,0.4) 75%, rgba(180,150,90,0.5) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(212,175,55,0.4) 40%, rgba(255,255,255,0.2) 75%, rgba(180,150,90,0.3) 100%)',
            opacity: isHovered || isOpen ? 1 : 0.7,
          }}
        />
        {/* Subtle chromatic fringe */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background: 'linear-gradient(90deg, rgba(56,189,248,0.4) 0%, transparent 50%, rgba(244,114,182,0.4) 100%)',
          }}
        />
      </div>

      {/* 4. Top Glancing Specular Arc */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none transition-opacity duration-300"
        style={{
          background: darkMode
            ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 20%, rgba(212, 175, 55, 0.95) 50%, rgba(255, 255, 255, 0.5) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 20%, rgba(212, 175, 55, 0.8) 50%, rgba(255, 255, 255, 0.95) 80%, transparent 100%)',
          opacity: isOpen || isHovered ? 1 : 0.6,
        }}
      />

      {/* 5. Header Area */}
      <div className="relative z-10 p-5 md:p-6 flex justify-between items-center gap-4">
        <h4 className={`text-base md:text-lg font-medium tracking-tight transition-colors duration-300 ${
          darkMode 
            ? isOpen ? 'text-[#f3e5ab]' : 'text-slate-50' 
            : isOpen ? 'text-[#8a7029]' : 'text-stone-900'
        }`}>
          {title}
        </h4>

        {/* Tactile Liquid Glass circular badge for chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: darkMode
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(0, 0, 0, 0.04)',
            border: darkMode
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: darkMode
              ? 'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              : 'inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          <ChevronDown className={`w-4 h-4 transition-colors ${
            darkMode 
              ? isOpen ? 'text-[#d4af37]' : 'text-slate-400' 
              : isOpen ? 'text-[#a89968]' : 'text-stone-600'
          }`} />
        </motion.div>
      </div>

      {/* 6. Expandable Content Area */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 pt-0">
              {/* Luminous separator line with gold accent */}
              <div 
                className="w-full h-px mb-4" 
                style={{
                  background: darkMode
                    ? 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.4) 30%, rgba(212,175,55,0.6) 50%, rgba(212,175,55,0.4) 70%, transparent 100%)'
                    : 'linear-gradient(90deg, transparent 0%, rgba(180,150,90,0.3) 30%, rgba(180,150,90,0.5) 50%, rgba(180,150,90,0.3) 70%, transparent 100%)'
                }}
              />
              <div className={`text-sm md:text-base leading-relaxed font-sans ${
                darkMode ? 'text-slate-300' : 'text-stone-600'
              }`}>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
