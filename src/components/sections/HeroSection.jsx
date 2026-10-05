import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, MessageCircle, Clock, Video, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { MorphingTextAnimation } from '../animations/MorphingText';
import { SceneErrorBoundary } from '../three/SceneErrorBoundary';

// three.js + drei are ~250 kB gzip. Keeping them out of the entry chunk means the
// headline and CTA paint immediately; the glass lens arrives a beat later.
const ZenScene = lazy(() =>
  import('../three/ZenScene').then((m) => ({ default: m.ZenScene }))
);

export function HeroSection() {
  const { darkMode } = useTheme();
  const { openBooking } = useBooking();
  const sectionRef = useRef(null);
  const [show3D, setShow3D] = useState(false);

  // Defer the 3D chunk until after first paint — never let it delay LCP.
  useEffect(() => {
    const id = setTimeout(() => setShow3D(true), 350);
    return () => clearTimeout(id);
  }, []);

  // Scroll-linked depth: content drifts up slower than the page and fades, so the
  // glass lens reads as sitting *behind* the words rather than behind a flat image.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const whatsappMessage = encodeURIComponent(
    "Hello! I'd like to explore a counselling session."
  );

  // Built from the env var only. If it is ever unset we fall back to WhatsApp's
  // contact picker rather than hardcoding a number into the markup.
  const whatsappHref = process.env.REACT_APP_WHATSAPP_PHONE
    ? `https://wa.me/${process.env.REACT_APP_WHATSAPP_PHONE.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`
    : `https://wa.me/?text=${whatsappMessage}`;

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D liquid-glass lens + refracted orbs */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0 z-0">
        {show3D && (
          <SceneErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <ZenScene darkMode={darkMode} />
            </Suspense>
          </SceneErrorBoundary>
        )}
      </motion.div>

      {/* Legibility scrim: keeps body copy readable over the 3D layer without
          flattening it. Very low opacity, tinted to the active theme. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.2) 55%, transparent 100%)'
            : 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(250,248,243,0.6) 0%, rgba(250,248,243,0.22) 55%, transparent 100%)',
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="max-w-3xl mx-auto px-6 text-center relative z-10 mt-20 pb-20 md:pb-24"
      >
        {/* Eyebrow — brand positioning, also the strongest non-clinical signal */}
        <div className="fade-in stagger-1 flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-sans uppercase tracking-[0.22em]"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.55)',
              border: darkMode ? '1px solid rgba(212,175,55,0.28)' : '1px solid rgba(168,153,104,0.28)',
              color: darkMode ? '#f3e5ab' : '#786227',
              boxShadow: darkMode
                ? '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
                : '0 4px 16px rgba(180,160,130,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            Non-clinical &middot; Person-centred &middot; Kolkata
          </span>
        </div>

        <h1
          className={`text-5xl md:text-7xl font-light mb-5 tracking-tight fade-in stagger-1 leading-[1.05] ${
            darkMode ? 'text-slate-50' : 'text-stone-900'
          }`}
          style={{
            textShadow: darkMode
              ? '0 2px 40px rgba(212,175,55,0.18)'
              : '0 2px 30px rgba(168,153,104,0.18)',
          }}
        >
          Nothingness
          <br />
          Well-Being
        </h1>

        <div className="h-[1.6em] mt-2 mb-5 text-base md:text-xl text-[#a89968] dark:text-[#d4af37] font-medium tracking-wide flex justify-center">
          <MorphingTextAnimation
            texts={[
              'Person-Centred Counselling',
              'Psychology Tutoring',
              'A Safe Space To Heal',
              'Guidance & Learning',
            ]}
          />
        </div>

        <div className="zen-line fade-in stagger-2"></div>

        <p
          className={`text-base md:text-lg mt-7 leading-relaxed max-w-xl mx-auto font-light fade-in stagger-3 ${
            darkMode ? 'text-slate-300' : 'text-stone-700'
          }`}
        >
          Non-clinical counselling and psychology tutoring based on being present with the person. A
          place where the self dissolves down into clarity, healing, and understanding.
        </p>

        {/* Booking CTAs — these open the shared LiquidBookingModal, which owns the
            single Cal.com data-cal-link button. Do NOT add data-cal-link here. */}
        <div className="fade-in stagger-3 flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <button
            type="button"
            onClick={() => openBooking()}
            className="group relative inline-flex items-center justify-center gap-2.5 text-sm md:text-base px-8 py-4 rounded-full font-medium cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, #f5e7b2 0%, #d4af37 50%, #aa8520 100%)'
                : 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
              color: darkMode ? '#0a0a0a' : '#ffffff',
              boxShadow: darkMode
                ? '0 12px 34px rgba(212,175,55,0.34), inset 0 1px 0 rgba(255,255,255,0.7)'
                : '0 12px 30px rgba(41,37,36,0.24), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
            <span>Reserve a Session</span>
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 text-sm md:text-base px-8 py-4 rounded-full font-medium cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.55)',
              border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.85)',
              color: darkMode ? '#e5e5e5' : '#292524',
              boxShadow: darkMode
                ? '0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 8px 20px rgba(180,160,130,0.12), inset 0 1px 0 rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            }}
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Quiet reassurance row — facts already stated elsewhere on the page */}
        <div className="fade-in stagger-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10 text-[11px] md:text-xs font-sans text-stone-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#a89968] dark:text-[#d4af37]" />
            50&ndash;60 min sessions
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-[#a89968] dark:text-[#d4af37]" />
            Online video
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#a89968] dark:text-[#d4af37]" />
            In-person, Kolkata
          </span>
        </div>
      </motion.div>

      {/* High-Quality Spiral Scroll Arrow */}
      <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-10 fade-in stagger-3">
        <a
          href="#counselling"
          aria-label="Scroll to counselling"
          className="flex flex-col items-center justify-center text-stone-400 hover:text-[#a89968] dark:hover:text-[#d4af37] transition-colors duration-300 norse-arrow"
        >
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