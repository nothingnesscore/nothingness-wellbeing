import React from 'react';
import {
  Calendar,
  Mail,
  MapPin,
  Video,
  ArrowRight,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { LiquidGlassCard } from '../animations/LiquidGlassCard';

/**
 * A selectable session-type row. This *is* the switcher — the old design had a
 * separate pill toggle floating above the cards that duplicated this choice and
 * left the booking card as a mostly-empty box.
 */
function SessionOption({ active, icon: Icon, title, detail, meta, onClick }) {
  const { darkMode } = useTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group relative flex items-start gap-4 w-full text-left p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background: active
          ? darkMode
            ? 'rgba(212,175,55,0.10)'
            : 'rgba(168,153,104,0.10)'
          : darkMode
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.4)',
        border: `1px solid ${
          active
            ? darkMode
              ? 'rgba(212,175,55,0.45)'
              : 'rgba(168,153,104,0.45)'
            : darkMode
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.8)'
        }`,
        boxShadow: active
          ? darkMode
            ? '0 8px 26px rgba(212,175,55,0.18), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 8px 22px rgba(168,153,104,0.18), inset 0 1px 0 rgba(255,255,255,0.9)'
          : darkMode
          ? 'inset 0 1px 0 rgba(255,255,255,0.05)'
          : 'inset 0 1px 0 rgba(255,255,255,0.8)',
        transform: active ? 'translateY(-1px)' : 'none',
      }}
    >
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: active
            ? darkMode
              ? 'linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f0e6d2 100%)'
            : darkMode
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(0,0,0,0.04)',
          border: `1px solid ${
            active
              ? darkMode
                ? 'rgba(255,255,255,0.25)'
                : 'rgba(168,153,104,0.3)'
              : darkMode
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(255,255,255,0.9)'
          }`,
        }}
      >
        <Icon
          className={`w-[18px] h-[18px] transition-colors ${
            active
              ? darkMode
                ? 'text-[#050505]'
                : 'text-[#786227]'
              : darkMode
              ? 'text-slate-400'
              : 'text-stone-500'
          }`}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span
            className={`text-sm md:text-base font-medium ${
              darkMode ? 'text-slate-50' : 'text-stone-900'
            }`}
          >
            {title}
          </span>
          <span
            className={`text-[10px] uppercase tracking-[0.16em] font-sans flex-shrink-0 ${
              active
                ? darkMode
                  ? 'text-[#f3e5ab]'
                  : 'text-[#8a7029]'
                : darkMode
                ? 'text-slate-500'
                : 'text-stone-400'
            }`}
          >
            {meta}
          </span>
        </span>
        <span
          className={`block mt-1 text-xs md:text-sm leading-relaxed font-sans ${
            darkMode ? 'text-slate-400' : 'text-stone-600'
          }`}
        >
          {detail}
        </span>
      </span>
    </button>
  );
}

