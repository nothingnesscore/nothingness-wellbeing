import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MorphingTextAnimation } from '../animations/MorphingText';

export function HeroSection() {
  const { darkMode } = useTheme();

  return (
    <section className="hero-section relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10 pointer-events-none mt-20">
        <h2 className={`text-4xl md:text-6xl font-light mb-6 tracking-tight fade-in stagger-1 ${darkMode ? 'text-slate-50' : 'text-stone-900 dark:text-slate-50'}`}>
          Nothingness<br />Well-Being
        </h2>
        <div className="h-[2em] mt-2 mb-4 text-lg md:text-xl text-[#a89968] dark:text-[#d4af37] font-medium tracking-wide flex justify-center">
          <MorphingTextAnimation texts={[
            "Person-Centred Counselling",
            "Psychology Tutoring",
            "A Safe Space To Heal",
            "Guidance & Learning"
          ]} />
        </div>
        <div className="zen-line fade-in stagger-2"></div>
        <p className={`text-base md:text-lg mt-8 leading-relaxed max-w-xl mx-auto font-light fade-in stagger-3 ${darkMode ? 'text-slate-300' : 'text-stone-700 dark:text-slate-200'}`}>
          Non-clinical counselling and psychology tutoring based on being present with the person. A place where the self dissolves down into clarity, healing, and understanding.
        </p>
      </div>

      {/* High-Quality Spiral Scroll Arrow */}
      <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-10 fade-in stagger-3">
        <a href="#counselling" className="flex flex-col items-center justify-center text-stone-400 hover:text-[#a89968] dark:hover:text-[#d4af37] transition-colors duration-300 norse-arrow">
          <svg width="24" height="90" viewBox="0 0 40 120" fill="none" stroke="currentColor" strokeWidth="1" className="transform">
            {/* Elegantly fading tail dots */}
            <circle cx="20" cy="6" r="1" fill="currentColor" stroke="none" opacity="0.15" />
            <circle cx="20" cy="14" r="1.2" fill="currentColor" stroke="none" opacity="0.3" />
            <circle cx="20" cy="24" r="1.4" fill="currentColor" stroke="none" opacity="0.55" />
            <circle cx="20" cy="36" r="1.6" fill="currentColor" stroke="none" opacity="0.85" />
            
            {/* Interlocking Double Helix (Zen aesthetic) */}
            <path d="M 20 40 C 35 55, 35 70, 20 85" strokeWidth="0.75" opacity="0.9" />
            <path d="M 20 40 C 5 55, 5 70, 20 85" strokeWidth="0.75" opacity="0.5" />
            
            {/* Sleek descending dashed line into arrow tip */}
            <line x1="20" y1="85" x2="20" y2="93" strokeWidth="1.25" />
            <line x1="20" y1="96" x2="20" y2="100" strokeWidth="1.25" opacity="0.8" />
            <line x1="20" y1="103" x2="20" y2="115" strokeWidth="1.25" />
            
            <path d="M 14 108 L 20 115 L 26 108" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
