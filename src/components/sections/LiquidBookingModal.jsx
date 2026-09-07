import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Video, MapPin, MessageCircle, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LiquidBackdropBlobs } from '../animations/LiquidBackdropBlobs';

/**
 * LiquidBookingModal
 * iOS WWDC25 & VisionOS-inspired Liquid Glass Booking Window.
 * Features:
 * - Fluid optical glass refraction and 45° specular rim highlight
 * - Under-glass morphing color bubbles floating behind the scheduler
 * - Cal.com live integration with Online & In-Person tabs
 * - Direct quick-connect liquid pills (WhatsApp & Direct Call)
 * - Tactile spring opening and dismissal with keyboard escape support
 */
export function LiquidBookingModal({ isOpen, onClose, defaultType = 'online' }) {
  const { darkMode } = useTheme();
  const [sessionType, setSessionType] = useState(defaultType); // 'online' | 'inperson'

  useEffect(() => {
    setSessionType(defaultType);
  }, [defaultType]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const calLink = sessionType === 'online' ? 'nothingness-wb/online' : 'nothingness-wb/in-person';
  const whatsappNumber = process.env.REACT_APP_WHATSAPP_PHONE || "+91 82402 13971";
  const whatsappNumberClean = whatsappNumber.replace(/[^0-9]/g, '');
  const phoneNumber = process.env.REACT_APP_CONTACT_PHONE || "+91 89024 94770";
  const phoneNumberClean = phoneNumber.replace(/[^0-9]/g, '');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop with chromatic blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Liquid Glass Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl md:rounded-[32px] overflow-hidden flex flex-col shadow-2xl z-10"
            style={{
              backdropFilter: 'blur(36px) saturate(150%)',
              WebkitBackdropFilter: 'blur(36px) saturate(150%)',
            }}
          >
            {/* 1. Underlying Liquid Color Bubbles (fluid light bending through window) */}
            <LiquidBackdropBlobs variant="local" className="opacity-70" />

            {/* 2. Frosted Glass Substrate */}
            <div
              className="absolute inset-0 pointer-events-none transition-colors duration-500"
              style={{
                background: darkMode
                  ? 'linear-gradient(145deg, rgba(18, 18, 22, 0.75) 0%, rgba(8, 8, 10, 0.9) 100%)'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 244, 235, 0.7) 100%)',
                boxShadow: darkMode
                  ? '0 24px 64px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.5)'
                  : '0 20px 50px -12px rgba(180, 150, 110, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(0, 0, 0, 0.04)',
              }}
            />

            {/* 3. Optical Glass Perimeter with Specular & Chromatic Rim */}
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
                className="absolute inset-0"
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(212,175,55,0.9) 35%, rgba(255,255,255,0.1) 70%, rgba(212,175,55,0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(212,175,55,0.8) 40%, rgba(255,255,255,0.4) 75%, rgba(180,150,90,0.6) 100%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                  background: 'linear-gradient(90deg, rgba(56,189,248,0.5) 0%, transparent 45%, rgba(244,114,182,0.5) 100%)',
                }}
              />
            </div>

            {/* 4. Top Glancing Specular Arc */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background: darkMode
                  ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 25%, rgba(212, 175, 55, 1) 50%, rgba(255, 255, 255, 0.6) 75%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 1) 25%, rgba(212, 175, 55, 0.9) 50%, rgba(255, 255, 255, 1) 75%, transparent 100%)',
              }}
            />

            {/* 5. Window Header */}
            <div className="relative z-10 px-6 py-5 md:px-8 md:py-6 flex items-center justify-between border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 border border-[#d4af37]/40 shadow-inner">
                  <Sparkles className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight text-stone-900 dark:text-slate-50">
                    Book a Session
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400 font-sans">
                    Nothingness Well-Being · Person-Centred Space
                  </p>
                </div>
              </div>

              {/* Liquid Glass Close Pill Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                }}
                aria-label="Close booking window"
              >
                <X className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-stone-700'}`} />
              </button>
            </div>

            {/* 6. Window Body (Scrollable if screen is small) */}
            <div className="relative z-10 p-6 md:p-8 overflow-y-auto space-y-6">
              {/* Liquid Glass Segmented Pill Switcher */}
              <div 
                className="p-1.5 rounded-full flex relative"
                style={{
                  background: darkMode ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.05)',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.6)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setSessionType('online')}
                  className={`flex-1 py-3 px-4 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
                    sessionType === 'online'
                      ? darkMode
                        ? 'text-[#050505] font-semibold'
                        : 'text-stone-900 font-semibold'
                      : darkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Online Sessions
                </button>

                <button
                  type="button"
                  onClick={() => setSessionType('inperson')}
                  className={`flex-1 py-3 px-4 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
                    sessionType === 'inperson'
                      ? darkMode
                        ? 'text-[#050505] font-semibold'
                        : 'text-stone-900 font-semibold'
                      : darkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  In-Person (Kolkata)
                </button>

                {/* Sliding Liquid Pill Indicator */}
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute top-1.5 bottom-1.5 rounded-full shadow-lg pointer-events-none"
                  style={{
                    width: 'calc(50% - 6px)',
                    left: sessionType === 'online' ? '3px' : 'calc(50% + 3px)',
                    background: darkMode
                      ? 'linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)'
                      : 'linear-gradient(135deg, #ffffff 0%, #f7f3eb 100%)',
                    boxShadow: darkMode
                      ? '0 4px 16px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.7)'
                      : '0 4px 14px rgba(180, 160, 130, 0.25), inset 0 1px 0 #ffffff',
                  }}
                />
              </div>

              {/* Session Overview Pill Box */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.5)',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(255, 255, 255, 0.8)',
                }}
              >
                <div className="flex items-center gap-2 text-xs font-medium text-[#d4af37] mb-2 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  50 – 60 Minutes per Session
                </div>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-slate-300 font-sans">
                  {sessionType === 'online'
                    ? 'Secure, private video consultation conducted with complete non-judgmental presence. Flexible scheduling across time zones.'
                    : 'Serene, quiet in-person sanctuary near Kalighat Fire Station, Kolkata (700026). A calming physical space dedicated to authentic dialogue.'}
                </p>
                <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5 flex items-center gap-2 text-xs text-stone-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Confidential, person-centred & tailored fees.</span>
                </div>
              </div>

              {/* Primary Action: Open Cal.com Calendar */}
              <button
                data-cal-link={calLink}
                data-cal-origin="https://cal.com"
                data-cal-config={JSON.stringify({ 
                  layout: "month_view", 
                  theme: darkMode ? "dark" : "light",
                  cssVarsPerTheme: {
                    light: { "cal-brand": "#a89968", "cal-brand-emphasis": "#7a6a48", "cal-bg": "#faf8f3", "cal-text": "#292524" },
                    dark: { "cal-brand": "#d4af37", "cal-brand-emphasis": "#b8942d", "cal-bg": "#000000", "cal-bg-muted": "#0a0a0a", "cal-text": "#f1f5f9", "cal-border": "#2d2d2d" }
                  }
                })}
                className="w-full py-4 px-6 rounded-2xl font-medium text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, #f5e7b2 0%, #d4af37 50%, #aa8520 100%)'
                    : 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
                  color: darkMode ? '#0a0a0a' : '#ffffff',
                  boxShadow: darkMode
                    ? '0 8px 30px rgba(212, 175, 55, 0.35), inset 0 1px 0 rgba(255,255,255,0.6)'
                    : '0 8px 24px rgba(41, 37, 36, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <Calendar className="w-5 h-5" />
                Select Date & Time on Calendar
              </button>

              {/* Quick Connect Liquid Pills Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-black/5 dark:border-white/10"></div>
                <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-stone-400 dark:text-slate-500 font-sans">
                  Or Connect Directly
                </span>
                <div className="flex-grow border-t border-black/5 dark:border-white/10"></div>
              </div>

              {/* Direct Reach-Out Liquid Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${whatsappNumberClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: darkMode ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.08)',
                    border: darkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 197, 94, 0.2)',
                    color: darkMode ? '#4ade80' : '#15803d',
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {whatsappNumber}</span>
                </a>

                <a
                  href={`tel:${phoneNumberClean}`}
                  className="py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: darkMode ? 'rgba(212, 175, 55, 0.12)' : 'rgba(168, 153, 104, 0.08)',
                    border: darkMode ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(168, 153, 104, 0.2)',
                    color: darkMode ? '#f3e5ab' : '#786227',
                  }}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {phoneNumber}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
