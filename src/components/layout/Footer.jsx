import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';

export function Footer() {
  const { darkMode } = useTheme();
  const { openBooking } = useBooking();

  return (
    <footer className="relative z-10 mt-20 px-4 md:px-6 pb-8">
      <div
        className="max-w-5xl mx-auto rounded-3xl md:rounded-[32px] overflow-hidden relative"
        style={{
          backdropFilter: 'blur(30px) saturate(140%)',
          WebkitBackdropFilter: 'blur(30px) saturate(140%)',
          background: darkMode
            ? 'linear-gradient(150deg, rgba(20,20,24,0.55) 0%, rgba(5,5,6,0.75) 100%)'
            : 'linear-gradient(150deg, rgba(255,255,255,0.62) 0%, rgba(246,242,234,0.45) 100%)',
          border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.85)',
          boxShadow: darkMode
            ? '0 24px 60px -18px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 18px 44px -14px rgba(180,160,130,0.22), inset 0 1px 0 rgba(255,255,255,0.95)',
        }}
      >
        {/* Top specular arc — matches the glass language used across the site */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none"
          style={{
            background: darkMode
              ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 25%, rgba(212,175,55,0.9) 50%, rgba(255,255,255,0.5) 75%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 25%, rgba(212,175,55,0.7) 50%, rgba(255,255,255,1) 75%, transparent 100%)',
          }}
        />

        {/* CTA strip */}
        <div className="relative z-10 px-6 md:px-10 pt-10 pb-8 text-center border-b border-black/5 dark:border-white/[0.07]">
          <h3
            className={`text-2xl md:text-3xl font-light mb-3 ${
              darkMode ? 'text-slate-50' : 'text-stone-900'
            }`}
          >
            Begin wherever you are
          </h3>
          <p
            className={`text-sm max-w-md mx-auto leading-relaxed font-sans mb-7 ${
              darkMode ? 'text-slate-400' : 'text-stone-600'
            }`}
          >
            A first conversation is enough. No pressure, no labels &mdash; just a space to be heard.
          </p>
          <button
            type="button"
            onClick={() => openBooking()}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, #f5e7b2 0%, #d4af37 50%, #aa8520 100%)'
                : 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
              color: darkMode ? '#0a0a0a' : '#ffffff',
              boxShadow: darkMode
                ? '0 10px 28px rgba(212,175,55,0.34), inset 0 1px 0 rgba(255,255,255,0.7)'
                : '0 10px 24px rgba(41,37,36,0.22), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <Clock className="w-4 h-4" />
            <span>Reserve a Session</span>
          </button>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 gap-8 px-6 md:px-10 py-9">
          <div>
            <h4
              className={`font-light text-base md:text-lg mb-4 ${
                darkMode ? 'text-slate-50' : 'text-stone-900'
              }`}
            >
              Nothingness Well-Being
            </h4>
            <p
              className={`text-xs md:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-slate-400' : 'text-stone-600'
              }`}
            >
              Non-clinical counselling and psychology tutoring that focuses on the person. A practice
              based on being present, being clear, and making authentic connections.
            </p>
          </div>

          <div>
            <h4
              className={`font-light text-base md:text-lg mb-4 ${
                darkMode ? 'text-slate-50' : 'text-stone-900'
              }`}
            >
              Contact
            </h4>

            <div className="mb-3">
              <p
                className={`text-[10px] uppercase tracking-[0.18em] mb-1.5 font-sans ${
                  darkMode ? 'text-slate-500' : 'text-stone-500'
                }`}
              >
                Primary Contact
              </p>
              <a
                href={`tel:${process.env.REACT_APP_CONTACT_PHONE_RAW}`}
                className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 ${
                  darkMode ? 'text-slate-300' : 'text-stone-600'
                }`}
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-[#a89968] dark:text-[#d4af37]" />
                {process.env.REACT_APP_CONTACT_PHONE} (Calls &amp; Messages)
              </a>
            </div>

            <div className="mb-3">
              <p
                className={`text-[10px] uppercase tracking-[0.18em] mb-1.5 font-sans ${
                  darkMode ? 'text-slate-500' : 'text-stone-500'
                }`}
              >
                WhatsApp Preferred
              </p>
              <a
                href={
                  process.env.REACT_APP_WHATSAPP_PHONE
                    ? `https://wa.me/${process.env.REACT_APP_WHATSAPP_PHONE.replace(/[^0-9]/g, '')}`
                    : 'https://wa.me/'
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 ${
                  darkMode ? 'text-slate-300' : 'text-stone-600'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#a89968] dark:text-[#d4af37]" />
                {process.env.REACT_APP_WHATSAPP_PHONE} (WhatsApp Direct)
              </a>
            </div>

            <a
              href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}
              className={`text-xs md:text-sm hover:opacity-70 transition flex items-center gap-2 font-sans ${
                darkMode ? 'text-slate-300' : 'text-stone-600'
              }`}
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0 text-[#a89968] dark:text-[#d4af37]" />
              {process.env.REACT_APP_CONTACT_EMAIL}
            </a>

            <p
              className={`text-[10px] uppercase tracking-[0.18em] mt-4 mb-1.5 font-sans ${
                darkMode ? 'text-slate-500' : 'text-stone-500'
              }`}
            >
              Response Time
            </p>
            <p className={`text-xs font-sans ${darkMode ? 'text-slate-400' : 'text-stone-600'}`}>
              Within 24&ndash;48 hours
            </p>
          </div>

          <div>
            <h4
              className={`font-light text-base md:text-lg mb-4 ${
                darkMode ? 'text-slate-50' : 'text-stone-900'
              }`}
            >
              Location
            </h4>
            <p
              className={`text-xs md:text-sm leading-relaxed flex items-start gap-2 ${
                darkMode ? 'text-slate-300' : 'text-stone-600'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#a89968] dark:text-[#d4af37]" />
              <span>
                Near Kalighat Fire Station
                <br />
                Kolkata, India 700026
              </span>
            </p>
            <p
              className={`text-xs mt-2 pl-[22px] ${darkMode ? 'text-slate-400' : 'text-stone-500'}`}
            >
              In-person &amp; Online
            </p>
          </div>
        </div>

        <div className="relative z-10 border-t border-black/5 dark:border-white/[0.07] px-6 md:px-10 py-7">
          <p
            className={`text-xs text-center leading-relaxed font-sans ${
              darkMode ? 'text-slate-500' : 'text-stone-500'
            }`}
          >
            &copy; 2026 Nothingness Well-Being. All practices rooted in presence, clarity, and the
            courage to be fully yourself.
          </p>
        </div>
      </div>
    </footer>
  );
}