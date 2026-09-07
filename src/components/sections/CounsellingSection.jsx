import React, { useState } from 'react';
import { Calendar, Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LiquidGlassCard } from '../animations/LiquidGlassCard';
import { LiquidBookingModal } from './LiquidBookingModal';

export function CounsellingSection() {
  const { darkMode } = useTheme();
  const [selectedCounselling, setSelectedCounselling] = useState('online');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <section id="counselling" className="mb-24 scroll-mt-32 reveal-on-scroll relative">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Counselling</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Non-clinical counselling that focuses on the person and respects your experience without judging you. Sessions that are tailored to your needs, either online or in person. Meet yourself with kindness.
        </p>
      </div>

      {/* Liquid Glass Segmented Switcher for Online/In-person */}
      <div className="flex justify-center mb-10">
        <div 
          className="p-1.5 rounded-full inline-flex gap-2 backdrop-blur-xl transition-all duration-300"
          style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: darkMode ? '0 8px 24px rgba(0,0,0,0.5)' : '0 4px 16px rgba(180,160,130,0.12)',
          }}
        >
          <button
            onClick={() => setSelectedCounselling('online')}
            className={`px-5 md:px-7 py-2.5 rounded-full transition-all duration-300 text-sm md:text-base font-medium flex items-center gap-2 ${
              selectedCounselling === 'online'
                ? darkMode
                  ? 'bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-semibold'
                  : 'bg-white text-stone-900 shadow-md font-semibold'
                : darkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Online Sessions
          </button>
          <button
            onClick={() => setSelectedCounselling('inperson')}
            className={`px-5 md:px-7 py-2.5 rounded-full transition-all duration-300 text-sm md:text-base font-medium flex items-center gap-2 ${
              selectedCounselling === 'inperson'
                ? darkMode
                  ? 'bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-semibold'
                  : 'bg-white text-stone-900 shadow-md font-semibold'
                : darkMode
                ? 'text-slate-400 hover:text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            In-Person Sessions
          </button>
        </div>
      </div>

      {/* Session Info Cards using Liquid Glass */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-12">
        <LiquidGlassCard darkMode={darkMode} className="h-full">
          <div className="p-8 md:p-12 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-stone-100/80 dark:bg-stone-900/60 mb-6 shadow-inner border border-stone-200/80 dark:border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#d4af37]/50">
              <Calendar className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] transition-colors" />
            </div>
            
            <h4 className="text-xl md:text-2xl font-light mb-4 text-stone-900 dark:text-slate-50">Flexible Scheduling</h4>
            <p className="text-stone-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-sans">
              {selectedCounselling === 'online'
                ? 'Book online sessions at times that suit your rhythm. Sessions via video call, with flexibility around your life.'
                : 'Available for in-person sessions in Kolkata. A calm, welcoming space designed for authentic dialogue.'}
            </p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard darkMode={darkMode} className="h-full">
          <div className="p-8 md:p-12 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-stone-100/80 dark:bg-stone-900/60 mb-6 shadow-inner border border-stone-200/80 dark:border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#d4af37]/50">
              <Mail className="w-7 h-7 text-[#a89968] dark:text-[#d4af37] transition-colors" />
            </div>
            
            <h4 className="text-xl md:text-2xl font-light mb-4 text-stone-900 dark:text-slate-50">Personalised Approach</h4>
            <p className="text-stone-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-sans">
              Pricing tailored to your circumstances. No one-size-fits-all. Reach out to explore what feels right for you.
            </p>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Location Info for In-person */}
      {selectedCounselling === 'inperson' && (
        <div className="mb-12 fade-in">
          <LiquidGlassCard darkMode={darkMode} withBubbles={false} className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#d4af37]/10 border border-[#d4af37]/30 flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#a89968] dark:text-[#d4af37]" />
              </div>
              <div>
                <p className="font-medium text-stone-900 dark:text-slate-50 text-base md:text-lg">
                  Kolkata Sanctuary, {process.env.REACT_APP_LOCATION}
                </p>
                <p className={`text-xs md:text-sm mt-1 font-sans ${darkMode ? 'text-slate-300' : 'text-stone-600'}`}>
                  Near Kalighat Fire Station, Kolkata — 700026
                </p>
                <p className="text-xs text-stone-500 dark:text-slate-400 mt-2 italic font-sans">
                  (Quiet, confidential sanctuary space · Exact suite confirmed upon booking)
                </p>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      )}

      {/* Liquid Glass Booking Experience Hub */}
      <LiquidGlassCard darkMode={darkMode} className="mb-10 text-center p-8 md:p-14">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#8a7029] dark:text-[#f3e5ab]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive Liquid Glass Scheduler</span>
          </div>

          <h4 className="text-2xl md:text-3xl font-light mb-3 text-stone-900 dark:text-slate-50">
            Reserve Your Session
          </h4>
          <p className="text-xs text-stone-500 dark:text-slate-400 mb-8 italic max-w-md mx-auto font-sans">
            💡 WhatsApp ({process.env.REACT_APP_WHATSAPP_PHONE}) is preferred for instant confirmation.
          </p>

          {/* Glowing Liquid Glass Booking Window Button */}
          <button
            onClick={() => setBookingModalOpen(true)}
            className="group relative inline-flex items-center justify-center gap-3 text-base md:text-lg px-9 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, #f5e7b2 0%, #d4af37 50%, #aa8520 100%)'
                : 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
              color: darkMode ? '#0a0a0a' : '#ffffff',
              boxShadow: darkMode
                ? '0 10px 32px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.7)'
                : '0 10px 28px rgba(41, 37, 36, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <Calendar className="w-5 h-5" />
            <span>Open Booking Window</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </LiquidGlassCard>

      {/* Liquid Glass Booking Modal Window */}
      <LiquidBookingModal 
        isOpen={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        defaultType={selectedCounselling}
      />

      {/* Fallback email contact */}
      <div className="text-center text-xs md:text-sm text-stone-500 dark:text-slate-400 mt-6 mb-2 font-sans">
        Prefer email? Reach out directly to <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`} className="text-stone-700 dark:text-slate-200 hover:text-stone-900 dark:hover:text-white underline">{process.env.REACT_APP_CONTACT_EMAIL}</a>
      </div>
    </section>
  );
}