export function CounsellingSection() {
  const { darkMode } = useTheme();
  const { sessionType, openBooking, selectSessionType } = useBooking();

  const isOnline = sessionType === 'online';

  return (
    <section id="counselling" className="mb-24 scroll-mt-32 reveal-on-scroll relative">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Counselling</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Non-clinical counselling that focuses on the person and respects your experience without
          judging you. Sessions that are tailored to your needs, either online or in person. Meet
          yourself with kindness.
        </p>
      </div>

      {/* Booking panel — two columns so the card carries real content instead of
          one button adrift in empty glass. */}
      <LiquidGlassCard darkMode={darkMode} className="mb-10">
        <div className="p-7 md:p-10 grid lg:grid-cols-[1.05fr_1fr] gap-9 lg:gap-12 items-center">
          {/* Left: pitch + primary action */}
          <div className="text-center lg:text-left">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] mb-5"
              style={{
                background: darkMode ? 'rgba(212,175,55,0.10)' : 'rgba(168,153,104,0.12)',
                border: darkMode ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(168,153,104,0.3)',
                color: darkMode ? '#f3e5ab' : '#8a7029',
              }}
            >
              <Sparkles className="w-3 h-3" />
              <span>Reserve a session</span>
            </span>

            <h4 className="text-2xl md:text-3xl font-light mb-3 text-stone-900 dark:text-slate-50">
              {isOnline ? 'Book an online session' : 'Book an in-person session'}
            </h4>

            <p className="text-sm md:text-base leading-relaxed text-stone-600 dark:text-slate-300 font-sans max-w-md mx-auto lg:mx-0 mb-7">
              {isOnline
                ? 'A private video consultation held with complete non-judgmental presence, scheduled around your timezone and routine.'
                : 'A quiet, confidential sanctuary near Kalighat, Kolkata — a calm physical space set up for unhurried, authentic dialogue.'}
            </p>

            <button
              type="button"
              onClick={() => openBooking(sessionType)}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 text-sm md:text-base px-8 py-4 rounded-full font-medium cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: darkMode
                  ? 'linear-gradient(135deg, #f5e7b2 0%, #d4af37 50%, #aa8520 100%)'
                  : 'linear-gradient(135deg, #292524 0%, #1c1917 100%)',
                color: darkMode ? '#0a0a0a' : '#ffffff',
                boxShadow: darkMode
                  ? '0 10px 32px rgba(212,175,55,0.36), inset 0 1px 0 rgba(255,255,255,0.7)'
                  : '0 10px 28px rgba(41,37,36,0.24), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
              <span>Choose a date &amp; time</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="mt-5 text-xs text-stone-500 dark:text-slate-400 font-sans flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#a89968] dark:text-[#d4af37]" />
                WhatsApp {process.env.REACT_APP_WHATSAPP_PHONE} &mdash; preferred
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#a89968] dark:text-[#d4af37]" />
                <a
                  href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}
                  className="underline underline-offset-2 hover:text-stone-800 dark:hover:text-white transition-colors"
                >
                  {process.env.REACT_APP_CONTACT_EMAIL}
                </a>
              </span>
            </p>
          </div>

          {/* Right: pick how you'd like to meet */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-sans text-stone-500 dark:text-slate-400 text-center lg:text-left">
              How would you like to meet?
            </p>

            <SessionOption
              active={isOnline}
              onClick={() => selectSessionType('online')}
              icon={Video}
              title="Online"
              meta="50–60 min"
              detail="Video call, scheduled to suit your timezone and the rhythm of your week."
            />

            <SessionOption
              active={!isOnline}
              onClick={() => selectSessionType('inperson')}
              icon={MapPin}
              title="In-person"
              meta="Kolkata"
              detail={`${process.env.REACT_APP_LOCATION} — near Kalighat Fire Station, 700026.`}
            />

            {/* Detail that only belongs to the chosen mode */}
            <div
              className="mt-1 p-4 rounded-2xl flex items-start gap-3"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.45)',
                border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.8)',
              }}
            >
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#a89968] dark:text-[#d4af37]" />
              <p className="text-xs leading-relaxed text-stone-600 dark:text-slate-400 font-sans">
                {isOnline
                  ? 'Sessions run 50–60 minutes. Exact suite and meeting details are shared once your booking is confirmed.'
                  : 'Sessions run 50–60 minutes. The exact suite is confirmed privately when your booking goes through.'}
              </p>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Supporting detail */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        <LiquidGlassCard darkMode={darkMode} className="h-full">
          <div className="p-8 md:p-10 flex flex-col items-center text-center h-full">
            <div
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5 transition-all duration-500"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(168,153,104,0.25)',
              }}
            >
              <Calendar className="w-6 h-6 text-[#a89968] dark:text-[#d4af37]" />
            </div>

            <h4 className="text-lg md:text-xl font-light mb-3 text-stone-900 dark:text-slate-50">
              Flexible Scheduling
            </h4>
            <p className="text-stone-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-sans">
              {isOnline
                ? 'Book online sessions at times that suit your rhythm. Sessions via video call, with flexibility around your life.'
                : 'Available for in-person sessions in Kolkata. A calm, welcoming space designed for authentic dialogue.'}
            </p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard darkMode={darkMode} className="h-full">
          <div className="p-8 md:p-10 flex flex-col items-center text-center h-full">
            <div
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5 transition-all duration-500"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(168,153,104,0.25)',
              }}
            >
              <Mail className="w-6 h-6 text-[#a89968] dark:text-[#d4af37]" />
            </div>

            <h4 className="text-lg md:text-xl font-light mb-3 text-stone-900 dark:text-slate-50">
              Personalised Approach
            </h4>
            <p className="text-stone-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-sans">
              Pricing tailored to your circumstances. No one-size-fits-all. Reach out to explore what
              feels right for you.
            </p>
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}